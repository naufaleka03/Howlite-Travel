const bookingModel = require('../models/bookingModel');

exports.showBookingsPage = async (req, res) => {
    try {
        console.log('Fetching bookings from database...');
        const bookings = await bookingModel.getBookings();
        console.log('Bookings fetched:', bookings);
        res.render('bookingList', { bookings }); // Render the EJS template with real bookings data
    } catch (error) {
        console.error('Error loading bookings:', error); // Log the error details
        res.status(500).send('Error loading bookings');
    }
};

exports.showCreateBookingPage = (req, res) => {
    res.render('bookingCreate'); // Render the EJS template for creating a new booking
};
