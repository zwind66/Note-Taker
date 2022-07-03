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
    const notes = loadNotes();
    notes.push(newNote);
    fs.writeFileSync(path.join(__dirname, '../db/db.json'), JSON.stringify({ notes: notes }, null, 2));
    res.json(notes);
} 

// Delete a note
function deleteNote(req, res) {
    const notes = loadNotes();
    const noteId = req.params.id;
    const updatedNotes = notes.filter(note => note.id !== noteId);
    fs.writeFileSync(path.join(__dirname, '../db/db.json'), JSON.stringify({ notes: updatedNotes }, null, 2));
    res.json(updatedNotes);
}

// Export the functions
module.exports = {
    loadNotes,
    addNote,
    deleteNote
};
