import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor'
import {numberofposts,afternumberofposts,id, performRequest, author} from './CrudApi.js' ;

require("cypress-xpath");

Then("I verify the response contains the author", () => {
    const bdy=`query Query($getBlogPostId: ID!) {
        getBlogPost(id: $getBlogPostId) {
            author
        }
    }`
    return performRequest(bdy, {
        getBlogPostId: id,
    }).then((response) => {
        expect(response.body.data.getBlogPost.author).to.equal(author); // author should be defined here
    });
});

Then("The number of posts should be one less than before", () => {
expect(numberofposts-afternumberofposts).to.equal(1);
});

Then("The post with author is visible on the Blog Homepage", () => {
    cy.wait(5000);
    cy.contains(author).should('exist');
});
