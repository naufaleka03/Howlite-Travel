const express = require('express');
const router = express.Router();
const loginController = require('../controllers/loginController');
const registerController = require('../controllers/registerController');

// Login route
router.get('/login', (req, res) => {
    res.render('login');
});

router.post('/login', loginController.login);

// Register route
router.post('/register', registerController.register);  // Changed from get to post

module.exports = router;