const amqp = require('amqplib');
const { upsertProfile } = require('../models/paymentModel');

async function startConsumer() {
    const conn = await amqp.connect('amqp://localhost');
    const channel = await conn.createChannel();
    const exchange = 'user_data';

    await channel.assertExchange(exchange, 'direct', { durable: true });
    const q = await channel.assertQueue('', { exclusive: true });

    console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", q.queue);
    channel.bindQueue(q.queue, exchange, 'user.profile');

    channel.consume(q.queue, function(msg) {
        if (msg.content) {
            console.log("Menerima data: [x] %s: '%s'", msg.fields.routingKey, msg.content.toString());
            handleProfileMessage(msg);
        }
    }, {
        noAck: true
    }).catch(error => console.error('Error in consuming message:', error));
}

function handleProfileMessage(msg) {
    const userData = JSON.parse(msg.content.toString());
    upsertProfile(userData); // Make sure this function correctly handles the user data
}

module.exports = { startConsumer };

