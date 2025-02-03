const catchAsync = require('../utils/catchAsync');
const recipeRepository = require('../db/repository/recipe');

exports.createRecipe = catchAsync(async (req, res) => {
  const newRecipe = await recipeRepository.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      recipe: newRecipe,
    },
  });
});

exports.getRecipes = catchAsync(async (req, res) => {
  const recipes = await recipeRepository.getAll(req.query);

  res.status(200).json({
    status: 'success',
    data: {
      recipes,
    },
  });
});

exports.getRecipe = catchAsync(async (req, res) => {
  const recipe = await recipeRepository.findOne('id', req.params.id);

  res.status(200).json({
    status: 'success',
    data: {
      recipe,
    },
  });
});

exports.updateRecipe = catchAsync(async (req, res) => {
  const recipe = await recipeRepository.finOneAndUpdate(
    'id',
    req.params.id,
    req.body
  );

  res.status(200).json({
    status: 'success',
    data: {
      recipe,
    },
  });
});

exports.deleteRecipe = catchAsync(async (req, res) => {
  const recipe = await recipeRepository.findOneAndDelete('id', req.params.id);

  res.status(204).json({
    status: 'success',
    data: {
      recipe,
    },
  });
});
