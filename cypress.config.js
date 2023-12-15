const { defineConfig } = require("cypress");
const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");
const preprocessor = require("@badeball/cypress-cucumber-preprocessor");
const createEsbuildPlugin = require("@badeball/cypress-cucumber-preprocessor/esbuild");
const dotenv = require('dotenv');

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

})