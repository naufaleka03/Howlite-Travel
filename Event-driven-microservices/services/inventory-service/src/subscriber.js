// Consume messages from a specific queue
async function consumeMessage(channel, queueName, handleMessage) {
    await channel.assertQueue(queueName);
    channel.consume(queueName, (msg) => {
        handleMessage(msg.content.toString());
    }, { noAck: true });
}

module.exports = consumeMessage;