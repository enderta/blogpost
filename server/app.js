const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const typeDefs = require('./gql.shcema.js');
const resolvers = require('./gql.resolver.js');
const db = require('./db.config');
const jwt = require('jsonwebtoken');
const serverless = require('serverless-http');


const SECRET = process.env.SECRET || 'your-secret-key'; // Replace with your actual secret key

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

const app = express();

// Add authentication middleware
app.use((req, res, next) => {
    const token = req.headers.authorization || '';

    if (!token) {
        return next(); // No token provided, continue without user information
    }

    jwt.verify(token, SECRET, (err, decoded) => {
        if (err) {
            return next(); // Invalid token, continue without user information
        }
        req.user = decoded;
        next();
    });
});

function startServer() {
    return new Promise((resolve) => {
        db.once('open', async () => {
            await server.start();
            server.applyMiddleware({ app });
            resolve();
        });
    }
    );
}

startServer().then(() => {
    console.log('Server started!');
});

app.listen({ port: process.env.PORT || 4000 }, () =>
    console.log(
        `🚀 Server ready at http://localhost:${process.env.PORT || 4000}${server.graphqlPath}`
    )
);

module.exports.handler = serverless(app);