'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from './login.module.css';

export default function LoginClient() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      const data = await response.json();

      if (data.success) {
        router.push('/admin/dashboard');
      } else {
        setError(data.error || 'Invalid password');
      }
    } catch (err) {
      setError('Login failed. Please try again.');
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.loginPage}>
      <div className={styles.shell}>
        <section className={styles.brandPanel}>
          <div>
            <div className={styles.badge}>Celestiatech Admin</div>
            <h1 className={styles.brandTitle}>Secure Access to Message Operations</h1>
            <p className={styles.brandCopy}>
              Review contact leads and career applications in one private workspace.
              Use your admin password to continue.
            </p>
            <ul className={styles.featureList}>
              <li className={styles.featureItem}><span className={styles.dot} />Contact lead inbox</li>
              <li className={styles.featureItem}><span className={styles.dot} />Career application queue</li>
              <li className={styles.featureItem}><span className={styles.dot} />Status and follow-up tracking</li>
            </ul>
          </div>
          <p className={styles.brandFooter}>Protected by session cookies and environment-based credentials.</p>
        </section>

        <section className={styles.formPanel}>
          <div className={styles.formHeader}>
            <h2 className={styles.formTitle}>Sign In to Dashboard</h2>
            <p className={styles.formSubtitle}>Only authorized team members can access this area.</p>
          </div>

          {error && <div className={styles.errorBox}>{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className={styles.inputWrap}>
              <label htmlFor="password" className={styles.label}>
                Admin Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                disabled={loading}
                className={styles.input}
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading || !password}
              className={styles.submit}
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <div className={styles.bottomRow}>
            <p className={styles.helper}>Tip: Set `ADMIN_PASSWORD` in `.env.local`.</p>
            <Link href="/" className={styles.backLink}>
              Back to website
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
