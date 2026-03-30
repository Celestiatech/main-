'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Message } from '@/lib/types';
import styles from './detail.module.css';

export default function MessageDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [message, setMessage] = useState<Message | null>(null);
  const [loading, setLoading] = useState(true);
  const [statusUpdating, setStatusUpdating] = useState(false);
  const messageId = (params.id as string) || '';

  useEffect(() => {
    if (messageId) fetchMessage();
  }, [messageId]);

  const fetchMessage = async () => {
    try {
      const response = await fetch(`/api/admin/messages/${messageId}`);
      const data = await response.json();
      if (data.success) {
        setMessage(data.message);
      }
    } catch (error) {
      console.error('Error fetching message:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (newStatus: 'new' | 'read' | 'replied') => {
    setStatusUpdating(true);
    try {
      const response = await fetch(`/api/admin/messages/${messageId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await response.json();
      if (data.success) {
        setMessage(data.message);
      }
    } catch (error) {
      console.error('Error updating status:', error);
    } finally {
      setStatusUpdating(false);
    }
  };

  const deleteMessage = async () => {
    if (!confirm('Are you sure you want to delete this message?')) return;

    try {
      const response = await fetch(`/api/admin/messages/${messageId}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        router.push('/admin/messages');
      }
    } catch (error) {
      console.error('Error deleting message:', error);
    }
  };

  if (loading) {
    return <div className={styles.state}>Loading...</div>;
  }

  if (!message) {
    return (
      <div className={styles.state}>
        <p className={styles.notFound}>Message not found</p>
        <Link href="/admin/messages" className={styles.primaryBtn}>
          Back to Messages
        </Link>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new':
        return styles.statusNew;
      case 'read':
        return styles.statusRead;
      case 'replied':
        return styles.statusReplied;
      default:
        return styles.statusDefault;
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.topBar}>
        <div>
          <Link href="/admin/messages" className={styles.backLink}>
            ← Back to Messages
          </Link>
          <h1 className={styles.title}>Message Details</h1>
          <p className={styles.idText}>ID: {message.id}</p>
        </div>
        <button onClick={deleteMessage} className={styles.deleteBtnTop}>
          Delete
        </button>
      </div>

      <div className={styles.grid}>
        <div className={styles.leftCol}>
          <div className={styles.card}>
            <h2 className={styles.cardTitle}>Contact Information</h2>
            <div className={styles.stack}>
              <div>
                <p className={styles.label}>Name</p>
                <p className={styles.valueLarge}>{message.name}</p>
              </div>
              <div>
                <p className={styles.label}>Email</p>
                <a href={`mailto:${message.email}`} className={styles.linkText}>
                  {message.email}
                </a>
              </div>
              {message.phone && (
                <div>
                  <p className={styles.label}>Phone</p>
                  <a href={`tel:${message.phone}`} className={styles.linkText}>
                    {message.phone}
                  </a>
                </div>
              )}
            </div>
          </div>

          {message.extra && Object.keys(message.extra).length > 0 && (
            <div className={styles.card}>
              <h2 className={styles.cardTitle}>Additional Details</h2>
              <div className={styles.extraGrid}>
                {message.extra.company && (
                  <div>
                    <p className={styles.label}>Company</p>
                    <p className={styles.value}>{message.extra.company}</p>
                  </div>
                )}
                {message.extra.projectType && (
                  <div>
                    <p className={styles.label}>Project Type</p>
                    <p className={styles.value}>{message.extra.projectType}</p>
                  </div>
                )}
                {message.extra.budget && (
                  <div>
                    <p className={styles.label}>Budget Range</p>
                    <p className={styles.value}>{message.extra.budget}</p>
                  </div>
                )}
                {message.extra.position && (
                  <div>
                    <p className={styles.label}>Position Applied</p>
                    <p className={styles.value}>{message.extra.position}</p>
                  </div>
                )}
                {message.extra.experience && (
                  <div>
                    <p className={styles.label}>Experience</p>
                    <p className={styles.value}>{message.extra.experience}</p>
                  </div>
                )}
              </div>
            </div>
          )}

          <div className={styles.card}>
            <h2 className={styles.cardTitle}>Message</h2>
            <div className={styles.messageBox}>
              <p className={styles.messageText}>{message.message}</p>
            </div>
          </div>

          <div className={styles.card}>
            <h2 className={styles.cardTitle}>Timeline</h2>
            <div className={styles.timeline}>
              <p>
                <span>Received:</span> {new Date(message.createdAt).toLocaleString()}
              </p>
              <p>
                <span>Last Updated:</span> {new Date(message.updatedAt).toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        <div className={styles.rightCol}>
          <div className={styles.stickyCard}>
            <h2 className={styles.cardTitle}>Status</h2>

            <div className={styles.currentStatus}>
              <span className={`${styles.badge} ${getStatusColor(message.status)}`}>
                {message.status.charAt(0).toUpperCase() + message.status.slice(1)}
              </span>
            </div>

            <div className={styles.statusButtons}>
              <button
                onClick={() => updateStatus('new')}
                disabled={statusUpdating || message.status === 'new'}
                className={`${styles.actionBtn} ${styles.btnNew}`}
              >
                Mark as New
              </button>
              <button
                onClick={() => updateStatus('read')}
                disabled={statusUpdating || message.status === 'read'}
                className={`${styles.actionBtn} ${styles.btnRead}`}
              >
                Mark as Read
              </button>
              <button
                onClick={() => updateStatus('replied')}
                disabled={statusUpdating || message.status === 'replied'}
                className={`${styles.actionBtn} ${styles.btnReplied}`}
              >
                Mark as Replied
              </button>
            </div>

            <div className={styles.ctaButtons}>
              <a href={`mailto:${message.email}`} className={`${styles.actionBtn} ${styles.btnEmail}`}>
                Send Email
              </a>
              <a href={`mailto:${message.email}?subject=Re: Your Message`} className={`${styles.actionBtn} ${styles.btnReply}`}>
                Reply
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
