// Generated from the killchess repo by scripts/export-larsva.js. Edit the original, not this copy.
// POST /api/level — { player: { id, token }, level } -> {}
// Remembers the level a signed-in player should start at next, so it follows them to any device.
const { redis, KEYS, parseBody, isPlayerId, sessionPlayer, cors } = require('./_redis');

const LEVELS = ['veryeasy', 'easy', 'medium', 'hard'];

module.exports = async (req, res) => {
  if (cors(req, res)) return;
  if (req.method !== 'POST') { res.setHeader('Allow', 'POST'); return res.status(405).json({ error: 'POST only' }); }
  const b = parseBody(req) || {};
  const p = b.player || {};
  if (!LEVELS.includes(b.level) || !isPlayerId(p.id) || typeof p.token !== 'string') return res.status(400).json({ error: 'Invalid request' });
  try {
    if ((await sessionPlayer(p.token)) !== String(p.id)) return res.status(200).json({ signedOut: true });
    await redis([['HSET', KEYS.player(p.id), 'level', b.level]]);
    res.status(200).json({});
  } catch (e) {
    console.error(e);
    res.status(503).json({ error: 'Unavailable' });
  }
};
