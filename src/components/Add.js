import React from 'react'
import { gql, useMutation } from '@apollo/client'
import { Form, Button } from 'react-bootstrap'

function Add() {
    const [variables, setVariables] = React.useState({
        title: '',
        content: '',
        author: '',
        imageUrl: '',
        created_at: new Date().toISOString()
    });

    const addPost=gql`
    mutation Mutation($title: String!, $content: String!, $author: String!, $imageUrl: String!, $created_at: String!) {
        createBlogPost(title: $title, content: $content, author: $author, image_url: $imageUrl, created_at: $created_at) {
            id
            title
            content
            author
            image_url
            created_at
        }
    }`

    const [createBlogPost, { data, }] = useMutation(addPost, {
        context: {
            headers: {
                authorization: localStorage.getItem('token'),
            },
        },
    });

    const handleChanges = (e) => {
        if (e.target.name === "title") {
            setVariables({ ...variables, title: e.target.value });
        } else if (e.target.name === "content") {
            setVariables({ ...variables, content: e.target.value });
        } else if (e.target.name === "author") {
            setVariables({ ...variables, author: e.target.value });
        } else {
            setVariables({ ...variables, imageUrl: e.target.value });
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        createBlogPost({ variables });
        window.location.href = "/home";
    }

    return (
        <div>
            <h1>Add</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                        type="text"
                        name="title"
                        placeholder="Title"
                        onChange={handleChanges}
                        value={variables.title}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Content</Form.Label>
                    <Form.Control
                        as="textarea"
                        name="content"
                        placeholder="Content"
                        onChange={handleChanges}
                        value={variables.content}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Author</Form.Label>
                    <Form.Control
                        type="text"
                        name="author"
                        placeholder="Author"
                        onChange={handleChanges}
                        value={variables.author}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Image URL</Form.Label>
                    <Form.Control
                        type="text"
                        name="imageUrl"
                        placeholder="Image URL"
                        onChange={handleChanges}
                        value={variables.imageUrl}
                    />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
    )
}

export default Add