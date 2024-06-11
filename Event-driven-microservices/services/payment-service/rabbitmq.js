const amqp = require('amqplib');

async function setupRabbitMQ() {
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();
    await channel.assertQueue('payments');
    
    return { connection, channel };
}

module.exports = setupRabbitMQ;
