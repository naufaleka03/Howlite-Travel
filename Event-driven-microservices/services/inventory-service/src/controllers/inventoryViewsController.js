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
                id: tiket.id, passenger: tiket.passenger, departure: tiket.departure, destination: tiket.destination, date: tiket.date, departure_time: tiket.departure_time, price: tiket.price, transportation: tiket.transportation, trasport_type: tiket.transport_type });
        }
    } catch (error) {
        console.error('Error loading bookings:', error); // Log the error details
        res.status(500).send('Error loading bookings');
    }
};

exports.showOrderForm = (req, res) => {
    res.render('orderForm');
};

exports.submitForm = async (req, res) => {
    const orderData = req.body; // Mengambil semua data dari form

    try {
        const newOrder = await inventoryModel.createOrder(orderData); // Memanggil fungsi createOrder dari model
        res.send('Order submitted successfully');
    } catch (err) {
        console.error(err);
        res.status(500).send('Failed to order');
    }
};
