const express = require('express');
const router = express.Router();

// Import controllers
const paymentViewsController = require('../controllers/paymentViewsController');
const paymentApiController = require('../controllers/paymentApiController');

// View route for displaying payments
router.get('/payments', paymentViewsController.showPaymentsPage);

// API routes for managing payments
router.get('/api/payments', paymentApiController.getAllPayments);
router.get('/api/payments/:id', paymentApiController.getPaymentById);
router.post('/api/payments', paymentApiController.createPayment);
router.put('/api/payments/:id', paymentApiController.updatePayment);
router.delete('/api/payments/:id', paymentApiController.deletePayment);

module.exports = router;