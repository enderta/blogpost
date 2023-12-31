import React, { useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import { Form, Button, Container } from 'react-bootstrap';

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
        author
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data, errors } = await createBlogPost({ variables });
      // Check if there any errors returned from useMutation(createBlogPost())
      if (errors) {
        console.error(errors);
        // Handle errors here (maybe open an error modal...)
      } else {
        // Successful blog post creation
        console.log('post created', data);
      }
    } catch (err) {
      console.error('Network error', err);
      // Handle network errors here
    }

    // Reset form fields after submission
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
      <h1 style={{ margin: "10px", position: "fixed" }}>Add Post</h1>
        <Button style={{ margin: "10px", float:"right" }} variant="danger" onClick={() => window.location.href = "/home"}>Back</Button>
      <Container className="d-flex justify-content-center align-items-center" style={{margin:"10px"}}>

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
        <br/>
        <Button variant="outline-success" type="submit">
          Submit
        </Button>
      </Form>
      </Container>
    </div>
  );
}

export default Add;
