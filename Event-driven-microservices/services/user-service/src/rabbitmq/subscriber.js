const amqp = require('amqplib');
const { upsertUser } = require('../models/userModel');

async function startConsumer() {
    const conn = await amqp.connect('amqp://localhost');
    const channel = await conn.createChannel();
    const exchange = 'user_data';

    await channel.assertExchange(exchange, 'direct', { durable: true });
    const q = await channel.assertQueue('', { exclusive: true });

    console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", q.queue);
    channel.bindQueue(q.queue, exchange, 'user.login');

    channel.consume(q.queue, function(msg) {
        if (msg.content) {
            console.log(" [x] %s: '%s'", msg.fields.routingKey, msg.content.toString());
            handleLoginMessage(msg);
        }
    }, {
        noAck: true
    }).catch(error => console.error('Error in consuming message:', error));
}

function handleLoginMessage(msg) {
    const userData = JSON.parse(msg.content.toString());
    upsertUser(userData); // Make sure this function correctly handles the user data
}

module.exports = { startConsumer };
