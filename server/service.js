const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { BlogPost, Comment, User } = require('../MonogoDB/schema');
require('dotenv').config();

const SECRET = process.env.SECRET;

class blogPost{
    async getBlogPosts(){
        const blogPosts = await BlogPost.find();
        return blogPosts;
    }
    async getBlogPostsByAuthor(args){
        const blogPosts = await BlogPost.find({ author: args.author });
        return blogPosts;
    }
    async getBlogPost(args){
        const blogPost = await BlogPost.findById(args.id);
        return blogPost;
    }
    async createBlogPost(args,context){
        if(!context.user){
            throw new Error('Unauthorized')
        }
        const blogPost = new BlogPost({
            title: args.title,
            content: args.content,  
            author: args.author,
            image_url: args.image_url,
        });
        await blogPost.save();
        return blogPost;
    }
    async updateBlogPost(args,context){
        if(!context.user){
            throw new Error('Unauthorized')
        }
        const blogPost = await BlogPost.findByIdAndUpdate(args.id, {
            title: args.title,
            content: args.content,
            author: args.author,
        });
        return blogPost;
    }
    async deleteBlogPost(args,context){
        if(!context.user){
            throw new Error('Unauthorized')
        }
        const blogPost = await BlogPost.findByIdAndRemove(args.id);
        return blogPost;
    }

    //comment
    async getComments(){
        const comments = await Comment.find();
        return comments;
    }
    async getCommentsByBlogPost(args){
        const comments = await Comment.find({ blogPost: args.blogPost });
        return comments;
    }
    async getComment(args){
        const comment = await Comment.findById(args.id);
        return comment;
    }
    async createComment(args){
        const comment = new Comment({
            blogPost: args.blogPost,
            content: args.content,
            author: args.author,
        });
        await comment.save();
        return comment;
    }
    async updateComment(args){
        const comment = await Comment.findByIdAndUpdate(args.id, {
            blogPost: args.blogPost,
            content: args.content,
            author: args.author,
        });
        return comment;
    }
    async deleteComment(args,context){
        if(!context.user){
            throw new Error('Unauthorized')
        }
        const comment = await Comment.findByIdAndRemove(args.id);
        return comment;
    }
    //user
    async getUsers(){
        const users = await User.find();
        return users;
    }

    async loginUser(args){
        const user = await User.findOne({ username: args.username });
        if (!user) {
            throw new Error('No such user found');
        }
        const valid = await bcrypt.compare(args.password, user.password);
        if (!valid) {
            throw new Error('Invalid password');
        }
        const token = jwt.sign({ id: user._id }, SECRET, { expiresIn: '1h' });
        return {
            token,
            user,
        };
    }


}

module.exports = new blogPost();