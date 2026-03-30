// Simple auth utilities for admin dashboard
import { cookies } from 'next/headers';

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123'; // Change this in .env

export async function setAuthCookie() {
  const cookieStore = await cookies();
  cookieStore.set('admin_session', 'authenticated', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 7 * 24 * 60 * 60, // 7 days
  });
}

export async function clearAuthCookie() {
  const cookieStore = await cookies();
  cookieStore.delete('admin_session');
}

export async function isAuthenticated() {
  const cookieStore = await cookies();
  return cookieStore.has('admin_session');
}

export function validatePassword(password: string): boolean {
  return password === ADMIN_PASSWORD;
}
