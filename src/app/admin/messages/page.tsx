'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Message } from '@/lib/types';

function MessagesContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
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
    return type === 'contact'
      ? 'bg-blue-100 text-blue-800'
      : 'bg-orange-100 text-orange-800';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new':
        return 'bg-green-100 text-green-800';
      case 'read':
        return 'bg-yellow-100 text-yellow-800';
      case 'replied':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Messages</h1>
        <p className="text-gray-400">View and manage all contact and career messages</p>
      </div>

      {/* Search and Filters */}
      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 mb-6">
        <form onSubmit={handleSearch} className="flex gap-4 mb-4">
          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 px-4 py-2 bg-gray-700 text-white rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition font-medium"
          >
            Search
          </button>
        </form>

        <div className="flex gap-4 flex-wrap">
          <Link
            href="/admin/messages"
            className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
              !typeFilter && !statusFilter
                ? 'bg-blue-600 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            All
          </Link>
          <Link
            href="/admin/messages?type=contact"
            className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
              typeFilter === 'contact'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            Contact Messages
          </Link>
          <Link
            href="/admin/messages?type=career"
            className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
              typeFilter === 'career'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            Career Applications
          </Link>
          <Link
            href="/admin/messages?status=new"
            className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
              statusFilter === 'new'
                ? 'bg-green-600 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            New
          </Link>
          <Link
            href="/admin/messages?status=replied"
            className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
              statusFilter === 'replied'
                ? 'bg-purple-600 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            Replied
          </Link>
        </div>
      </div>

      {/* Messages Table */}
      {loading ? (
        <div className="text-center py-12 text-gray-400">Loading...</div>
      ) : messages.length === 0 ? (
        <div className="text-center py-12 text-gray-400">No messages found</div>
      ) : (
        <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-700 bg-gray-900">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">
                    Name
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">
                    Email
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">
                    Type
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">
                    Date
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {messages.map((message) => (
                  <tr
                    key={message.id}
                    className="border-b border-gray-700 hover:bg-gray-700 transition"
                  >
                    <td className="px-6 py-4 text-sm text-white font-medium">{message.name}</td>
                    <td className="px-6 py-4 text-sm text-gray-300">{message.email}</td>
                    <td className="px-6 py-4 text-sm">
                      <span
                        className={`inline-px-3 py-1 rounded-full text-xs font-medium ${getTypeColor(
                          message.type
                        )}`}
                      >
                        {message.type === 'contact' ? '📧 Contact' : '👔 Career'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <span
                        className={`inline-px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                          message.status
                        )}`}
                      >
                        {message.status.charAt(0).toUpperCase() + message.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-400">
                      {new Date(message.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <div className="flex gap-2">
                        <Link
                          href={`/admin/messages/${message.id}`}
                          className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded text-xs font-medium transition"
                        >
                          View
                        </Link>
                        <button
                          onClick={() => handleDelete(message.id)}
                          className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded text-xs font-medium transition"
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
  );
}

export default function MessagesPage() {
  return (
    <Suspense fallback={<div className="text-center py-12">Loading...</div>}>
      <MessagesContent />
    </Suspense>
  );
}
