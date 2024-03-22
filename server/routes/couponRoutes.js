const express = require('express');
const router = express.Router();
const couponController = require('../controllers/couponController');
const { authenticateUser, authorizeAdmin } = require('../middlewares/authMiddleware');
const { sanitize } = require('../middlewares/sanitizationMiddleware'); // Import the sanitization middleware

// Routes for coupon management
router.post('/coupons', authenticateUser, authorizeAdmin, sanitize, couponController.createCoupon);
router.get('/coupons', authenticateUser, authorizeAdmin, sanitize, couponController.getAllCoupons);
router.get('/coupons/:id', authenticateUser, authorizeAdmin, sanitize, couponController.getCouponById);
router.put('/coupons/:id', authenticateUser, authorizeAdmin, sanitize, couponController.updateCoupon);
router.delete('/coupons/:id', authenticateUser, authorizeAdmin, sanitize, couponController.deleteCoupon);

module.exports = router;
