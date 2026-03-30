import { NextRequest, NextResponse } from 'next/server';
import { sendOutreachEmail } from '@/lib/email';

export async function POST(request: NextRequest) {
  try {
    const { to, subject, senderName, body } = await request.json();

    if (!to || !subject || !body) {
      return NextResponse.json(
        { success: false, error: 'Recipient email, subject, and body are required' },
        { status: 400 }
      );
    }

    const emailRegex = /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(to)) {
      return NextResponse.json(
        { success: false, error: 'Invalid recipient email address' },
        { status: 400 }
      );
    }

    const resolvedSenderName =
      typeof senderName === 'string' && senderName.trim() ? senderName.trim() : 'Celestiatech';

    await sendOutreachEmail({
      to,
      subject,
      senderName: resolvedSenderName,
      body,
    });

    return NextResponse.json({ success: true, message: 'Outreach email sent successfully' });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to send email';
    console.error('Outreach email error:', error);
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
