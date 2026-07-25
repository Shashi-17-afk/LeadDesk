-- ============================================================
-- LeadDesk Mini — Database Schema
-- Run this entire file in: Supabase Dashboard → SQL Editor
-- ============================================================

-- ─── Extensions ──────────────────────────────────────────────────────────────
-- pgcrypto provides gen_random_uuid() for UUID primary keys
CREATE EXTENSION IF NOT EXISTS "pgcrypto";


-- ─── Leads Table ─────────────────────────────────────────────────────────────
-- Stores every public lead form submission.

CREATE TABLE IF NOT EXISTS leads (
  id           UUID         NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name         VARCHAR(100) NOT NULL,
  email        VARCHAR(255) NOT NULL,
  budget_range VARCHAR(50)  NOT NULL,
  message      TEXT         NOT NULL,
  status       VARCHAR(20)  NOT NULL DEFAULT 'new'
                            CHECK (status IN ('new', 'contacted', 'closed')),
  created_at   TIMESTAMPTZ  NOT NULL DEFAULT now(),
  updated_at   TIMESTAMPTZ  NOT NULL DEFAULT now()
);

COMMENT ON TABLE  leads              IS 'Inbound lead form submissions from the public landing page.';
COMMENT ON COLUMN leads.status       IS 'CRM workflow state: new → contacted → closed.';
COMMENT ON COLUMN leads.budget_range IS 'Selected budget range from the form dropdown.';


-- ─── Admin Users Table ───────────────────────────────────────────────────────
-- Stores admin accounts. Passwords are stored as bcrypt hashes — NEVER plain text.
-- This table should never be publicly readable.

CREATE TABLE IF NOT EXISTS admin_users (
  id            UUID         NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email         VARCHAR(255) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  created_at    TIMESTAMPTZ  NOT NULL DEFAULT now()
);

COMMENT ON TABLE  admin_users               IS 'Admin accounts for the LeadDesk Mini dashboard.';
COMMENT ON COLUMN admin_users.password_hash IS 'bcrypt hash of the admin password. Never store plain text.';


-- ─── Indexes ─────────────────────────────────────────────────────────────────
-- status index — used by the dashboard status filter (WHERE status = ?)
CREATE INDEX IF NOT EXISTS idx_leads_status
  ON leads (status);

-- created_at index — used for default sort (ORDER BY created_at DESC)
CREATE INDEX IF NOT EXISTS idx_leads_created_at
  ON leads (created_at DESC);

-- email index — used by admin search (WHERE email ILIKE ?)
CREATE INDEX IF NOT EXISTS idx_leads_email
  ON leads (email);

-- Composite index — status filter + date sort together (most common query)
CREATE INDEX IF NOT EXISTS idx_leads_status_created_at
  ON leads (status, created_at DESC);

-- Admin email lookup — used on every login attempt
CREATE UNIQUE INDEX IF NOT EXISTS idx_admin_users_email
  ON admin_users (email);


-- ─── Auto-update updated_at Trigger ──────────────────────────────────────────
-- Automatically sets updated_at = now() before any UPDATE on leads.
-- More reliable than relying on application code to set this.

CREATE OR REPLACE FUNCTION fn_set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_leads_set_updated_at ON leads;

CREATE TRIGGER trg_leads_set_updated_at
  BEFORE UPDATE ON leads
  FOR EACH ROW
  EXECUTE FUNCTION fn_set_updated_at();


-- ─── Row Level Security ───────────────────────────────────────────────────────
-- Our Express backend uses the SERVICE ROLE key which bypasses RLS entirely.
-- RLS is enabled here as a defence-in-depth measure — if the anon key were ever
-- accidentally used, these policies would be the fallback security layer.

ALTER TABLE leads       ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Leads: allow anonymous INSERT only (public form submissions)
DROP POLICY IF EXISTS "leads_public_insert" ON leads;
CREATE POLICY "leads_public_insert" ON leads
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Leads: no public SELECT / UPDATE / DELETE
-- (Backend service role key bypasses this; anon users cannot read leads)

-- Admin users: zero public access (service role key only)
-- No policies created — RLS blocks everything for non-service-role callers.


-- ─── Verification Queries ─────────────────────────────────────────────────────
-- Run these after executing the schema to confirm everything was created:

-- SELECT table_name FROM information_schema.tables
--   WHERE table_schema = 'public'
--   ORDER BY table_name;

-- SELECT indexname FROM pg_indexes
--   WHERE tablename IN ('leads', 'admin_users')
--   ORDER BY indexname;
