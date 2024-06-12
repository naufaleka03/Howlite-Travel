// Establish RabbitMQ connection
const amqp = require('amqplib');

async function setupRabbitMQ() {
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();
    
    return { connection, channel };
}

module.exports = setupRabbitMQ;