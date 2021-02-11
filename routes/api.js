const express = require('express');

const BlogPost = require('../models/BlogPostModel');

const router = express.Router();

router.get('/', (req, res) => {
  BlogPost.find()
    .then((data) => {
      console.log(data);
      res.json(data);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get('/name', (req, res) => {
  const data = {
    username: 'dom',
    age: 50,
  };
  res.json(data);
});

module.exports = router;
