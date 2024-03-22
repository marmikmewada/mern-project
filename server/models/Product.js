// Product.js

const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  // Add more fields as needed for product attributes
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
