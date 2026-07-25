import { z } from 'zod';

/**
 * Environment variable schema.
 *
 * The application REFUSES to start if any required variable is missing or invalid.
 * This eliminates an entire class of runtime errors caused by misconfiguration.
 *
 * Fail-fast on startup is always preferable to failing unexpectedly in production.
 */
const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),

  PORT: z
    .string()
    .default('3001')
    .transform((val) => parseInt(val, 10))
    .refine((val) => !isNaN(val) && val > 0, { message: 'PORT must be a positive integer' }),

  SUPABASE_URL: z.string().url('SUPABASE_URL must be a valid URL'),

  SUPABASE_ANON_KEY: z.string().min(1, 'SUPABASE_ANON_KEY is required'),

  // Service role key — bypasses RLS. Used ONLY on the backend. Never expose to frontend.
  SUPABASE_SERVICE_ROLE_KEY: z.string().min(1, 'SUPABASE_SERVICE_ROLE_KEY is required'),

  JWT_SECRET: z
    .string()
    .min(32, 'JWT_SECRET must be at least 32 characters for security'),

  FRONTEND_URL: z
    .string()
    .url('FRONTEND_URL must be a valid URL')
    .default('http://localhost:5173'),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error('\n❌  FATAL: Missing or invalid environment variables:\n');
  const fieldErrors = parsed.error.flatten().fieldErrors;
  Object.entries(fieldErrors).forEach(([field, messages]) => {
    console.error(`  • ${field}: ${messages.join(', ')}`);
  });
  console.error('\nFix the above errors in your .env file and restart.\n');
  process.exit(1);
}

export const env = parsed.data;
