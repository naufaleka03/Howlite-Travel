    // Publish messages to a specific queue
async function publishMessage(channel, queueName, message) {
    await channel.assertQueue(queueName);
    channel.sendToQueue(queueName, Buffer.from(message));
}

module.exports = publishMessage;