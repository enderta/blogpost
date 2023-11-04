const { gql } = require('apollo-server-express');

const typeDefs = gql`
type BlogPost {
    id: ID!
    title: String!
    content: String!
    author: String!
    image_url: String!
    created_at: String
    updated_at: String
}

type Comment {
    id: ID!
    post_id: String!
    author: String!
    content: String!
    created_at: String
}

type User {
    id: ID!
    username: String!
    password: String!
}

type AuthData {
    token: String!
    user: User!
}

type Query {
    getBlogPosts: [BlogPost]
    getBlogPostsByAuthor(author: String!): [BlogPost]
    getBlogPost(id: ID!): BlogPost
    getComments: [Comment]
    getCommentsByBlogPost(blogPost: ID!): [Comment]
    getUsers: [User]
    getUser(username: String!): User
}

type Mutation {
    createBlogPost(title: String!, content: String!, author: String!, image_url: String!, created_at: String!): BlogPost
    updateBlogPost(id: ID!, title: String!, content: String!, author: String!): BlogPost
    deleteBlogPost(id: ID!): BlogPost
    createComment(post_id: String!, author: String!, content: String!): Comment
    updateComment(id: ID!, post_id: String!, content: String!, author: String!): Comment
    deleteComment(id: ID!): Comment
    loginUser(username: String!, password: String!): AuthData
}
type AuthData {
    token: String!
    user: User!
  }
`;

module.exports = typeDefs;



