const pool = require('../db');

const getUsers = async () => {
    const result = await pool.query('SELECT * FROM users');
    return result.rows;
};

const getUserById = async (id) => {
    const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
    return result.rows[0];
};

const createUser = async (userData) => {
    const { customerName, userDate } = userData;
    const result = await pool.query(
        'INSERT INTO users (customer_name, user_date) VALUES ($1, $2) RETURNING *',
        [customerName, userDate]
    );
    return result.rows[0];
};

const updateUser = async (id, userData) => {
    const { customerName, userDate } = userData;
    const result = await pool.query(
        'UPDATE users SET customer_name = $1, user_date = $2 WHERE id = $3 RETURNING *',
        [customerName, userDate, id]
    );
    return result.rows[0];
};

const deleteUser = async (id) => {
    const result = await pool.query('DELETE FROM users WHERE id = $1 RETURNING *', [id]);
    return result.rows[0];
};

module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
};