// src/components/AddBookPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddBookPage = () => {
  const [bookTitle, setBookTitle] = useState('');
  const [bookAuthor, setBookAuthor] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();

    fetch('http://localhost:5000/api/v1/book', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ bookTitle, bookAuthor, description }),
    })
      .then(response => response.json())
      .then(() => navigate('/'))
      .catch(error => console.error('Error adding book:', error));
  };

  return (
    <div className="CreateBook">
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <br /><a className="btn btn-info float-left" href="/">Show Book List</a>
          </div>
          <div className="col-md-8 m-auto">
            <h1 className="display-4 text-center">Add Book</h1>
            <p className="lead text-center">Create new book</p>
            <form onSubmit={handleSubmit} noValidate>
              <div className="form-group">
                <input
                  type="text"
                  placeholder="Title of the Book"
                  name="title"
                  className="form-control"
                  value={bookTitle}
                  onChange={(e) => setBookTitle(e.target.value)}
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  placeholder="Author"
                  name="author"
                  className="form-control"
                  value={bookAuthor}
                  onChange={(e) => setBookAuthor(e.target.value)}
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  placeholder="Describe this book"
                  name="description"
                  className="form-control"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <input type="submit" className="btn btn-info btn-block mt-4" value="Add Book" />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddBookPage;
