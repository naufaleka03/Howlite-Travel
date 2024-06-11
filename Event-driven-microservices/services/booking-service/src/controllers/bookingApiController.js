const bookingModel = require('../models/bookingModel');

exports.getAllBookings = async (req, res) => {
    try {
        const bookings = await bookingModel.getBookings();
        res.json(bookings);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getBooking = async (req, res) => {
    try {
        const booking = await bookingModel.getBookingById(req.params.id);
        if (booking) {
            res.json(booking);
        } else {
            res.status(404).json({ message: 'Booking not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.createBooking = async (req, res) => {
    try {
        const newBooking = await bookingModel.createBooking(req.body);
        res.status(201).json(newBooking);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateBooking = async (req, res) => {
    try {
        const updatedBooking = await bookingModel.updateBooking(req.params.id, req.body);
        res.json(updatedBooking);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteBooking = async (req, res) => {
    try {
        const deletedBooking = await bookingModel.deleteBooking(req.params.id);
        res.json(deletedBooking);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.filterBookings = async (req, res) => {
    try {
        const filteredBookings = await bookingModel.filterBookings(req.body);
        res.json(filteredBookings);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getAvailableTickets = async (req, res) => {
    try {
        const tickets = await bookingModel.getAvailableTickets();
        res.json(tickets);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.filterAvailableTickets = async (req, res) => {
    try {
        const filteredTickets = await bookingModel.filterAvailableTickets(req.body);
        res.json(filteredTickets);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};