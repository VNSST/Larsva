// Generated from the killchess repo by scripts/export-larsva.js. Edit the original, not this copy.
// POST /api/logout — { token } ends this device's session.
const { parseBody, deleteSession, cors } = require('./_redis');

module.exports = async (req, res) => {
  if (cors(req, res)) return;
  if (req.method !== 'POST') { res.setHeader('Allow', 'POST'); return res.status(405).json({ error: 'POST only' }); }
  const b = parseBody(req) || {};
  try {
    if (typeof b.token === 'string') await deleteSession(b.token);
  } catch (e) { console.error(e); }
  res.status(204).end();
};
