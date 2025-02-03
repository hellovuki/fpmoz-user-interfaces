const fs = require('fs/promises');
const createID = require('../../utils/createID');
const z = require('zod');
const path = require('path');
const AppError = require('../../utils/appError');

const filePath = path.join(__dirname, '../data/cities.json');

const CityCreateSchema = z
  .object({
    name: z.string().min(1),
    description: z.string().min(1),
    country: z.string().min(1),
    settledYear: z.number(),
    consolidatedYear: z.number(),
    population: z.number(),
    zipCode: z.number(),
    imageUrl: z.string().min(1),
  })
  .strict();

const CityUpdateSchema = z
  .object({
    name: z.string().min(1),
    description: z.string().min(1),
    country: z.string().min(1),
    settledYear: z.number(),
    consolidatedYear: z.number(),
    population: z.number(),
    zipCode: z.number(),
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

async function fetchCities() {
  const cities = await fs.readFile(filePath);

  return JSON.parse(cities);
}

function saveCities(cities) {
  return fs.writeFile(filePath, JSON.stringify(cities));
}

async function create(city) {
  CityCreateSchema.parse(city);

  const cities = await fetchCities();

  if (cities.some((c) => c.name === city.name)) {
    throw new AppError('This animal is already added!', 400);
  }

  const id = createID();

  const newCity = {
    id,
    ...city,
  };

  cities.push(newCity);

  await saveCities(cities);

  return newCity;
}

async function findOne(key, value) {
  const cities = await fetchCities();

  const selectedCity = cities.find((u) => u[key] === value);

  return selectedCity;
}

async function finOneAndUpdate(key, value, data) {
  CityUpdateSchema.parse(data);

  const selectedCity = await findOne(key, value);

  Object.keys(data).forEach((key) => {
    selectedCity[key] = data[key];
  });

  const cities = await fetchCities();

  const updatedCities = cities.map((c) =>
    c.id === selectedCity.id ? selectedCity : c
  );

  await saveCities(updatedCities);

  return selectedCity;
}

async function findOneAndDelete(key, value) {
  const selectedCity = await findOne(key, value);

  const cities = await fetchCities();

  const filteredCities = cities.filter((a) => a[key] !== value);

  await saveCities(filteredCities);

  return selectedCity;
}

async function getAll(options = {}) {
  const sortBy = options.sortBy || 'name';
  const sortType = ['ASC', 'DESC'].includes(options.sortType)
    ? options.sortType
    : 'ASC';

  const cities = await fetchCities();

  return cities.sort(universalSort(sortBy, sortType)).map((c) => ({
    id: c.id,
    name: c.name,
    country: c.country,
    imageUrl: c.imageUrl,
  }));
}

module.exports = {
  create,
  findOne,
  getAll,
  finOneAndUpdate,
  findOneAndDelete,
};
