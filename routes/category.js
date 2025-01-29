const express = require('express');
const categoryController = require('../controller/category');
const authController = require('../controller/auth');

const router = express.Router();
router.route('/').get(authController.protect, categoryController.getCategories);

module.exports = router;
