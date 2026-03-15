import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const hasAuthCookie = request.cookies.has('admin_session');

  // Protect admin routes (except login and APIs)
  if (pathname.startsWith('/admin') && !pathname.includes('/api')) {
    // If user is already logged in, don't show login page again.
    if (pathname === '/admin/login') {
      if (hasAuthCookie) {
        return NextResponse.redirect(new URL('/admin/dashboard', request.url));
      }
      return NextResponse.next();
    }

    // Check for auth cookie on other admin pages
    if (!hasAuthCookie) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
