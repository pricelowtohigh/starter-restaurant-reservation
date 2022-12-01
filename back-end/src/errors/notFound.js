/**
 * Express API "Not found" handler.
 */
function notFound(req, res, next) {
  next({ status: 404, message: `Pathe not found: ${req.originalUrl}` });
}

module.exports = notFound;
