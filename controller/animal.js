const catchAsync = require('../utils/catchAsync');
const animalRepository = require('../db/repository/animal');

exports.createAnimal = catchAsync(async (req, res) => {
  const newAnimal = await animalRepository.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      animal: newAnimal,
    },
  });
});

exports.getAnimals = catchAsync(async (req, res) => {
  const animals = await animalRepository.getAll(req.query);

  res.status(200).json({
    status: 'success',
    data: {
      animals,
    },
  });
});

exports.getAnimal = catchAsync(async (req, res) => {
  const animal = await animalRepository.findOne('id', req.params.id);

  res.status(200).json({
    status: 'success',
    data: {
      animal,
    },
  });
});

exports.updateAnimal = catchAsync(async (req, res) => {
  const animal = await animalRepository.finOneAndUpdate(
    'id',
    req.params.id,
    req.body
  );

  res.status(200).json({
    status: 'success',
    data: {
      animal,
    },
  });
});

exports.deleteAnimal = catchAsync(async (req, res) => {
  const animal = await animalRepository.findOneAndDelete('id', req.params.id);

  res.status(204).json({
    status: 'success',
    data: {
      animal,
    },
  });
});
