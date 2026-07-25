/**
 * Auth Controller — Phase 4
 *
 * Coordinates auth-related HTTP requests.
 * JWT cookie setting/clearing happens here (HTTP concern, not service concern).
 * Service layer handles credential verification and user lookup.
 */

import * as authService from '../services/authService.js';
import { sendSuccess } from '../utils/apiResponse.js';

/**
 * POST /api/v1/auth/login
 * Validates credentials, issues JWT as HttpOnly cookie.
 * Implemented in Phase 4.
 */
export const login = async (req, res, next) => {
  try {
    await authService.authenticateAdmin(req.body.email, req.body.password);
    // Phase 4: sign JWT, set HttpOnly cookie, return user object
    return sendSuccess(res, null, 'Login endpoint — implemented in Phase 4');
  } catch (err) {
    next(err);
  }
};

/**
 * POST /api/v1/auth/logout
 * Clears the JWT cookie.
 * Implemented in Phase 4.
 */
export const logout = async (_req, res, next) => {
  try {
    // Phase 4: res.clearCookie('token') + response
    return sendSuccess(res, null, 'Logout endpoint — implemented in Phase 4');
  } catch (err) {
    next(err);
  }
};

/**
 * GET /api/v1/auth/me
 * Returns the currently authenticated admin (session restore).
 * Implemented in Phase 4.
 */
export const me = async (req, res, next) => {
  try {
    const admin = await authService.getAdminById(req.user?.id);
    return sendSuccess(res, admin, 'Session valid');
  } catch (err) {
    next(err);
  }
};
