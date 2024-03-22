// productController.js

const Product = require('../models/Product');

// Function to create a new product
exports.createProduct = async (req, res) => {
  try {
    const { name, description, price, category } = req.body;

    // Create a new product
    const newProduct = new Product({ name, description, price, category });
    await newProduct.save();

    res.status(201).json({ message: 'Product created successfully', product: newProduct });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Function to get all products
exports.getAllProducts = async (req, res) => {
  try {
    // Fetch all products
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Function to get a product by ID
exports.getProductById = async (req, res) => {
  try {
    const productId = req.params.id;

    // Find product by ID
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Function to update a product
exports.updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const { name, description, price, category } = req.body;

    // Update product
    const updatedProduct = await Product.findByIdAndUpdate(productId, { name, description, price, category }, { new: true });
    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json({ message: 'Product updated successfully', product: updatedProduct });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Function to delete a product
exports.deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;

    // Delete product
    const deletedProduct = await Product.findByIdAndDelete(productId);
    if (!deletedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
