import {Given, When, Then} from '@badeball/cypress-cucumber-preprocessor'
require("cypress-xpath");

let numberofpostsUI;

Given('I am on the main page I see the {string} text', (expectedWelcomeText) => {
    cy.wait(5000);
    cy.visit('https://blogpost-flax.vercel.app/');

});

When('I see the {string} link', (link) => {

    cy.contains(link).should('exist');

});

Then('I click the {string} link', (link) => {

    cy.contains(link).click();

    let els = cy.xpath('//div[@class=\'card-body\']//div[@class=\'card-title h5\']')
    els.then((el) => {
        numberofpostsUI = el.length;
        console.log(numberofpostsUI)
    })

});

Then('I should see the posts in', () => {

    cy.get(':nth-child(1) > :nth-child(1) > a > .btn').should('exist');

});

export {numberofpostsUI};