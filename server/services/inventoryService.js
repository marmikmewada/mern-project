// inventoryService.js

// Import necessary models
const Product = require('../models/Product');

// Service for managing inventory
exports.checkInventory = async (productId, quantity) => {
  try {
    // Retrieve product details
    const product = await Product.findById(productId);
    if (!product) {
      throw new Error('Product not found');
    }

    // Check if sufficient inventory is available
    const isAvailable = product.quantity >= quantity;

    // Return availability status and available quantity
    return {
      available: isAvailable,
      availableQuantity: isAvailable ? product.quantity : 0
    };
  } catch (error) {
    console.error('Error checking inventory:', error);
    throw new Error('Failed to check inventory');
  }
};
