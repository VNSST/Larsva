// Generated from the killchess repo by scripts/export-larsva.js. Edit the original, not this copy.
// Minimal Upstash Redis REST client (no dependencies).
// Env vars are added automatically when an Upstash Redis database is connected to the Vercel project.
const REDIS_URL = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
const REDIS_TOKEN = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;

// Key prefix. KC_PREFIX lets tests use a separate namespace in the same database.
const P = process.env.KC_PREFIX || 'kc:';

// Keys:
//   {P}stats            hash   global game counters (total, cpu:<level>:<result>, local:<result>)
//   {P}seq              string last player ID issued (first player gets 100)
//   {P}email:<email>    string player ID registered with that email
//   {P}player:<id>      hash   name, email, pwHash, sv, created, points, games, wins:<level>
//   {P}session:<hash>   string "<id>:<sv>" for a signed-in device (expires after a year)
//   {P}reset:<hash>     string player ID for a password-reset link (expires after an hour, single use)
//   {P}board            zset   player ID -> rank score = points * 1e6 + games (ties on points go to more games)
//   {P}lb               zset   (old, points only; no longer used)
//   {P}rl:*             rate-limit keys (expire on their own)
const KEYS = {
  stats: P + 'stats',
  seq: P + 'seq',
  board: P + 'board',
  email: e => P + 'email:' + e,
  player: id => P + 'player:' + id,
  session: h => P + 'session:' + h,
  reset: h => P + 'reset:' + h,
  rl: k => P + 'rl:' + k,
  game: id => P + 'game:' + id
};

// Runs several commands in one round trip; returns each command's result.
async function redis(commands) {
  if (!REDIS_URL || !REDIS_TOKEN) throw new Error('Redis is not configured');
  const r = await fetch(REDIS_URL + '/pipeline', {
    method: 'POST',
    headers: { Authorization: 'Bearer ' + REDIS_TOKEN, 'Content-Type': 'application/json' },
    body: JSON.stringify(commands.map(c => c.map(String)))
  });
  if (!r.ok) throw new Error('Redis HTTP ' + r.status);
  const out = await r.json();
  const failed = out.find(x => x.error);
  if (failed) throw new Error('Redis error: ' + failed.error);
  return out.map(x => x.result);
}

// Shared request helpers.
function parseBody(req) {
  let b = req.body;
  if (typeof b === 'string') { try { b = JSON.parse(b); } catch { b = null; } }
  return b && typeof b === 'object' ? b : null;
}
// Other sites allowed to call this API from the browser: KC_CORS_ORIGINS (comma-separated, none by default).
// Returns true for a preflight request, already answered.
const CORS_ORIGINS = String(process.env.KC_CORS_ORIGINS || '').split(',').map(s => s.trim()).filter(Boolean);
function cors(req, res) {
  const origin = req.headers.origin;
  res.setHeader('Vary', 'Origin');
  if (origin && CORS_ORIGINS.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Max-Age', '86400');   // browsers skip the extra preflight request for a day
  }
  if (req.method === 'OPTIONS') { res.status(204).end(); return true; }
  return false;
}
const clientIp = req => String(req.headers['x-forwarded-for'] || '').split(',')[0].trim() || 'unknown';
const isPlayerId = id => /^\d{3,9}$/.test(String(id));

// Passwords: scrypt with a random salt, stored as "scrypt$<salt hex>$<hash hex>". Never stored in plain text.
const crypto = require('crypto');
const { promisify } = require('util');
const scrypt = promisify(crypto.scrypt);
const SCRYPT = { N: 16384, r: 8, p: 1 };
async function hashPassword(pw) {
  const salt = crypto.randomBytes(16);
  const hash = await scrypt(String(pw), salt, 64, SCRYPT);
  return `scrypt$${salt.toString('hex')}$${hash.toString('hex')}`;
}
async function verifyPassword(pw, stored) {
  const [kind, saltHex, hashHex] = String(stored || '').split('$');
  if (kind !== 'scrypt' || !saltHex || !hashHex) return false;
  const expected = Buffer.from(hashHex, 'hex');
  const actual = await scrypt(String(pw), Buffer.from(saltHex, 'hex'), expected.length, SCRYPT);
  return crypto.timingSafeEqual(actual, expected);
}

// Sessions: a random token kept on the player's device; Redis stores only its SHA-256 hash -> "<id>:<sv>".
// sv is the player's session version: bumping it (on password reset) signs out every device at once.
const SESSION_TTL = 60 * 60 * 24 * 365;   // 1 year
const newToken = () => crypto.randomBytes(32).toString('hex');
const hashToken = t => crypto.createHash('sha256').update(String(t || '')).digest('hex');
async function createSession(id, sv) {
  const token = newToken();
  await redis([['SET', KEYS.session(hashToken(token)), `${id}:${sv || 0}`, 'EX', SESSION_TTL]]);
  return token;
}
// Returns the player ID for a valid, current session token, or null.
async function sessionPlayer(token) {
  if (typeof token !== 'string' || token.length !== 64) return null;
  const [val] = await redis([['GET', KEYS.session(hashToken(token))]]);
  if (!val) return null;
  const [id, sv] = String(val).split(':');
  const [current] = await redis([['HGET', KEYS.player(id), 'sv']]);
  return String(current || 0) === sv ? id : null;
}
const deleteSession = token => redis([['DEL', KEYS.session(hashToken(token))]]);

// Where links in emails point. SITE_URL (e.g. https://killchess.vercel.app) wins; otherwise the request's host.
// The game's address, e.g. https://killchess.vercel.app or https://larsva.com/games/killchess
// (req.kcBase is set by the larsva.com route that runs these handlers).
function siteUrl(req) {
  if (process.env.SITE_URL) return process.env.SITE_URL.replace(/\/$/, '');
  const proto = String(req.headers['x-forwarded-proto'] || 'https').split(',')[0];
  return `${proto}://${req.headers.host}${req.kcBase || ''}`;
}

// Leaderboard order: more points first; on equal points, more games played first.
// Both are folded into one sorted-set score so Redis can rank it (exact while games < 1,000,000).
const rankScore = (points, games) => (Number(points) || 0) * 1e6 + (Number(games) || 0);
// 1-based rank of a player with this rank score (equal scores share a rank).
async function rankOf(score) {
  const [higher] = await redis([['ZCOUNT', KEYS.board, '(' + score, '+inf']]);
  return higher + 1;
}

// Fixed-window rate limit: returns true if this call is allowed.
async function allow(key, max, seconds) {
  const [n] = await redis([['INCR', KEYS.rl(key)]]);
  if (n === 1) await redis([['EXPIRE', KEYS.rl(key), seconds]]);
  return n <= max;
}

module.exports = {
  redis, KEYS, parseBody, clientIp, isPlayerId, cors,
  hashPassword, verifyPassword, newToken, hashToken, createSession, sessionPlayer, deleteSession, siteUrl,
  rankScore, rankOf, allow
};
