import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor'
require("cypress-xpath");

Then (`I should see the Admin Login button`, () => {
    cy.wait(5000);
    cy.xpath("//button[contains(text(),'Admin Login')]").should('exist');
});

When (`I click the Admin Login button`, () => {
    cy.wait(5000);
    cy.xpath("//button[contains(text(),'Admin Login')]").click();
});

When (`I enter my {string} and {string}`, (username, password) => {
    username=Cypress.env('username');
    password=Cypress.env('password');

    cy.wait(5000);
    cy.get('input[name="username"]').type(username);
    cy.get('input[name="password"]').type(password);
})

When (`I click the Login button`, () => {
    cy.get('button[type="submit"]').click();
    cy.wait(2000);
    cy.get('button[type="submit"]').click();



})


Then (`I should see the Add and Logout buttons`, () => {
    cy.wait(5000);
    cy.xpath("//button[contains(text(),'Add')]").should('exist');
    cy.xpath("//button[contains(text(),'Logout')]").should('exist');
});