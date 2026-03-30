import { NextRequest, NextResponse } from 'next/server';
import { addMessage } from '@/lib/messages';

export async function POST(request: NextRequest) {
  try {
    const { name, email, phone, position, experience, message } = await request.json();

    // Validate required fields
    if (!name || !email || !phone || !position || !message) {
      return NextResponse.json(
        { success: false, error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Save application to database
    const savedMessage = addMessage({
      type: 'career',
      name,
      email,
      phone,
      message,
      status: 'new',
      extra: {
        position,
        experience,
      },
    });

    return NextResponse.json({ success: true, messageId: savedMessage.id });
  } catch (error) {
    console.error('Career application error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to save application' },
      { status: 500 }
    );
  }
}
