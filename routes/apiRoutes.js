// Dependencies
const { loadNotes, addNote, deleteNote } = require('../lib/notes');
const router = require("express").Router();

// Routes
router.get("/api/notes", (req, res) => {
    loadNotes(req,res);
});

router.post("/api/notes", (req, res) => {   
    addNote(req,res);
});

router.delete("/api/notes/:id", (req, res) => {
    deleteNote(req,res);
});

// Export routes for server.js to use.
module.exports = router;