import apiConfig from './config';

async function getCategoriesWithMovies() {
  const response = await apiConfig.get('/categories/?includeMovies=true');

  const {
    data: { categories },
  } = response.data;

  return categories;
}

const categoryApi = {
  getCategoriesWithMovies,
};

export default categoryApi;
