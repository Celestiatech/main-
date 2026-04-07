import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import LoginClient from './LoginClient';
import { generateMetadata } from '@/lib/metadata';

export const metadata: Metadata = generateMetadata({
  title: 'Admin Login',
  description: 'Secure admin login for Celestiatech.',
  path: '/admin/login',
  noIndex: true,
});

export default async function LoginPage() {
  const cookieStore = await cookies();
  const isAuthenticated = cookieStore.get('admin_session')?.value === 'authenticated';

  if (isAuthenticated) {
    redirect('/admin/dashboard');
  }

  return <LoginClient />;
}
