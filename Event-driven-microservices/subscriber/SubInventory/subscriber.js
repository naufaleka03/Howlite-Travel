const amqp = require('amqplib');

async function subscribeToBookingConfirmed() {
  try {
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();

    const exchange = 'booking_events';
    const queue = 'booking_confirmed_queue';

    await channel.assertExchange(exchange, 'fanout', { durable: false });
    await channel.assertQueue(queue, { durable: false });

    await channel.bindQueue(queue, exchange, 'BookingConfirmed');

    console.log(` [*] Waiting for messages in ${queue}. To exit press CTRL+C`);

    channel.consume(queue, (msg) => {
      if (msg.content) {
        const booking = JSON.parse(msg.content.toString());
        console.log(` [x] Received BookingConfirmed: ${msg.content.toString()}`);
        updateInventory(booking);
      }
    }, { noAck: true });

  } catch (error) {
    console.error('Error in subscribing to messages', error);
  }
}

function updateInventory(booking) {
  // Logika untuk memperbarui inventaris berdasarkan booking yang diterima
  console.log('Updating inventory for booking:', booking);

  // Simulasi memperbarui inventaris
  const inventoryUpdate = {
    type: booking.type,
    id: booking.id,
    status: 'updated',
    availableSeats: 5 // Contoh pembaruan ketersediaan
  };

  // Menerbitkan event "InventoryUpdated"
  publishInventoryUpdated(inventoryUpdate);
}

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

subscribeToBookingConfirmed();
