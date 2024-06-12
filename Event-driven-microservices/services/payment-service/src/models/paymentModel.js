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

const updatePayment = async (paymentId, status) => {
    const result = await pool.query('UPDATE payment SET status = $1 WHERE id = $2 RETURNING *', [status, paymentId]);
    return result.rows[0];
};

const deletePayment = async (id) => {
    const result = await pool.query('DELETE FROM payments WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length > 0) {
        console.log('Update successful:', result.rows[0]);
    } else {
        console.log('No record updated, check the payment ID.');
    }
    return result.rows;
};

module.exports = {
    getPayments,
    getPaymentById,
    getPaymentsByStatus,
    createPayment,
    updatePayment,
    deletePayment
};
