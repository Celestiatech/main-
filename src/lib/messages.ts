import fs from 'fs';
import path from 'path';
import Database from 'better-sqlite3';
import { Message, DashboardStats, MessageStatus } from './types';

const DB_FILE = path.join(process.cwd(), 'data', 'messages.db');

type MessageRow = {
  id: string;
  type: 'contact' | 'career';
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  message: string;
  status: MessageStatus;
  createdAt: string;
  updatedAt: string;
  projectType: string | null;
  budget: string | null;
  position: string | null;
  experience: string | null;
};

// Ensure data directory exists
export function ensureDataDir() {
  const dataDir = path.dirname(DB_FILE);
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
}

let db: Database.Database | null = null;

function getDb() {
  if (db) return db;

  ensureDataDir();
  db = new Database(DB_FILE);
  db.pragma('journal_mode = WAL');

  db.exec(`
    CREATE TABLE IF NOT EXISTS messages (
      id TEXT PRIMARY KEY,
      type TEXT NOT NULL,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT,
      company TEXT,
      message TEXT NOT NULL,
      status TEXT NOT NULL,
      createdAt TEXT NOT NULL,
      updatedAt TEXT NOT NULL,
      projectType TEXT,
      budget TEXT,
      position TEXT,
      experience TEXT
    );
  `);

  return db;
}

function toMessage(row: MessageRow): Message {
  return {
    id: row.id,
    type: row.type,
    name: row.name,
    email: row.email,
    phone: row.phone || undefined,
    company: row.company || undefined,
    message: row.message,
    status: row.status,
    createdAt: row.createdAt,
    updatedAt: row.updatedAt,
    extra: {
      projectType: row.projectType || undefined,
      budget: row.budget || undefined,
      position: row.position || undefined,
      experience: row.experience || undefined,
      company: row.company || undefined,
    },
  };
}

// Kept for compatibility with existing imports.
export function ensureMessagesFile() {
  getDb();
}

// Generate unique ID
export function generateId(): string {
  return `msg_${Date.now()}_${Math.random().toString(36).slice(2, 11)}`;
}

// Read all messages
export function getAllMessages(): Message[] {
  const database = getDb();
  const rows = database
    .prepare('SELECT * FROM messages ORDER BY datetime(createdAt) DESC')
    .all() as MessageRow[];

  return rows.map(toMessage);
}

// Get messages by type
export function getMessagesByType(type: 'contact' | 'career'): Message[] {
  const database = getDb();
  const rows = database
    .prepare('SELECT * FROM messages WHERE type = ? ORDER BY datetime(createdAt) DESC')
    .all(type) as MessageRow[];

  return rows.map(toMessage);
}

// Get single message by ID
export function getMessageById(id: string): Message | null {
  const database = getDb();
  const row = database.prepare('SELECT * FROM messages WHERE id = ?').get(id) as MessageRow | undefined;
  return row ? toMessage(row) : null;
}

// Add new message
export function addMessage(message: Omit<Message, 'id' | 'createdAt' | 'updatedAt'>): Message {
  const database = getDb();
  const id = generateId();
  const now = new Date().toISOString();

  database
    .prepare(`
      INSERT INTO messages (
        id, type, name, email, phone, company, message, status,
        createdAt, updatedAt, projectType, budget, position, experience
      ) VALUES (
        @id, @type, @name, @email, @phone, @company, @message, @status,
        @createdAt, @updatedAt, @projectType, @budget, @position, @experience
      )
    `)
    .run({
      id,
      type: message.type,
      name: message.name,
      email: message.email,
      phone: message.phone || null,
      company: message.company || message.extra?.company || null,
      message: message.message,
      status: message.status,
      createdAt: now,
      updatedAt: now,
      projectType: message.extra?.projectType || null,
      budget: message.extra?.budget || null,
      position: message.extra?.position || null,
      experience: message.extra?.experience || null,
    });

  return {
    ...message,
    id,
    createdAt: now,
    updatedAt: now,
  };
}

// Update message status
export function updateMessageStatus(id: string, status: MessageStatus): Message | null {
  const database = getDb();
  const now = new Date().toISOString();

  const result = database
    .prepare('UPDATE messages SET status = ?, updatedAt = ? WHERE id = ?')
    .run(status, now, id);

  if (result.changes === 0) return null;
  return getMessageById(id);
}

// Delete message
export function deleteMessage(id: string): boolean {
  const database = getDb();
  const result = database.prepare('DELETE FROM messages WHERE id = ?').run(id);
  return result.changes > 0;
}

// Get dashboard stats
export function getDashboardStats(): DashboardStats {
  const database = getDb();
  const stats = database
    .prepare(`
      SELECT
        COUNT(*) as totalMessages,
        SUM(CASE WHEN status = 'new' THEN 1 ELSE 0 END) as newMessages,
        SUM(CASE WHEN type = 'contact' THEN 1 ELSE 0 END) as contactMessages,
        SUM(CASE WHEN type = 'career' THEN 1 ELSE 0 END) as careerMessages,
        SUM(CASE WHEN status = 'replied' THEN 1 ELSE 0 END) as repliedMessages,
        MAX(updatedAt) as lastUpdated
      FROM messages
    `)
    .get() as {
      totalMessages: number;
      newMessages: number | null;
      contactMessages: number | null;
      careerMessages: number | null;
      repliedMessages: number | null;
      lastUpdated: string | null;
    };

  return {
    totalMessages: stats.totalMessages || 0,
    newMessages: stats.newMessages || 0,
    contactMessages: stats.contactMessages || 0,
    careerMessages: stats.careerMessages || 0,
    repliedMessages: stats.repliedMessages || 0,
    lastUpdated: stats.lastUpdated || new Date().toISOString(),
  };
}

// Search messages
export function searchMessages(query: string): Message[] {
  const database = getDb();
  const q = `%${query}%`;
  const rows = database
    .prepare(`
      SELECT *
      FROM messages
      WHERE name LIKE ? OR email LIKE ? OR message LIKE ?
      ORDER BY datetime(createdAt) DESC
    `)
    .all(q, q, q) as MessageRow[];

  return rows.map(toMessage);
}
