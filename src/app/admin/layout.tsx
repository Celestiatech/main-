'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { ReactNode } from 'react';
import styles from './admin-layout.module.css';

const fallback = {
  shell: {
    minHeight: '100vh',
    display: 'flex',
    background: '#ffffff',
    color: '#000000',
  } as const,
  sidebar: {
    position: 'fixed',
    left: 0,
    top: 0,
    height: '100vh',
    width: '260px',
    display: 'flex',
    flexDirection: 'column',
    padding: '1.5rem',
    background: '#ffffff',
    borderRight: '1px solid #dbeafe',
    boxShadow: '0 10px 30px rgba(30, 58, 138, 0.08)',
  } as const,
  nav: {
    display: 'grid',
    gap: '0.55rem',
    flex: 1,
  } as const,
  navLink: {
    display: 'block',
    color: '#111827',
    textDecoration: 'none',
    border: '1px solid #dbeafe',
    background: '#f8fbff',
    padding: '0.62rem 0.72rem',
    borderRadius: '10px',
  } as const,
  bottom: {
    paddingTop: '1rem',
    borderTop: '1px solid #e5e7eb',
    display: 'grid',
    gap: '0.4rem',
  } as const,
  backLink: {
    color: '#1e3a8a',
    textDecoration: 'none',
    fontSize: '0.9rem',
  } as const,
  logout: {
    textAlign: 'left',
    color: '#b91c1c',
    border: 'none',
    background: 'transparent',
    cursor: 'pointer',
    padding: '0.25rem 0',
    fontSize: '0.9rem',
  } as const,
  main: {
    marginLeft: '260px',
    flex: 1,
    minWidth: 0,
  } as const,
  header: {
    borderBottom: '1px solid #dbeafe',
    background: '#f8fbff',
    padding: '1rem 1.5rem',
  } as const,
  content: {
    padding: '1.5rem',
  } as const,
};

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
    <div className={styles.shell} style={fallback.shell}>
      {/* Sidebar */}
      <div className={styles.sidebar} style={fallback.sidebar}>
        <div className={styles.brand}>
          <h1>Admin Dashboard</h1>
          <p>Message Management</p>
        </div>

        <nav className={styles.nav} style={fallback.nav}>
          <Link
            href="/admin/dashboard"
            className={styles.navLink}
            style={fallback.navLink}
          >
            📊 Dashboard
          </Link>
          <Link
            href="/admin/messages?type=contact"
            className={styles.navLink}
            style={fallback.navLink}
          >
            📧 Contact Messages
          </Link>
          <Link
            href="/admin/messages?type=career"
            className={styles.navLink}
            style={fallback.navLink}
          >
            👔 Career Applications
          </Link>
          <Link
            href="/admin/messages"
            className={styles.navLink}
            style={fallback.navLink}
          >
            📋 All Messages
          </Link>
          <Link
            href="/admin/outreach"
            className={styles.navLink}
            style={fallback.navLink}
          >
            ✉️ Outreach Email
          </Link>
        </nav>

        <div className={styles.bottom} style={fallback.bottom}>
          <Link
            href="/"
            className={styles.backLink}
            style={fallback.backLink}
          >
            ← Back to Site
          </Link>
          <button
            onClick={handleLogout}
            disabled={loggingOut}
            className={styles.logout}
            style={fallback.logout}
          >
            🚪 {loggingOut ? 'Logging out...' : 'Logout'}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className={styles.main} style={fallback.main}>
        <header className={styles.header} style={fallback.header}>
          <h2>Welcome to Admin Panel</h2>
          <p>Manage all messages and applications</p>
        </header>
        <main className={styles.content} style={fallback.content}>{children}</main>
      </div>
    </div>
  );
}
