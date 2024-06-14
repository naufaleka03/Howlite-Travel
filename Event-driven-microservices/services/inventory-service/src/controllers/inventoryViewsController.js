const inventoryModel = require('../models/inventoryModel');
const { publishTicketData } = require('../rabbitmq/publisher');

exports.showInventoryPage = async (req, res) => {
    try {
        console.log('Fetching bookings from database...');
        const tiketList = await inventoryModel.getInventory();
        console.log('Inventory fetched:', tiketList);
        res.render('inventoryList', { tiketList }); // Render the EJS template with real inventory data
        for (const tiket of tiketList) {
            await publishTicketData({ 
                id: tiket.id, passenger: tiket.passenger, departure: tiket.departure, destination: tiket.destination, date: tiket.date, departure_time: tiket.departure_time, price: tiket.price, transportation: tiket.transportation });
        }
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