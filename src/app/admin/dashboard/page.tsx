import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import DashboardClient from './DashboardClient';
import { generateMetadata } from '@/lib/metadata';

export const metadata: Metadata = generateMetadata({
  title: 'Admin Dashboard',
  description: 'Internal dashboard for Celestiatech administrators.',
  path: '/admin/dashboard',
  noIndex: true,
});

export default async function AdminDashboardPage() {
  const cookieStore = await cookies();
  const isAuthenticated = cookieStore.get('admin_session')?.value === 'authenticated';

  if (!isAuthenticated) {
    redirect('/admin/login');
  }

  return <DashboardClient />;
}
