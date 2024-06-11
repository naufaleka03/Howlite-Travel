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

module.exports = { connect, publishPayment };
