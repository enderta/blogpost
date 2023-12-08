import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor'
require("cypress-xpath");

beforeEach(()=>{
    cy.wait(5000);
})

Given('I am on the main page I see the {string} text', (expectedWelcomeText) => {
    cy.visit('https://blogpost-flax.vercel.app/');

});

When('I see the {string} link', (link) => {
    cy.contains(link).should('exist');
});

Then('I click the {string} link', (link) => {
    cy.contains(link).click();
});

Then('I should see the posts in', () => {
    // Replace 'postSelector' with the actual CSS selector for your blog posts on the page
    cy.get(':nth-child(1) > :nth-child(1) > a > .btn').should('exist');
});

//
