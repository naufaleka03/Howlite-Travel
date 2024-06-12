const express = require('express');
const router = express.Router();

// Import controllers
const bookingViewsController = require('../controllers/bookingViewsController');
const bookingApiController = require('../controllers/bookingApiController');

// View route for displaying bookings
router.get('/bookings', bookingViewsController.showBookingsPage);

// View route for creating bookings
router.get('/bookings/create', bookingViewsController.showCreateBookingPage);


// API routes for managing bookings
router.get('/api/bookings', bookingApiController.getAllBookings);
router.get('/api/bookings/:id', bookingApiController.getBooking);
router.post('/api/bookings', bookingApiController.createBooking);
router.put('/api/bookings/:id', bookingApiController.updateBooking);
router.delete('/api/bookings/:id', bookingApiController.deleteBooking);
router.post('/api/bookings/filter', bookingApiController.filterBookings);

// API routes for available tickets
router.get('/api/available-tickets', bookingApiController.getAvailableTickets);
router.post('/api/available-tickets/filter', bookingApiController.filterAvailableTickets);

module.exports = router;