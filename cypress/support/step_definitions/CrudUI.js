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

When (`The {string} button is clicked`, (add) => {
    console.log(add)
    cy.wait(5000);
    cy.contains(add).click();
})


When('The user enters a valid {string} {string} {string} for the post', (title, content, author) => {
    cy.get('input[name="title"]').type(title);
    cy.get('textarea[name="content"]').type(content);
    cy.get('input[name="author"]').type(author);
});


Then("The post with {string} is visible on the Blog Homepage", (author) => {
    cy.wait(5000);
    cy.contains(author).should('exist');
})

When (`The user enters new {string} for the post`, (newAuthor) => {
    cy.wait(5000);
    cy.get('input[name="author"]').clear();
    cy.get('input[name="author"]').type(newAuthor);

})


