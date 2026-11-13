// Generated from the killchess repo by scripts/export-larsva.js. Edit the original, not this copy.
// Online two-player games, played over an invite link. No account needed.
//   GET  /api/online?id=<game>                         -> game state (polled by both players)
//   POST /api/online { action: 'create', color, name, minutes } -> { id, token, color, game }   (minutes: 0 = no timer, 1-5)
//   POST /api/online { action: 'join', id, name }      -> { token, color, game }
//   POST /api/online { action: 'move', id, token, uci, n } -> { game }   (n = number of moves already played)
//   POST /api/online { action: 'resign', id, token }   -> { game }
//   POST /api/online { action: 'rematch', id, token, name } -> { id, token, color, game }  (colours swap)
// Each seat is owned by a random token kept on that player's device; only its SHA-256 is stored.
// The server replays every move with the same engine as the game, so illegal moves are refused.
// Optional timer: each side gets `minutes` for the whole game, kept by the server (wLeft/bLeft in ms,
// turnAt = when the current turn started). A player's clock starts once the other side has moved.
// Running out of time loses; the server notices on the next poll or move.
// Games expire 7 days after their last activity. Online games don't earn leaderboard points.
const crypto = require('crypto');
const { redis, KEYS, parseBody, clientIp, newToken, hashToken, allow, cors } = require('./_redis');
const { replay, outcome, engine } = require('./_engine');

const TTL = 7 * 24 * 3600;
const ID_CHARS = 'abcdefghjkmnpqrstuvwxyz23456789';
const ID_RE = /^[a-z2-9]{8}$/;
const NAME_RE = /^[\p{L}\p{N} ._'-]{1,20}$/u;
const FIELDS = ['wTok', 'bTok', 'wName', 'bName', 'moves', 'result', 'reason', 'next', 'tc', 'wLeft', 'bLeft', 'turnAt'];
const TIMER_MINUTES = [0, 1, 2, 3, 4, 5];
const other = c => c === 'w' ? 'b' : 'w';
const colourName = c => c === 'w' ? 'White' : 'Black';

const newId = () => Array.from(crypto.randomBytes(8), b => ID_CHARS[b % ID_CHARS.length]).join('');
const cleanName = n => { const t = String(n || '').trim().replace(/\s+/g, ' '); return NAME_RE.test(t) ? t : ''; };

async function load(id) {
  const [vals] = await redis([['HMGET', KEYS.game(id), ...FIELDS]]);
  return parse(id, vals);
}
function parse(id, vals) {
  if (!vals || vals.every(v => v === null)) return null;
  const g = Object.fromEntries(FIELDS.map((f, i) => [f, vals[i] || '']));
  g.id = id;
  g.moveList = g.moves ? g.moves.split(' ') : [];
  return g;
}

// What both players (and anyone with the link) can see. Tokens are never sent.
const view = g => ({
  id: g.id,
  moves: g.moveList,
  white: { name: g.wName || '', joined: !!g.wTok },
  black: { name: g.bName || '', joined: !!g.bTok },
  result: g.result || null,      // 'w' | 'b' | 'draw' | null
  reason: g.reason || null,
  next: g.next || null,          // rematch game id, once someone asked for one
  tc: +g.tc || 0,                // ms per side, 0 = no timer
  left: { w: +g.wLeft || 0, b: +g.bLeft || 0 },
  turnAt: +g.turnAt || null,     // server time the current turn started (null = clocks not started)
  now: Date.now()                // server time of this response, so clients can count down without clock skew
});

// The side whose time has run out, if any.
function flagged(g, now) {
  if (!+g.tc || g.result || !+g.turnAt) return null;
  const side = g.moveList.length % 2 ? 'b' : 'w';
  return +g[side + 'Left'] - (now - +g.turnAt) <= 0 ? side : null;
}
async function finishOnTime(g, side) {
  g.result = other(side); g.reason = `${colourName(side)} ran out of time`;
  g[side + 'Left'] = 0;
  await redis([...finishCmds(g.id, g.result, g.reason), ['HSET', KEYS.game(g.id), side + 'Left', 0]]);
}

const seatOf = (g, token) => {
  if (typeof token !== 'string' || !token) return null;
  const h = hashToken(token);
  return h === g.wTok ? 'w' : h === g.bTok ? 'b' : null;
};

function finishCmds(id, result, reason) {
  const field = 'online:' + (result === 'draw' ? 'draw' : result === 'w' ? 'white' : 'black');
  return [
    ['HSET', KEYS.game(id), 'result', result, 'reason', reason],
    ['HINCRBY', KEYS.stats, field, 1], ['HINCRBY', KEYS.stats, 'total', 1]
  ];
}
const finish = (id, result, reason) => redis(finishCmds(id, result, reason));

async function create(color, name, tc) {
  const id = newId(), token = newToken();
  const fields = { moves: '', result: '', created: Date.now(), tc: tc || 0, wLeft: tc || 0, bLeft: tc || 0, turnAt: '' };
  fields[color + 'Tok'] = hashToken(token);
  if (name) fields[color + 'Name'] = name;
  await redis([['HSET', KEYS.game(id), ...Object.entries(fields).flat()], ['EXPIRE', KEYS.game(id), TTL]]);
  return { id, token, color };
}

// Takes the open seat of a game. Returns { token, color } or null when both seats are taken.
async function join(g, name) {
  const color = !g.wTok ? 'w' : !g.bTok ? 'b' : null;
  if (!color) return null;
  const token = newToken();
  const [ok] = await redis([['HSETNX', KEYS.game(g.id), color + 'Tok', hashToken(token)]]);
  if (!ok) return null;
  const cmds = [['EXPIRE', KEYS.game(g.id), TTL]];
  if (name) cmds.push(['HSET', KEYS.game(g.id), color + 'Name', name]);
  await redis(cmds);
  return { token, color };
}

module.exports = async (req, res) => {
  if (cors(req, res)) return;
  res.setHeader('Cache-Control', 'no-store');
  try {
    if (req.method === 'GET') {
      const id = String((req.query && req.query.id) || '');
      if (!ID_RE.test(id)) return res.status(400).json({ error: 'Invalid game' });
      const t0 = Date.now();
      const g = await load(id);
      res.setHeader('Server-Timing', `db;dur=${Date.now() - t0}`);   // database time, for spotting slowness
      const late = g && flagged(g, Date.now());
      if (late) await finishOnTime(g, late);
      return g ? res.status(200).json({ game: view(g) }) : res.status(404).json({ error: 'This game link has expired or doesn’t exist.' });
    }
    if (req.method !== 'POST') { res.setHeader('Allow', 'GET, POST'); return res.status(405).json({ error: 'GET or POST only' }); }

    const b = parseBody(req) || {};
    const ip = clientIp(req);

    if (b.action === 'create') {
      if (!(await allow('oc:' + ip, 30, 3600))) return res.status(429).json({ error: 'Too many new games. Try again later.' });
      const color = b.color === 'b' ? 'b' : 'w';
      const minutes = TIMER_MINUTES.includes(b.minutes) ? b.minutes : 0;
      const r = await create(color, cleanName(b.name), minutes * 60000);
      return res.status(201).json({ ...r, game: view(await load(r.id)) });
    }

    const id = String(b.id || '');
    if (!ID_RE.test(id)) return res.status(400).json({ error: 'Invalid game' });
    const g = await load(id);
    if (!g) return res.status(404).json({ error: 'This game link has expired or doesn’t exist.' });

    if (b.action === 'join') {
      if (!(await allow('oj:' + ip, 60, 3600))) return res.status(429).json({ error: 'Too many attempts. Try again later.' });
      const r = await join(g, cleanName(b.name));
      if (!r) return res.status(409).json({ error: 'This game already has two players.', game: view(g) });
      return res.status(200).json({ ...r, game: view(await load(id)) });
    }

    const me = seatOf(g, b.token);
    if (!me) return res.status(403).json({ error: 'You’re not a player in this game.', game: view(g) });

    if (b.action === 'move') {
      // Three database round trips in total: load (above), lock + re-read, then write + unlock.
      const lock = KEYS.rl('olock:' + id);
      const [got, vals] = await redis([['SET', lock, 1, 'EX', 5, 'NX'], ['HMGET', KEYS.game(id), ...FIELDS]]);
      if (!got) return res.status(409).json({ error: 'Busy, try again.', game: view(g) });
      let unlocked = false;
      try {
        const fresh = parse(id, vals);
        const now = Date.now();
        const late = flagged(fresh, now);
        if (late) { await finishOnTime(fresh, late); return res.status(409).json({ error: 'Time ran out.', game: view(fresh) }); }
        const n = fresh.moveList.length;
        const turn = n % 2 ? 'b' : 'w';
        if (fresh.result) return res.status(409).json({ error: 'The game is over.', game: view(fresh) });
        if (!fresh.wTok || !fresh.bTok) return res.status(409).json({ error: 'Your friend hasn’t joined yet.', game: view(fresh) });
        if (b.n !== n || turn !== me) return res.status(409).json({ error: 'Not your turn.', game: view(fresh) });
        const r = replay(fresh.moveList);
        const E = engine();
        const m = r && typeof b.uci === 'string' ? E.fromUci(r.s, b.uci) : null;
        if (!m) return res.status(400).json({ error: 'Illegal move.', game: view(fresh) });
        const s = E.make(r.s, m);
        const k = E.key(s);
        r.reps.set(k, (r.reps.get(k) || 0) + 1);
        fresh.moveList.push(E.uci(m));
        const end = outcome(s, r.reps);
        const cmds = [['HSET', KEYS.game(id), 'moves', fresh.moveList.join(' ')], ['EXPIRE', KEYS.game(id), TTL]];
        if (+fresh.tc) {   // stop the mover's clock and start the other side's
          if (+fresh.turnAt) fresh[me + 'Left'] = Math.max(1, +fresh[me + 'Left'] - (now - +fresh.turnAt));
          fresh.turnAt = now;
          cmds.push(['HSET', KEYS.game(id), me + 'Left', fresh[me + 'Left'], 'turnAt', now]);
        }
        if (end) {
          fresh.result = end.winner || 'draw'; fresh.reason = end.reason;
          cmds.push(...finishCmds(id, fresh.result, fresh.reason));
        }
        cmds.push(['DEL', lock]);
        await redis(cmds);
        unlocked = true;
        return res.status(200).json({ game: view(fresh) });
      } finally {
        if (!unlocked) await redis([['DEL', lock]]);
      }
    }

    if (b.action === 'resign') {
      if (g.result) return res.status(409).json({ error: 'The game is over.', game: view(g) });
      if (!g.wTok || !g.bTok) {   // nobody joined yet: just close the game, nothing to record
        await redis([['HSET', KEYS.game(id), 'result', 'draw', 'reason', 'Game cancelled']]);
      } else {
        await finish(id, other(me), `${colourName(me)} resigned`);
      }
      return res.status(200).json({ game: view(await load(id)) });
    }

    if (b.action === 'rematch') {
      if (!g.result) return res.status(409).json({ error: 'The game isn’t over yet.', game: view(g) });
      const name = cleanName(b.name) || g[me + 'Name'];
      if (!g.next) {
        // Colours swap for the rematch. HSETNX makes sure both players end up in the same new game.
        const r = await create(other(me), name, +g.tc || 0);
        const [claimed] = await redis([['HSETNX', KEYS.game(id), 'next', r.id]]);
        if (claimed) {
          await redis([['HSET', KEYS.game(r.id), 'prev', id]]);
          return res.status(201).json({ ...r, game: view(await load(r.id)) });
        }
        await redis([['DEL', KEYS.game(r.id)]]);
        g.next = (await load(id)).next;
      }
      const ng = await load(g.next);
      if (!ng) return res.status(404).json({ error: 'The rematch has expired.' });
      const r = await join(ng, name);
      if (!r) return res.status(409).json({ error: 'The rematch already has two players.' });
      return res.status(200).json({ id: ng.id, ...r, game: view(await load(ng.id)) });
    }

    return res.status(400).json({ error: 'Unknown action' });
  } catch (e) {
    console.error(e);
    res.status(503).json({ error: 'Online play is unavailable right now. Try again in a minute.' });
  }
};
