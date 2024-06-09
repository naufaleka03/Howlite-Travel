const paymentModel = require('../models/paymentModel');

exports.showPaymentsPage = async (req, res) => {
    try {
        console.log('Fetching payments from database...');
        const payment = await paymentModel.getPayments();
        console.log('Payments fetched:', payment);
        res.render('index', { payment }); // Render the EJS template with real payments data
    } catch (error) {
        console.error('Error loading payments:', error); // Log the error details
        res.status(500).send('Error loading payments');
    }
};