/**
 * Leads Controller — Phase 3 & 5
 *
 * Responsibilities:
 *   1. Extract data from the request (body, params, query)
 *   2. Call the appropriate service function
 *   3. Send the HTTP response
 *
 * The controller should NOT contain business logic or database queries.
 * Always pass errors to `next(err)` so the central error handler handles them.
 */

import * as leadsService from '../services/leadsService.js';
import { sendSuccess } from '../utils/apiResponse.js';

/**
 * POST /api/v1/leads
 * Public endpoint — create a new lead submission.
 * Implemented in Phase 3.
 */
export const createLead = async (req, res, next) => {
  try {
    const lead = await leadsService.createLead(req.body);
    return sendSuccess(res, lead, 'Your message has been received. We\'ll be in touch soon!', 201);
  } catch (err) {
    next(err);
  }
};

/**
 * GET /api/v1/leads
 * Protected endpoint — list all leads with optional filters.
 * Implemented in Phase 5.
 */
export const getLeads = async (req, res, next) => {
  try {
    const filters = {
      search: req.query.search,
      status: req.query.status,
    };
    const leads = await leadsService.getLeads(filters);
    return sendSuccess(res, leads, 'Leads retrieved successfully');
  } catch (err) {
    next(err);
  }
};

/**
 * PATCH /api/v1/leads/:id/status
 * Protected endpoint — update a lead's CRM status.
 * Implemented in Phase 5.
 */
export const updateLeadStatus = async (req, res, next) => {
  try {
    const lead = await leadsService.updateLeadStatus(req.params.id, req.body.status);
    return sendSuccess(res, lead, 'Lead status updated successfully');
  } catch (err) {
    next(err);
  }
};
