import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap is imported globally in main.jsx
import '../styles.css'; // Ensure this path is correct

const BookDetailsPage = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);

  useEffect(() => {
    // Fetch book details by id
    fetch(`http://localhost:5000/api/v1/book/${id}`)
      .then(response => response.json())
      .then(data => setBook(data))
      .catch(error => console.error('Error fetching book details:', error));
  }, [id]);

  return (
    <div className="BookDetails">
      {book ? (
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">{book.bookTitle}</h1>
              <h3 className="text-center">{book.bookAuthor}</h3>
              <p className="lead text-center">{book.description}</p>
              <Link className="btn btn-info float-left" to="/">
                Back to Book List
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <p>Loading book details...</p>
      )}
    </div>
  );
};

export default BookDetailsPage;
