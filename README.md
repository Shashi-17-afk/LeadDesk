# LeadDesk Mini

> **Digital Heroes Full Stack Development Internship Qualification Task**

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Vercel-black?style=for-the-badge&logo=vercel)](https://lead-desk-henna.vercel.app)
[![API Status](https://img.shields.io/badge/Backend%20API-Render-informational?style=for-the-badge&logo=render)](https://leaddesk-es0i.onrender.com/health)
[![Database](https://img.shields.io/badge/Database-Supabase-emerald?style=for-the-badge&logo=supabase)](https://supabase.com)

A production-quality lead management web application built with React, Express, and Supabase. Captures inbound project leads through a public form with dual-layer Zod validation, persists data into a Postgres database, and provides a secure, authenticated admin dashboard for pipeline tracking and status management.

---

## 🔗 Live Application & Credentials

| Component | URL / Details |
|---|---|
| 🌐 **Live Frontend** | [https://lead-desk-henna.vercel.app](https://lead-desk-henna.vercel.app) |
| ⚙️ **Live Backend API** | [https://leaddesk-es0i.onrender.com](https://leaddesk-es0i.onrender.com) |
| 🏥 **Health Check** | [https://leaddesk-es0i.onrender.com/health](https://leaddesk-es0i.onrender.com/health) |

### 🔑 Admin Credentials

- **Email**: `shashishanthan2706@gmail.com`
- **Password**: `ShaDoW17`
- **Admin Portal URL**: [https://lead-desk-henna.vercel.app/admin/login](https://lead-desk-henna.vercel.app/admin/login)

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 18 + Vite 5
- **Styling**: Vanilla Tailwind CSS v3 (Custom Brand Palette, Glassmorphism, Micro-animations)
- **Routing**: React Router v6 (Nested `<Outlet>` Protected Routes, SPA client-side rewrite rules)
- **Form Management**: React Hook Form + `@hookform/resolvers/zod`
- **Icons**: Lucide React
- **Notifications**: Sonner Toast Notifications

### Backend
- **Runtime**: Node.js v18+
- **Framework**: Express.js
- **Database Client**: `@supabase/supabase-js` (Service Role Key client)
- **Validation**: Zod (Schema-first validation middleware)
- **Security & Auth**:
  - `jsonwebtoken` (JWT issued in `HttpOnly`, `SameSite=None`, `Secure=true` cookies)
  - `bcryptjs` (Password hashing with 12 salt rounds)
  - `helmet` (Secure HTTP headers)
  - `express-rate-limit` (Public endpoint spam prevention)
  - `cors` (Restricted cross-origin access)
  - `cookie-parser` (HttpOnly cookie handling)
  - `compression` (Gzip payload compression)

### Infrastructure & Database
- **Frontend Hosting**: Vercel (Static SPA rewrite rules configured via `vercel.json`)
- **Backend Hosting**: Render Web Service
- **Database**: Supabase Managed PostgreSQL (`leads` & `admin_users` tables, composite indexes, trigger-based `updated_at`)

---

## 🏗️ Architecture

The backend strictly follows a layered separation of concerns:

```
Client Request
      │
      ▼
 ┌──────────┐      ┌──────────────┐      ┌─────────────┐      ┌────────────┐
 │  Route   │ ───► │  Controller  │ ───► │   Service   │ ───► │  Supabase  │
 └──────────┘      └──────────────┘      └─────────────┘      └────────────┘
 (Declares HTTP   (Parses req/res,       (Business logic,      (Postgres DB,
  & middleware)    no DB logic)           DB queries only)      indexes, RLS)
```

### Key Architectural Principles:
1. **Routes**: Define paths, HTTP verbs, rate limiters, and Zod validation middleware. Zero business logic.
2. **Controllers**: Thin HTTP coordinators extracting `req.body`, `req.params`, and `req.query`, passing clean payloads to services, and invoking standardized response helpers (`sendSuccess`).
3. **Services**: Encapsulate all database operations and business logic. Independent of Express HTTP primitives (`req`, `res`).
4. **Database Triggers**: `updated_at` timestamps auto-update at the database layer via PostgreSQL trigger `trg_leads_set_updated_at`.

---

## 🔐 Security & Auth Flow

```
1. Admin Submits Credentials (email, password)
   └── POST /api/v1/auth/login
        ├── Zod schema validation
        ├── Query admin_users by email
        ├── Compare bcrypt hash (12 salt rounds)
        └── Issue 24h JWT -> Set-Cookie: token=<jwt>; HttpOnly; Secure; SameSite=None

2. Session Restoration (Page Refresh)
   └── GET /api/v1/auth/me (Cookie attached automatically)
        ├── requireAuth middleware verifies JWT signature & expiry
        └── Returns user payload (password hash omitted)

3. Logout
   └── POST /api/v1/auth/logout
        └── Clears token cookie immediately
```

### Security Defenses:
- **XSS Immunity**: Auth tokens are stored exclusively in `HttpOnly` cookies, making them unreadable by JavaScript.
- **CSRF Protection**: `SameSite=None` with `Secure=true` over HTTPS enforces strict cross-origin cookie rules.
- **Rate Limiting**: Public endpoint `POST /api/v1/leads` is rate-limited to 5 submissions per 15 minutes per IP.
- **Data Protection**: Admin `password_hash` is explicitly deleted from all service layer responses.

---

## 📁 Folder Structure

```
LeadDesk/
├── backend/
│   ├── database/
│   │   └── schema.sql             # SQL table definitions, indexes, trigger, and RLS
│   ├── scripts/
│   │   └── seed-admin.js          # CLI seeder for bcrypt admin creation
│   └── src/
│       ├── config/                # env validation (fail-fast) & Supabase client
│       ├── controllers/           # authController.js, leadsController.js
│       ├── middleware/            # auth.js, validate.js, errorHandler.js, notFound.js
│       ├── routes/                # auth.js, leads.js, index.js (versioned /api/v1)
│       ├── services/              # authService.js, leadsService.js
│       ├── types/                 # JSDoc type definitions
│       ├── utils/                 # apiResponse.js helper
│       └── app.js                 # Express app configuration
│   ├── server.js                  # Entry point (listens on PORT)
│   ├── .env.example
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/            # Navbar, HeroSection, FeaturesSection, LeadForm,
│   │   │                          # AdminStats, LeadTable, LeadDetailsModal, Footer
│   │   ├── contexts/              # AuthContext.jsx (session restore & global state)
│   │   ├── hooks/                 # useAuth.js
│   │   ├── layouts/               # MainLayout.jsx, AdminLayout.jsx
│   │   ├── pages/                 # LandingPage.jsx, AdminLogin.jsx, AdminDashboard.jsx
│   │   ├── services/              # api.js (fetch client), auth.js, leads.js
│   │   ├── constants/             # App constants and status maps
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── vercel.json                # Vercel SPA rewrite fallback rules
│   ├── tailwind.config.js
│   ├── vite.config.js
│   └── package.json
│
└── README.md
```

---

## 🚀 Local Development Setup

### Prerequisites
- Node.js ≥ 18.0.0
- npm ≥ 9.0.0

### 1. Clone & Install Dependencies
```bash
git clone https://github.com/Shashi-17-afk/LeadDesk.git
cd LeadDesk

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### 2. Configure Environment Variables
Create `.env` in `backend/`:
```env
NODE_ENV=development
PORT=3001
SUPABASE_URL=https://vnnigjfiyhxbkjlblsxp.supabase.co
SUPABASE_ANON_KEY=sb_publishable_FJ-flDyL6wuX51OMrSYdOQ_-76Ig7pM
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
JWT_SECRET=your-32-char-jwt-secret
FRONTEND_URL=http://localhost:5173
```

Create `.env` in `frontend/`:
```env
VITE_API_URL=http://localhost:3001
```

### 3. Start Development Servers
```bash
# Terminal 1 — Backend (runs on http://localhost:3001)
cd backend
npm run dev

# Terminal 2 — Frontend (runs on http://localhost:5173)
cd frontend
npm run dev
```

---

## 📡 API Reference (`/api/v1`)

### Public Endpoints

#### `GET /health`
Server health check. Returns `200 OK`.

#### `POST /api/v1/leads`
Submits a new public lead. Rate limited to 5 requests / 15 minutes per IP.
- **Request Body**:
  ```json
  {
    "name": "Jane Doe",
    "email": "jane@example.com",
    "budget_range": "$5,000–$20,000",
    "message": "We need a custom lead management system with real-time analytics."
  }
  ```
- **Response (`201 Created`)**:
  ```json
  {
    "success": true,
    "message": "Your message has been received. We'll be in touch soon!",
    "data": {
      "id": "c1f7a8b3-90d2-4e8a-8212-3f8d9b1c7a8b",
      "name": "Jane Doe",
      "email": "jane@example.com",
      "budget_range": "$5,000–$20,000",
      "message": "We need a custom lead management system with real-time analytics.",
      "status": "new",
      "created_at": "2026-07-25T14:10:00.000Z",
      "updated_at": "2026-07-25T14:10:00.000Z"
    }
  }
  ```

---

### Auth Endpoints

#### `POST /api/v1/auth/login`
Authenticates admin and sets HttpOnly JWT cookie.
- **Request Body**: `{ "email": "admin@example.com", "password": "Password123!" }`
- **Response (`200 OK`)**: `{ "success": true, "message": "Login successful", "data": { "user": { "id": "...", "email": "..." } } }`

#### `POST /api/v1/auth/logout`
Clears JWT HttpOnly cookie.
- **Response (`200 OK`)**: `{ "success": true, "message": "Logged out successfully" }`

#### `GET /api/v1/auth/me` *(Protected)*
Restores active session from cookie.
- **Response (`200 OK`)**: `{ "success": true, "message": "Session valid", "data": { "user": { "id": "...", "email": "..." } } }`

---

### Admin Leads Endpoints *(Protected)*

#### `GET /api/v1/leads?search=john&status=new`
Lists leads ordered by newest first with summary count statistics.
- **Query Params**: `search` (optional), `status` (`new` | `contacted` | `closed` | `all`)
- **Response (`200 OK`)**:
  ```json
  {
    "success": true,
    "data": {
      "leads": [...],
      "stats": { "total": 12, "new": 5, "contacted": 4, "closed": 3 }
    }
  }
  ```

#### `PATCH /api/v1/leads/:id/status`
Updates lead status.
- **Request Body**: `{ "status": "contacted" }`
- **Response (`200 OK`)**: Returns updated lead record.

## 📄 License

Built for the **Digital Heroes Full Stack Development Internship Qualification Task**.