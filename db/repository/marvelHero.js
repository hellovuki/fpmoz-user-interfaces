const fs = require('fs/promises');
const createID = require('../../utils/createID');
const z = require('zod');
const path = require('path');
const AppError = require('../../utils/appError');

const filePath = path.join(__dirname, '../data/marvelHeroes.json');

const MarvelHeroCreateSchema = z
  .object({
    name: z.string().min(1),
    fullName: z.string().min(1),
    bio: z.string().min(1),
    actor: z.string().min(1),
    createdBy: z.string().min(1),
    abilities: z.array(z.string()),
    imageUrl: z.string().min(1),
  })
  .strict();

const MarvelHeroUpdateSchema = z
  .object({
    name: z.string().min(1),
    fullName: z.string().min(1),
    bio: z.string().min(1),
    actor: z.string().min(1),
    createdBy: z.string().min(1),
    abilities: z.array(z.string()),
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

async function fetchMarvelHeroes() {
  const marvelHeroes = await fs.readFile(filePath);

  return JSON.parse(marvelHeroes);
}

function saveMarvelHeroes(marvelHeroes) {
  return fs.writeFile(filePath, JSON.stringify(marvelHeroes));
}

async function create(marvelHero) {
  MarvelHeroCreateSchema.parse(marvelHero);

  const marvelHeroes = await fetchMarvelHeroes();

  if (marvelHeroes.some((mh) => mh.name === marvelHero.name)) {
    throw new AppError('This hero is already added!', 400);
  }

  const id = createID();

  const newMarvelHero = {
    id,
    ...marvelHero,
  };

  marvelHeroes.push(newMarvelHero);

  await saveMarvelHeroes(marvelHeroes);

  return newMarvelHero;
}

async function findOne(key, value) {
  const marvelHeroes = await fetchMarvelHeroes();

  const selectedMarvelHero = marvelHeroes.find((u) => u[key] === value);

  return selectedMarvelHero;
}

async function finOneAndUpdate(key, value, data) {
  MarvelHeroUpdateSchema.parse(data);

  const selectedMarvelHero = await findOne(key, value);

  Object.keys(data).forEach((key) => {
    selectedMarvelHero[key] = data[key];
  });

  const marvelHeroes = await fetchMarvelHeroes();

  const updatedMarvelHeroes = marvelHeroes.map((mh) =>
    mh.id === selectedMarvelHero.id ? selectedMarvelHero : mh
  );

  await saveMarvelHeroes(updatedMarvelHeroes);

  return selectedMarvelHero;
}

async function findOneAndDelete(key, value) {
  const selectedMarvelHero = await findOne(key, value);

  const marvelHeroes = await fetchMarvelHeroes();

  const filteredMarvelHeroes = marvelHeroes.filter((mh) => mh[key] !== value);
  await saveMarvelHeroes(filteredMarvelHeroes);

  return selectedMarvelHero;
}

async function getAll(options = {}) {
  const sortBy = options.sortBy || 'name';
  const sortType = ['ASC', 'DESC'].includes(options.sortType)
    ? options.sortType
    : 'ASC';

  const marvelHeroes = await fetchMarvelHeroes();

  return marvelHeroes.sort(universalSort(sortBy, sortType)).map((mh) => ({
    id: mh.id,
    name: mh.name,
    fullName: mh.fulName,
    imageUrl: mh.imageUrl,
  }));
}

module.exports = {
  create,
  findOne,
  getAll,
  finOneAndUpdate,
  findOneAndDelete,
};
