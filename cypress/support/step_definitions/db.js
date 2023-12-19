import {Given, When, Then} from '@badeball/cypress-cucumber-preprocessor'
///<reference types="cypress"/>

require("cypress-xpath");

const url = Cypress.env('MongoURI');

Given('I have a database connection', () => {
    cy.task('connectDB', url).then((res) => {
        console.log(res);
    });
})

/*

describe('db test', () => {
    it('db test', () => {
        cy.task('connectDB', 'SELECT * FROM movies').then((res) => {
            console.log(res);
        });
    });
});*/
