const express = require('express');
const router = express.Router();
const loginController = require('../controllers/loginController');
const registerController = require('../controllers/registerController');

// Login route
router.get('/login', loginController.login);

// Register route
router.post('/register', registerController.register);

module.exports = router;