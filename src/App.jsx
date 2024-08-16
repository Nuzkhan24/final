import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ListingPage from './components/ListingPage';
import AddBookPage from './components/AddBookPage';
import BookDetailsPage from './components/BookDetailsPage';
import './styles.css';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ListingPage />} />
        <Route path="/add-book" element={<AddBookPage />} />
        <Route path="/show-book/:id" element={<BookDetailsPage />} />
      </Routes>
    </Router>
  );
};

export default App;
