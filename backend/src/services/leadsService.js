/**
 * Leads Service — Phase 3 & 5
 *
 * Contains all business logic and database operations for leads.
 * Controllers call these functions and handle the HTTP layer.
 * This service has no knowledge of Express (req, res).
 *
 * Implemented in:
 *   - Phase 3: createLead
 *   - Phase 5: getLeads, updateLeadStatus
 */

/**
 * Creates a new lead in the database.
 * @param {import('../types/index.js').Lead} leadData
 * @returns {Promise<import('../types/index.js').Lead>}
 */
export const createLead = async (_leadData) => {
  throw new Error('createLead not implemented — coming in Phase 3');
};

/**
 * Retrieves leads with optional search and status filters.
 * @param {{ search?: string, status?: string }} filters
 * @returns {Promise<import('../types/index.js').Lead[]>}
 */
export const getLeads = async (_filters) => {
  throw new Error('getLeads not implemented — coming in Phase 5');
};

/**
 * Updates the status of a specific lead.
 * @param {string} id - Lead UUID
 * @param {import('../types/index.js').LeadStatus} status
 * @returns {Promise<import('../types/index.js').Lead>}
 */
export const updateLeadStatus = async (_id, _status) => {
  throw new Error('updateLeadStatus not implemented — coming in Phase 5');
};
