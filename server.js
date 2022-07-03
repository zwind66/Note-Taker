// Require dependencies
const express = require('express');

// Require routes file
const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');

// Initialize express app
const app = express();
const PORT = process.env.PORT || 3001;

// Setup data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// Use api routes in the app
app.use('/api', apiRoutes);
app.use('/', htmlRoutes);

// Setup listener
app.listen(PORT, () => {
    console.log(`API server is ready on port ${PORT}!`);
}); 