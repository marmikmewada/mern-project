// sanitizationMiddleware.js

const { body, validationResult } = require('express-validator');

// Middleware for sanitizing request data
exports.sanitizeData = (req, res, next) => {
  // Sanitize request body
  body().trim().escape();

  // Sanitize request query parameters
  req.query = { ...req.query }; // Clone the query object
  for (const key in req.query) {
    req.query[key] = req.sanitizeQuery(key).trim().escape();
  }

  // Sanitize request headers
  // Add sanitization logic for headers if needed

  next();
};

// Middleware for validating sanitized data
exports.validateData = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};
