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
    const result = await pool.query('DELETE FROM inventory WHERE id = $1 RETURNING *', [id]);
    return result.rows[0];
};

const filterBookings = async (filters) => {
    const { destination, time, vehicle, date } = filters;
    const query = 'SELECT * FROM bookings WHERE destination = $1 AND time = $2 AND vehicle_type = $3 AND date = $4';
    const values = [destination, time, vehicle, date];
    const result = await pool.query(query, values);
    return result.rows;
};

const getAvailableTickets = async () => {
    const result = await pool.query('SELECT * FROM available_tickets');
    return result.rows;
};

const filterAvailableTickets = async (filters) => {
    const { destination, time, vehicle, date } = filters;
    const query = 'SELECT * FROM available_tickets WHERE destination = $1 AND time = $2 AND vehicle_type = $3 AND date = $4';
    const values = [destination, time, vehicle, date];
    const result = await pool.query(query, values);
    return result.rows;
};

const upsertTicket = async (ticketData) => {
    const { id, passenger, departure, destination, date, departure_time, price, transportation } = ticketData;
    const result = await pool.query(
        'INSERT INTO bookings (id, passenger, departure, destination, date, departure_time, price, transportation) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) ON CONFLICT (id) DO UPDATE SET passenger = $2, departure = $3, destination = $4, date = $5, departure_time = $6, price = $7, transportation = $8 RETURNING *',
        [id, passenger, departure, destination, date, departure_time, price, transportation]
    );
    return result.rows[0];
};

module.exports = {
    getBookings,
    getBookingById,
    createBooking,
    updateBooking,
    deleteBooking,
    filterBookings,
    getAvailableTickets,
    filterAvailableTickets,
    upsertTicket
};