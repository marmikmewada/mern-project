const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const { authenticateUser } = require('../middlewares/authMiddleware');
const { sanitize } = require('../middlewares/sanitizationMiddleware'); // Import the sanitization middleware

// Routes for order management
router.post('/orders', authenticateUser, sanitize, orderController.createOrder);
router.get('/orders', authenticateUser, sanitize, orderController.getAllOrders);
router.get('/orders/:id', authenticateUser, sanitize, orderController.getOrderById);
router.put('/orders/:id', authenticateUser, sanitize, orderController.updateOrder);
router.delete('/orders/:id', authenticateUser, sanitize, orderController.deleteOrder);

module.exports = router;
