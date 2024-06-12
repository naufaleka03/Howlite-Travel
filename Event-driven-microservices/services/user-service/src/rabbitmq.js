const amqp = require('amqplib/callback_api');
const { getUserData } = require('./db.js');

async function sendUserData() {
    const userData = await getUserData();
    amqp.connect('amqp://localhost', (error0, connection) => {
        if (error0) {
            throw error0;
        }
        connection.createChannel((error1, channel) => {
            if (error1) {
                throw error1;
            }
            const exchange = 'user_exchange';
            const routingKey = 'user_data';

            channel.assertExchange(exchange, 'direct', {
                durable: false
            });
            channel.publish(exchange, routingKey, Buffer.from(JSON.stringify(userData)));

            console.log("Sent user data: %s", JSON.stringify(userData));
        });

        setTimeout(() => {
            connection.close();
        }, 500);
    });
}

sendUserData(); // Replace 123 with the actual user ID