import { supabase } from '../config/supabase.js';
import { createAppError } from '../utils/apiResponse.js';

/**
 * Leads Service — Handles lead persistence and querying in Supabase.
 */

/**
 * Creates a new lead record in Supabase.
 *
 * @param {Object} leadData
 * @param {string} leadData.name
 * @param {string} leadData.email
 * @param {string} leadData.budget_range
 * @param {string} leadData.message
 * @returns {Promise<import('../types/index.js').Lead>}
 */
export const createLead = async (leadData) => {
  const { data, error } = await supabase
    .from('leads')
    .insert([
      {
        name: leadData.name,
        email: leadData.email,
        budget_range: leadData.budget_range,
        message: leadData.message,
        status: 'new',
      },
    ])
    .select('id, name, email, budget_range, message, status, created_at, updated_at')
    .single();

  if (error) {
    console.error('Supabase Lead Insert Error:', error);
    throw createAppError('Failed to record your submission. Please try again later.', 500);
  }

  return data;
};

/**
 * Retrieves leads with optional search and status filters.
 * (Implemented in Phase 5)
 */
export const getLeads = async (_filters) => {
  throw new Error('getLeads not implemented — coming in Phase 5');
};

/**
 * Updates the status of a specific lead.
 * (Implemented in Phase 5)
 */
export const updateLeadStatus = async (_id, _status) => {
  throw new Error('updateLeadStatus not implemented — coming in Phase 5');
};
