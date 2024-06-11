const pool = require('../db');

const getInventory = async () => {
    const result = await pool.query('SELECT * FROM tiket');
    return result.rows;
};

const getInventoryById = async (id) => {
    const result = await pool.query('SELECT * FROM inventory WHERE id = $1', [id]);
    return result.rows[0];
};

const createInventory = async (inventoryData) => {
    const { passenger, departure, destination, date, departure_time, price } = inventoryData;
    const result = await pool.query(
        'INSERT INTO orders (passenger, departure, destination, date, departure_time, price) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
        [passenger, departure, destination, date, departure_time, price]
    );
    return result.rows[0];
};

const updateInventory = async (id, inventoryData) => {
    const { customerName, bookingDate } = inventoryData;
    const result = await pool.query(
        'UPDATE inventory SET customer_name = $1, booking_date = $2 WHERE id = $3 RETURNING *',
        [customerName, bookingDate, id]
    );
    return result.rows[0];
};

const deleteInventory = async (id) => {
    const result = await pool.query('DELETE FROM inventory WHERE id = $1 RETURNING *', [id]);
    return result.rows[0];
};

module.exports = {
    getInventory,
    getInventoryById,
    createInventory,
    updateInventory,
    deleteInventory
};