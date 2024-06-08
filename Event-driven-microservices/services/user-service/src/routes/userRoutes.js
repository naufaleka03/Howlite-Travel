const express = require('express');
const router = express.Router();

// Import controllers
const userViewsController = require('../controllers/userViewsController');
const userApiController = require('../controllers/userAPIController');


// View route for displaying users
router.get('/users', userViewsController.showUsersPage);

// API routes for managing users
router.get('/api/users', userApiController.getAllUsers);
router.get('/api/users/:id', userApiController.getUser);
router.post('/api/users', userApiController.createUser);
router.put('/api/users/:id', userApiController.updateUser);
router.delete('/api/users/:id', userApiController.deleteUser);

module.exports = router;