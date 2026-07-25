import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';

/**
 * Authentication middleware.
 *
 * Reads the JWT from the HttpOnly `token` cookie (not Authorization header).
 * Using HttpOnly cookies prevents JavaScript from accessing the token,
 * which is the primary defense against XSS-based token theft.
 *
 * On success: attaches decoded payload to `req.user` and calls `next()`.
 * On failure: immediately returns 401 — does NOT call `next()`.
 *
 * Usage:
 *   router.get('/protected', requireAuth, controller.handler);
 */
export const requireAuth = (req, res, next) => {
  const token = req.cookies?.token;

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Authentication required. Please log in.',
    });
  }

  try {
    const decoded = jwt.verify(token, env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    // Distinguish expired from invalid for better client-side handling
    const message =
      err.name === 'TokenExpiredError'
        ? 'Session expired. Please log in again.'
        : 'Invalid session token. Please log in again.';

    return res.status(401).json({
      success: false,
      message,
    });
  }
};
