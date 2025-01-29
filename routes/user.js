const express = require('express');
const authController = require('../controller/auth');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Operations related to users
 */

/**
 * @swagger
 * /users/signup:
 *   post:
 *     tags: [Users]
 *     summary: Create a new account
 *     description: Create a new user in the system.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#../docs/schemas/UserCreate'
 *     responses:
 *       201:
 *         description: User created successfully.
 *
 */

router.post('/signup', authController.signup);
router.post('/login', authController.login);

module.exports = router;
