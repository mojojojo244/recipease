const express = require('express');
const recipeController = require('../controllers/recipeController');
const { requireAuth } = require('../middleware/authMiddleware');
const multer = require('multer');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads');
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString() + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: fileFilter,
});

const router = express.Router();

router.get('/edit/:id', requireAuth, recipeController.recipe_edit_get);
router.post('/edit', requireAuth, recipeController.recipe_edit_post);
router.get('/create', requireAuth, recipeController.recipe_create_get);
router.get('/myRecipes', requireAuth, recipeController.myRecipes_get);
router.get('/', recipeController.recipe_index);
router.post('/', upload.single('image'), recipeController.recipe_create_post);
router.get('/:id', recipeController.recipe_details);
router.delete('/:id', recipeController.recipe_delete);

module.exports = router;
