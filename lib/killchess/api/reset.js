// Generated from the killchess repo by scripts/export-larsva.js. Edit the original, not this copy.
// POST /api/reset — { token, password } sets a new password using a reset link.
// The link works once. Every existing device session is signed out; this device gets a fresh one.
const { redis, KEYS, parseBody, clientIp, hashToken, hashPassword, createSession, allow, cors } = require('./_redis');

const EXPIRED = 'This reset link has expired or was already used. Request a new one.';

module.exports = async (req, res) => {
  if (cors(req, res)) return;
  if (req.method !== 'POST') { res.setHeader('Allow', 'POST'); return res.status(405).json({ error: 'POST only' }); }
  const b = parseBody(req) || {};
  const token = typeof b.token === 'string' ? b.token : '';
  const password = typeof b.password === 'string' ? b.password : '';
  if (!/^[0-9a-f]{64}$/.test(token)) return res.status(400).json({ error: EXPIRED });
  if (password.length < 8) return res.status(400).json({ error: 'Password must be at least 8 characters.' });
  if (password.length > 128) return res.status(400).json({ error: 'Password is too long (max 128 characters).' });
  try {
    if (!(await allow('reset:' + clientIp(req), 10, 900))) return res.status(429).json({ error: 'Too many attempts. Try again in 15 minutes.' });
    const pwHash = await hashPassword(password);
    const [id] = await redis([['GETDEL', KEYS.reset(hashToken(token))]]);   // single use
    if (!id) return res.status(400).json({ error: EXPIRED });
    const pk = KEYS.player(id);
    const [, sv, [name, points]] = await redis([
      ['HSET', pk, 'pwHash', pwHash],
      ['HINCRBY', pk, 'sv', 1],
      ['HMGET', pk, 'name', 'points']
    ]);
    const session = await createSession(id, sv);
    res.status(200).json({ id: Number(id), name, token: session, points: Number(points) || 0 });
  } catch (e) {
    console.error(e);
    res.status(503).json({ error: 'Couldn’t reset your password right now. Try again in a minute.' });
  }
};
