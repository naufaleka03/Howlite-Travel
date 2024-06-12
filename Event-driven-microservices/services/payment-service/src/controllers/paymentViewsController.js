const paymentModel = require('../models/paymentModel');

exports.showPaymentsPage = async (req, res) => {
    try {
        console.log('Fetching payment list from database...');
        const paymentList = await paymentModel.getPayments();
        console.log('Payment List fetched:', paymentList);
        res.render('paymentList', { paymentList }); // Render the EJS template with real payments data
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


exports.showPaymentForm = async (req, res) => {
    try {
        console.log('Menampilkan form pembayaran...');
        res.render('payments'); // Render the EJS template for payment form
    } catch (error) {
        console.error('Error menampilkan form pembayaran:', error);
        res.status(500).send('Error menampilkan form pembayaran');
    }
};

exports.processPayment = (req, res) => {
    const { amount, paymentMethod } = req.body;
    // Logika untuk memproses pembayaran
    console.log(`Memproses pembayaran: ${amount} via ${paymentMethod}`);

    // Setelah memproses pembayaran, redirect ke halaman konfirmasi atau status
    res.redirect('/payment-success'); // Sesuaikan dengan halaman yang diinginkan
};
