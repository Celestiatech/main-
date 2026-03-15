'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { ReactNode } from 'react';
import styles from './admin-layout.module.css';

export default function AdminLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [loggingOut, setLoggingOut] = useState(false);
  const [authChecking, setAuthChecking] = useState(true);

  // Render login as a standalone page without admin chrome.
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  useEffect(() => {
    const checkSession = async () => {
      try {
        const res = await fetch('/api/admin/session', { cache: 'no-store' });
        const data = await res.json();
        if (!data.authenticated) {
          router.replace('/admin/login');
          return;
        }
      } catch (error) {
        router.replace('/admin/login');
        return;
      } finally {
        setAuthChecking(false);
      }
    };

    checkSession();
  }, [router]);

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      await fetch('/api/admin/logout', { method: 'POST' });
      router.push('/admin/login');
    } catch (error) {
      console.error('Logout error:', error);
      setLoggingOut(false);
    }
  };

  if (authChecking) {
    return <div className={styles.loading}>Checking session...</div>;
  }

  return (
    <div className={styles.shell}>
      {/* Sidebar */}
      <div className={styles.sidebar}>
        <div className={styles.brand}>
          <h1>Admin Dashboard</h1>
          <p>Message Management</p>
        </div>

        <nav className={styles.nav}>
          <Link
            href="/admin/dashboard"
            className={styles.navLink}
          >
            📊 Dashboard
          </Link>
          <Link
            href="/admin/messages?type=contact"
            className={styles.navLink}
          >
            📧 Contact Messages
          </Link>
          <Link
            href="/admin/messages?type=career"
            className={styles.navLink}
          >
            👔 Career Applications
          </Link>
          <Link
            href="/admin/messages"
            className={styles.navLink}
          >
            📋 All Messages
          </Link>
        </nav>

        <div className={styles.bottom}>
          <Link
            href="/"
            className={styles.backLink}
          >
            ← Back to Site
          </Link>
          <button
            onClick={handleLogout}
            disabled={loggingOut}
            className={styles.logout}
          >
            🚪 {loggingOut ? 'Logging out...' : 'Logout'}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className={styles.main}>
        <header className={styles.header}>
          <h2>Welcome to Admin Panel</h2>
          <p>Manage all messages and applications</p>
        </header>
        <main className={styles.content}>{children}</main>
      </div>
    </div>
  );
}
