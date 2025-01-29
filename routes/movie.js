const express = require('express');
const movieController = require('../controller/movie');
const authController = require('../controller/auth');

const router = express.Router();
router.get('/random', authController.protect, movieController.getRandomMovie);

module.exports = router;
