import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';
import * as authService from '../services/authService.js';
import { sendSuccess } from '../utils/apiResponse.js';

/**
 * Standard cookie configuration for JWT.
 * HttpOnly prevents client JS reading token.
 * SameSite=None + Secure=true in production/HTTPS enables cross-domain Vercel <-> Render cookies.
 */
const getCookieOptions = (req) => {
  const isSecure = req?.secure || req?.headers?.['x-forwarded-proto'] === 'https' || env.NODE_ENV === 'production';

  return {
    httpOnly: true,
    secure: isSecure,
    sameSite: isSecure ? 'none' : 'lax',
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
    path: '/',
  };
};

/**
 * POST /api/v1/auth/login
 * Validates credentials, issues JWT as HttpOnly cookie.
 */
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const admin = await authService.authenticateAdmin(email, password);

    // Sign JWT token with admin payload (expires in 24h)
    const token = jwt.sign(
      { id: admin.id, email: admin.email },
      env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    // Set HttpOnly cookie
    res.cookie('token', token, getCookieOptions(req));

    return sendSuccess(res, { user: admin }, 'Login successful');
  } catch (err) {
    next(err);
  }
};

/**
 * POST /api/v1/auth/logout
 * Clears the JWT HttpOnly cookie.
 */
export const logout = async (req, res, next) => {
  try {
    res.clearCookie('token', {
      ...getCookieOptions(req),
      maxAge: 0, // Expire immediately
    });
    return sendSuccess(res, null, 'Logged out successfully');
  } catch (err) {
    next(err);
  }
};

/**
 * GET /api/v1/auth/me
 * Protected endpoint — returns currently authenticated admin user.
 * Used on frontend page load to restore session.
 */
export const me = async (req, res, next) => {
  try {
    const admin = await authService.getAdminById(req.user?.id);
    return sendSuccess(res, { user: admin }, 'Session valid');
  } catch (err) {
    next(err);
  }
};
