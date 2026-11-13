// Generated from the killchess repo by scripts/export-larsva.js. Edit the original, not this copy.
// POST /api/login — { login: <email or player ID>, password } -> { id, name, token, points, level }
const { redis, KEYS, parseBody, clientIp, isPlayerId, verifyPassword, createSession, allow, cors } = require('./_redis');

const MAX_ATTEMPTS_PER_IP = 10;        // per 15 minutes
const MAX_ATTEMPTS_PER_ACCOUNT = 20;   // per hour, stops slow guessing from many IPs
const WRONG = 'Email/ID or password is wrong.';

module.exports = async (req, res) => {
  if (cors(req, res)) return;
  if (req.method !== 'POST') { res.setHeader('Allow', 'POST'); return res.status(405).json({ error: 'POST only' }); }
  const b = parseBody(req) || {};
  const login = String(b.login || '').trim().toLowerCase();
  const password = typeof b.password === 'string' ? b.password : '';
  if (!login || !password || password.length > 128) return res.status(400).json({ error: WRONG });
  try {
    if (!(await allow('login:' + clientIp(req), MAX_ATTEMPTS_PER_IP, 900))) {
      return res.status(429).json({ error: 'Too many attempts. Try again in 15 minutes.' });
    }
    const [id] = isPlayerId(login) ? [login] : await redis([['GET', KEYS.email(login)]]);
    if (!id) return res.status(401).json({ error: WRONG });
    if (!(await allow('login-acct:' + id, MAX_ATTEMPTS_PER_ACCOUNT, 3600))) {
      return res.status(429).json({ error: 'Too many attempts for this account. Try again in an hour.' });
    }
    const [[name, pwHash, points, sv, level]] = await redis([['HMGET', KEYS.player(id), 'name', 'pwHash', 'points', 'sv', 'level']]);
    if (!pwHash || !(await verifyPassword(password, pwHash))) return res.status(401).json({ error: WRONG });
    const token = await createSession(id, sv);
    res.status(200).json({ id: Number(id), name, token, points: Number(points) || 0, level: level || null });
  } catch (e) {
    console.error(e);
    res.status(503).json({ error: 'Log in is unavailable right now. Try again in a minute.' });
  }
};
