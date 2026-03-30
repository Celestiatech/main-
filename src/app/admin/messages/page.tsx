'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Message } from '@/lib/types';
import styles from './messages.module.css';

function MessagesContent() {
  const searchParams = useSearchParams();
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const typeFilter = searchParams.get('type') || '';
  const statusFilter = searchParams.get('status') || '';

  useEffect(() => {
    fetchMessages();
  }, [typeFilter, statusFilter]);

  const fetchMessages = async () => {
    setLoading(true);
    try {
      let url = '/api/admin/messages?';
      if (typeFilter) url += `type=${typeFilter}&`;
      if (statusFilter) url += `status=${statusFilter}&`;

      const response = await fetch(url);
      const data = await response.json();
      if (data.success) {
        setMessages(data.messages);
      }
    } catch (error) {
      console.error('Error fetching messages:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm) {
      fetch(`/api/admin/messages?q=${encodeURIComponent(searchTerm)}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.success) setMessages(data.messages);
        });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this message?')) return;

    try {
      const response = await fetch(`/api/admin/messages/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setMessages(messages.filter((msg) => msg.id !== id));
      }
    } catch (error) {
      console.error('Error deleting message:', error);
    }
  };

  const getTypeColor = (type: string) => {
    return type === 'contact' ? styles.badgeContact : styles.badgeCareer;
  };

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

  const totalCount = messages.length;
  const contactCount = messages.filter((msg) => msg.type === 'contact').length;
  const careerCount = messages.filter((msg) => msg.type === 'career').length;
  const newCount = messages.filter((msg) => msg.status === 'new').length;

  return (
    <div className={styles.page}>
      <div className={styles.wrap}>
        <div className={styles.heroCard}>
          <div className={styles.heroRow}>
            <div>
              <p className={styles.kicker}>Admin Inbox</p>
              <h1 className={styles.title}>Messages</h1>
              <p className={styles.subtitle}>
                View and manage contact leads and career applications with a single command center.
              </p>
            </div>
            <div className={styles.heroActions}>
              <Link
                href="/admin/messages?status=new"
                className={styles.chipNew}
              >
                <span className={styles.dotNew} />
                Review New
              </Link>
              <Link
                href="/admin/messages?status=replied"
                className={styles.chipReplied}
              >
                <span className={styles.dotReplied} />
                View Replied
              </Link>
            </div>
          </div>
        </div>

        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <p className={styles.statLabel}>Total</p>
            <p className={styles.statValue}>{totalCount}</p>
            <p className={styles.statHint}>All submissions received</p>
          </div>
          <div className={`${styles.statCard} ${styles.statContact}`}>
            <p className={styles.statLabel}>Contact</p>
            <p className={styles.statValue}>{contactCount}</p>
            <p className={styles.statHint}>Business inquiries</p>
          </div>
          <div className={`${styles.statCard} ${styles.statCareer}`}>
            <p className={styles.statLabel}>Career</p>
            <p className={styles.statValue}>{careerCount}</p>
            <p className={styles.statHint}>Hiring pipeline</p>
          </div>
          <div className={`${styles.statCard} ${styles.statNew}`}>
            <p className={styles.statLabel}>New</p>
            <p className={styles.statValue}>{newCount}</p>
            <p className={styles.statHint}>Waiting for review</p>
          </div>
        </div>

        <div className={styles.filterCard}>
          <form onSubmit={handleSearch} className={styles.searchRow}>
            <input
              type="text"
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={styles.searchInput}
            />
            <button type="submit" className={styles.searchBtn}>
              Search
            </button>
          </form>

          <div className={styles.filterRow}>
            <Link
              href="/admin/messages"
              className={`${styles.filterChip} ${
                !typeFilter && !statusFilter
                  ? styles.filterChipAllActive
                  : styles.filterChipIdle
              }`}
            >
              All
            </Link>
            <Link
              href="/admin/messages?type=contact"
              className={`${styles.filterChip} ${
                typeFilter === 'contact'
                  ? styles.filterChipContactActive
                  : styles.filterChipIdle
              }`}
            >
              Contact Messages
            </Link>
            <Link
              href="/admin/messages?type=career"
              className={`${styles.filterChip} ${
                typeFilter === 'career'
                  ? styles.filterChipCareerActive
                  : styles.filterChipIdle
              }`}
            >
              Career Applications
            </Link>
            <Link
              href="/admin/messages?status=new"
              className={`${styles.filterChip} ${
                statusFilter === 'new'
                  ? styles.filterChipNewActive
                  : styles.filterChipIdle
              }`}
            >
              New
            </Link>
            <Link
              href="/admin/messages?status=replied"
              className={`${styles.filterChip} ${
                statusFilter === 'replied'
                  ? styles.filterChipRepliedActive
                  : styles.filterChipIdle
              }`}
            >
              Replied
            </Link>
          </div>
        </div>

        {loading ? (
          <div className={styles.emptyState}>
            Loading messages...
          </div>
        ) : messages.length === 0 ? (
          <div className={styles.emptyState}>
            No messages found for this filter.
          </div>
        ) : (
          <div className={styles.tableCard}>
            <div className={styles.tableWrap}>
              <table className={styles.table}>
              <thead>
                <tr>
                  <th>
                    Name
                  </th>
                  <th>
                    Email
                  </th>
                  <th>
                    Type
                  </th>
                  <th>
                    Status
                  </th>
                  <th>
                    Date
                  </th>
                  <th>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {messages.map((message) => (
                  <tr key={message.id}>
                    <td>{message.name}</td>
                    <td>{message.email}</td>
                    <td>
                      <span className={`${styles.badge} ${getTypeColor(message.type)}`}>
                        {message.type === 'contact' ? 'Contact' : 'Career'}
                      </span>
                    </td>
                    <td>
                      <span className={`${styles.badge} ${getStatusColor(message.status)}`}>
                        {message.status.charAt(0).toUpperCase() + message.status.slice(1)}
                      </span>
                    </td>
                    <td>{new Date(message.createdAt).toLocaleDateString()}</td>
                    <td>
                      <div className={styles.actionRow}>
                        <Link
                          href={`/admin/messages/${message.id}`}
                          className={styles.viewBtn}
                        >
                          View
                        </Link>
                        <button
                          onClick={() => handleDelete(message.id)}
                          className={styles.deleteBtn}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      </div>
    </div>
  );
}

export default function MessagesPage() {
  return (
    <Suspense fallback={<div className={styles.suspense}>Loading...</div>}>
      <MessagesContent />
    </Suspense>
  );
}
