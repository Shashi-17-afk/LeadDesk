import { Router } from 'express';
import * as leadsController from '../controllers/leadsController.js';
import { requireAuth } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';
import { createLeadSchema, updateLeadStatusSchema } from '../validators/leadsValidators.js';

const router = Router();

/**
 * POST /api/v1/leads
 * Public — anyone can submit a lead form.
 * validate() runs Zod schema before the controller is called.
 */
router.post('/', validate(createLeadSchema), leadsController.createLead);

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
