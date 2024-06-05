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
const signRoutes = require('./routes/signRoutes');

// Use routes
app.use('/', signRoutes);

// Serve index.ejs from views directory
app.get('/', (req, res) => {
    res.render('index');
});

// Start the server with socket.io
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));