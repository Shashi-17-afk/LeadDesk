import { api } from '@/services/api';

/**
 * Lead API resource service for frontend.
 */
export const leadsApi = {
  /**
   * Submits a new public lead (Phase 3).
   *
   * @param {Object} leadData
   */
  create: async (leadData) => {
    return api.post('/leads', leadData);
  },

  /**
   * Fetches leads list with search and status filters (Phase 5).
   *
   * @param {Object} params
   * @param {string} [params.search]
   * @param {string} [params.status]
   */
  getAll: async (params = {}) => {
    const query = new URLSearchParams();
    if (params.search) query.append('search', params.search);
    if (params.status && params.status !== 'all') query.append('status', params.status);

    const queryString = query.toString() ? `?${query.toString()}` : '';
    return api.get(`/leads${queryString}`);
  },

  /**
   * Updates a lead's CRM status (Phase 5).
   *
   * @param {string} id - Lead UUID
   * @param {'new' | 'contacted' | 'closed'} status
   */
  updateStatus: async (id, status) => {
    return api.patch(`/leads/${id}/status`, { status });
  },
};
