'use server';

import nodemailer from 'nodemailer';
import { google } from 'googleapis';

interface ConsultationData {
  fullName: string;
  email: string;
  phone: string;
  startupIdea: string;
}

// Simple in-memory rate limiter
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_MAX = 5; // max submissions
const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // 1 hour

function checkRateLimit(identifier: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(identifier);

  if (!entry || now > entry.resetTime) {
    rateLimitMap.set(identifier, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return true;
  }

  if (entry.count >= RATE_LIMIT_MAX) {
    return false;
  }

  entry.count++;
  return true;
}

/** Escape HTML entities to prevent XSS in email templates */
function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// Every demo request goes to all of these. NOTIFICATION_EMAIL (comma-separated) can add more.
const ALWAYS_NOTIFY = ['vnsst123@gmail.com', 'vvratnasekhar@gmail.com'];

function notificationRecipients(): string[] {
  const extra = (process.env.NOTIFICATION_EMAIL || '')
    .split(',')
    .map((e) => e.trim())
    .filter(Boolean);
  return [...new Set([...ALWAYS_NOTIFY, ...extra].map((e) => e.toLowerCase()))];
}

async function sendEmailNotification(data: ConsultationData): Promise<void> {
  const SMTP_HOST = process.env.SMTP_HOST;
  const SMTP_PORT = parseInt(process.env.SMTP_PORT || '587', 10);
  const SMTP_USER = process.env.SMTP_USER;
  const SMTP_PASS = process.env.SMTP_PASS;

  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
    throw new Error('SMTP credentials are not configured (SMTP_HOST, SMTP_USER, SMTP_PASS).');
  }

  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT,
    secure: SMTP_PORT === 465,
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS,
    },
  });

  // Sanitize all user inputs before embedding in HTML
  const safeName = escapeHtml(data.fullName);
  const safeEmail = escapeHtml(data.email);
  const safePhone = escapeHtml(data.phone);
  const safeIdea = escapeHtml(data.startupIdea).replace(/\n/g, '<br>');
  const submittedAt = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', dateStyle: 'medium', timeStyle: 'short' });

  await transporter.sendMail({
    from: `"Larsva Website" <${SMTP_USER}>`,
    to: notificationRecipients(),
    // Hitting Reply goes straight to the person who filled in the form.
    replyTo: { name: data.fullName, address: data.email },
    subject: `New Demo Request - ${data.fullName} - Larsva`,
    text: `Name: ${data.fullName}\nEmail: ${data.email}\nPhone: ${data.phone}\n\nRequirement:\n${data.startupIdea}\n\nSubmitted via larsva.com on ${submittedAt} IST`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #0F172A; border-bottom: 2px solid #1F4FD8; padding-bottom: 10px;">
          New Demo Request
        </h2>
        <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
          <tr>
            <td style="padding: 8px 0; color: #475569; width: 120px;"><strong>Name:</strong></td>
            <td style="padding: 8px 0;">${safeName}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #475569;"><strong>Email:</strong></td>
            <td style="padding: 8px 0;"><a href="mailto:${safeEmail}">${safeEmail}</a></td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #475569;"><strong>Phone:</strong></td>
            <td style="padding: 8px 0;"><a href="tel:${safePhone.replace(/\s/g, '')}">${safePhone}</a></td>
          </tr>
        </table>
        <div style="margin-top: 20px; padding: 16px; background: #EEF2FD; border-radius: 8px; border-left: 3px solid #1F4FD8;">
          <p style="color: #475569; margin: 0 0 8px;"><strong>Requirement:</strong></p>
          <p style="margin: 0; color: #0F172A; line-height: 1.6;">${safeIdea}</p>
        </div>
        <p style="margin-top: 24px; font-size: 12px; color: #64748B;">
          Submitted via larsva.com on ${escapeHtml(submittedAt)} IST. Reply to this email to answer ${safeName} directly.
        </p>
      </div>
    `,
  });
}

async function storeInGoogleSheets(data: ConsultationData): Promise<void> {
  const GOOGLE_CLIENT_EMAIL = process.env.GOOGLE_CLIENT_EMAIL;
  const GOOGLE_PRIVATE_KEY = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n');
  const GOOGLE_SHEET_ID = process.env.GOOGLE_SHEET_ID;

  if (!GOOGLE_CLIENT_EMAIL || !GOOGLE_PRIVATE_KEY || !GOOGLE_SHEET_ID) {
    throw new Error('Google Sheets credentials are not configured.');
  }

  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: GOOGLE_CLIENT_EMAIL,
      private_key: GOOGLE_PRIVATE_KEY,
    },
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  const sheets = google.sheets({ version: 'v4', auth });

  await sheets.spreadsheets.values.append({
    spreadsheetId: GOOGLE_SHEET_ID,
    range: 'Sheet1!A:E',
    valueInputOption: 'USER_ENTERED',
    requestBody: {
      values: [
        [
          new Date().toISOString(),
          data.fullName,
          data.email,
          data.phone,
          data.startupIdea,
        ],
      ],
    },
  });
}

export async function submitConsultation(
  data: ConsultationData
): Promise<{ success: boolean; error?: string }> {
  try {
    // Basic validation
    if (!data.fullName?.trim() || !data.email?.trim() || !data.phone?.trim() || !data.startupIdea?.trim()) {
      return { success: false, error: 'All fields are required.' };
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      return { success: false, error: 'Please enter a valid email address.' };
    }

    // Phone format validation (country code + digits)
    const phoneRegex = /^\+\d{1,4}\s[\d\s]{7,15}$/;
    if (!phoneRegex.test(data.phone)) {
      return { success: false, error: 'Please enter a valid phone number.' };
    }

    // Startup idea minimum length
    if (data.startupIdea.trim().length < 30) {
      return { success: false, error: 'Please tell us a little more about what you need built (at least 30 characters).' };
    }

    // Rate limiting by email
    if (!checkRateLimit(data.email.toLowerCase())) {
      return { success: false, error: 'Too many submissions. Please try again later.' };
    }

    // Email and Google Sheets run at the same time, so the email goes out immediately.
    const [email, sheet] = await Promise.allSettled([sendEmailNotification(data), storeInGoogleSheets(data)]);
    if (email.status === 'rejected') console.error('Email notification failed:', email.reason);
    if (sheet.status === 'rejected') console.error('Google Sheets storage failed:', sheet.reason);

    // If the request reached neither the inbox nor the sheet, tell the visitor instead of losing the lead.
    if (email.status === 'rejected' && sheet.status === 'rejected') {
      return {
        success: false,
        error: 'Sorry, we could not send your request just now. Please email info@larsva.com or call +91 91338 04790.',
      };
    }

    return { success: true };
  } catch (error) {
    console.error('Consultation submission error:', error);
    return { success: false, error: 'An unexpected error occurred. Please try again.' };
  }
}
