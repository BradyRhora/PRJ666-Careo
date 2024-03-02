// Ingredient model

import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let ingredientSchema = new Schema({
  name: {
    type: String,
    unique: true,
  },
  description: String,
});

export const Ingredient = mongoose.models.Ingredient || mongoose.model('ingredient', ingredientSchema);

// Accepts a ingredient id
export const getIngredientById = async function(id) {
  try {
    const ingredient = await Ingredient.FindById(id);
    return ingredient;
  } catch(err) {
    throw new Error("Could not find product ID.");
  }
}

export const getAllIngredients = async function() {
  try {
    const ingredients = await Ingredient.find({});
    return ingredients;
  } catch(err) {
    throw new Error("Error retrieving all ingredients.");
  }
}