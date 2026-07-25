import { z } from 'zod';

/**
 * Validation schemas for lead-related endpoints.
 * Used with the `validate` middleware in routes.
 *
 * Keeping schemas in a dedicated validators/ directory means:
 * - Controllers stay clean (no schema definitions inline)
 * - Schemas are easily reusable across multiple routes
 * - Easy to unit test in isolation
 */

export const BUDGET_RANGES = ['< $1,000', '$1,000–$5,000', '$5,000–$20,000', '$20,000+'];

export const LEAD_STATUSES = ['new', 'contacted', 'closed'];

/**
 * Schema for POST /api/v1/leads
 * Applied on the public lead submission form.
 */
export const createLeadSchema = z.object({
  name: z
    .string({ required_error: 'Name is required' })
    .trim()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must not exceed 100 characters'),

  email: z
    .string({ required_error: 'Email is required' })
    .trim()
    .email('Please provide a valid email address')
    .max(255, 'Email must not exceed 255 characters'),

  budget_range: z.enum(BUDGET_RANGES, {
    errorMap: () => ({ message: `Budget range must be one of: ${BUDGET_RANGES.join(', ')}` }),
  }),

  message: z
    .string({ required_error: 'Message is required' })
    .trim()
    .min(10, 'Message must be at least 10 characters')
    .max(2000, 'Message must not exceed 2000 characters'),
});

/**
 * Schema for PATCH /api/v1/leads/:id/status
 * Applied on the admin status update endpoint.
 */
export const updateLeadStatusSchema = z.object({
  status: z.enum(LEAD_STATUSES, {
    errorMap: () => ({ message: `Status must be one of: ${LEAD_STATUSES.join(', ')}` }),
  }),
});
