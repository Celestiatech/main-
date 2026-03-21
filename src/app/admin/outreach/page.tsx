'use client';

import { useState } from 'react';
import styles from './outreach.module.css';

interface OutreachForm {
  to: string;
  subject: string;
  senderName: string;
  body: string;
}

const defaultForm: OutreachForm = {
  to: '',
  subject: '',
  senderName: 'Celestiatech',
  body: '',
};

export default function OutreachPage() {
  const [form, setForm] = useState<OutreachForm>(defaultForm);
  const [sending, setSending] = useState(false);
  const [result, setResult] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (result) setResult(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setResult(null);

    try {
      const response = await fetch('/api/admin/outreach', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (data.success) {
        setResult({ type: 'success', message: `Outreach email sent successfully to ${form.to}.` });
        setForm(defaultForm);
      } else {
        setResult({ type: 'error', message: data.error || 'Failed to send email.' });
      }
    } catch {
      setResult({ type: 'error', message: 'Network error. Please try again.' });
    } finally {
      setSending(false);
    }
  };

  const handleReset = () => {
    setForm(defaultForm);
    setResult(null);
  };

  const hasPreview = form.to || form.subject || form.body;

  return (
    <div className={styles.page}>
      <div className={styles.wrap}>
        <div className={styles.heroCard}>
          <p className={styles.kicker}>Admin Tools</p>
          <h1 className={styles.title}>Outreach Email</h1>
          <p className={styles.subtitle}>
            Compose and send professional outreach emails to prospects, clients, or partners
            directly from the admin panel.
          </p>
        </div>

        {result && (
          <div className={result.type === 'success' ? styles.alertSuccess : styles.alertError}>
            {result.message}
          </div>
        )}

        <div className={styles.formCard}>
          <h2 className={styles.formTitle}>Compose Outreach Email</h2>
          <form onSubmit={handleSubmit} className={styles.formGrid}>
            <div className={styles.fieldGroup}>
              <label htmlFor="to" className={styles.label}>
                Recipient Email
              </label>
              <input
                id="to"
                type="email"
                name="to"
                value={form.to}
                onChange={handleChange}
                placeholder="recipient@example.com"
                required
                className={styles.input}
              />
            </div>

            <div className={styles.fieldGroup}>
              <label htmlFor="subject" className={styles.label}>
                Subject
              </label>
              <input
                id="subject"
                type="text"
                name="subject"
                value={form.subject}
                onChange={handleChange}
                placeholder="e.g. Partnering with Celestiatech"
                required
                className={styles.input}
              />
            </div>

            <div className={styles.fieldGroup}>
              <label htmlFor="senderName" className={styles.label}>
                Sender Name
              </label>
              <input
                id="senderName"
                type="text"
                name="senderName"
                value={form.senderName}
                onChange={handleChange}
                placeholder="Your name or team name"
                className={styles.input}
              />
            </div>

            <div className={styles.fieldGroup}>
              <label htmlFor="body" className={styles.label}>
                Message
              </label>
              <textarea
                id="body"
                name="body"
                value={form.body}
                onChange={handleChange}
                placeholder="Write your outreach message here..."
                required
                className={styles.textarea}
              />
            </div>

            <div className={styles.actions}>
              <button type="button" onClick={handleReset} className={styles.resetBtn}>
                Clear
              </button>
              <button type="submit" disabled={sending} className={styles.submitBtn}>
                {sending ? 'Sending...' : 'Send Email'}
              </button>
            </div>
          </form>
        </div>

        {hasPreview && (
          <div className={styles.previewCard}>
            <div className={styles.previewHeader}>
              <p className={styles.previewHeaderText}>Email Preview</p>
              <span className={styles.previewBadge}>Preview</span>
            </div>
            <div className={styles.previewBody}>
              <div className={styles.previewMeta}>
                <div className={styles.previewMetaRow}>
                  <span className={styles.previewMetaLabel}>To:</span>
                  <span className={styles.previewMetaValue}>{form.to || '—'}</span>
                </div>
                <div className={styles.previewMetaRow}>
                  <span className={styles.previewMetaLabel}>Subject:</span>
                  <span className={styles.previewMetaValue}>{form.subject || '—'}</span>
                </div>
                <div className={styles.previewMetaRow}>
                  <span className={styles.previewMetaLabel}>From:</span>
                  <span className={styles.previewMetaValue}>{form.senderName || 'Celestiatech'}</span>
                </div>
              </div>
              <hr className={styles.previewDivider} />
              <p className={styles.previewMessage}>{form.body || 'Your message will appear here...'}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
