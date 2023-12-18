import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor'
///<reference types="cypress"/>

require("cypress-xpath");

Given('I have a database connection', () => {
    cy.task('connectDB',

    ).then((res) => {
        cy.log(res);
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
