const inventoryModel = require('../models/inventoryModel');

exports.showInventoryPage = async (req, res) => {
    try {
        console.log('Fetching bookings from database...');
        const inventory = await inventoryModel.getInventory();
        console.log('Inventory fetched:', inventory);
        res.render('inventoryList', { inventory }); // Render the EJS template with real inventory data
    } catch (error) {
        console.error('Error loading bookings:', error); // Log the error details
        res.status(500).send('Error loading bookings');
    }
};
