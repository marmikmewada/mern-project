// authMiddleware.js

const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Middleware for user authentication and authorization
exports.authenticateUser = async (req, res, next) => {
  try {
    // Extract token from Authorization header
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Authentication failed' });
    }

    // Verify token
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    if (!decodedToken) {
      return res.status(401).json({ message: 'Authentication failed' });
    }

    // Fetch user associated with the token
    const user = await User.findById(decodedToken.userId);
    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    // Attach user object to request
    req.user = user;
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Middleware for admin authorization
exports.authorizeAdmin = (req, res, next) => {
  try {
    // Check if user is an admin
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
