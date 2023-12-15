import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor'
import {numberofposts,afternumberofposts,id, performRequest, author} from './CrudApi.js' ;

require("cypress-xpath");



//Then I verify the response contains the author

Then("I verify the response contains the author", () => {
    const bdy=`query Query($getBlogPostId: ID!) {
        getBlogPost(id: $getBlogPostId) {
            author
        }
    }`
    return performRequest(bdy, {
        getBlogPostId: id,
    }).then((response) => {
        expect(response.body.data.getBlogPost.author).to.equal(author);
    });
});

//  Then The number of posts should be one less than before

Then("The number of posts should be one less than before", () => {
expect(numberofposts-afternumberofposts).to.equal(1);
});

