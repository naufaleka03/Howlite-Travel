const inventoryModel = require('../models/inventoryModel');

exports.showInventoryPage = async (req, res) => {
    try {
        console.log('Fetching bookings from database...');
        const tiket = await inventoryModel.getInventory();
        console.log('Inventory fetched:', tiket);
        res.render('inventoryList', { tiket }); // Render the EJS template with real inventory data
    } catch (error) {
        console.error('Error loading bookings:', error); // Log the error details
        res.status(500).send('Error loading bookings');
    }
};

exports.submitForm = async (req, res) => {
    // const { passenger, departure, destination, date, departure_time, price } = req.body;
    // const tiket = 'INSERT INTO orders (passenger, departure, destination, date, departure_time, price) VALUES ($1, $2, $3, $4, $5, $6)';
    
    try {
        await pool.query(tiket, [passenger, departure, destination, date, departure_time, price]);
        res.send('Order submitted successfully');
    } catch (err) {
        console.error(err);
        res.status(500).send('Failed to insert order');
    }
};
