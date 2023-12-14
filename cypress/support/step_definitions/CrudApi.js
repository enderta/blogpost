import { Given, When } from '@badeball/cypress-cucumber-preprocessor'

let token;
let response;
let id;

const headers = {
    'content-type': 'application/json',
    'Accept': 'application/json',
}

const performRequest = (method, url, query, variables) => {
    return cy.request({
        method,
        url: Cypress.env('REACT_APP_GRAPHQL_ENDPOINT'),
        headers: {
            ...headers,
            'Authorization': `${token}`,
        },
        body: {
            query,
            variables,
        },
    });
}

Given("I am an authenticated user", () => {
    const query = `
        mutation loginUser($username: String!, $password: String!) {
            loginUser(username: $username, password: $password) {
                token
            }
        }`;

    performRequest('POST', Cypress.env('REACT_APP_GRAPHQL_ENDPOINT'), query, {
        username: Cypress.env('username'),
        password: Cypress.env('password'),
    }).then((res) => {
        token = res.body.data.loginUser.token;
        expect(res.status).to.equal(200);
    });
});

When("I perform a POST request to {string} with valid payload", (url) => {
    const query = `
        mutation Mutation($title: String!, $content: String!, $author: String!, $imageUrl: String!) {
            createBlogPost(title: $title, content: $content, author: $author, image_url: $imageUrl) {
                id
            }
        }`;

    performRequest('POST', url, query, {
        title: 'Test Title',
        content: 'Test Content',
        author: 'Test Author',
        imageUrl: 'Test Image URL',
    }).then((res) => {
        id = res.body.data.createBlogPost.id;
        expect(res.status).to.equal(200);
    });
});

When("I perform a POST request to {string} with valid payload for update", (url) => {
    const query = `
        mutation Mutation($updateBlogPostId: ID!, $title: String!, $content: String!, $author: String!) {
            updateBlogPost(id: $updateBlogPostId, title: $title, content: $content, author: $author) {
                author
            }
        }`;

    performRequest('POST', url, query, {
        updateBlogPostId: id,
        title: 'Test Title',
        content: 'Test Content',
        author: 'Test Author',
    }).then((res) => {
        expect(res.status).to.equal(200);
    });
});

When("I perform a DELETE request to {string}", (url) => {
    const query = `
        mutation DeleteBlogPost($deleteBlogPostId: ID!) {
            deleteBlogPost(id: $deleteBlogPostId) {
                author
            }
        }`;

    performRequest('POST', url, query, {
        deleteBlogPostId: id,
    }).then((res) => {
        expect(res.status).to.equal(200);
    });
});