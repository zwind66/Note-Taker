// Dependencies
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const path = require('path');


// Load notes from file
function loadNotes(req, res) {
    const notes = JSON.parse(fs.readFileSync(path.join(__dirname, '../db/db.json')));
    res.json(notes);
} 

// Add a new note
function addNote(req, res) {
    const newNote = req.body;
    newNote.id = uuidv4();
    const notes = JSON.parse(fs.readFileSync(path.join(__dirname, '../db/db.json')));
    notes.push(newNote);
    fs.writeFileSync(path.join(__dirname, '../db/db.json'), JSON.stringify({ notes }));
    res.json(notes);
} 

// Delete a note
function deleteNote(req, res) {
    const noteId = request.params.id.toString();
    const notes = JSON.parse(fs.readFileSync(path.join(__dirname, '../db/db.json')));
    const updatedNotes = notes.filter( note => note.id.toString() !== noteId );
    fs.writeFileSync(path.join(__dirname, '../db/db.json'), JSON.stringify({ updatedNotes }));
    res.json(updatedNotes);
}

// Export the functions
module.exports = {
    loadNotes,
    addNote,
    deleteNote
};
