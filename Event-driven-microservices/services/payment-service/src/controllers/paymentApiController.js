const paymentModel = require('../models/paymentModel');

exports.createPayment = async (req, res) => {
    try {
        const newPayment = await paymentModel.createPayment(req.body);
        res.status(201).json(newPayment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getPaymentById = async (req, res) => {
    try {
        const payment = await paymentModel.getPaymentById(req.params.id);
        if (payment) {
            res.json(payment);
        } else {
            res.status(404).json({ message: 'Payment not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getAllPayments = async (req, res) => {
    try {
        const payments = await paymentModel.getPayments();
        res.json(payments);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updatePayment = async (req, res) => {
    try {
        const updatedPayment = await paymentModel.updatePayment(req.params.id, req.body);
        res.json(updatedPayment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deletePayment = async (req, res) => {
    try {
        const deletedPayment = await paymentModel.deletePayment(req.params.id);
        res.json(deletedPayment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
