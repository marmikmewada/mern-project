const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { authenticateUser } = require('../middlewares/authMiddleware');
const { sanitize } = require('../middlewares/sanitizationMiddleware'); // Import the sanitization middleware

// Routes for user authentication and profile management
router.post('/login', sanitize, userController.login);
router.post('/signup', sanitize, userController.signup);
router.get('/profile', authenticateUser, sanitize, userController.getProfile);
router.put('/profile', authenticateUser, sanitize, userController.updateProfile);
router.delete('/profile', authenticateUser, sanitize, userController.deleteAccount);

module.exports = router;
