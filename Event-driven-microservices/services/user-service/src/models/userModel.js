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
    return result.rows[0]; // Return the newly created user
};

const updateUser = async (userId, userData) => {
    if (!userData) {
        throw new Error('User data is undefined');
    }

    const { username, email, phone, gender, password } = userData;
    const values = [username, email, phone, gender, password, userId];
    const query = 'UPDATE users SET username = $1, email = $2, phone = $3, gender = $4, password = $5 WHERE id = $6';
    
    try {
        const result = await pool.query(query, values);
        console.log(result.rows[0]); // Tambahkan log untuk debugging
        return result.rows[0];
    } catch (err) {
        throw new Error('Error updating user data');
    }
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