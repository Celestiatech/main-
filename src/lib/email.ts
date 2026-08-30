import nodemailer from 'nodemailer';

export interface SubmissionField {
  label: string;
  value?: string | null;
}

export interface SubmissionEmailOptions {
  /** Subject line of the notification email. */
  subject: string;
  /** Headline shown in the branded header block. */
  heading: string;
  /** Key/value rows rendered above the message body. Empty values are skipped. */
  fields: SubmissionField[];
  /** Free-text message from the visitor. */
  message: string;
  /** Visitor address, set as Reply-To so replies go straight back to them. */
  replyTo?: string;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

export function buildSubmissionHtml(options: SubmissionEmailOptions): string {
  const { heading, fields, message } = options;

  const rows = fields
    .filter((field) => field.value)
    .map(
      (field) => `
          <tr>
            <td style="padding:6px 0;color:#64748b;font-size:13px;width:140px;vertical-align:top;">${escapeHtml(field.label)}</td>
            <td style="padding:6px 0;color:#0f172a;font-size:14px;">${escapeHtml(String(field.value))}</td>
          </tr>`
    )
    .join('');

  const body = escapeHtml(message).replace(/\n/g, '<br />');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${escapeHtml(heading)}</title>
</head>
<body style="margin:0;padding:0;background:#f1f5f9;font-family:'Segoe UI',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f1f5f9;padding:40px 16px;">
    <tr>
      <td align="center">
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(204,85,0,0.10);border:1px solid #fed7aa;">
          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#cc5500 0%,#ff8c00 100%);padding:32px 40px;text-align:center;">
              <p style="margin:0;color:#ffedd5;font-size:12px;text-transform:uppercase;letter-spacing:0.15em;font-weight:500;">W3Tech</p>
              <h1 style="margin:10px 0 0;color:#ffffff;font-size:24px;font-weight:500;line-height:1.3;">${escapeHtml(heading)}</h1>
            </td>
          </tr>
          <!-- Details -->
          <tr>
            <td style="padding:32px 40px 8px;">
              <table width="100%" cellpadding="0" cellspacing="0">${rows}
              </table>
            </td>
          </tr>
          <!-- Message -->
          <tr>
            <td style="padding:8px 40px 36px;">
              <hr style="border:none;border-top:1px solid #e2e8f0;margin:20px 0;" />
              <p style="margin:0;color:#334155;font-size:15px;line-height:1.7;">${body}</p>
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="background:#fff7ed;border-top:1px solid #fed7aa;padding:20px 40px;text-align:center;">
              <p style="margin:0;color:#94a3b8;font-size:12px;">
                Sent automatically by the W3Tech website &middot; ${new Date().getFullYear()}
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function buildSubmissionText(options: SubmissionEmailOptions): string {
  const lines = options.fields
    .filter((field) => field.value)
    .map((field) => `${field.label}: ${field.value}`);

  return [options.heading, '', ...lines, '', options.message].join('\n');
}

/**
 * Sends a website form submission to the team inbox.
 * This project keeps no database — email is the only place submissions land.
 */
export async function sendSubmissionEmail(options: SubmissionEmailOptions): Promise<void> {
  const host = process.env.SMTP_HOST;
  const port = parseInt(process.env.SMTP_PORT || '587', 10);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const fromName = process.env.SMTP_FROM_NAME || 'W3Tech Website';
  const fromEmail = process.env.SMTP_FROM_EMAIL || user;
  const to = process.env.CONTACT_RECIPIENT_EMAIL || fromEmail;

  if (!host || !user || !pass) {
    throw new Error('SMTP configuration is missing. Set SMTP_HOST, SMTP_USER, and SMTP_PASS environment variables.');
  }

  if (!to) {
    throw new Error('No recipient configured. Set CONTACT_RECIPIENT_EMAIL.');
  }

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });

  await transporter.sendMail({
    from: `"${fromName}" <${fromEmail}>`,
    to,
    replyTo: options.replyTo,
    subject: options.subject,
    html: buildSubmissionHtml(options),
    text: buildSubmissionText(options),
  });
}
