import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { gql, useQuery } from "@apollo/client";
import { Button, Card, Container } from 'react-bootstrap';

function Read() {
  const [search, setSearch] = useState("");
  const { id } = useParams();
  const GET_POST = gql`
    query Query($getBlogPostId: ID!) {
      getBlogPost(id: $getBlogPostId) {
        id
        title
        content
        author
        image_url
        created_at
      }
    }
  `;
  const { loading, error, data } = useQuery(GET_POST, {
    variables: { getBlogPostId: id },
  });
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  console.log(data);

  const renderContentWithParagraphs = () => {
    const content = data.getBlogPost.content;
    const paragraphs = content.split('\n').map((paragraph, index) => (
      <p key={index}>{paragraph}</p>
    ));
    return paragraphs;
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    const date = new Date(dateString);

    // Check if it's a valid date
    if (isNaN(date)) {
      return "Invalid Date";
    }

    return date.toLocaleDateString("en-GB", options);
  };

  const highlightSearchTerm = (text, searchTerm) => {
    if (typeof text !== "string") {
      return text;
    }
    const parts = text.split(new RegExp(`(${searchTerm})`, "gi"));
    return (
      <div className="bg-dark text-white">
        <span>
          {parts.map((part, i) =>
            part.toLowerCase() === searchTerm.toLowerCase() ? (
              <span key={i} className="highlight">
                {part}
              </span>
            ) : (
              part
            )
          )}
        </span>
      </div>
    );
  };
  return (
    <div>
       <Button style={{ margin: "10px", position: "fixed" }} variant="danger" onClick={() => window.location.href = "/home"}>Back</Button> 
      <Container className="d-flex justify-content-center align-items-center">
       
        <Card text="white" className="mb-4" style={{ margin: "50px", background: "#200202" }}>
          <Card.Header> <h1>{data.getBlogPost.title}</h1></Card.Header>
          <Card.Img variant="top" src={data.getBlogPost.image_url} />
          <Card.Body>
            <Card.Text>
              {
                highlightSearchTerm(renderContentWithParagraphs(), search)
              }
            </Card.Text>
            <Card.Text>
                <h5>Author: {data.getBlogPost.author}</h5>
             
            </Card.Text>
            <Card.Text>
              <h5>Created at: {formatDate(data.getBlogPost.created_at)}</h5>
            </Card.Text>
          </Card.Body>
          
        </Card>
        
      </Container>
    
    </div>
  )
}

export default Read;