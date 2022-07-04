// Dependencies
const fs = require("fs");
const { v4: uuidv4 } = require('uuid');
const router = require("express").Router();
const path = require("path");

// Load notes from file
router.get("/api/notes", (request, response) => {
    const notes = JSON.parse(fs.readFileSync(path.join(__dirname, "../db/db.json")));
    response.json(notes);
});


// Add a new note
router.post("/api/notes", (request, response) => {
    const newNote = request.body;
    newNote.id = uuidv4();
    let data = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
    data.push(newNote);
    fs.writeFileSync('./db/db.json', JSON.stringify(data));
    response.json(data);
});


// Delete a note
router.delete("/api/notes/:id", (request, response) => {
    let noteId = request.params.id.toString();
    let data = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
    let updatedNotes = data.filter(note => note.id !== noteId);
    fs.writeFileSync('./db/db.json', JSON.stringify(updatedNotes));

    response.json(updatedNotes);
});

// Export routes for server.js to use.
module.exports = router;