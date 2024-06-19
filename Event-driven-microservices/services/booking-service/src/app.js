const express = require('express');
const app = express();
const path = require('path');

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, '../public')));

// Set the view engine to ejs
app.set('view engine', 'ejs');

// Set the views directory
app.set('views', path.join(__dirname, 'views'));

// Import routes
const bookingRoutes = require('./routes/bookingRoutes');

// Use routes
app.use('/', bookingRoutes);

// Start the server with socket.io
const PORT = process.env.PORT || 3004;
app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));

const { startConsumerTicket, startConsumerPayment } = require ('./rabbitmq/subscriber');

startConsumerTicket();
startConsumerPayment();