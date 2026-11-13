// Generated from the killchess repo by scripts/export-larsva.js. Edit the original, not this copy.
// POST /api/forgot — { email } emails a one-time password-reset link (valid 1 hour).
// Always answers the same way whether or not the email has an account, so it can't be used to find accounts.
const { redis, KEYS, parseBody, clientIp, newToken, hashToken, siteUrl, allow, cors } = require('./_redis');
const { sendMail, mailConfigured } = require('./_mail');

const RESET_TTL = 3600;
const SENT = { ok: true, message: 'If an account uses that email, we’ve sent a reset link. It expires in 1 hour — check spam too.' };
const esc = t => String(t).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

module.exports = async (req, res) => {
  if (cors(req, res)) return;
  if (req.method !== 'POST') { res.setHeader('Allow', 'POST'); return res.status(405).json({ error: 'POST only' }); }
  if (!mailConfigured()) return res.status(503).json({ error: 'Password reset isn’t available yet. Please try again later.' });
  const b = parseBody(req) || {};
  const email = String(b.email || '').trim().toLowerCase();
  if (!email || email.length > 254 || !email.includes('@')) return res.status(400).json({ error: 'Please enter your email.' });
  try {
    if (!(await allow('forgot:' + clientIp(req), 5, 3600))) return res.status(429).json({ error: 'Too many requests. Try again in an hour.' });
    if (!(await allow('forgot-email:' + email, 3, 3600))) return res.status(200).json(SENT);   // quietly cap emails per address

    const [id] = await redis([['GET', KEYS.email(email)]]);
    if (!id) return res.status(200).json(SENT);
    const [name] = await redis([['HGET', KEYS.player(id), 'name']]);

    const token = newToken();
    await redis([['SET', KEYS.reset(hashToken(token)), id, 'EX', RESET_TTL]]);
    // The token goes in the #fragment so it isn't sent to servers or kept in access logs.
    const link = `${siteUrl(req)}/reset#token=${token}`;
    await sendMail({
      to: email,
      subject: 'Reset your Kill Chess password',
      text: `Hi ${name || 'there'},\n\nReset your Kill Chess password (player ID ${id}) with this link. It works once and expires in 1 hour:\n\n${link}\n\nIf you didn’t ask for this, ignore this email — your password won’t change.\n\nKill Chess`,
      html: `<div style="font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif;max-width:480px;margin:auto;padding:24px;color:#1a1625">
        <h2 style="margin:0 0 12px">Reset your password</h2>
        <p>Hi ${esc(name || 'there')},</p>
        <p>Tap the button to choose a new password for your Kill Chess account (player ID <b>${esc(id)}</b>). The link works once and expires in 1 hour.</p>
        <p style="margin:24px 0"><a href="${link}" style="background:#ff3d5a;color:#fff;text-decoration:none;padding:12px 20px;border-radius:10px;font-weight:700;display:inline-block">Reset password</a></p>
        <p style="color:#6b6480;font-size:13px">If you didn’t ask for this, ignore this email — your password won’t change.</p>
      </div>`
    });
    res.status(200).json(SENT);
  } catch (e) {
    console.error(e);
    res.status(503).json({ error: 'Couldn’t send the email right now. Try again in a few minutes.' });
  }
};
