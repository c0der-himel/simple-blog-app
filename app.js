const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const path = require('path');

const app = express();

// Schema & Model
const Schema = mongoose.Schema;
const BlogPostSchema = new Schema({
  title: String,
  body: String,
  date: {
    type: String,
    default: Date.now(),
  },
});
const BlogPost = mongoose.model('post', BlogPostSchema);

// saving data
const data = {
  title: 'Hello, World',
  body: 'Hello, World. What is happening ?',
};

const newPost = new BlogPost(data);

// newPost.save((err) => {
//   if (err) {
//     console.log('Something went wrong');
//   } else {
//     console.log('Data saved');
//   }
// });

// HTTP request logger
app.use(morgan('dev'));

// routes
app.get('/api', (req, res) => {
  BlogPost.find()
    .then((data) => {
      console.log(data);
      res.json(data);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get('/api/name', (req, res) => {
  const data = {
    username: 'dom',
    age: 50,
  };
  res.json(data);
});

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
