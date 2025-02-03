const express = require('express');
const authController = require('../controller/auth');
const marvelHeroController = require('../controller/marvelHero');

const router = express.Router();
router
  .route('/')
  .post(authController.protect, marvelHeroController.createMarvelHero)
  .get(authController.protect, marvelHeroController.getMarvelHeroes);

router
  .route('/:id')
  .get(authController.protect, marvelHeroController.getMarvelHero)
  .patch(authController.protect, marvelHeroController.updateMarvelHero)
  .delete(authController.protect, marvelHeroController.deleteMarvelHero);

module.exports = router;
