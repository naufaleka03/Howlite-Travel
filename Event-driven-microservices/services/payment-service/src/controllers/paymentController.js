const pool = require('../models/paymentModel');

exports.index = (req, res) => {
  res.render('index', { title: 'Payment Page' });
};

exports.processPayment = async (req, res) => {
  try {
    const { amount, userId } = req.body;
    const result = await pool.query('INSERT INTO payments (amount, user_id) VALUES ($1, $2) RETURNING *', [amount, userId]);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
