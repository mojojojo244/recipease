const Recipe = require('../models/Recipe');

const recipe_index = (req, res) => {
  Recipe.find()
    .sort({ createdAt: -1 })
    .then((result) => {
      res.render('recipes', { recipes: result, title: 'All Recipes' });
    })
    .catch((err) => {
      console.log(err);
    });
};

const recipe_details = (req, res) => {
  const id = req.params.id;
  Recipe.findById(id)
    .then((result) => {
      res.render('details', { recipe: result, title: 'Recipe Details' });
    })
    .catch((err) => {
      console.log(err);
      res.render('404', { title: 'Recipe Not Found' });
    });
};

const recipe_create_get = (req, res) => {
  res.render('create', { title: 'Create a new recipe' });
};

const recipe_create_post = (req, res) => {
  const ingArr = [];
  const count = req.body.numIngredients;
  for (let i = 0; i < count; i++) {
    ingArr[i] = {
      ingredient: req.body.ingredientName[i],
      qty: req.body.ingredientQty[i],
      qtyType: req.body.qtyType[i],
    };
  }
  const newRecipe = {
    title: req.body.title,
    ingredients: ingArr,
    body: req.body.body,
  };
  console.log(newRecipe);
  const recipe = new Recipe(newRecipe);
  recipe
    .save()
    .then((result) => {
      res.redirect('/recipes');
    })
    .catch((err) => {
      console.log(err);
    });
};

const recipe_delete = (req, res) => {
  const id = req.params.id;
  Recipe.findByIdAndDelete(id)
    .then((result) => {
      res.json({ redirect: '/recipes' });
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = {
  recipe_index,
  recipe_details,
  recipe_create_get,
  recipe_create_post,
  recipe_delete,
};
