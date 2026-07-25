import { z } from 'zod';

/**
 * Validation schemas for authentication endpoints.
 */

/**
 * Schema for POST /api/v1/auth/login
 */
export const loginSchema = z.object({
  email: z
    .string({ required_error: 'Email is required' })
    .trim()
    .email('Please provide a valid email address'),

  password: z
    .string({ required_error: 'Password is required' })
    .min(1, 'Password is required'),
});
