import React, { useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import { Form, Button } from 'react-bootstrap';

function Add() {
  const [variables, setVariables] = useState({
    title: '',
    content: '',
    author: '',
    imageUrl: '',
    created_at: new Date().toISOString(),
  });

  const ADD_POST = gql`
   mutation Mutation($title: String!, $content: String!, $author: String!, $imageUrl: String!) {
  createBlogPost(title: $title, content: $content, author: $author, image_url: $imageUrl) {
    id
    title
    content
    author
    image_url
    created_at
  }
}
  `;

  const [createBlogPost] = useMutation(ADD_POST, {
    context: {
      headers: {
        authorization: localStorage.getItem('token'),
      },
    },
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setVariables({ ...variables, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createBlogPost({ variables });
    // Reset form fields after submission if needed
    setVariables({
      title: '',
      content: '',
      author: '',
      imageUrl: '',
      created_at: new Date().toISOString(),
    });
    window.location.href = "/home";
  };

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
            onChange={handleInputChange}
            value={variables.title}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Content</Form.Label>
          <Form.Control
            as="textarea"
            name="content"
            placeholder="Content"
            onChange={handleInputChange}
            value={variables.content}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Author</Form.Label>
          <Form.Control
            type="text"
            name="author"
            placeholder="Author"
            onChange={handleInputChange}
            value={variables.author}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Image URL</Form.Label>
          <Form.Control
            type="text"
            name="imageUrl"
            placeholder="Image URL"
            onChange={handleInputChange}
            value={variables.imageUrl}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default Add;
