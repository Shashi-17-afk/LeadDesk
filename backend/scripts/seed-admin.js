/**
 * Admin User Seed Script
 *
 * Creates the first admin account in the database.
 * Run ONCE after applying the schema SQL.
 *
 * Usage:
 *   node scripts/seed-admin.js --email admin@example.com --password YourSecurePassword123
 *
 * Or with npm script:
 *   npm run seed:admin -- --email admin@example.com --password YourSecurePassword123
 *
 * Requirements:
 *   - backend/.env must be configured with real SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY
 *   - Schema must already be applied (run database/schema.sql first)
 */

import 'dotenv/config';
import bcrypt from 'bcryptjs';
import { createClient } from '@supabase/supabase-js';

// ─── Parse CLI arguments ──────────────────────────────────────────────────────
const args = process.argv.slice(2);
const getArg = (flag) => {
  const index = args.indexOf(flag);
  return index !== -1 ? args[index + 1] : null;
};

const email = getArg('--email');
const password = getArg('--password');

if (!email || !password) {
  console.error('\n❌  Usage: node scripts/seed-admin.js --email <email> --password <password>\n');
  process.exit(1);
}

if (password.length < 8) {
  console.error('\n❌  Password must be at least 8 characters.\n');
  process.exit(1);
}

// ─── Validate required env vars ───────────────────────────────────────────────
const { SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY } = process.env;

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error('\n❌  SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set in backend/.env\n');
  process.exit(1);
}

// ─── Supabase client (service role — bypasses RLS) ───────────────────────────
const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

// ─── Seed ─────────────────────────────────────────────────────────────────────
async function seedAdmin() {
  console.log(`\n🌱  Seeding admin user: ${email}`);

  // Check if an admin with this email already exists
  const { data: existing } = await supabase
    .from('admin_users')
    .select('id')
    .eq('email', email)
    .single();

  if (existing) {
    console.error(`\n⚠️   An admin with email "${email}" already exists. Aborting.\n`);
    process.exit(1);
  }

  // Hash the password with bcrypt (12 salt rounds = strong, still fast)
  const SALT_ROUNDS = 12;
  console.log(`🔐  Hashing password (${SALT_ROUNDS} salt rounds)...`);
  const password_hash = await bcrypt.hash(password, SALT_ROUNDS);

  // Insert the admin user
  const { data, error } = await supabase
    .from('admin_users')
    .insert({ email, password_hash })
    .select('id, email, created_at')
    .single();

  if (error) {
    console.error('\n❌  Failed to create admin user:', error.message, '\n');
    process.exit(1);
  }

  console.log('\n✅  Admin user created successfully:');
  console.log(`    ID:         ${data.id}`);
  console.log(`    Email:      ${data.email}`);
  console.log(`    Created at: ${data.created_at}`);
  console.log('\n🔒  Your password has been stored as a bcrypt hash. Keep it safe.\n');
}

seedAdmin().catch((err) => {
  console.error('\n❌  Unexpected error:', err.message, '\n');
  process.exit(1);
});
