const fs = require('fs/promises');
const path = require('path');
const movieRepository = require('../repository/movie');

const filePath = path.join(__dirname, '../data/categories.json');

async function getCategories(includeMovies) {
  const categories = JSON.parse(await fs.readFile(filePath));

  if (!includeMovies) {
    return categories;
  }

  const movies = await movieRepository.getMovies();

  categoriesWithMovies = categories.map((category) => {
    const selectedMovies = movies.filter(
      (movie) => movie.categoryId === category.id
    );

    return {
      ...category,
      movies: selectedMovies,
    };
  });

  return categoriesWithMovies;
}

module.exports = {
  getCategories,
};
