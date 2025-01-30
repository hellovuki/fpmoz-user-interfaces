import apiConfig from './config';

async function getRandomMovie() {
  const response = await apiConfig.get('/movies/random');

  const {
    data: { movie },
  } = response.data;

  return movie;
}

const movieApi = {
  getRandomMovie,
};

export default movieApi;
