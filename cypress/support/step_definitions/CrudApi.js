import { Given, When } from '@badeball/cypress-cucumber-preprocessor'
import chai from 'chai';

let token;
let id;

const performRequest = (query, variables) => {
    return cy.request({
        method: 'POST',
        url: Cypress.env('REACT_APP_GRAPHQL_ENDPOINT'),
        headers: {
            'content-type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `${token}`,
        },
        body: {
            query,
            variables,
        },
    });
}

const loginUser = () => {
    const query = `
        mutation loginUser($username: String!, $password: String!) {
            loginUser(username: $username, password: $password) {
                token
            }
        }`;

    return performRequest(query, {
        username: Cypress.env('username'),
        password: Cypress.env('password'),
    });
}

const createBlogPost = () => {
    const query = `
        mutation Mutation($title: String!, $content: String!, $author: String!, $imageUrl: String!) {
            createBlogPost(title: $title, content: $content, author: $author, image_url: $imageUrl) {
                id
            }
        }`;

    return performRequest(query, {
        title: 'Test Title',
        content: 'Test Content',
        author: 'Test Author',
        imageUrl: 'Test Image URL',
    });
}

const updateBlogPost = () => {
    const query = `
        mutation Mutation($updateBlogPostId: ID!, $title: String!, $content: String!, $author: String!) {
            updateBlogPost(id: $updateBlogPostId, title: $title, content: $content, author: $author) {
                author
            }
        }`;

    return performRequest(query, {
        updateBlogPostId: id,
        title: 'Test Title',
        content: 'Test Content',
        author: 'Test Author',
    });
}

const deleteBlogPost = () => {
    const query = `
        mutation DeleteBlogPost($deleteBlogPostId: ID!) {
            deleteBlogPost(id: $deleteBlogPostId) {
                author
            }
        }`;

    return performRequest(query, {
        deleteBlogPostId: id,
    });
}

const expectStatusToEqual = (res, expectedStatus) => {
    chai.expect(res.status).to.equal(expectedStatus);
}

Given("I am an authenticated user", () => {
    loginUser().then((res) => {
        token = res.body.data.loginUser.token;
        expectStatusToEqual(res, 200);
    });
});

When("I perform a POST request to {string} with valid payload", (url) => {
    createBlogPost().then((res) => {
        id = res.body.data.createBlogPost.id;
        expectStatusToEqual(res, 200);
    });
});

When("I perform a POST request to {string} with valid payload for update", (url) => {
    updateBlogPost().then((res) => {
        expectStatusToEqual(res, 200);
    });
});

When("I perform a DELETE request to {string}", (url) => {
    deleteBlogPost().then((res) => {
        expectStatusToEqual(res, 200);
    });
});