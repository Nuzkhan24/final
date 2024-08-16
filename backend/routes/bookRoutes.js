const express = require('express');
const router = express.Router();
const Book = require('../models/Book');

// @route   GET /api/v1/book
// @desc    Get all books
router.get('/', async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   GET /api/v1/book/:id
// @desc    Get single book by id
router.get('/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (book) {
      res.json(book);
    } else {
      res.status(404).json({ message: 'Book not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   POST /api/v1/book
// @desc    Add/save book
router.post('/', async (req, res) => {
  const book = new Book({
    bookTitle: req.body.bookTitle,
    bookAuthor: req.body.bookAuthor,
    description: req.body.description,
  });

  try {
    const newBook = await book.save();
    res.status(201).json(newBook);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @route   POST /api/v1/book/:id
// @desc    Update book by id
router.post('/:id', async (req, res) => {
  try {
    const updatedBook = await Book.findByIdAndUpdate(
      req.params.id,
      {
        bookTitle: req.body.bookTitle,
        bookAuthor: req.body.bookAuthor,
        description: req.body.description,
      },
      { new: true }
    );

    if (updatedBook) {
      res.json(updatedBook);
    } else {
      res.status(404).json({ message: 'Book not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @route   DELETE /api/v1/book/:id
// @desc    Delete book by id
router.delete('/:id', async (req, res) => {
  try {
    const result = await Book.findByIdAndDelete(req.params.id);
    if (result) {
      res.json({ message: 'Book deleted' });
    } else {
      res.status(404).json({ message: 'Book not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
