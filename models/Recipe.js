const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recipeSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    ingredients: {
      type: Array,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    user: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Recipe = mongoose.model('Recipe', recipeSchema);
module.exports = Recipe;
