const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { authenticateUser, authorizeAdmin } = require('../middlewares/authMiddleware');
const { sanitize } = require('../middlewares/sanitizationMiddleware'); // Import the sanitization middleware

// Routes for product management
router.post('/products', authenticateUser, authorizeAdmin, sanitize, productController.createProduct);
router.get('/products', authenticateUser, sanitize, productController.getAllProducts);
router.get('/products/:id', authenticateUser, sanitize, productController.getProductById);
router.put('/products/:id', authenticateUser, authorizeAdmin, sanitize, productController.updateProduct);
router.delete('/products/:id', authenticateUser, authorizeAdmin, sanitize, productController.deleteProduct);

module.exports = router;
