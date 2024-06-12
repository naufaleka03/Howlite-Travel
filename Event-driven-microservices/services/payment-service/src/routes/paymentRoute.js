const express = require('express');
const router = express.Router();

// Import controllers
const paymentViewsController = require('../controllers/paymentViewsController');
const paymentApiController = require('../controllers/paymentApiController');

// View route for displaying payments
router.get('/paymentList', paymentViewsController.showPaymentsPage);
router.post('/paymentList', paymentViewsController.showPaymentsPage);
router.get('/payment', (req, res) => {
    res.render('payment.ejs');
});

router.get('/unpaidPayment', paymentViewsController.showUnpaidPayments);
router.get('/paymentForm', paymentViewsController.showPaymentForm);
router.post('/processPayment', paymentViewsController.processPayment);
router.get('/processPayment', paymentViewsController.processPayment);
// router.get('/paymentList', paymentViewsController.processPayment);
// router.post('/paymentList', paymentViewsController.processPayment);

// API routes for managing payments
router.get('/api/payments', paymentApiController.getAllPayments);
router.get('/api/payments/:id', paymentApiController.getPaymentById);
router.post('/api/payments', paymentApiController.createPayment);
router.put('/api/payments/:id', paymentApiController.updatePayment);
router.delete('/api/payments/:id', paymentApiController.deletePayment);

module.exports = router;s