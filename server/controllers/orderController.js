// orderController.js

const Order = require('../models/Order');
const Product = require('../models/Product');

// Function to create a new order
exports.createOrder = async (req, res) => {
  try {
    const { userId, products } = req.body;

    // Calculate total price and validate product IDs
    let totalPrice = 0;
    const productIds = products.map(product => product.productId);
    const validProductIds = await Product.find({ _id: { $in: productIds } });

    if (validProductIds.length !== productIds.length) {
      return res.status(400).json({ message: 'Invalid product IDs' });
    }

    products.forEach(product => {
      const validProduct = validProductIds.find(p => p._id.toString() === product.productId);
      totalPrice += validProduct.price * product.quantity;
    });

    // Create a new order
    const newOrder = new Order({ userId, products, totalPrice });
    await newOrder.save();

    res.status(201).json({ message: 'Order created successfully', order: newOrder });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Function to get all orders
exports.getAllOrders = async (req, res) => {
  try {
    // Fetch all orders
    const orders = await Order.find();
    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Function to get orders by user ID
exports.getOrdersByUser = async (req, res) => {
  try {
    const userId = req.params.userId;

    // Fetch orders by user ID
    const orders = await Order.find({ userId });
    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
