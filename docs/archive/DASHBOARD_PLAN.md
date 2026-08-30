# Admin Dashboard Plan

Plan for handling contact messages and career applications through a simple admin dashboard.

## 1. Current State

### Already in Place
- Contact form sends emails via Brevo SMTP.
- Career page exists and displays positions.

### Still Missing
- Message storage or database layer.
- Admin dashboard UI.
- Career application submission flow.

## 2. Storage Strategy

### Option A: JSON File Storage
- Store data in `data/messages.json`.
- Pros: no database setup, quick to ship, good for MVP.
- Cons: not ideal for production, limited to a single server setup.

### Option B: SQLite
- Add a lightweight local database.
- Better structure than JSON with minimal operational overhead.

### Option C: MongoDB or PostgreSQL
- Best long-term production option.
- More setup and maintenance than the MVP needs right now.

### Recommendation
- Start with Option A for the MVP.
- Upgrade to SQLite or a full database later if usage grows.

## 3. Features to Build

### Backend API Routes
```text
POST /api/contact         -> Save message and send email
POST /api/career          -> Submit career application
GET  /api/admin/messages  -> Fetch all messages with filters
GET  /api/admin/stats     -> Fetch dashboard statistics
```

### Admin Pages
```text
/admin/dashboard          -> Dashboard overview and stats
/admin/messages           -> Message list with search and filters
/admin/messages/[id]      -> Message detail page
/admin/applications       -> Career applications list
```

### Message Schema
```json
{
  "id": "unique-id",
  "type": "contact|career",
  "name": "string",
  "email": "string",
  "phone": "string",
  "message": "string",
  "status": "new|read|replied",
  "createdAt": "timestamp",
  "extra": {}
}
```

## 4. Implementation Phases

### Phase 1: Core Infrastructure
1. Set up message storage in `/data` with a basic JSON schema.
2. Update the contact API to save messages and continue sending email.
3. Create the career API to accept and store applications.

### Phase 2: Admin Dashboard
4. Create the admin layout and dashboard page.
5. Add the messages list view.
6. Add the message detail page.

### Phase 3: Enhancements
7. Add basic authentication for admin routes.
8. Add dashboard stats such as total, new, and replied counts.
9. Add export support for CSV or PDF.

## 5. Tech Stack

- Frontend: React + Next.js
- Styling: Tailwind CSS
- Storage: JSON files first, database later
- Type safety: TypeScript

## 6. Planned File Structure

```text
src/
├── app/
│   ├── admin/
│   │   ├── layout.tsx
│   │   ├── dashboard/
│   │   │   └── page.tsx
│   │   └── messages/
│   │       ├── page.tsx
│   │       └── [id]/
│   │           └── page.tsx
│   └── api/
│       ├── contact/
│       │   └── route.ts
│       ├── career/
│       │   └── route.ts
│       └── admin/
│           ├── messages/
│           │   └── route.ts
│           └── stats/
│               └── route.ts
├── lib/
│   ├── messages.ts
│   └── types.ts
└── types/
    └── messages.ts
data/
└── messages.json
```

## 7. Next Decisions

- Confirm JSON storage for the first implementation step.
- Decide whether admin routes need basic password protection.
- Choose initial priority: contact messages first or career applications first.
