import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { buildAuditReportHtml, type AuditResult } from "@/lib/audit-report";

export const runtime = "nodejs";

function validateEmail(email: string): string {
  const value = email.trim();
  if (!value) return "Email is required.";
  if (value.length > 254) return "Email is too long.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value)) return "Enter a valid email address.";
  return "";
}

/**
 * Emails the audit report to the visitor and notifies the team.
 * This is the lead-capture step: a free report in exchange for an address.
 */
export async function POST(request: NextRequest) {
  const payload = await request.json().catch(() => null);

  if (!payload) {
    return NextResponse.json({ success: false, error: "Invalid request body" }, { status: 400 });
  }

  const { email, result } = payload as { email?: string; result?: AuditResult };

  const emailError = validateEmail(email || "");
  if (emailError) {
    return NextResponse.json({ success: false, error: emailError }, { status: 400 });
  }

  if (!result || !Array.isArray(result.sections)) {
    return NextResponse.json({ success: false, error: "Run an audit before requesting the report." }, { status: 400 });
  }

  const host = process.env.SMTP_HOST;
  const port = parseInt(process.env.SMTP_PORT || "587", 10);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const fromName = process.env.SMTP_FROM_NAME || "W3Tech";
  const fromEmail = process.env.SMTP_FROM_EMAIL || user;
  const teamInbox = process.env.CONTACT_RECIPIENT_EMAIL || fromEmail;

  if (!host || !user || !pass) {
    console.error("Audit report email failed: SMTP is not configured.", { email, url: result.normalizedUrl });
    return NextResponse.json(
      { success: false, error: "Email delivery is not configured yet." },
      { status: 500 }
    );
  }

  const reportHtml = buildAuditReportHtml(result, { forEmail: true });

  try {
    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: { user, pass },
    });

    await transporter.sendMail({
      from: `"${fromName}" <${fromEmail}>`,
      to: email,
      subject: `Your SEO audit for ${result.normalizedUrl} — score ${result.overallScore}/100`,
      html: reportHtml,
      attachments: [
        {
          filename: "w3tech-seo-audit.html",
          content: reportHtml,
          contentType: "text/html",
        },
      ],
    });

    // Separate notification so the lead is not buried in the visitor's copy.
    if (teamInbox) {
      const failing = result.sections.reduce(
        (count, section) => count + section.checks.filter((check) => !check.passed).length,
        0
      );

      await transporter.sendMail({
        from: `"${fromName}" <${fromEmail}>`,
        to: teamInbox,
        replyTo: email,
        subject: `Audit lead: ${email} — ${result.normalizedUrl}`,
        text: [
          `Email: ${email}`,
          `Site audited: ${result.normalizedUrl}`,
          `Overall score: ${result.overallScore}/100`,
          `Failing checks: ${failing}`,
          `Requested: ${new Date().toISOString()}`,
        ].join("\n"),
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    // Nothing is stored, so log the lead rather than losing it.
    console.error("Audit report email failed:", error, { email, url: result.normalizedUrl });
    return NextResponse.json({ success: false, error: "Could not send the report." }, { status: 502 });
  }
}
