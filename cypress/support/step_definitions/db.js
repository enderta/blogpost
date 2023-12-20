/* global Cypress, cy */
import {Given, Then} from '@badeball/cypress-cucumber-preprocessor'
import {numberofpostsUI} from "./home.js"
///<reference types="cypress"/>

require("cypress-xpath");

const url = Cypress.env('MongoURI');
let numberofPostsDB = 0;

Given('I have a database connection', () => {

    cy.task('connectDB', url).then((res) => {
        console.log(res);
        numberofPostsDB = res.length;
    });
})

Then('UI and database should be in sync', () => {

    expect(numberofpostsUI).to.equal(numberofPostsDB);

})


