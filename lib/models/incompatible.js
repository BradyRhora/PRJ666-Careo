import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let incompatibleSchema = new Schema({
  ingredient_id: {
    type: String,
    unique: true,
  },
  incompatible_ingredients: [String],
});

export const Incompatible = mongoose.models.Incompatibilities || mongoose.model('Incompatibilities', incompatibleSchema, 'Incompatibilities');

// Get all ingredient IDs for ingredients that are incompatible with the given ingredient ID
export const getIncompatibilitiesByIngredientId = async function(id) {
  try {
    const incompats = await Incompatible.findOne({ingredient_id: id}).lean();
    return incompats.incompatible_ingredients;
  } catch(err) {
    throw new Error("Could not find incompatibilities for ingredient ID.");
  }
  

}