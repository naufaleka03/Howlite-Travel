const pool = require('../db');

const getPayments = async () => {
    const result = await pool.query('SELECT * FROM payment');
    return result.rows;
};

const getPaymentById = async (paymentId) => {
    const result = await pool.query('SELECT * FROM payment WHERE id = $1', [paymentId]);
    return result.rows[0];
};

const getPaymentsByStatus = async (status) => {
        const result = await pool.query('SELECT * FROM payment WHERE status = $1', [status]);
        return result.rows;
};

const createPayment = async (paymentData) => {
    const { amount, paymentDate, bookingId } = paymentData;
    const result = await pool.query(
        'INSERT INTO payments (amount, payment_date, booking_id) VALUES ($1, $2, $3) RETURNING *',
        [amount, paymentDate, bookingId]
    );
    return result.rows[0];
};

const updatePayment = async (id, paymentData) => {
    const { amount, paymentDate } = paymentData;
    const result = await pool.query(
        'UPDATE payments SET amount = $1, payment_date = $2 WHERE id = $3 RETURNING *',
        [amount, paymentDate, id]
    );
    return result.rows[0];
};

const deletePayment = async (id) => {
    const result = await pool.query('DELETE FROM payments WHERE id = $1 RETURNING *', [id]);
    return result.rows[0];
};

module.exports = {
    getPayments,
    getPaymentById,
    getPaymentsByStatus,
    createPayment,
    updatePayment,
    deletePayment
};
