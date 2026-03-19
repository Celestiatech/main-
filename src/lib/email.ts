import nodemailer from 'nodemailer';

export interface OutreachEmailOptions {
  to: string;
  subject: string;
  senderName: string;
  body: string;
}

export function buildOutreachHtml(options: OutreachEmailOptions): string {
  const { senderName, subject, body } = options;

  const escapedBody = body
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\n/g, '<br>');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${subject}</title>
</head>
<body style="margin:0;padding:0;background:#f1f5f9;font-family:'Segoe UI',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f1f5f9;padding:40px 16px;">
    <tr>
      <td align="center">
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(30,58,138,0.10);border:1px solid #dbeafe;">
          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#1e3a8a 0%,#2563eb 100%);padding:32px 40px;text-align:center;">
              <p style="margin:0;color:#bfdbfe;font-size:12px;text-transform:uppercase;letter-spacing:0.15em;font-weight:700;">Celestiatech</p>
              <h1 style="margin:10px 0 0;color:#ffffff;font-size:24px;font-weight:700;line-height:1.3;">${subject}</h1>
            </td>
          </tr>
          <!-- Body -->
          <tr>
            <td style="padding:36px 40px;">
              <p style="margin:0 0 20px;color:#334155;font-size:15px;line-height:1.7;">${escapedBody}</p>
              <hr style="border:none;border-top:1px solid #e2e8f0;margin:28px 0;" />
              <p style="margin:0;color:#64748b;font-size:13px;">Best regards,<br /><strong style="color:#1e3a8a;">${senderName}</strong><br />Celestiatech</p>
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="background:#f8fbff;border-top:1px solid #dbeafe;padding:20px 40px;text-align:center;">
              <p style="margin:0;color:#94a3b8;font-size:12px;">
                &copy; ${new Date().getFullYear()} Celestiatech. All rights reserved.<br />
                You received this email because of your interest in our services.
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

export async function sendOutreachEmail(options: OutreachEmailOptions): Promise<void> {
  const host = process.env.SMTP_HOST;
  const port = parseInt(process.env.SMTP_PORT || '587', 10);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const fromName = process.env.SMTP_FROM_NAME || options.senderName;
  const fromEmail = process.env.SMTP_FROM_EMAIL || user;

  if (!host || !user || !pass) {
    throw new Error('SMTP configuration is missing. Set SMTP_HOST, SMTP_USER, and SMTP_PASS environment variables.');
  }

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });

  await transporter.sendMail({
    from: `"${fromName}" <${fromEmail}>`,
    to: options.to,
    subject: options.subject,
    html: buildOutreachHtml(options),
    text: options.body,
  });
}
