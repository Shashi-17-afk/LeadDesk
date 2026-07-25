import { env } from '../config/env.js';

/**
 * Central error handling middleware.
 *
 * Must be the LAST middleware registered in app.js.
 * Express identifies error handlers by their 4-argument signature (err, req, res, next).
 *
 * All application errors should be thrown as objects with a `statusCode` property,
 * or created via `createAppError()` from utils/apiResponse.js.
 */
export const errorHandler = (err, req, res, _next) => {
  const statusCode = err.statusCode || err.status || 500;
  const message = err.message || 'Internal Server Error';

  // Always log server errors; avoid logging expected 4xx errors in production
  if (statusCode >= 500 || env.NODE_ENV === 'development') {
    console.error(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
    console.error(err);
  }

  res.status(statusCode).json({
    success: false,
    message,
    // Expose stack trace only in development — never in production
    ...(env.NODE_ENV === 'development' && { stack: err.stack }),
  });
};
