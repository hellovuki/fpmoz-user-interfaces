const catchAsync = require('../utils/catchAsync');
const movieRepository = require('../db/repository/movie');

exports.getRandomMovie = catchAsync(async (req, res) => {
  const randomMovie = await movieRepository.getRandomMovie();

  res.status(200).json({
    status: 'success',
    data: {
      movie: randomMovie,
    },
  });
});
