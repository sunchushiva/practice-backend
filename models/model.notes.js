const mongoose = require("mongoose");

const notesSchema = mongoose.Schema({
  user: String,
  name: String,
  body: String,
  isCompleted: Boolean,
});

const NoteModel = mongoose.model("note", notesSchema);

module.exports = { NoteModel };
