const blogPostService = require("./service");

const resolvers = {
  Query: {
    getBlogPosts: () => blogPostService.getBlogPosts(),
    getBlogPostsByAuthor: (parent, args) => blogPostService.getBlogPostsByAuthor(args),
    getBlogPost: (parent, args) => blogPostService.getBlogPost(args),
    getComments: () => blogPostService.getComments(),
    getCommentsByBlogPost: (parent, args) => blogPostService.getCommentsByBlogPost(args),
    getUsers: () => blogPostService.getUsers(),
    getUser: (parent, args) => blogPostService.getUser(args.username),
},
Mutation: {
    createBlogPost: (parent, args, context) => blogPostService.createBlogPost(args, context),
    updateBlogPost: (parent, args, context) => blogPostService.updateBlogPost(args, context),
    deleteBlogPost: (parent, args, context) => blogPostService.deleteBlogPost(args, context),
    createComment: (parent, args) => blogPostService.createComment(args),
    updateComment: (parent, args) => blogPostService.updateComment(args),
    deleteComment: (parent, args, context) => blogPostService.deleteComment(args, context),
    loginUser: (parent, args) => blogPostService.loginUser(args),
}
};

module.exports = resolvers;