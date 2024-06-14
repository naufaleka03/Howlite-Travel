const amqp = require('amqplib');

async function publishTicketData(ticketData) {
    let conn, channel;
    try {
        conn = await amqp.connect('amqp://localhost');
        channel = await conn.createChannel();
        const exchange = 'ticket_data';
        const routingKey = 'ticket.new';

        await channel.assertExchange(exchange, 'direct', { durable: true });
        channel.publish(exchange, routingKey, Buffer.from(JSON.stringify(ticketData)));

        console.log(" [x] Sent %s: '%s'", routingKey, JSON.stringify(ticketData));
    } catch (error) {
        console.error('Failed to publish message:', error);
    } finally {
        if (channel) await channel.close();
        if (conn) await conn.close();
    }
}

module.exports = { publishTicketData };