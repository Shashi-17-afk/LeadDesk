import { createClient } from '@supabase/supabase-js';
import { env } from './env.js';

/**
 * Supabase client singleton — uses the SERVICE ROLE key.
 *
 * Why service role key (not anon key) on the backend?
 * ─────────────────────────────────────────────────────
 * The anon key is designed for direct browser/client access, where Row Level
 * Security (RLS) policies control what data is visible. The service role key
 * bypasses RLS entirely — it's intended for trusted server environments where
 * the server itself is the security boundary.
 *
 * Our Express backend enforces auth via its own JWT middleware, so RLS is not
 * the mechanism protecting admin data here — our route guards are. Using the
 * service role key gives us full, unrestricted database access appropriate for
 * a server-side application.
 *
 * ⚠️  NEVER expose the service role key to the frontend or commit it to git.
 */
export const supabase = createClient(env.SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY);
