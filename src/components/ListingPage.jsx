// src/components/ListingPage.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const ListingPage = () => {
  const [books, setBooks] = useState([]);

  // Fetch books from the backend (optional for hardcoded example)
  useEffect(() => {
    fetch('http://localhost:5000/api/v1/book')
      .then(response => response.json())
      .then(data => setBooks(data))
      .catch(error => console.error('Error fetching books:', error));
  }, []);

  // Hardcoded books
  const hardcodedBooks = [
    {
      _id: '1',
      bookTitle: 'React.js 101',
      bookAuthor: 'Raymond Gallagher',
      description: 'Introduction to React.js',
    },
    {
      _id: '2',
      bookTitle: 'Express 101',
      bookAuthor: 'Alison Halley',
      description: 'Introduction to Express.js',
    },
  ];

  // Handle deleting a book (API request)
  const handleDelete = (id) => {
    fetch(`http://localhost:5000/api/v1/book/${id}`, {
      method: 'DELETE',
    })
      .then(response => response.json())
      .then(() => setBooks(books.filter(book => book._id !== id)))
      .catch(error => console.error('Error deleting book:', error));
  };

  return (
    <div className="BookList">
      <div className="col-md-12">
        <br />
        <h2 className="display-4 text-center">Books List</h2>
      </div>
      <div className="col-md-11">
        <Link to="/add-book" className="btn btn-info float-right">+ Add New Book</Link>
        <br /><br />
        <hr />
      </div>
      <div className="list">
        {hardcodedBooks.map(book => (
          <div key={book._id} className="card-container">
            <img
              src="https://images.unsplash.com/photo-1495446815901-a7297e633e8d"
              alt="Book"
              height="200"
            />
            <div className="desc">
              <h2>{book.bookTitle}</h2>
              <h3>{book.bookAuthor}</h3>
              <p>{book.description}</p>
              <button onClick={() => handleDelete(book._id)} className="btn btn-danger">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListingPage;
