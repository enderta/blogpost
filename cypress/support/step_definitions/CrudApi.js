import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor'



let tkn;
const headers = {
    'content-type': 'application/json',
    'Accept': 'application/json',
}
let response;
let id;

Given("I am an authenticated user", () => {
    const bdy=
        `mutation loginUser($username: String!, $password: String!) {
        loginUser(username: $username, password: $password) {
          token
        }
      }`


    response = cy.request({
        method: 'POST',
        url: Cypress.env('REACT_APP_GRAPHQL_ENDPOINT'),
        headers: headers,
        body: {
            query: bdy,
            variables: {
                username: Cypress.env('username'),
                password: Cypress.env('password'),
            },
        },
    }).then((response) => {
        tkn = response.body.data.loginUser.token;
        console.log(tkn);
    });
    response.its('status').should('equal', 200);
});

Then('I expect the status code to be 200', () => {
    response.its('status').should('equal', 200);
})

/*
* When I perform a POST request to "/blogposts" with valid payload
* */

When('I perform a POST request to {string} with valid payload for update', function(url) {
    const bdy=
        `mutation Mutation($updateBlogPostId: ID!, $title: String!, $content: String!, $author: String!) {
            updateBlogPost(id: $updateBlogPostId, title: $title, content: $content, author: $author) {
                author
                id
            }
        }`
    cy.request({
        method: 'POST',
        url: Cypress.env('REACT_APP_GRAPHQL_ENDPOINT'),
        headers: {
            'content-type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `${tkn}`,
        },
        body: {
            query: bdy,
            variables: {
                updateBlogPostId: this.id,
                title: "Test title",
                content: "Test content",
            },
        },
    }).then((response) => {
        response.its('status').should('equal', 200);
        id=response.body.data.createBlogPost.id;
    });
})
// I perform a POST request to "/blogposts/1" with valid payload for update

When('I perform a POST request to {string} with valid payload for update', function(url) {
    When('I perform a POST request to {string} with valid payload for update', function(url) {
        const bdy=
            `mutation Mutation($updateBlogPostId: ID!, $title: String!, $content: String!, $author: String!) {
  updateBlogPost(id: $updateBlogPostId, title: $title, content: $content, author: $author) {
    author
    id
  }
}`
        response = cy.request({
            method: 'POST',
            url: Cypress.env('REACT_APP_GRAPHQL_ENDPOINT'),
            headers: {
                'content-type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `${tkn}`,
            },
            body: {
                query: bdy,
                variables: {
                    updateBlogPostId: this.id,
                    title: "Test title",
                    content: "Test content",
                },
            },
        }).then((response) => {
            response.its('status').should('equal', 200);
        })
    })

})
//I perform a DELETE request to "/blogposts/1"

When('I perform a DELETE request to {string}', (url) => {
    const bdy=
        `mutation deleteBlogPost($id: ID!) {
            deleteBlogPost(id: $id) {
              id
              title
              content
            }
          }`
    response = cy.request({
        method: 'POST',
        url: Cypress.env('REACT_APP_GRAPHQL_ENDPOINT'),
        headers: {
            'content-type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `${tkn}`,
        },
        body: {
            query: bdy,
            variables: {
                deleteCommentId: this.id,
            },
        },
    }).then((response) => {
        response.its('status').should('equal', 200);
    })

})






