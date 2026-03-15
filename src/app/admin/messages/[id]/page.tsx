'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Message } from '@/lib/types';

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
    return <div className="text-center py-12">Loading...</div>;
  }

  if (!message) {
    return (
      <div className="text-center py-12">
        <p className="text-red-400 mb-4">Message not found</p>
        <Link
          href="/admin/messages"
          className="inline-block px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition font-medium"
        >
          Back to Messages
        </Link>
      </div>
    );
  }

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
      <div className="mb-8 flex justify-between items-start">
        <div>
          <Link
            href="/admin/messages"
            className="text-blue-400 hover:text-blue-300 mb-4 inline-block"
          >
            ← Back to Messages
          </Link>
          <h1 className="text-3xl font-bold text-white mb-2">Message Details</h1>
          <p className="text-gray-400">ID: {message.id}</p>
        </div>
        <button
          onClick={deleteMessage}
          className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition font-medium"
        >
          Delete
        </button>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-3 gap-6 mb-8">
        {/* Left Column - Message Info */}
        <div className="col-span-2 space-y-6">
          {/* Contact Information */}
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h2 className="text-lg font-bold text-white mb-4">Contact Information</h2>
            <div className="space-y-4">
              <div>
                <p className="text-gray-400 text-sm">Name</p>
                <p className="text-white text-lg font-semibold">{message.name}</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Email</p>
                <a
                  href={`mailto:${message.email}`}
                  className="text-blue-400 hover:text-blue-300 font-semibold"
                >
                  {message.email}
                </a>
              </div>
              {message.phone && (
                <div>
                  <p className="text-gray-400 text-sm">Phone</p>
                  <a
                    href={`tel:${message.phone}`}
                    className="text-blue-400 hover:text-blue-300 font-semibold"
                  >
                    {message.phone}
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Message Details */}
          {message.extra && Object.keys(message.extra).length > 0 && (
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <h2 className="text-lg font-bold text-white mb-4">Additional Details</h2>
              <div className="grid grid-cols-2 gap-4">
                {message.extra.company && (
                  <div>
                    <p className="text-gray-400 text-sm">Company</p>
                    <p className="text-white font-semibold">{message.extra.company}</p>
                  </div>
                )}
                {message.extra.projectType && (
                  <div>
                    <p className="text-gray-400 text-sm">Project Type</p>
                    <p className="text-white font-semibold">{message.extra.projectType}</p>
                  </div>
                )}
                {message.extra.budget && (
                  <div>
                    <p className="text-gray-400 text-sm">Budget Range</p>
                    <p className="text-white font-semibold">{message.extra.budget}</p>
                  </div>
                )}
                {message.extra.position && (
                  <div>
                    <p className="text-gray-400 text-sm">Position Applied</p>
                    <p className="text-white font-semibold">{message.extra.position}</p>
                  </div>
                )}
                {message.extra.experience && (
                  <div>
                    <p className="text-gray-400 text-sm">Experience</p>
                    <p className="text-white font-semibold">{message.extra.experience}</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Message Content */}
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h2 className="text-lg font-bold text-white mb-4">Message</h2>
            <div className="bg-gray-700 rounded p-4">
              <p className="text-gray-300 whitespace-pre-wrap">{message.message}</p>
            </div>
          </div>

          {/* Timestamps */}
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h2 className="text-lg font-bold text-white mb-4">Timeline</h2>
            <div className="space-y-2 text-sm text-gray-400">
              <p>
                <span className="text-gray-300">Received:</span> {new Date(message.createdAt).toLocaleString()}
              </p>
              <p>
                <span className="text-gray-300">Last Updated:</span> {new Date(message.updatedAt).toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        {/* Right Column - Status and Actions */}
        <div>
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 sticky top-8">
            <h2 className="text-lg font-bold text-white mb-4">Status</h2>

            {/* Current Status */}
            <div className="mb-6">
              <span
                className={`inline-px-4 py-2 rounded-full text-sm font-medium ${getStatusColor(
                  message.status
                )}`}
              >
                {message.status.charAt(0).toUpperCase() + message.status.slice(1)}
              </span>
            </div>

            {/* Status Buttons */}
            <div className="space-y-2 mb-6">
              <button
                onClick={() => updateStatus('new')}
                disabled={statusUpdating || message.status === 'new'}
                className="w-full px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 text-white rounded transition text-sm font-medium"
              >
                Mark as New
              </button>
              <button
                onClick={() => updateStatus('read')}
                disabled={statusUpdating || message.status === 'read'}
                className="w-full px-4 py-2 bg-yellow-600 hover:bg-yellow-700 disabled:bg-gray-600 text-white rounded transition text-sm font-medium"
              >
                Mark as Read
              </button>
              <button
                onClick={() => updateStatus('replied')}
                disabled={statusUpdating || message.status === 'replied'}
                className="w-full px-4 py-2 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 text-white rounded transition text-sm font-medium"
              >
                Mark as Replied
              </button>
            </div>

            {/* Message Type and Actions */}
            <div className="space-y-2">
              <a
                href={`mailto:${message.email}`}
                className="w-full block text-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition text-sm font-medium"
              >
                Send Email
              </a>
              <a
                href={`mailto:${message.email}?subject=Re: Your Message`}
                className="w-full block text-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded transition text-sm font-medium"
              >
                Reply
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
