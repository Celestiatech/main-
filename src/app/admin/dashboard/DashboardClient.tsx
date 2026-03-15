'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { DashboardStats } from '@/lib/types';
import styles from './dashboard.module.css';

export default function DashboardClient() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [cssDebug, setCssDebug] = useState(false);
  const [debugInfo, setDebugInfo] = useState<Record<string, string>>({});
  const dashboardRef = useRef<HTMLDivElement | null>(null);
  const heroRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    fetchStats();
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const params = new URLSearchParams(window.location.search);
    setCssDebug(params.get('cssDebug') === '1');
  }, []);

  useEffect(() => {
    if (!cssDebug) return;

    const dashboardStyle = dashboardRef.current
      ? window.getComputedStyle(dashboardRef.current)
      : null;
    const heroStyle = heroRef.current ? window.getComputedStyle(heroRef.current) : null;

    setDebugInfo({
      dashboardClass: styles.dashboard || 'missing',
      heroClass: styles.hero || 'missing',
      kpiCardClass: styles.kpiCard || 'missing',
      dashboardBackground: dashboardStyle?.background || 'n/a',
      dashboardPadding: dashboardStyle?.padding || 'n/a',
      heroBorderRadius: heroStyle?.borderRadius || 'n/a',
      heroDisplay: heroStyle?.display || 'n/a',
    });

    console.log('Dashboard CSS Debug', {
      classes: {
        dashboard: styles.dashboard,
        hero: styles.hero,
        kpiCard: styles.kpiCard,
      },
      computed: {
        dashboardBackground: dashboardStyle?.background,
        dashboardPadding: dashboardStyle?.padding,
        heroBorderRadius: heroStyle?.borderRadius,
        heroDisplay: heroStyle?.display,
      },
    });
  }, [cssDebug, stats]);

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/admin/stats');
      const data = await response.json();
      if (data.success) {
        setStats(data.stats);
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className={styles.status}>Loading...</div>;
  }

  if (!stats) {
    return <div className={styles.status}>Failed to load stats</div>;
  }

  const responseRate = stats.totalMessages
    ? Math.round((stats.repliedMessages / stats.totalMessages) * 100)
    : 0;
  const newRate = stats.totalMessages
    ? Math.round((stats.newMessages / stats.totalMessages) * 100)
    : 0;

  const maxMetric = Math.max(
    stats.totalMessages,
    stats.newMessages,
    stats.contactMessages,
    stats.careerMessages,
    stats.repliedMessages,
    1
  );

  const statCards = [
    {
      title: 'Total Messages',
      value: stats.totalMessages,
      tone: 'toneBlue',
      hint: 'All submissions received',
      icon: 'IN',
    },
    {
      title: 'New Messages',
      value: stats.newMessages,
      tone: 'toneNavy',
      hint: `${newRate}% waiting for review`,
      icon: 'NW',
    },
    {
      title: 'Contact Leads',
      value: stats.contactMessages,
      tone: 'toneSky',
      hint: 'Business inquiries',
      icon: 'CT',
    },
    {
      title: 'Career Applications',
      value: stats.careerMessages,
      tone: 'toneInk',
      hint: 'Hiring pipeline',
      icon: 'CR',
    },
    {
      title: 'Replied',
      value: stats.repliedMessages,
      tone: 'toneRoyal',
      hint: `${responseRate}% response rate`,
      icon: 'RP',
    },
  ];

  return (
    <div className={styles.dashboard} ref={dashboardRef}>
      {cssDebug && (
        <section
          style={{
            marginBottom: '12px',
            border: '1px dashed #2563eb',
            background: '#ffffff',
            borderRadius: '12px',
            padding: '12px',
            fontSize: '12px',
            color: '#0f172a',
          }}
        >
          <strong style={{ display: 'block', marginBottom: '6px' }}>CSS Debug Mode Enabled</strong>
          <p style={{ margin: 0, marginBottom: '8px' }}>
            Open with <code>?cssDebug=1</code> to inspect module classes and computed values.
          </p>
          <pre style={{ margin: 0, whiteSpace: 'pre-wrap' }}>{JSON.stringify(debugInfo, null, 2)}</pre>
        </section>
      )}

      <section className={styles.hero} ref={heroRef}>
        <div>
          <p className={styles.overline}>Admin Workspace</p>
          <h1>Message Operations Dashboard</h1>
          <p className={styles.subtitle}>
            Track contact leads, career applications, and response health from one modern control center.
          </p>
        </div>
        <div className={styles.heroMeta}>
          <p>
            Last synced
            <span>{new Date(stats.lastUpdated).toLocaleString()}</span>
          </p>
          <button type="button" onClick={fetchStats} className={styles.refreshBtn}>
            Refresh Data
          </button>
        </div>
      </section>

      <section className={styles.kpiGrid}>
        {statCards.map((card) => (
          <article key={card.title} className={`${styles.kpiCard} ${styles[card.tone]}`}>
            <div className={styles.kpiTop}>
              <p>{card.title}</p>
              <span>{card.icon}</span>
            </div>
            <h2>{card.value}</h2>
            <small>{card.hint}</small>
            <div className={styles.progressTrack}>
              <span style={{ width: `${Math.max(8, Math.round((card.value / maxMetric) * 100))}%` }} />
            </div>
          </article>
        ))}
      </section>

      <section className={styles.grid}>
        <article className={styles.panel}>
          <div className={styles.panelHead}>
            <h3>Message Funnel</h3>
            <p>Where your pipeline stands right now</p>
          </div>
          <div className={styles.funnelRow}>
            <span>New Queue</span>
            <strong>{stats.newMessages}</strong>
          </div>
          <div className={styles.funnelRow}>
            <span>Reviewed / Active</span>
            <strong>{Math.max(0, stats.totalMessages - stats.newMessages - stats.repliedMessages)}</strong>
          </div>
          <div className={styles.funnelRow}>
            <span>Completed Replies</span>
            <strong>{stats.repliedMessages}</strong>
          </div>
          <div className={styles.rateCard}>
            <p>Response performance</p>
            <h4>{responseRate}%</h4>
            <span>based on replied vs total messages</span>
          </div>
        </article>

        <article className={styles.panel}>
          <div className={styles.panelHead}>
            <h3>Quick Actions</h3>
            <p>Common tasks for your team</p>
          </div>
          <div className={styles.actionGrid}>
            <Link href="/admin/messages" className={styles.actionBtn}>Open All Messages</Link>
            <Link href="/admin/messages?status=new" className={styles.actionBtn}>Review New Queue</Link>
            <Link href="/admin/messages?type=contact" className={styles.actionBtn}>Contact Leads</Link>
            <Link href="/admin/messages?type=career" className={styles.actionBtn}>Career Applications</Link>
          </div>
        </article>

        <article className={`${styles.panel} ${styles.wide}`}>
          <div className={styles.panelHead}>
            <h3>Distribution</h3>
            <p>Traffic split by message source</p>
          </div>
          <div className={styles.meterWrap}>
            <div className={styles.meterLabel}>
              <span>Contact Messages</span>
              <strong>{stats.contactMessages}</strong>
            </div>
            <div className={styles.meter}><span style={{ width: `${stats.totalMessages ? Math.round((stats.contactMessages / stats.totalMessages) * 100) : 0}%` }} /></div>
          </div>
          <div className={styles.meterWrap}>
            <div className={styles.meterLabel}>
              <span>Career Applications</span>
              <strong>{stats.careerMessages}</strong>
            </div>
            <div className={styles.meter}><span style={{ width: `${stats.totalMessages ? Math.round((stats.careerMessages / stats.totalMessages) * 100) : 0}%` }} /></div>
          </div>
        </article>
      </section>

      <section className={styles.footerNote}>
        <h4>Operational Note</h4>
        <p>
          Keep the new queue under 20% of total volume for faster first-response time and better lead conversion.
        </p>
      </section>
    </div>
  );
}
