/**
 * Standardized API response utilities.
 *
 * Centralizing response shape ensures every endpoint returns a consistent
 * JSON structure. This makes frontend error handling predictable and
 * simplifies API documentation.
 *
 * Standard shape:
 *   { success: boolean, message: string, data?: any }
 */

/**
 * Sends a successful JSON response.
 *
 * @param {import('express').Response} res
 * @param {*} data - The payload to include in `data`
 * @param {string} message - Human-readable success message
 * @param {number} statusCode - HTTP status code (default 200)
 */
export const sendSuccess = (res, data = null, message = 'Success', statusCode = 200) => {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
  });
};

/**
 * Creates a structured application error.
 * Throw the returned error and let the central error handler format the response.
 *
 * @param {string} message - Human-readable error message
 * @param {number} statusCode - HTTP status code
 * @returns {Error}
 */
export const createAppError = (message, statusCode = 500) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
};
