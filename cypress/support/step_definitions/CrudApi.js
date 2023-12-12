import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor'



let tkn;

Given("I am an authenticated user", () => {
    cy.request({
        method: 'POST',
        url: Cypress.env('REACT_APP_GRAPHQL_ENDPOINT'),
        body: {
            operationName: 'Mutation',
            query: `mutation loginUser($username: String!, $password: String!) {
        loginUser(username: $username, password: $password) {
          token
        }
      }`,
            variables: {
                username: Cypress.env('username'),
                password: Cypress.env('password'),
            },
        },
    }).then((response) => {
        tkn = response.body.data.loginUser.token;
        console.log(tkn);
    });
});