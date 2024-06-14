const amqp = require('amqplib');

async function publishPaymentData(paymentData) {
    let conn, channel;
    try {
        conn = await amqp.connect('amqp://localhost');
        channel = await conn.createChannel();
        const exchange = 'payment_data';
        const routingKey = 'payment.new';

        await channel.assertExchange(exchange, 'direct', { durable: true });
        channel.publish(exchange, routingKey, Buffer.from(JSON.stringify(paymentData)));

        console.log(" [x] Sent %s: '%s'", routingKey, JSON.stringify(paymentData));
    } catch (error) {
        console.error('Failed to publish message:', error);
    } finally {
        if (channel) await channel.close();
        if (conn) await conn.close();
    }
}

module.exports = { publishPaymentData };