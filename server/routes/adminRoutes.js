const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { authenticateUser, authorizeAdmin } = require('../middlewares/authMiddleware');
const { sanitize } = require('../middlewares/sanitizationMiddleware'); // Import the sanitization middleware

// Routes for admin user management
router.post('/users', authenticateUser, authorizeAdmin, sanitize, adminController.createUser);
router.get('/users', authenticateUser, authorizeAdmin, sanitize, adminController.getAllUsers);
router.get('/users/:id', authenticateUser, authorizeAdmin, sanitize, adminController.getUserById);
router.put('/users/:id', authenticateUser, authorizeAdmin, sanitize, adminController.updateUser);
router.delete('/users/:id', authenticateUser, authorizeAdmin, sanitize, adminController.deleteUser);

module.exports = router;
