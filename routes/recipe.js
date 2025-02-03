const express = require('express');
const authController = require('../controller/auth');
const recipeController = require('../controller/recipe');

const router = express.Router();
router
  .route('/')
  .post(authController.protect, recipeController.createRecipe)
  .get(authController.protect, recipeController.getRecipes);

router
  .route('/:id')
  .get(authController.protect, recipeController.getRecipe)
  .patch(authController.protect, recipeController.updateRecipe)
  .delete(authController.protect, recipeController.deleteRecipe);

module.exports = router;
