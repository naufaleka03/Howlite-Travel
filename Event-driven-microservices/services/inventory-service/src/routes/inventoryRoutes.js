const express = require('express');
const router = express.Router();

// Import controllers
const inventoryViewsController = require('../controllers/inventoryViewsController');

// View route for displaying bookings
router.get('/inventory', inventoryViewsController.showInventoryPage);

router.get('/order-form', inventoryViewsController.showOrderForm);

router.post('/submit-order', inventoryViewsController.submitForm);

module.exports = router;