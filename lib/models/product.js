// Product model

import mongoose from 'mongoose';

const Schema = mongoose.Schema;

// TODO: should we add arrays of conditions that are recommended and not recommended for faster searching?
let productSchema = new Schema({
  name: {
    type: String,
    unique: true,
  },
  brand: String,
  type: String,
  is_cruelty_free: Boolean,
  is_vegan: Boolean,
  price: Number,
  image: String,
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

export const getAllProducts = async function() {
  try {
    const products = await Product.find({});
    return products;
  } catch(err) {
    throw new Error("Could not retrieve products.");
  }
}

/*
// Filter must be JSON matching one or more product elements
export const getAllProductsWitIngredient= async function(ingredient) {
  try {
    const products = await Product.find(filter);
    return products;
  } catch(err) {
    throw new Error("Could not find products matching filter");
  }
}
*/