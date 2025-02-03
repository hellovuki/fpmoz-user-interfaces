const express = require('express');
const authController = require('../controller/auth');
const animalController = require('../controller/animal');

const router = express.Router();
router
  .route('/')
  .post(authController.protect, animalController.createAnimal)
  .get(authController.protect, animalController.getAnimals);

router
  .route('/:id')
  .get(authController.protect, animalController.getAnimal)
  .patch(authController.protect, animalController.updateAnimal)
  .delete(authController.protect, animalController.deleteAnimal);

module.exports = router;
