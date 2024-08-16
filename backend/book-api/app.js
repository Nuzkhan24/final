const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');  // Add this for handling CORS issues
const bookRoutes = require('./routes/bookRoutes');

const app = express();
const PORT = 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());  // Enable CORS for all routes

// Routes
app.use('/api/v1/book', bookRoutes);

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/BookDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Could not connect to MongoDB', err));

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
