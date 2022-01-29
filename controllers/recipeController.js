const Recipe = require('../models/Recipe');
const fs = require('fs');

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
  const count = req.body.ingredientName.length;
  for (let i = 0; i < count; i++) {
    ingArr[i] = {
      ingredient: req.body.ingredientName[i],
      qty: req.body.ingredientQty[i],
      qtyType: req.body.qtyType[i],
    };
  }
  const newRecipe = {
    title: req.body.title,
    category: req.body.category,
    ingredients: ingArr,
    body: req.body.body,
    user: res.locals.user.username,
    image: req.file.path,
  };
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

const myRecipes_get = (req, res) => {
  const user = res.locals.user.username;

  Recipe.find({ user: user })
    .sort({ createdAt: -1 })
    .then((result) => {
      res.render('myRecipes', { recipes: result, title: 'My Recipes' });
    })
    .catch((err) => {
      console.log(err);
    });
};

const recipe_edit_get = (req, res) => {
  const id = req.params.id;
  Recipe.findById(id)
    .then((result) => {
      res.render('edit', { recipe: result, title: 'Edit Recipe' });
    })
    .catch((err) => {
      console.log(err);
      res.render('404', { title: 'Recipe Not Found' });
    });
};

const recipe_edit_put = async (req, res) => {
  const ingArr = [];
  const count = req.body.ingredientName.length;
  for (let i = 0; i < count; i++) {
    ingArr[i] = {
      ingredient: req.body.ingredientName[i],
      qty: req.body.ingredientQty[i],
      qtyType: req.body.qtyType[i],
    };
  }
  let recipe = await Recipe.findById(req.params.id);
  recipe.title = req.body.title;
  recipe.category = req.body.category;
  recipe.ingredients = ingArr;
  recipe.body = req.body.body;
  recipe.user = res.locals.user.username;
  recipe.image = req.file.path;

  recipe
    .save()
    .then((result) => {
      res.redirect('/recipes/myRecipes');
    })
    .catch((err) => {
      console.log(err);
    });
};

const recipe_delete = (req, res) => {
  const id = req.params.id;
  const path = req.body.path;
  Recipe.findByIdAndDelete(id)
    .then((result) => {
      res.redirect('/recipes/myRecipes');
    })
    .catch((err) => {
      console.log(err);
    });
  fs.unlink(path, (err) => {
    if (err) {
      console.log(err);
      return;
    }
  });
};

const recipe_category_get = (req, res) => {
  const category = req.params.category;

  Recipe.find({ category: category })
    .sort({ createdAt: -1 })
    .then((result) => {
      res.render('recipes', { recipes: result, title: 'My Recipes' });
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
  myRecipes_get,
  recipe_delete,
  recipe_edit_get,
  recipe_edit_put,
  recipe_category_get,
};
