import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';

/**
 * Authentication middleware.
 *
 * Reads the JWT from the HttpOnly `token` cookie.
 * On success: attaches decoded payload { id, email, iat, exp } to `req.user` and calls `next()`.
 * On failure: returns 401 response with structured message.
 */
export const requireAuth = (req, res, next) => {
  const token = req.cookies?.token;

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Authentication required. Please log in.',
      code: 'NO_TOKEN',
    });
  }

  try {
    const decoded = jwt.verify(token, env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        message: 'Session expired. Please log in again.',
        code: 'TOKEN_EXPIRED',
      });
    }

    return res.status(401).json({
      success: false,
      message: 'Invalid session token. Please log in again.',
      code: 'TOKEN_INVALID',
    });
  }
};
