const catchAsync = require('../utils/catchAsync');
const marvelHeroRepository = require('../db/repository/marvelHero');

exports.createMarvelHero = catchAsync(async (req, res) => {
  const newMarvelhero = await marvelHeroRepository.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      marvelhero: newMarvelhero,
    },
  });
});

exports.getMarvelHeroes = catchAsync(async (req, res) => {
  const marvelHeroes = await marvelHeroRepository.getAll(req.query);

  res.status(200).json({
    status: 'success',
    data: {
      marvelHeroes,
    },
  });
});

exports.getMarvelHero = catchAsync(async (req, res) => {
  const marvelHero = await marvelHeroRepository.findOne('id', req.params.id);

  res.status(200).json({
    status: 'success',
    data: {
      marvelHero,
    },
  });
});

exports.updateMarvelHero = catchAsync(async (req, res) => {
  const marvelHero = await marvelHeroRepository.finOneAndUpdate(
    'id',
    req.params.id,
    req.body
  );

  res.status(200).json({
    status: 'success',
    data: {
      marvelHero,
    },
  });
});

exports.deleteMarvelHero = catchAsync(async (req, res) => {
  const marvelHero = await marvelHeroRepository.findOneAndDelete(
    'id',
    req.params.id
  );

  res.status(204).json({
    status: 'success',
    data: {
      marvelHero,
    },
  });
});
