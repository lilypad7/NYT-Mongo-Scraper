// Require mongoose
var mongoose = require("mongoose");
// Create a schema class
var Schema = mongoose.Schema;

// create note schema
var NoteSchema = new Schema({
  title: {
    type: String
  },
  body: {
    type: String
  }
});

// Create the Note model with the NoteSchema
var Note = mongoose.model("Article Note", NoteSchema);

// Export the Note model
module.exports = Note;
