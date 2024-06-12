const amqp = require('amqplib');
const { upsertTicket } = require('../models/bookingModel');

async function startConsumer() {
    const conn = await amqp.connect('amqp://localhost');
    const channel = await conn.createChannel();
    const exchange = 'ticket_data';

    await channel.assertExchange(exchange, 'direct', { durable: true });
    const q = await channel.assertQueue('', { exclusive: true });

    console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", q.queue);
    channel.bindQueue(q.queue, exchange, 'ticket.new');

    channel.consume(q.queue, function(msg) {
        if (msg.content) {
            console.log(" [x] %s: '%s'", msg.fields.routingKey, msg.content.toString());
            handleTicketMessage(msg);
        }
    }, {
        noAck: true
    }).catch(error => console.error('Error in consuming message:', error));
}

function handleTicketMessage(msg) {
    const ticketData = JSON.parse(msg.content.toString());
    upsertTicket(ticketData); // Ensure this function is implemented to process the ticket data
}

module.exports = { startConsumer };