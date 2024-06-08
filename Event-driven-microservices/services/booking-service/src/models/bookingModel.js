const pool = require('../db');

const getBookings = async () => {
    const result = await pool.query('SELECT * FROM bookings');
    return result.rows;
};

const getBookingById = async (id) => {
    const result = await pool.query('SELECT * FROM bookings WHERE id = $1', [id]);
    return result.rows[0];
};

const createBooking = async (bookingData) => {
    const { customerName, bookingDate } = bookingData;
    const result = await pool.query(
        'INSERT INTO bookings (customer_name, booking_date) VALUES ($1, $2) RETURNING *',
        [customerName, bookingDate]
    );
    return result.rows[0];
};

const updateBooking = async (id, bookingData) => {
    const { customerName, bookingDate } = bookingData;
    const result = await pool.query(
        'UPDATE bookings SET customer_name = $1, booking_date = $2 WHERE id = $3 RETURNING *',
        [customerName, bookingDate, id]
    );
    return result.rows[0];
};

const deleteBooking = async (id) => {
    const result = await pool.query('DELETE FROM bookings WHERE id = $1 RETURNING *', [id]);
    return result.rows[0];
};

module.exports = {
    getBookings,
    getBookingById,
    createBooking,
    updateBooking,
    deleteBooking
};