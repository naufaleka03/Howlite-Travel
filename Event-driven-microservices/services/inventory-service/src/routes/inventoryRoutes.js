const express = require('express');
const router = express.Router();

// Import controllers
const inventoryViewsController = require('../controllers/inventoryViewsController');
const inventoryApiController = require('../controllers/inventoryApiController');

// View route for displaying bookings
router.get('/inventory', inventoryViewsController.showInventoryPage);

// API routes for managing bookings
router.get('/api/inventory', inventoryApiController.getAllInventory);
router.get('/api/inventory/:id', inventoryApiController.getInventory);
router.post('/api/inventory', inventoryApiController.createInventory);
router.put('/api/inventory/:id', inventoryApiController.updateInventory);
router.delete('/api/inventory/:id', inventoryApiController.deleteInventory);

module.exports = router;