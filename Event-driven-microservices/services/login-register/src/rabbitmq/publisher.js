const amqp = require('amqplib');

async function publishUserLogin(userData) {
    let conn, channel;
    try {
        conn = await amqp.connect('amqp://localhost');
        channel = await conn.createChannel();
        const exchange = 'user_data';
        const routingKey = 'user.login';

        await channel.assertExchange(exchange, 'direct', { durable: true });
        channel.publish(exchange, routingKey, Buffer.from(JSON.stringify(userData)));

        console.log(" [x] Sent %s: '%s'", routingKey, JSON.stringify(userData));
    } catch (error) {
        console.error('Failed to publish message:', error);
    } finally {
        if (channel) await channel.close();
        if (conn) await conn.close();
    }
}

module.exports = { publishUserLogin };
