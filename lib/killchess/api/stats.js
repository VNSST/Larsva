// Generated from the killchess repo by scripts/export-larsva.js. Edit the original, not this copy.
// GET /api/stats — returns all counters, e.g. { total: 42, "cpu:easy:player": 10, "local:white": 3, ... }
const { redis, KEYS, cors } = require('./_redis');

module.exports = async (req, res) => {
  if (cors(req, res)) return;
  if (req.method !== 'GET') { res.setHeader('Allow', 'GET'); return res.status(405).json({ error: 'GET only' }); }
  try {
    const [result] = await redis([['HGETALL', KEYS.stats]]);
    const stats = {};
    for (let i = 0; i < result.length; i += 2) stats[result[i]] = Number(result[i + 1]) || 0;
    // Cached at the edge for 30s so a busy stats page doesn't hit Redis on every view.
    res.setHeader('Cache-Control', 'public, s-maxage=30, stale-while-revalidate=300');
    res.status(200).json(stats);
  } catch (e) {
    console.error(e);
    res.status(503).json({ error: 'Stats unavailable' });
  }
};
