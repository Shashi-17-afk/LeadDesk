import { supabase } from '../config/supabase.js';
import { createAppError } from '../utils/apiResponse.js';

/**
 * Leads Service — Production-grade database operations for lead management.
 * All database calls pass through this service layer.
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
    throw createAppError('Failed to record your lead submission. Please try again later.', 500);
  }

  return data;
};

/**
 * Retrieves leads with search, status filtering, and pipeline statistics.
 *
 * @param {Object} filters
 * @param {string} [filters.search] - Search term for name or email
 * @param {string} [filters.status] - Status filter ('new' | 'contacted' | 'closed' | 'all')
 * @returns {Promise<{ leads: Array, stats: Object }>}
 */
export const getLeads = async (filters = {}) => {
  const { search, status } = filters;

  // 1. Fetch summary stats counters across all leads
  const { data: allLeads, error: statsError } = await supabase
    .from('leads')
    .select('status');

  if (statsError) {
    throw createAppError('Failed to retrieve lead summary statistics.', 500);
  }

  const stats = {
    total: allLeads.length,
    new: allLeads.filter((l) => l.status === 'new').length,
    contacted: allLeads.filter((l) => l.status === 'contacted').length,
    closed: allLeads.filter((l) => l.status === 'closed').length,
  };

  // 2. Build filtered leads query ordered by newest first
  let query = supabase
    .from('leads')
    .select('id, name, email, budget_range, message, status, created_at, updated_at')
    .order('created_at', { ascending: false });

  if (status && status !== 'all') {
    query = query.eq('status', status);
  }

  if (search && search.trim() !== '') {
    const cleanSearch = search.trim();
    query = query.or(`name.ilike.%${cleanSearch}%,email.ilike.%${cleanSearch}%`);
  }

  const { data: leads, error: queryError } = await query;

  if (queryError) {
    throw createAppError('Failed to retrieve leads list.', 500);
  }

  return { leads, stats };
};

/**
 * Updates the status of a specific lead.
 *
 * @param {string} id - Lead UUID
 * @param {'new' | 'contacted' | 'closed'} status - Target CRM status
 * @returns {Promise<import('../types/index.js').Lead>}
 */
export const updateLeadStatus = async (id, status) => {
  if (!id) {
    throw createAppError('Lead ID is required.', 400);
  }

  const { data: existing } = await supabase
    .from('leads')
    .select('id')
    .eq('id', id)
    .single();

  if (!existing) {
    throw createAppError('Lead record not found.', 404);
  }

  const { data, error } = await supabase
    .from('leads')
    .update({ status })
    .eq('id', id)
    .select('id, name, email, budget_range, message, status, created_at, updated_at')
    .single();

  if (error) {
    throw createAppError('Failed to update lead status.', 500);
  }

  return data;
};
