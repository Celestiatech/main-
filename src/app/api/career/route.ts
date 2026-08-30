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

  const { name, email, phone, position, experience, message } = payload;

  // Validate required fields
  if (!name || !email || !phone || !position || !message) {
    return NextResponse.json(
      { success: false, error: 'All fields are required' },
      { status: 400 }
    );
  }

  try {
    await sendSubmissionEmail({
      subject: `New job application: ${position} - ${name}`,
      heading: 'New job application',
      replyTo: email,
      message,
      fields: [
        { label: 'Name', value: name },
        { label: 'Email', value: email },
        { label: 'Phone', value: phone },
        { label: 'Position', value: position },
        { label: 'Experience', value: experience },
      ],
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    // Nothing is persisted, so log the application to avoid losing the candidate.
    console.error('Career application email failed:', error, { name, email, phone, position, experience, message });
    return NextResponse.json(
      { success: false, error: 'Failed to send application' },
      { status: 500 }
    );
  }
}
