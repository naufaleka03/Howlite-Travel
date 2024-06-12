const paymentModel = require('../models/paymentModel');
const { publishPaymentData } = require('../rabbitmq/publisher');

exports.showPaymentsPage = async (req, res) => {
    try {
        console.log('Fetching payment list from database...');
        const paymentList = await paymentModel.getPayments();
        console.log('Payment List fetched:', paymentList);
        res.render('paymentList', { paymentList }); // Render the EJS template with real payments data
        // Mengirim setiap pembayaran secara individual
        for (const payment of paymentList) {
            await publishPaymentData({
                id: payment.id,
                amount: payment.amount,
                bookingId: payment.bookingId,
                status: payment.status,
                paymentDate: payment.paymentDate
            });
        }
    } catch (error) {
        console.error('Error loading payment list:', error); // Log the error details
        res.status(500).send('Error loading payment list');
    }
};

exports.showUnpaidPayments = async (req, res) => {
    console.log(paymentModel);
    try {
        const unpaidPayment = await paymentModel.getPaymentsByStatus("Not Completed");
        res.render('paymentList', { paymentList: unpaidPayment, status: 'Not Completed', color: 'red' });
    } catch (error) {
        console.error('Error loading unpaid payments:', error);
        res.status(500).send('Error loading unpaid payments');
    }
};

exports.showPaymentForm = async (req, res) => {
    try {
      const paymentId = req.query.paymentId;
      const payment = await paymentModel.getPaymentById(paymentId);
      res.render('payment', { payment });
    } catch (error) {
      console.error('Error showing payment form:', error);
      res.status(500).send('Error showing payment form');
    }
  };

exports.processPayment = async (req, res) => {
    const paymentId = req.body.paymentId;
    console.log(paymentId)
    try {
        await paymentModel.updatePayment(paymentId, "Completed");
        res.redirect('paymentList'); 
    } catch (error) {
        console.error('Error processing payment:', error);
        res.status(500).send('Error processing payment');
    }
};

exports.showCompletedPayments = async (req, res) => {
    try {
        const completedPayments = await paymentModel.getPaymentsByStatus("Completed");
        res.render('paymentList', { payments: completedPayments, status: 'Completed', color: 'green' });
    } catch (error) {
        console.error('Error loading completed payments:', error);
        res.status(500).send('Error loading completed payments');
    }
};
