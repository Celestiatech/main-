import { NextRequest, NextResponse } from 'next/server';
import { getAllMessages, searchMessages, getMessagesByType } from '@/lib/messages';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get('q');
    const type = searchParams.get('type') as 'contact' | 'career' | null;
    const status = searchParams.get('status');

    let messages = query ? searchMessages(query) : getAllMessages();

    // Filter by type
    if (type) {
      messages = messages.filter((msg) => msg.type === type);
    }

    // Filter by status
    if (status) {
      messages = messages.filter((msg) => msg.status === status);
    }

    // Sort by date (newest first)
    messages.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    return NextResponse.json({ success: true, messages });
  } catch (error) {
    console.error('Error fetching messages:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch messages' },
      { status: 500 }
    );
  }
}
