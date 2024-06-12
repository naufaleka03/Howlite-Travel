const paymentModel = require('../models/paymentModel');

exports.showPaymentsPage = async (req, res) => {
    try {
        console.log('Mengambil daftar pembayaran dari database...');
        const paymentList = await paymentModel.getPayments();
        console.log('Daftar Pembayaran diambil:', paymentList);
        res.json(paymentList); // Render the EJS template with real payments data
    } catch (error) {
        console.error('Error loading payment list:', error); // Log the error details
        res.status(500).json({ error: error.message });
    }
};

exports.showUnpaidPayments = async (req, res) => {
    try {
        const unpaidPayment = await paymentModel.getPaymentsByStatus("Not Completed");
        res.json(unpaidPayment);
    } catch (error) {
        console.error('Error loading unpaid payments:', error);
        res.status(500).json({ error: error.message });
    }
};

exports.showPaymentForm = async (req, res) => {
    try {
        const paymentId = req.query.paymentId;
        const payment = await paymentModel.getPaymentById(paymentId);
        res.json(payment);
    } catch (error) {
        console.error('Error showing payment form:', error);
        res.status(500).json({ error: error.message });
    }
};

exports.processPayment = async (req, res) => {
    const paymentId = req.body.paymentId;
    console.log(paymentId)
    try {
        await paymentModel.updatePayment(paymentId, "Completed");
        res.json({ message: 'Pembayaran berhasil diproses' });
    } catch (error) {
        console.error('Error processing payment:', error);
        res.status(500).json({ error: error.message });
    }
};

exports.showCompletedPayments = async (req, res) => {
    try {
        const completedPayments = await paymentModel.getPaymentsByStatus("Completed");
        res.json(completedPayments);
    } catch (error) {
        console.error('Error loading completed payments:', error);
        res.status(500).json({ error: error.message });
    }
};

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
