import apiConfig from './config'

async function getRandomMovie() {
  const response = await apiConfig.get('/movies/random')

  console.log(response)
}

const movieApi = {
  getRandomMovie,
}

export default movieApi
