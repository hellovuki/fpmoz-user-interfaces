const catchAsync = require('../utils/catchAsync');
const categoryRepository = require('../db/repository/category');

exports.getCategories = catchAsync(async (req, res) => {
  const { includeMovies } = req.query;

  const withMovies = includeMovies === 'true';
  const categories = await categoryRepository.getCategories(withMovies);

  res.status(200).json({
    status: 'success',
    data: {
      categories,
    },
  });
});
