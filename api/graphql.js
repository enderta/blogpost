const { ApolloServer, gql } = require('apollo-server-micro');
const typeDefs = require('../server/gql.shcema.js');
const resolvers = require('../server/gql.resolver.js');
const db = require('../server/db.config.js');

const server = new ApolloServer({
    typeDefs,
    resolvers,
    introspection: true,
    playground: true,
    context: ({ req }) => {
        // Get the user information from the request context
        const user = req.user || null;
        return { user };
    },
});

module.exports = server.createHandler({
    path: "/api/graphql",
});