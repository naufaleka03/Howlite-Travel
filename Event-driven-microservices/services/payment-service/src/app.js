const express = require('express');
const app = express();
const path = require('path');

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, '../public')));

app.use(express.urlencoded({ extended: true }));

// Set the view engine to ejs
app.set('view engine', 'ejs');

// Set the views directory
app.set('views', path.join(__dirname, 'views'));

// Import routes
const paymentRoute = require('./routes/paymentRoute');

// Use routes
app.use('/', paymentRoute);

// // Serve index.ejs from views directory
// app.get('/', (req, res) => {
//     res.render('index');
// });

// Start the server
const PORT = process.env.PORT || 3002;
app.listen(PORT, () => console.log(`Server is running on http://localhost:${3002}`));

const { startConsumer } = require('./rabbitmq/subscriber');
startConsumer();