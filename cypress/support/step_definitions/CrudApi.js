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



When("I perform a POST request to {string} with valid payload", (url) => {
    const bdy =
        `mutation Mutation($title: String!, $content: String!, $author: String!, $imageUrl: String!) {
  createBlogPost(title: $title, content: $content, author: $author, image_url: $imageUrl) {
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
                title: 'Test Title',
                content: 'Test Content',
                author: 'Test Author',
                imageUrl: 'Test Image URL',
            },
        },
    }).then((response) => {
        id = response.body.data.createBlogPost.id;
        console.log(id);
    })
    response.its('status').should('equal', 200);
})

//When I perform a POST request to "/blogposts/1" with valid payload for update

When("I perform a POST request to {string} with valid payload for update", (url) => {
    const bdy =
        `mutation Mutation($updateBlogPostId: ID!, $title: String!, $content: String!, $author: String!) {
  updateBlogPost(id: $updateBlogPostId, title: $title, content: $content, author: $author) {
    author
    
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
                updateBlogPostId: id,
                title: 'Test Title',
                content: 'Test Content',
                author: 'Test Author',
            },
        },
    })
    response.its('status').should('equal', 200);

})

// When I perform a DELETE request to "/blogposts/1"

    When("I perform a DELETE request to {string}", (url) => {
        const bdy =
            `mutation DeleteBlogPost($deleteBlogPostId: ID!) {
  deleteBlogPost(id: $deleteBlogPostId) {
    author
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
                    deleteBlogPostId: id,
                },
            },
        })
        response.its('status').should('equal', 200);

    })