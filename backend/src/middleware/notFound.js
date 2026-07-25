/**
 * 404 Not Found handler.
 *
 * Catches any request that didn't match a defined route.
 * Must be registered AFTER all routes, but BEFORE the error handler.
 */
export const notFound = (req, res) => {
  res.status(404).json({
    success: false,
    message: `Cannot ${req.method} ${req.originalUrl}`,
  });
};
