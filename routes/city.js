const express = require('express');
const authController = require('../controller/auth');
const cityController = require('../controller/city');

const router = express.Router();
router
  .route('/')
  .post(authController.protect, cityController.createCity)
  .get(authController.protect, cityController.getCities);

router
  .route('/:id')
  .get(authController.protect, cityController.getCity)
  .patch(authController.protect, cityController.updateCity)
  .delete(authController.protect, cityController.deleteCity);

module.exports = router;
