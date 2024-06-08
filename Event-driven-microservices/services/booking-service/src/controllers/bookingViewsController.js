const bookingModel = require('../models/bookingModel');

exports.showBookingsPage = async (req, res) => {
    try {
        // const bookings = await bookingModel.getBookings();
        // res.render('bookingList', { bookings }); // Render the EJS template with bookings data
        // Mock data for bookings
        const bookings = [
            {
                id: '123',
                departure: 'City A',
                destination: 'City B',
                date: '2023-10-05',
                time: '15:00',
                price: 1000000,
                seatNumber: '12A'
            },
            
        ];
        
        res.render('bookingList', { bookings }); // Render the EJS template with mock bookings data
    } catch (error) {
        res.status(500).send('Error loading bookings');
    }
};
