require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Routes
const emailRoutes = require('./Routers/emailRoutes.js');
app.use('/api', emailRoutes);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Catch-all route for handling 403 errors
app.use((req, res, next) => {
  const error = new Error('Forbidden');
  error.status = 403;
  next(error);
});

// Error handler middleware
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
      status: error.status
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
