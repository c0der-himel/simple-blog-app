const mongoose = require('mongoose');

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

module.exports = BlogPost;
