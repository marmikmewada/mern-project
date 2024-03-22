// couponController.js

const Coupon = require('../models/Coupon');

// Function to create a new coupon
exports.createCoupon = async (req, res) => {
  try {
    const { code, discount, expiryDate } = req.body;

    // Check if the coupon code already exists
    const existingCoupon = await Coupon.findOne({ code });
    if (existingCoupon) {
      return res.status(400).json({ message: 'Coupon code already exists' });
    }

    // Create a new coupon
    const newCoupon = new Coupon({ code, discount, expiryDate });
    await newCoupon.save();

    res.status(201).json({ message: 'Coupon created successfully', coupon: newCoupon });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Function to get all coupons
exports.getAllCoupons = async (req, res) => {
  try {
    // Fetch all coupons
    const coupons = await Coupon.find();
    res.json(coupons);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Function to delete a coupon
exports.deleteCoupon = async (req, res) => {
  try {
    const couponId = req.params.id;

    // Delete coupon
    const deletedCoupon = await Coupon.findByIdAndDelete(couponId);
    if (!deletedCoupon) {
      return res.status(404).json({ message: 'Coupon not found' });
    }

    res.json({ message: 'Coupon deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
