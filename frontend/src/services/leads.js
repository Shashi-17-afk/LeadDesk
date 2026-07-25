import { api } from '@/services/api';

/**
 * Lead API resource service.
 */
export const leadsApi = {
  /**
   * Submits a new public lead.
   *
   * @param {Object} leadData
   * @param {string} leadData.name
   * @param {string} leadData.email
   * @param {string} leadData.budget_range
   * @param {string} leadData.message
   */
  create: async (leadData) => {
    return api.post('/leads', leadData);
  },
};
