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
const inventoryRoutes = require('./routes/inventoryRoutes');

// Use routes
app.use('/', inventoryRoutes);

// Serve index.ejs from views directory
app.get('/', (req, res) => {
    res.render('inventoryList');
});

// Start the server
const PORT = process.env.PORT || 3099;
app.listen(PORT, () => console.log(`Server is running on http://localhost:${3099}`));



