const catchAsync = require('../utils/catchAsync');
const cityRepository = require('../db/repository/city');

exports.createCity = catchAsync(async (req, res) => {
  const newCity = await cityRepository.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      city: newCity,
    },
  });
});

exports.getCities = catchAsync(async (req, res) => {
  const cities = await cityRepository.getAll(req.query);

  res.status(200).json({
    status: 'success',
    data: {
      cities,
    },
  });
});

exports.getCity = catchAsync(async (req, res) => {
  const city = await cityRepository.findOne('id', req.params.id);

  res.status(200).json({
    status: 'success',
    data: {
      city,
    },
  });
});

exports.updateCity = catchAsync(async (req, res) => {
  const city = await cityRepository.finOneAndUpdate(
    'id',
    req.params.id,
    req.body
  );

  res.status(200).json({
    status: 'success',
    data: {
      city,
    },
  });
});

exports.deleteCity = catchAsync(async (req, res) => {
  const city = await cityRepository.findOneAndDelete('id', req.params.id);

  res.status(204).json({
    status: 'success',
    data: {
      city,
    },
  });
});
