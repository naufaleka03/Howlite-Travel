const amqp = require('amqplib');

async function publishInventoryUpdated(inventoryUpdate) {
  try {
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();

    const exchange = 'inventory_events';
    const msg = JSON.stringify(inventoryUpdate);

    await channel.assertExchange(exchange, 'fanout', { durable: false });

    channel.publish(exchange, 'InventoryUpdated', Buffer.from(msg));
    console.log(` [x] Sent ${msg}`);

    setTimeout(() => {
      channel.close();
      connection.close();
    }, 500);
  } catch (error) {
    console.error('Error in publishing message', error);
  }
}

const inventoryUpdate = {
  type: 'flight',
  id: 'FL123',
  status: 'updated',
  availableSeats: 5
};

publishInventoryUpdated(inventoryUpdate);
