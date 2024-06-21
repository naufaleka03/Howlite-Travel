const pool = require('../db');

const getInventory = async () => {
    const result = await pool.query('SELECT * FROM tiket');
    return result.rows;
};

const createOrder = async (orderData) => {
    const { passenger, departure, destination, date, departure_time, price, transportation, transport_type } = orderData;
    const result = await pool.query(
        'INSERT INTO tiket (passenger, departure, destination, date, departure_time, price, transportation, transport_type) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
        [passenger, departure, destination, date, departure_time, price, transportation, transport_type]
    );
    return result.rows[0];
};

module.exports = {
    getInventory,
    createOrder,
};