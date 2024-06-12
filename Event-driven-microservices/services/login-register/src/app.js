const express = require('express');
const app = express();
const path = require('path');

// Load environment variables from .env file
require('dotenv').config();

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, '../public')));

// Set the view engine to ejs
app.set('view engine', 'ejs');

// Set the views directory
app.set('views', path.join(__dirname, 'views'));

// Middleware to parse JSON bodies
app.use(express.json());

// Middleware to parse URL-encoded bodies
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// Import routes
const signRoutes = require('./routes/signRoutes');

// Use routes
app.use('/', signRoutes);

// Start the server with socket.io
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));