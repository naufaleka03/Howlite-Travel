const express = require('express');
const router = express.Router();

// Import controllers
const userViewsController = require('../controllers/userViewsController');
const userApiController = require('../controllers/userAPIController');
const methodOverride = require('method-override');
router.use(methodOverride('_method'));


// View route for displaying users
router.get('/users', userViewsController.showUsersPage);
router.get('/users/edit', userViewsController.showEditUserPage);
router.post('/users/update-profile', userViewsController.updateUserProfile);

// API routes for managing users
router.get('/api/users', userApiController.getAllUsers);
router.get('/api/users/:id', userApiController.getUser);
router.post('/api/users', userApiController.createUser);
// router.post('/api/users/:id', userApiController.updateUser);
router.put('/api/users/:id', userApiController.updateUser);
router.delete('/api/users/:id', userApiController.deleteUser);

module.exports = router;