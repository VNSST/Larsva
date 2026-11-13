// Generated from the killchess repo by scripts/export-larsva.js. Edit the original, not this copy.
// POST /api/result — records one finished game.
// Body: { mode: 'cpu', level: 'veryeasy'|'easy'|'medium'|'hard', human: 'w'|'b', moves: [uci...], ranked?: bool, resigned?: bool, player?: { id, token } }
//    or { mode: 'local', moves: [uci...] }
// The server replays the moves and decides the result itself; the client never says who won.
// Response: {} or, for a signed-in player in a vs-computer game, { gained, points, games, rank }.
const { redis, KEYS, parseBody, isPlayerId, sessionPlayer, rankScore, rankOf, cors } = require('./_redis');
const { judge, replay, outcome } = require('./_engine');

// Points per win. Keep in sync with index.html and scripts/rescore.js.
const POINTS = { veryeasy: 1, easy: 2, medium: 5, hard: 10 };
const MIN_SECONDS_BETWEEN_RANKED_GAMES = 10;

module.exports = async (req, res) => {
  if (cors(req, res)) return;
  if (req.method !== 'POST') { res.setHeader('Allow', 'POST'); return res.status(405).json({ error: 'POST only' }); }
  const b = parseBody(req);
  if (!b) return res.status(400).json({ error: 'Invalid result' });
  // resigned: the player gave up a vs-computer game that isn't finished; the computer wins.
  // The moves must still be legal, and resigning can only ever cost the player.
  let verdict;
  if (b.resigned === true && b.mode === 'cpu' && (b.human === 'w' || b.human === 'b')) {
    const r = Array.isArray(b.moves) && b.moves.length ? replay(b.moves) : null;
    verdict = r && !outcome(r.s, r.reps) ? { winner: b.human === 'w' ? 'b' : 'w' } : null;
  } else verdict = judge(b.moves);
  if (!verdict) return res.status(400).json({ error: 'Invalid game' });
  const w = verdict.winner;

  let field, cpuResult = null;
  if (b.mode === 'cpu' && Object.hasOwn(POINTS, b.level) && (b.human === 'w' || b.human === 'b')) {
    cpuResult = w === null ? 'draw' : w === b.human ? 'player' : 'computer';
    field = `cpu:${b.level}:${cpuResult}`;
  } else if (b.mode === 'local') {
    field = `local:${w === null ? 'draw' : w === 'w' ? 'white' : 'black'}`;
  } else {
    return res.status(400).json({ error: 'Invalid result' });
  }

  try {
    await redis([['HINCRBY', KEYS.stats, field, 1], ['HINCRBY', KEYS.stats, 'total', 1]]);

    const p = b.player;
    if (cpuResult === null || !p || !isPlayerId(p.id) || typeof p.token !== 'string') {
      return res.status(200).json({});
    }
    const pk = KEYS.player(p.id);
    if ((await sessionPlayer(p.token)) !== String(p.id)) return res.status(200).json({ signedOut: true });

    const [fresh] = await redis([['SET', KEYS.rl('res:' + p.id), 1, 'EX', MIN_SECONDS_BETWEEN_RANKED_GAMES, 'NX']]);
    if (!fresh) return res.status(200).json({ ranked: false });

    // Every finished vs-computer game counts as played; points only for ranked wins (no Undo used).
    const gained = cpuResult === 'player' && b.ranked !== false ? POINTS[b.level] : 0;
    const cmds = [['HINCRBY', pk, 'games', 1], ['HINCRBY', pk, 'points', gained]];
    if (gained) cmds.push(['HINCRBY', pk, 'wins:' + b.level, 1]);
    const [games, points] = await redis(cmds);
    // Set (not increment) the rank score from the player's own totals, so it can never drift.
    const score = rankScore(points, games);
    await redis([['ZADD', KEYS.board, score, p.id]]);
    res.status(200).json({ gained, points, games, rank: await rankOf(score) });
  } catch (e) {
    console.error(e);
    res.status(503).json({ error: 'Stats unavailable' });
  }
};
