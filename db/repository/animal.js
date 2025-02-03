const fs = require('fs/promises');
const createID = require('../../utils/createID');
const z = require('zod');
const path = require('path');
const AppError = require('../../utils/appError');

const filePath = path.join(__dirname, '../data/animals.json');

const AnimalCreateSchema = z
  .object({
    name: z.string().min(1),
    description: z.string().min(1),
    group: z.string().min(1),
    diet: z.string().min(1),
    nameOfYoung: z.string().min(1),
    continents: z.array(z.string()),
    averageLifespanInMinutes: z.number(),
    biggestThreat: z.string().min(1),
    imageUrl: z.string().min(1),
  })
  .strict();

const AnimalUpdateSchema = z
  .object({
    name: z.string().min(1),
    description: z.string().min(1),
    group: z.string().min(1),
    diet: z.string().min(1),
    nameOfYoung: z.string().min(1),
    continents: z.array(z.string()),
    averageLifespanInMinutes: z.number(),
    biggestThreat: z.string().min(1),
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

async function fetchAnimals() {
  const animals = await fs.readFile(filePath);

  return JSON.parse(animals);
}

function saveAnimals(animals) {
  return fs.writeFile(filePath, JSON.stringify(animals));
}

async function create(animal) {
  AnimalCreateSchema.parse(animal);

  const animals = await fetchAnimals();

  if (animals.some((a) => a.name === animal.name)) {
    throw new AppError('This animal is already added!', 400);
  }

  const id = createID();

  const newAnimal = {
    id,
    ...animal,
  };

  animals.push(newAnimal);

  await saveAnimals(animals);

  return newAnimal;
}

async function findOne(key, value) {
  const animals = await fetchAnimals();

  const selectedAnimal = animals.find((u) => u[key] === value);

  return selectedAnimal;
}

async function finOneAndUpdate(key, value, data) {
  AnimalUpdateSchema.parse(data);

  const selectedAnimal = await findOne(key, value);

  Object.keys(data).forEach((key) => {
    selectedAnimal[key] = data[key];
  });

  const animals = await fetchAnimals();

  const updatedAnimals = animals.map((a) =>
    a.id === selectedAnimal.id ? selectedAnimal : a
  );

  await saveAnimals(updatedAnimals);

  return selectedAnimal;
}

async function findOneAndDelete(key, value) {
  const selectedAnimal = await findOne(key, value);

  const animals = await fetchAnimals();

  const filteredAnimals = animals.filter((a) => a[key] !== value);

  await saveAnimals(filteredAnimals);

  return selectedAnimal;
}

async function getAll(options = {}) {
  const sortBy = options.sortBy || 'name';
  const sortType = ['ASC', 'DESC'].includes(options.sortType)
    ? options.sortType
    : 'ASC';

  const animals = await fetchAnimals();

  return animals.sort(universalSort(sortBy, sortType)).map((a) => ({
    id: a.id,
    name: a.name,
    group: a.group,
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
