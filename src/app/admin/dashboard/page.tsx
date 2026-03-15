import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import DashboardClient from './DashboardClient';

export default async function AdminDashboardPage() {
  const cookieStore = await cookies();
  const isAuthenticated = cookieStore.get('admin_session')?.value === 'authenticated';

  if (!isAuthenticated) {
    redirect('/admin/login');
  }

  return <DashboardClient />;
}
