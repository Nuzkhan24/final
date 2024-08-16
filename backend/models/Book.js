const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
  bookTitle: { type: String, required: true },
  bookAuthor: { type: String, required: true },
  description: { type: String },
});

module.exports = mongoose.model('Book', BookSchema);
