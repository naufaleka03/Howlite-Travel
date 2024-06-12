const { connect, subscribePayments } = require('./messaging');

async function handlePayment(payment) {
    console.log('Received payment:', payment);
    // Tambahkan logika untuk menangani pembayaran di sini
    // Misalnya, update status pembayaran di database atau trigger notifikasi
}

async function startSubscription() {
    const { channel } = await connect();
    await subscribePayments(channel, handlePayment);
    console.log('Subscribed to payment queue successfully.');
}

startSubscription().catch(err => {
    console.error('Failed to subscribe to payment queue:', err);
});
