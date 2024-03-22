// Coupon.js

const mongoose = require('mongoose');

const couponSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },
  discountType: { type: String, enum: ['percentage', 'fixed'], required: true },
  discountAmount: { type: Number, required: true },
  expiryDate: { type: Date, required: true },
  // Add more fields as needed for coupon details
}, { timestamps: true });

module.exports = mongoose.model('Coupon', couponSchema);
