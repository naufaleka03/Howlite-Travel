const express = require('express');
const router = express.Router();

const inventoryController = require('../controllers/inventoryViewsController');

router.get('/', inventoryController.inventoryList);

module.exports = router;

