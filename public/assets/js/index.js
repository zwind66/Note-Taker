// get element by id
const noteTitle = $(".note-title");
const noteText = $(".note-textarea");
const saveNoteBtn = $(".save-note");
const newNoteBtn = $(".new-note");
const noteList = $(".list-container .list-group");

// activeNote is used to keep track of the note in the textarea
let activeNote = {};

// Gets notes from the db and renders them to the main page
const getNotes = () => {
return $.ajax({
  url: "/api/notes",
  method: "GET",
});
}

// saves a note to the db and returns a promise
const saveNote = (note) => {
  return $.ajax({
    url: "/api/notes",
    data: note,
    method: "POST"
  });
}

// delete a note from the db
const deleteNote = (id) => {
  return $.ajax({
    url: "api/notes/" + id,
    method: "DELETE"
  });
};

// Render's the active note to the note textarea
const renderActiveNote = () => {
  saveNoteBtn.hide();

  if (activeNote.id) {
    noteTitle.attr('readonly', true);
    noteText.attr('readonly', true);
    noteTitle.val(activeNote.title);
    noteText.val(activeNote.title);
  } else {
    noteTitle.attr("readonly", false);
    noteText.attr("readonly", false);
    noteTitle.val("");
    noteText.val("");
  }
};

// saves a note to the db and renders the list of notes
const handleNoteSave = () => {
  const newNote = {
    title: noteTitle.val(),
    text: noteText.val(),
  };
  saveNote(newNote).then(() => {
    getAndRenderNotes();
    renderActiveNote();
  });
};

// Delete the clicked note
const handleNoteDelete = (e) => {
  // Prevents the click listener for the list from being called when the button inside of it is clicked
  e.stopPropagation();

  const note = $(this).parent(".list-group-item").data();

  if (activeNote.id === note.id) {
    activeNote = {};
  }

  deleteNote(note.id).then(() => {
    getAndRenderNotes();
    renderActiveNote();
  });
};

// Sets the activeNote and displays it
const handleNoteView = (e) => {
  activeNote = $(this).data();
  renderActiveNote();
};

// Sets the activeNote to and empty object and allows the user to enter a new note
const handleNewNoteView = (e) => {
  activeNote = {};
  renderActiveNote();
};

const handleRenderSaveBtn = () => {
  if (!noteTitle.val() || !noteText.val()) {
    saveNoteBtn.hide();
  } else {
    saveNoteBtn.show();
  }
};

// Render the list of note titles
const renderNoteList = async (notes) => {
  noteList.empty();
  let noteListItems = [];

  for (let i = 0; i < notes.length; i++) {
    const note = notes[i];

    const li = $("<li>").addClass("list-group-item").data(note);
    const delteBtn = $("<button>").addClass("btn btn-danger delete-note").text("x");
    const span = $("<span>").addClass("note-title").text(note.title);

    li.append(delteBtn, span);

    noteListItems.push(li);
  }

  noteList.append(noteListItems);
}

// Gets notes from the db and renders them to the main page
const getAndRenderNotes = () => {
  return getNotes().then(renderNoteList);
};

// add listeners for the note list
saveNoteBtn.on("click", handleNoteSave);
noteList.on("click", ".list-group-item", handleNoteView);
newNoteBtn.on("click", handleNewNoteView);
noteList.on("click", ".delete-note", handleNoteDelete);
noteTitle.on("keyup", handleRenderSaveBtn);
noteText.on("keyup", handleRenderSaveBtn);

// Gets and renders the initial list of notes
getAndRenderNotes();