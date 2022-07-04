// Require dependencies
const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();

// Require routes file
const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');

// Setup data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// Use api routes in the app
app.use('/', apiRoutes);
app.use('/', htmlRoutes);

// Setup listener
app.listen(PORT, () => {
    console.log(`API server is ready on port ${PORT}!`);
}); 