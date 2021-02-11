const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const path = require('path');

const app = express();

// HTTP request logger
app.use(morgan('dev'));

// routes
app.get('/api', (req, res) => {
  const data = {
    username: 'john',
    age: 45,
  };
  res.json(data);
});

app.get('/api/name', (req, res) => {
  const data = {
    username: 'dom',
    age: 50,
  };
  res.json(data);
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
});
