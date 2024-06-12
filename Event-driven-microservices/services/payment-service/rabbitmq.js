const amqp = require('amqplib/callback_api');

function startConsumer() {
    amqp.connect('amqp://localhost', (error0, connection) => {
        if (error0) {
            throw error0;
        }
        connection.createChannel((error1, channel) => {
            if (error1) {
                throw error1;
            }
            const exchange = 'user_exchange';
            const queue = 'payment_queue';
            const routingKey = 'user_data';

            channel.assertExchange(exchange, 'direct', {
                durable: false
            });
            channel.assertQueue(queue, {
                durable: false
            });
            channel.bindQueue(queue, exchange, routingKey);

            channel.consume(queue, (msg) => {
                const userData = JSON.parse(msg.content.toString());
                console.log("Received user data:", userData);
                // Process user data here
            }, {
                noAck: true
            });

            console.log("Waiting for messages...");
        });
    });
}

module.exports = startConsumer;
