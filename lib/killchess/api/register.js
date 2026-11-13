// Generated from the killchess repo by scripts/export-larsva.js. Edit the original, not this copy.
// POST /api/register — { name, email, password } -> { id, name, token, points }
// Player IDs are sequential, starting at 100. The password is stored only as a scrypt hash.
// The returned token is this device's session.
const { redis, KEYS, parseBody, clientIp, hashPassword, createSession, allow, cors } = require('./_redis');

const NAME_RE = /^[\p{L}\p{N} ._'-]{2,20}$/u;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_SIGNUPS_PER_IP_PER_HOUR = 5;

module.exports = async (req, res) => {
  if (cors(req, res)) return;
  if (req.method !== 'POST') { res.setHeader('Allow', 'POST'); return res.status(405).json({ error: 'POST only' }); }
  const b = parseBody(req) || {};
  const name = String(b.name || '').trim().replace(/\s+/g, ' ');
  const email = String(b.email || '').trim().toLowerCase();
  const password = typeof b.password === 'string' ? b.password : '';
  if (!NAME_RE.test(name)) return res.status(400).json({ error: 'Name must be 2–20 letters, numbers or spaces.' });
  if (email.length > 254 || !EMAIL_RE.test(email)) return res.status(400).json({ error: 'Please enter a valid email.' });
  if (password.length < 8) return res.status(400).json({ error: 'Password must be at least 8 characters.' });
  if (password.length > 128) return res.status(400).json({ error: 'Password is too long (max 128 characters).' });

  try {
    if (!(await allow('reg:' + clientIp(req), MAX_SIGNUPS_PER_IP_PER_HOUR, 3600))) {
      return res.status(429).json({ error: 'Too many sign-ups. Try again later.' });
    }
    const [existing] = await redis([['GET', KEYS.email(email)]]);
    if (existing) return res.status(409).json({ error: 'This email already has an account. Log in instead.' });

    const pwHash = await hashPassword(password);
    const [, id] = await redis([['SET', KEYS.seq, 99, 'NX'], ['INCR', KEYS.seq]]);
    const [claimed] = await redis([['SET', KEYS.email(email), id, 'NX']]);
    if (!claimed) return res.status(409).json({ error: 'This email already has an account. Log in instead.' });

    await redis([
      ['HSET', KEYS.player(id), 'name', name, 'email', email, 'pwHash', pwHash, 'created', Date.now(),
        'points', 0, 'games', 0, 'wins:veryeasy', 0, 'wins:easy', 0, 'wins:medium', 0, 'wins:hard', 0],
      ['ZADD', KEYS.board, 0, id]
    ]);
    const token = await createSession(id);
    res.status(201).json({ id: Number(id), name, token, points: 0 });
  } catch (e) {
    console.error(e);
    res.status(503).json({ error: 'Sign-up is unavailable right now. Try again in a minute.' });
  }
};
