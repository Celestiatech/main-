# Admin Dashboard Plan - Contact & Career Messages

## Current State
- ✅ Contact form exists and sends emails via Brevo SMTP
- ✅ Career page exists (displays positions)
- ❌ No message storage/database
- ❌ No admin dashboard
- ❌ No career application submission system

## Proposed Architecture

### 1. **Data Storage** (Choose One)
- **Option A (Simplest)**: JSON file-based storage in `data/messages.json`
  - Pro: No database setup, works immediately, good for MVP
  - Con: Not production-ready, single server only
- **Option B (Recommended)**: Integrate lightweight DB like SQLite
- **Option C (Production)**: Add MongoDB/PostgreSQL

**Recommendation: Start with Option A (JSON) for MVP, upgrade later**

---

## 2. **Features to Build**

### A. Backend API Routes
```
POST   /api/contact          → Save + Email (existing, modify)
POST   /api/career           → Career application endpoint
GET    /api/admin/messages   → Get all messages (with filters)
GET    /api/admin/stats      → Dashboard statistics
```

### B. Admin Dashboard Pages
```
/admin/dashboard            → Main dashboard with stats
/admin/messages             → Message list with search/filter
/admin/messages/[id]        → Message detail view
/admin/applications         → Career applications list
```

### C. Message Storage Structure
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

---

## 3. **Implementation Steps**

### Phase 1: Core Infrastructure (Step 1-3)
1. **Setup message storage** → Create `/data` folder + JSON schema
2. **Update Contact API** → Save to JSON + send email
3. **Create Career API** → Accept applications + save

### Phase 2: Admin Dashboard (Step 4-6)
4. **Create Dashboard Layout** → `/admin/dashboard`
5. **Add Message List View** → `/admin/messages`
6. **Add Message Detail** → `/admin/messages/[id]`

### Phase 3: Enhancements (Optional)
7. **Add basic auth** → Protect admin routes
8. **Add stats/analytics** → Total, new, responded counters
9. **Export messages** → CSV/PDF functionality

---

## 4. **Tech Stack**
- **Frontend**: React + Next.js (existing)
- **Styling**: Tailwind CSS (existing)
- **Storage**: JSON files (initial) or DB (later)
- **Type Safety**: TypeScript (existing)

---

## 5. **File Structure to Create**
```
src/
├── app/
│   ├── admin/
│   │   ├── layout.tsx           (NEW)
│   │   ├── dashboard/
│   │   │   └── page.tsx         (NEW)
│   │   └── messages/
│   │       ├── page.tsx         (NEW)
│   │       └── [id]/
│   │           └── page.tsx     (NEW)
│   └── api/
│       ├── contact/
│       │   └── route.ts         (MODIFY)
│       ├── career/
│       │   └── route.ts         (NEW)
│       └── admin/
│           ├── messages/
│           │   └── route.ts     (NEW)
│           └── stats/
│               └── route.ts     (NEW)
├── lib/
│   ├── messages.ts              (NEW - file operations)
│   └── types.ts                 (NEW - TypeScript types)
└── types/
    └── messages.ts              (NEW)
data/
└── messages.json                (NEW - data storage)
```

---

## 6. **Next Steps**
✅ Review this plan
❓ Confirm you want to proceed with JSON storage (Step 1)
❓ Do you want basic password protection for admin?
❓ Priority: Contact messages first or Career applications?
