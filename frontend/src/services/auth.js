import { api } from '@/services/api';

/**
 * Authentication API resource service.
 */
export const authApi = {
  /**
   * Logs in with email and password.
   * Server responds with user object and sets HttpOnly JWT cookie.
   *
   * @param {{ email: string, password: string }} credentials
   */
  login: async (credentials) => {
    return api.post('/auth/login', credentials);
  },

  /**
   * Logs out current user.
   * Server clears the HttpOnly JWT cookie.
   */
  logout: async () => {
    return api.post('/auth/logout');
  },

  /**
   * Fetches current authenticated admin session from HttpOnly cookie.
   * Used on app load / refresh to restore state.
   */
  me: async () => {
    return api.get('/auth/me');
  },
};
