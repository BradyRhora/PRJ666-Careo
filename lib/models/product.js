// Product model

import mongoose from 'mongoose';

const Schema = mongoose.Schema;

// TODO: should we add arrays of conditions that are recommended and not recommended for faster searching?
let productSchema = new Schema({
  id: {
    type: Number,
    unique: true,
  },
  name: String,
  description: String,
  ingredients: [String],
});

export const Product = mongoose.models.Product || mongoose.model('product', productSchema);

// Accepts a product id
export const getProduct = async function(id) {
  try {
    const product = await Product.FindById(id);
    return product;
  } catch(err) {
    throw new Error("Could not find product ID.");
  }
}

// TODO: add more functions