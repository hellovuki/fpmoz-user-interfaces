const express = require('express');
const authController = require('../controller/auth');

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.get('/me', authController.protect, authController.getMe);

module.exports = router;
