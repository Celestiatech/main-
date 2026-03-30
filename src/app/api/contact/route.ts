import { NextRequest, NextResponse } from 'next/server';
import { addMessage } from '@/lib/messages';

export async function POST(request: NextRequest) {
  try {
    const { name, email, phone, company, projectType, budget, message } = await request.json();

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, error: 'Name, email, and message are required' },
        { status: 400 }
      );
    }

    // Save message to database
    const savedMessage = addMessage({
      type: 'contact',
      name,
      email,
      phone,
      company,
      message,
      status: 'new',
      extra: {
        projectType,
        budget,
      },
    });

    return NextResponse.json({ success: true, messageId: savedMessage.id });
  } catch (error) {
    console.error('Contact form save error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to save message' },
      { status: 500 }
    );
  }
}
