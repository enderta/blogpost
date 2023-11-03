const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();



const blogPostSchema = new mongoose.Schema({
  title: String,
  content: String,
  author: String,
  image_url: String,
  created_at: { type: Date, default: Date.now }
});

const commentSchema = new mongoose.Schema({
  post_id: { type: mongoose.Schema.Types.ObjectId, ref: 'BlogPost' },
  author: String,
  content: String,
  title: String,
  created_at: { type: Date, default: Date.now }
});

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    email: String,
    created_at: { type: Date, default: Date.now }
    });



const BlogPost = mongoose.model('BlogPost', blogPostSchema);
const Comment = mongoose.model('Comment', commentSchema);
const User = mongoose.model('User', userSchema);

module.exports = { BlogPost, Comment, User };
