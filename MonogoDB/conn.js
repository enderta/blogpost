

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { BlogPost, Comment, User } = require('./schema'); 

mongoose.connect('mongodb://localhost:27017/blog_app', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});


