import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import * as leadsController from '../controllers/leadsController.js';
import { requireAuth } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';
import { createLeadSchema, updateLeadStatusSchema } from '../validators/leadsValidators.js';

const router = Router();

/**
 * Rate limiter for public lead submission endpoint.
 * Limits each IP to 5 requests per 15 minutes window to prevent spam/abuse.
 */
const createLeadLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 submissions per windowMs
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many lead submissions from this IP. Please try again after 15 minutes.',
  },
});

/**
 * POST /api/v1/leads
 * Public — anyone can submit a lead form.
 * Middleware chain: rate limiter -> Zod validator -> controller.
 */
router.post(
  '/',
  createLeadLimiter,
  validate(createLeadSchema),
  leadsController.createLead
);

/**
 * GET /api/v1/leads
 * Protected — only authenticated admins can list leads.
 */
router.get('/', requireAuth, leadsController.getLeads);

/**
 * PATCH /api/v1/leads/:id/status
 * Protected — only authenticated admins can update lead status.
 */
router.patch(
  '/:id/status',
  requireAuth,
  validate(updateLeadStatusSchema),
  leadsController.updateLeadStatus
);

export default router;
