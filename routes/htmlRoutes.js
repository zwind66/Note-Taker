// Dependencies
const path = require('path');
const router = require('express').Router();

// Routes
router.get('/notes', function (request, response) {
  response.sendFile(path.join(__dirname, '../public/notes.html'));
});

router.get('*', function (request, response) {
  response.sendFile(path.join(__dirname, '../public/index.html'));
});

// Export routes for server.js to use.
module.exports = router;