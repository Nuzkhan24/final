const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;

// Middleware
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/BookDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Define the schema and model
const bookSchema = new mongoose.Schema({
  bookTitle: { type: String, required: true },
  bookAuthor: { type: String, required: true },
  description: { type: String }
});

const Book = mongoose.model('Book', bookSchema);

// Routes
// Get all books
app.get('/api/v1/book', async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a single book by id
app.get('/api/v1/book/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: 'Book not found' });
    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add/save a book
app.post('/api/v1/book', async (req, res) => {
  const { bookTitle, bookAuthor, description } = req.body;
  try {
    const newBook = new Book({ bookTitle, bookAuthor, description });
    await newBook.save();
    res.status(201).json(newBook);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update a book by id
app.put('/api/v1/book/:id', async (req, res) => {
  const { bookTitle, bookAuthor, description } = req.body;
  try {
    const updatedBook = await Book.findByIdAndUpdate(
      req.params.id,
      { bookTitle, bookAuthor, description },
      { new: true, runValidators: true }
    );
    if (!updatedBook) return res.status(404).json({ message: 'Book not found' });
    res.status(200).json(updatedBook);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a book by id
app.delete('/api/v1/book/:id', async (req, res) => {
  try {
    const deletedBook = await Book.findByIdAndDelete(req.params.id);
    if (!deletedBook) return res.status(404).json({ message: 'Book not found' });
    res.status(200).json({ message: 'Book deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
