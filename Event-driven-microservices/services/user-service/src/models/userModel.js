const pool = require('../db');

const getUsers = async () => {
    const result = await pool.query('SELECT * FROM profiles');
    return result.rows;
};

const getUserById = async (userId) => {
    const result = await pool.query('SELECT * FROM profiles WHERE user_id = $1', [userId]);
    return result.rows[0];
};

const createUser = async (userData) => {
    const { userId, username, email, phone, gender } = userData;
    const result = await pool.query(
        'INSERT INTO profiles (user_id, username, email, phone, gender) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [userId, username, email, phone, gender]
    );
    return result.rows[0]; // Return the newly created user
};

const updateUser = async (userId, userData) => {
    try {
        const { username, email, phone, gender } = userData;
        const result = await pool.query(
            'UPDATE profiles SET username = $1, email = $2, phone = $3, gender = $4 WHERE user_id = $5 RETURNING *',
            [username, email, phone, gender, userId]
        );
        return result.rows[0];
    } catch (error) {
        throw new Error('Failed to update user: ' + error.message);
    }
};

const insertUser = async (userData) => {
    const { userId, username, email, phone, gender } = userData;
    const result = await pool.query(
        'INSERT INTO profiles (user_id, username, email, phone, gender) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [userId, username, email, phone, gender]
    );
    return result.rows[0]; // Return the newly inserted user
};

const deleteUser = async (id) => {
    const result = await pool.query('DELETE FROM profiles WHERE id = $1 RETURNING *', [id]);
    return result.rows[0];
};

const upsertUser = async (userData) => {
    const { id, email } = userData;
    const result = await pool.query(
        'INSERT INTO profiles (user_id, email) VALUES ($1, $2) ON CONFLICT (user_id) DO UPDATE SET email = EXCLUDED.email RETURNING *',
        [id, email]
    );
    return result.rows[0];
};

module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    insertUser,
    deleteUser,
    upsertUser
};