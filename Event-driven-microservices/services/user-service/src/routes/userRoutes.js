const express = require('express');
const router = express.Router();

// Import controllers
const userViewsController = require('../controllers/userViewsController');
const methodOverride = require('method-override');
router.use(methodOverride('_method'));


// router.get('/users', userViewsController.showUsersPage);
router.get('/profile/:userId', userViewsController.showUserProfile);
router.get('/profile/:userId/edit', userViewsController.editUserProfile);
router.post('/profile/:userId/update', userViewsController.updateUserProfile);


module.exports = router;