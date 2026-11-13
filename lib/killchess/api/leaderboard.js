// Generated from the killchess repo by scripts/export-larsva.js. Edit the original, not this copy.
// GET /api/leaderboard[?me=<id>] — every signed-up player (including 0 points; up to TOP), plus the caller's own rank.
// Order: more points first; equal points -> more games played first. Emails are never returned.
const { redis, KEYS, isPlayerId, rankOf, cors } = require('./_redis');

const TOP = 1000;

module.exports = async (req, res) => {
  if (cors(req, res)) return;
  if (req.method !== 'GET') { res.setHeader('Allow', 'GET'); return res.status(405).json({ error: 'GET only' }); }
  try {
    const [flat, playerCount] = await redis([
      ['ZREVRANGE', KEYS.board, 0, TOP - 1, 'WITHSCORES'],
      ['ZCARD', KEYS.board]
    ]);
    const ids = [], scores = [];
    for (let i = 0; i < flat.length; i += 2) { ids.push(flat[i]); scores.push(Number(flat[i + 1])); }
    const details = ids.length
      ? await redis(ids.map(id => ['HMGET', KEYS.player(id), 'name', 'points', 'games', 'wins:veryeasy', 'wins:easy', 'wins:medium', 'wins:hard']))
      : [];
    // Players with the same points and games share a rank (1, 2, 2, 4).
    const top = ids.map((id, i) => {
      const [name, points, games, ve, e, m, h] = details[i] || [];
      return {
        rank: scores.indexOf(scores[i]) + 1, id: Number(id), name: name || 'Player',
        points: +points || 0, games: +games || 0,
        wins: { veryeasy: +ve || 0, easy: +e || 0, medium: +m || 0, hard: +h || 0 }
      };
    });

    let me = null;
    const meId = req.query && req.query.me;
    if (isPlayerId(meId)) {
      const [score, [name, points, games, level]] = await redis([
        ['ZSCORE', KEYS.board, meId],
        ['HMGET', KEYS.player(meId), 'name', 'points', 'games', 'level']
      ]);
      if (score !== null && name) {
        me = { id: Number(meId), name, points: +points || 0, games: +games || 0, level: level || null, rank: await rankOf(Number(score)) };
      }
    }

    // The public board is edge-cached briefly; a personal (?me=) response must always be fresh.
    res.setHeader('Cache-Control', meId ? 'private, no-store' : 'public, s-maxage=5, stale-while-revalidate=10');
    res.status(200).json({ top, players: playerCount, me });
  } catch (e) {
    console.error(e);
    res.status(503).json({ error: 'Leaderboard unavailable' });
  }
};
