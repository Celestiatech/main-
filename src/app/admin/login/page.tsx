import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import LoginClient from './LoginClient';

export default async function LoginPage() {
  const cookieStore = await cookies();
  const isAuthenticated = cookieStore.get('admin_session')?.value === 'authenticated';

  if (isAuthenticated) {
    redirect('/admin/dashboard');
  }

  return <LoginClient />;
}
