const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, '../public')));

// Set the view engine to ejs
app.set('view engine', 'ejs');

// Set the views directory
app.set('views', path.join(__dirname, 'views'));

// Routes
const userRoutes = require('./routes/userRoutes');
app.use(userRoutes);

   // parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

   // parse application/json
app.use(bodyParser.json());
app.use(methodOverride('_method'));
// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Your existing routes and other middleware

// Start the server with socket.io
const PORT = process.env.PORT || 3005;
app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));