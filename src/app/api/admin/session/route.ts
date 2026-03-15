import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const session = request.cookies.get('admin_session')?.value;
  const authenticated = session === 'authenticated';

  return NextResponse.json({ success: true, authenticated });
}
