const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const SECRET = process.env.SECRET;

const { BlogPost, Comment, User } = require("../MonogoDB/schema");

const saltRounds = 10;

const resolvers = {
  
    Query: {
        getBlogPosts: async () => {
          const blogPosts = await BlogPost.find();
          return blogPosts;
        },
        getBlogPostsByAuthor: async (parent, args) => {
          const blogPosts = await BlogPost.find({ author: args.author });
          return blogPosts;
        },
        getComments: async () => {
          const comments = await Comment.find();
          return comments;
        },
        getCommentsByAuthor: async (parent, args) => {
          const comments = await Comment.find({ author: args.author });
          return comments;
        },
        getUsers: async () => {
          const users = await User.find();
          return users;
        },
        getUser: async (parent, args) => {
          const user = await User.findOne({ username: args.username });
          return user;
        },
    },
 
  Mutation: {
    //blogpost
    createBlogPost: async (parent, args) => {
      const blogPost = new BlogPost({
        title: args.title,
        content: args.content,
        author: args.author,
      });
      await blogPost.save();
      return blogPost;
    },
    //comment
    createComment: async (parent, args) => {
      const comment = new Comment({
        post_id: args.post_id,
        content: args.content,
        author: args.author,
      });
      await comment.save();
      return comment;
    },
    //login user
    loginUser: async (_, { username, password }) => {
        const user = await User.findOne({ username });
        if (!user) {
            throw new Error('No such user found');
        }
        const valid = await bcrypt.compare(password, user.password);
        if (!valid) {
            throw new Error('Invalid password');
        }
        const token = jwt.sign({ id: user._id }, SECRET, { expiresIn: '1h' });
        return {
            token,
            user,
        };
    },
    //update blogpost
    updateBlogPost: async (parent, args) => {
      const blogPost = await BlogPost.findByIdAndUpdate(
        args.id,
        {
          title: args.title,
          content: args.content,
          author: args.author,
        },
        { new: true }
      );
      return blogPost;
    },
    //delete blogpost
    deleteBlogPost: async (parent, args) => {
      const blogPost = await BlogPost.findByIdAndRemove(args.id);
      return blogPost;
    },
    //delete comment
    deleteComment: async (parent, args) => {
      const comment = await Comment.findByIdAndRemove(args.id);
      return comment;
    },
    //update comment
    updateComment: async (parent, args) => {
      const comment = await Comment.findByIdAndUpdate(
        args.id,
        {
          post_id: args.post_id,
          content: args.content,
          author: args.author,
        },
        { new: true }
      );
      return comment;
    },
    //delete comment
    deleteComment: async (parent, args) => {
      const comment = await Comment.findByIdAndRemove(args.id);
      return comment;
    },
  },
};

module.exports = resolvers;
