const fs = require('fs/promises');
const createID = require('../../utils/createID');
const z = require('zod');
const path = require('path');
const AppError = require('../../utils/appError');

const filePath = path.join(__dirname, '../data/recipes.json');

const RecipeCreateSchema = z
  .object({
    name: z.string().min(1),
    description: z.string().min(1),
    ingredients: z.array(z.string()),
    instructions: z.array(z.string()),
    imageUrl: z.string().min(1),
  })
  .strict();

const RecipeUpdateSchema = z
  .object({
    name: z.string().min(1),
    description: z.string().min(1),
    ingredients: z.array(z.string()),
    instructions: z.array(z.string()),
    imageUrl: z.string().min(1),
  })
  .partial()
  .strict();

function universalSort(key, order = 'ASC') {
  return (a, b) => {
    if (a[key] === undefined || b[key] === undefined) return 0; // Handle missing values

    if (typeof a[key] === 'number' && typeof b[key] === 'number') {
      return order === 'ASC' ? a[key] - b[key] : b[key] - a[key];
    }

    if (typeof a[key] === 'string' && typeof b[key] === 'string') {
      return order === 'ASC'
        ? a[key].localeCompare(b[key])
        : b[key].localeCompare(a[key]);
    }

    return 0;
  };
}

async function fetchRecipes() {
  const recipes = await fs.readFile(filePath);

  return JSON.parse(recipes);
}

function saveRecipes(recipes) {
  return fs.writeFile(filePath, JSON.stringify(recipes));
}

async function create(recipe) {
  RecipeCreateSchema.parse(recipe);

  const recipes = await fetchRecipes();

  if (recipes.some((r) => r.name === recipe.name)) {
    throw new AppError('This recipe is already added!', 400);
  }

  const id = createID();

  const newRecipe = {
    id,
    ...recipe,
  };

  recipes.push(newRecipe);

  await saveRecipes(recipes);

  return newRecipe;
}

async function findOne(key, value) {
  const recipes = await fetchRecipes();

  const selectedRecipe = recipes.find((u) => u[key] === value);

  return selectedRecipe;
}

async function finOneAndUpdate(key, value, data) {
  RecipeUpdateSchema.parse(data);

  const selectedRecipe = await findOne(key, value);

  Object.keys(data).forEach((key) => {
    selectedRecipe[key] = data[key];
  });

  const recipes = await fetchRecipes();

  const updatedRecipes = recipes.map((r) =>
    r.id === selectedRecipe.id ? selectedRecipe : r
  );

  await saveRecipes(updatedRecipes);

  return selectedRecipe;
}

async function findOneAndDelete(key, value) {
  const selectedRecipe = await findOne(key, value);

  const recipes = await fetchRecipes();

  const filteredRecipes = recipes.filter((r) => r[key] !== value);

  await saveRecipes(filteredRecipes);

  return selectedRecipe;
}

async function getAll(options = {}) {
  const sortBy = options.sortBy || 'name';
  const sortType = ['ASC', 'DESC'].includes(options.sortType)
    ? options.sortType
    : 'ASC';

  const recipes = await fetchRecipes();

  return recipes.sort(universalSort(sortBy, sortType)).map((a) => ({
    id: a.id,
    name: a.name,
    imageUrl: a.imageUrl,
  }));
}

module.exports = {
  create,
  findOne,
  getAll,
  finOneAndUpdate,
  findOneAndDelete,
};
