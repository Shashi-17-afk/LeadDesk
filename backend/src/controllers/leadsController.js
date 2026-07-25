import * as leadsService from '../services/leadsService.js';
import { sendSuccess } from '../utils/apiResponse.js';

/**
 * POST /api/v1/leads
 * Public endpoint — create a new lead submission (Phase 3).
 */
export const createLead = async (req, res, next) => {
  try {
    const lead = await leadsService.createLead(req.body);
    return sendSuccess(res, lead, "Your message has been received. We'll be in touch soon!", 201);
  } catch (err) {
    next(err);
  }
};

/**
 * GET /api/v1/leads
 * Protected endpoint — list all leads with optional search & status filters + stats summary.
 */
export const getLeads = async (req, res, next) => {
  try {
    const filters = {
      search: req.query.search,
      status: req.query.status,
    };

    const data = await leadsService.getLeads(filters);
    return sendSuccess(res, data, 'Leads retrieved successfully');
  } catch (err) {
    next(err);
  }
};

/**
 * PATCH /api/v1/leads/:id/status
 * Protected endpoint — update a lead's CRM status.
 */
export const updateLeadStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const lead = await leadsService.updateLeadStatus(id, status);
    return sendSuccess(res, lead, 'Lead status updated successfully');
  } catch (err) {
    next(err);
  }
};
