import { Router } from 'express';
import * as authController from '../controllers/authController.js';
import { requireAuth } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';
import { loginSchema } from '../validators/authValidators.js';

const router = Router();

/**
 * POST /api/v1/auth/login
 * Public — verifies credentials, issues JWT HttpOnly cookie.
 */
router.post('/login', validate(loginSchema), authController.login);

/**
 * POST /api/v1/auth/logout
 * Public call, but clears the auth cookie server-side.
 */
router.post('/logout', authController.logout);

/**
 * GET /api/v1/auth/me
 * Protected — returns the current authenticated admin's info.
 * Used by the frontend on app load to restore session state.
 */
router.get('/me', requireAuth, authController.me);

export default router;
