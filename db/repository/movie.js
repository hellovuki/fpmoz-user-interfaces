const fs = require('fs/promises');
const path = require('path');

const filePath = path.join(__dirname, '../data/movies.json');

async function getMovies() {
  const movies = await fs.readFile(filePath);

  return JSON.parse(movies);
}

async function getRandomMovie() {
  const movies = await getMovies();

  const randomGuess = Math.floor(Math.random() * movies.length);

  return movies[randomGuess];
}

module.exports = {
  getMovies,
  getRandomMovie,
};
