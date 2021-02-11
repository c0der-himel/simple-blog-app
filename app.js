const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const path = require('path');

const routes = require('./routes/api');

const app = express();

app.use('/api', routes);
app.use(morgan('dev'));

const username = 'mern-blog-admin';
const password = 'admin123';
const dbName = 'mern-blog';
const PORT = process.env.PORT || 5000;
const dbURI = `mongodb+srv://${username}:${password}@nodejs.2gw6h.mongodb.net/${dbName}?retryWrites=true&w=majority`;

mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then((result) => {
    app.listen(PORT, () => {
      console.log('Connected to Database');
      console.log(`Server is running on PORT: ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
