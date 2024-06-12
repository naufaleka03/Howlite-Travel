const express = require('express');
const router = express.Router();
const loginController = require('../controllers/loginController');
const registerController = require('../controllers/registerController');

// Login route
router.get('/login', (req, res) => {
    const message = req.query.success ? "Registration successful, please log in." : "";
    res.render('login', { message: message });
});

router.post('/login', loginController.login);

// Register route
router.get('/register', (req, res) => {
    res.render('register');
});

router.post('/register', registerController.register);

module.exports = router;