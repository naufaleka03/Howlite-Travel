const { connect, subscribePayments } = require('./messaging');

async function handlePayment(payment) {
    console.log('Received payment:', payment);
    // Proses payment, misalnya update database, log, atau trigger notifikasi
    // Contoh:
    // await database.updatePaymentStatus(payment.id, 'processed');
}

async function startSubscription() {
    const { channel } = await connect();
    await subscribePayments(channel, handlePayment);
    console.log('Subscribed to payment queue successfully.');
}

startSubscription().catch(err => {
    console.error('Failed to subscribe to payment queue:', err);
});