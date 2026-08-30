import { NextRequest, NextResponse } from 'next/server';
import { sendSubmissionEmail } from '@/lib/email';

export async function POST(request: NextRequest) {
  const payload = await request.json().catch(() => null);

  if (!payload) {
    return NextResponse.json(
      { success: false, error: 'Invalid request body' },
      { status: 400 }
    );
  }

  const { name, email, phone, company, projectType, budget, message } = payload;

  // Validate required fields
  if (!name || !email || !message) {
    return NextResponse.json(
      { success: false, error: 'Name, email, and message are required' },
      { status: 400 }
    );
  }

  try {
    await sendSubmissionEmail({
      subject: `New contact enquiry from ${name}`,
      heading: 'New contact enquiry',
      replyTo: email,
      message,
      fields: [
        { label: 'Name', value: name },
        { label: 'Email', value: email },
        { label: 'Phone', value: phone },
        { label: 'Company', value: company },
        { label: 'Project type', value: projectType },
        { label: 'Budget', value: budget },
      ],
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    // Nothing is persisted, so log the submission to avoid losing the lead.
    console.error('Contact form email failed:', error, { name, email, phone, company, projectType, budget, message });
    return NextResponse.json(
      { success: false, error: 'Failed to send message' },
      { status: 500 }
    );
  }
}
