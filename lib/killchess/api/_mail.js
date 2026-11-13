// Generated from the killchess repo by scripts/export-larsva.js. Edit the original, not this copy.
// Sends email through Resend's REST API (no dependencies).
// Needs RESEND_API_KEY (added by the Resend integration on Vercel) and MAIL_FROM, e.g. "Kill Chess <noreply@yourdomain.com>".
// Local development: with no API key and KC_DEV_MAIL_FILE set, emails are appended to that file instead of sent.
const fs = require('fs');

const mailConfigured = () => !!process.env.RESEND_API_KEY || !!process.env.KC_DEV_MAIL_FILE;

async function sendMail({ to, subject, html, text }) {
  if (!process.env.RESEND_API_KEY) {
    if (process.env.KC_DEV_MAIL_FILE) {
      fs.appendFileSync(process.env.KC_DEV_MAIL_FILE, JSON.stringify({ to, subject, text }) + '\n');
      return;
    }
    throw new Error('Email is not configured');
  }
  const r = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: 'Bearer ' + process.env.RESEND_API_KEY, 'Content-Type': 'application/json' },
    body: JSON.stringify({ from: process.env.MAIL_FROM || 'Kill Chess <onboarding@resend.dev>', to: [to], subject, html, text })
  });
  if (!r.ok) throw new Error('Resend HTTP ' + r.status + ': ' + (await r.text()).slice(0, 300));
}

module.exports = { sendMail, mailConfigured };
