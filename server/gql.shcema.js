const { gql } = require('apollo-server-express');

const typeDefs = gql`
type User {
    id: ID!
    username: String!
    password: String!
    email: String!
    created_at: String!
}
type BlogPost {
    id: ID!
    title: String!,
  content: String!,
  author: String!,
  created_at: String!
}
"""  post_id: { type: mongoose.Schema.Types.ObjectId, ref: 'BlogPost' },
  author: String,
  content: String,
  created_at: { type: Date, default: Date.now } """

type Comment {
    id: ID!
    post_id: String!,
    author: String!,
    content: String!,
    created_at: String!
}
type Query {
    getBlogPosts: [BlogPost]
    getBlogPostsByAuthor(author: String!): [BlogPost]
    getComments: [Comment]
    getCommentsByAuthor(author: String!): [Comment]
    getUsers: [User]
    getUser(username: String!): User
}
type Mutation {
createBlogPost(title: String!, content: String!, author: String!): BlogPost
    createComment(post_id: String!, author: String!, content: String!): Comment
    loginUser(username: String!, password: String!): User
    updateBlogPost(id: ID!, title: String!, content: String!, author: String!): BlogPost
    deleteBlogPost(id: ID!): BlogPost
    deleteComment(id: ID!): Comment
    updateComment(id: ID!, post_id: String!, author: String!, content: String!): Comment

   
}
`;

module.exports = typeDefs;



