const amqp = require('amqplib');

async function connect() {
  const connection = await amqp.connect('amqp://localhost');
  const channel = await connection.createChannel();
  await channel.assertQueue('payments');
  return { connection, channel };
}

async function publishPayment(channel, payment) {
  channel.sendToQueue('payments', Buffer.from(JSON.stringify(payment)));
}

async function subscribePayments(channel, onMessage) {
  channel.consume('payments', message => {
    onMessage(JSON.parse(message.content.toString()));
    channel.ack(message);
  });
}

module.exports = { connect, publishPayment, subscribePayments };