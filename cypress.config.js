const { defineConfig } = require("cypress");
const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");
const preprocessor = require("@badeball/cypress-cucumber-preprocessor");
const createEsbuildPlugin = require("@badeball/cypress-cucumber-preprocessor/esbuild");
const dotenv = require('dotenv');
const { Client } = require('pg');
const {MongoClient} = require("mongodb");

dotenv.config();

module.exports = defineConfig({
    e2e: {
        setupNodeEvents(on, config) {
            on("file:preprocessor",
                createBundler({
                    plugins: [createEsbuildPlugin.default(config)],
                }));
            preprocessor.addCucumberPreprocessorPlugin(on, config).then(r =>
                console.log("Cucumber preprocessor loaded"));
            on('task', {
                async connectDB(filter) {
                    /*const client = new Client({
                        user: "postgres",
                        password: "ender",
                        host: "localhost",
                        database: "movies",
                        port: 5432,
                        ssl: false
                    });
                    await client.connect();
                    const res = await client.query(query);
                    await client.end();
                    return res.rows;*/
                    const url = 'mongodb://127.0.0.1:27017';
                    const client = new MongoClient(url);
                    await client.connect();

                    // Check if the database exists
                    const databases = await client.db().admin().listDatabases();
                    console.log('Databases:', databases);

                    const db = client.db('CYFDevDB');

                    // Check if the collection exists
                    const collections = await db.listCollections().toArray();
                    console.log('Collections:', collections);

                    const result = await db.collection('cities').find(
                        filter
                    ).toArray();

                    // Log the result
                    console.log('Result:', result);

                    await client.close();
                    return result;

                }
            });
            return config;
        },
        specPattern: "cypress/e2e/*.feature",
        "reporter": "mochawesome",
        "reporterOptions": {
            "reportDir": "cypress/reports/mocha",
            "quiet": true,
            "overwrite": false,
            "html": false,
            "json": true
        }
    },
    "plugins":["cypress"],
    env: {
        username: process.env.username,
        password: process.env.password,
        REACT_APP_GRAPHQL_ENDPOINT: process.env.REACT_APP_GRAPHQL_ENDPOINT,
        "cypress/globals": true,
    }
});