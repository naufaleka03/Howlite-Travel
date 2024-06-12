const express = require('express');
const router = express.Router();

// Import controllers
const userViewsController = require('../controllers/userViewsController');
const userApiController = require('../controllers/userApiController');
const methodOverride = require('method-override');
router.use(methodOverride('_method'));


// router.get('/users', userViewsController.showUsersPage);
router.get('/profile/:userId', userViewsController.showUserProfile);
router.get('/profile/:userId/edit', userViewsController.editUserProfile);
router.post('/profile/:userId/update', userViewsController.updateUserProfile);

// API routes for managing users
router.get('/api/users', userApiController.getAllUsers);
router.get('/api/users/:id', userApiController.getUser);
router.post('/api/users', userApiController.createUser);

// router.post('/api/users/:id', userApiController.updateUser);
router.put('/api/users/:id', userApiController.updateUser);
router.delete('/api/users/:id', userApiController.deleteUser);

module.exports = router;