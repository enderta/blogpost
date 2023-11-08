import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {gql, useQuery, useMutation} from "@apollo/client";
import {Button, Form, Container} from 'react-bootstrap';

const GET_POST = gql`
    query Query($getBlogPostId: ID!) {
        getBlogPost(id: $getBlogPostId) {
            id
            title
            content
            author
            image_url
        }
    }
`;

const UPDATE_POST = gql`
    mutation Mutation($updateBlogPostId: ID!, $title: String!, $content: String!, $author: String!) {
    updateBlogPost(id: $updateBlogPostId, title: $title, content: $content, author: $author) {
    author
    content
    id
    image_url
    title
    updated_at
    }
    }
`;

function Edit() {

    const { id } = useParams();
    const {data, loading, error }=useQuery(GET_POST, {variables: {getBlogPostId: id}});
    const [updateBlogPost] = useMutation(UPDATE_POST);

    const [variables, setVariables] = useState({
        title: '',
        content: '',
        author: '',
        imageUrl: '',
    });

    useEffect(() => {
        if (data && data.getBlogPost) {
            setVariables({
                title: data.getBlogPost.title,
                content: data.getBlogPost.content,
                author: data.getBlogPost.author,
                imageUrl: data.getBlogPost.image_url,
            });
        }
    }, [data]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error occurred: {error.message}</p>;

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setVariables({ ...variables, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateBlogPost({
                variables: {
                    updateBlogPostId: id,
                    ...variables,
                    updated_at: new Date().toISOString()
                },
                context: {
                    headers: {
                        authorization: localStorage.getItem('token'),
                    },
                },
            });
            window.location.href = "/home";
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div>
            <h1 style={{ margin: "10px", position: "fixed" }}>Edit Post</h1>
            <Button style={{ margin: "10px", float:"right" }} variant="danger" onClick={() => window.location.href = "/home"}>Back</Button>
            <Container className="d-flex justify-content-center align-items-center" style={{ margin: "10px" }}>
                <Form onSubmit={handleSubmit}>
                    <Form.Group>
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                            type="text"
                            name="title"
                            value={variables.title}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Content</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            name="content"
                            value={variables.content}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Author</Form.Label>
                        <Form.Control
                            type="text"
                            name="author"
                            value={variables.author}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Image URL</Form.Label>
                        <Form.Control
                            type="text"
                            name="imageUrl"
                            value={variables.imageUrl}
                            onChange={handleInputChange}
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
export default Edit;