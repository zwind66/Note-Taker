// get element by id
const noteTitle = $(".note-title");
const noteText = $(".note-textarea");
const saveNoteBtn = $(".save-note");
const newNoteBtn = $(".new-note");
const noteList = $(".list-container .list-group");

// activeNote is used to keep track of the note in the textarea
let activeNote = {};

// A function for getting notes from the db
const getNotes = () => {
  return $.ajax({
    url: "/api/notes",
    method: "GET",
  });
};

// A function for saving a note to the db
const saveNote = (note) => {
  return $.ajax({
    url: "/api/notes",
    data: note,
    method: "POST",
  });
};

// A function for deleting a note from the db
const deleteNote = (id) => {
  return $.ajax({
    url: "api/notes/" + id,
    method: "DELETE",
  });
};

// Render's the active note to the note textarea
const renderActiveNote = () => {
  saveNoteBtn.hide();

  if (activeNote.id) {
    noteTitle.attr("readonly", true);
    noteText.attr("readonly", true);
    noteTitle.val(activeNote.title);
    noteText.val(activeNote.text);
  } else {
    noteTitle.attr("readonly", false);
    noteText.attr("readonly", false);
    noteTitle.val("");
    noteText.val("");
  }
};

// A function for handling what happens when the form is submitted
const handleNoteSave = function () {
  const newNote = {
    title: noteTitle.val(),
    text: noteText.val(),
  };

  saveNote(newNote).then(() => {
    getAndRenderNotes();
    renderActiveNote();
  });
};

// A function for handling what happens when a note is deleted
const handleNoteDelete = function (event) {
  event.stopPropagation();

  const note = $(this).parent(".list-group-item").data();

  if (activeNote.id === note.id) {
    activeNote = {};
  }

  deleteNote(note.id).then(() => {
    getAndRenderNotes();
    renderActiveNote();
  });
};

// A function for handling what happens when a note is selected
const handleNoteView = function () {
  activeNote = $(this).data();
  renderActiveNote();
};

// A function for handling what happens when the form is submitted
const handleNewNoteView = function () {
  activeNote = {};
  renderActiveNote();
};

// hide the save button when the note is empty
const handleRenderSaveBtn = function () {
  if (!noteTitle.val().trim() || !noteText.val().trim()) {
    saveNoteBtn.hide();
  } else {
    saveNoteBtn.show();
  }
};

// Render's the list of note titles
const renderNoteList = (notes) => {
  noteList.empty();

  const noteListItems = [];

  // Loop through the notes
  const createli = (text, withDeleteButton = true) => {
    const li = $("<li class='list-group-item'>");
    const span = $("<span>").text(text);
    li.append(span);

    if (withDeleteButton) {
      const delBtn = $("<i class='fas fa-trash-alt float-right text-danger delete-note'>");
      li.append(delBtn);
    }
    return li;
  };

  if (notes.length === 0) {
    noteListItems.push(createli("No saved Notes", false));
  }

  notes.forEach((note) => {
    const li = createli(note.title).data(note);
    noteListItems.push(li);
  });

  noteList.append(noteListItems);
};

// A function to get notes from the db and render them to the sidebar
const getAndRenderNotes = () => {
  return getNotes().then(renderNoteList);
};

// Listen for the form event.
saveNoteBtn.on("click", handleNoteSave);
noteList.on("click", ".list-group-item", handleNoteView);
newNoteBtn.on("click", handleNewNoteView);
noteList.on("click", ".delete-note", handleNoteDelete);
noteTitle.on("keyup", handleRenderSaveBtn);
noteText.on("keyup", handleRenderSaveBtn);

// Render the list of notes for the first time
getAndRenderNotes();










