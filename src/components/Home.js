import React, { useState } from "react";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Navbar from "./Navbar";
import { gql, useQuery, useMutation } from "@apollo/client";
import { Link } from "react-router-dom";
import { Button, Card, Row, Container } from "react-bootstrap";

const GET_POSTS = gql`
  query Query {
    getBlogPosts {
      id
      title
      content
      author
      image_url
      created_at
    }
  }
`;

const DELETE_POST = gql`
  mutation Mutation($deleteBlogPostId: ID!) {
    deleteBlogPost(id: $deleteBlogPostId) {
      content
    }
  }
 
`;
const logout = () => {
  localStorage.clear();
  window.location.href = "/home";}
const Home = () => {
  const [search, setSearch] = useState("");
  const { loading, error, data } = useQuery(GET_POSTS);
  const [deleteBlogPost] = useMutation(DELETE_POST, {
    context: {
      headers: {
        authorization: localStorage.getItem('token'),
      },
    },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const filteredPosts = data.getBlogPosts.filter(
    (post) =>
      post.title.toLowerCase().includes(search.toLowerCase()) ||
      post.content.toLowerCase().includes(search.toLowerCase()) ||
      post.author.toLowerCase().includes(search.toLowerCase())
  );

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

  

  const PostCard = ({ post }) => (
    <div className="bg-dark text-white">
    <Card className="mb-4" key={post.id}
    bg="dark"
    text="white"
    border="success"  
    style={{ margin: "10px" }}
   
    
    >
      <Card.Img src={post.image_url} alt={post.title} />
      <Card.Body>
        <Card.Title>
          {highlightSearchTerm(post.title, search)}
        </Card.Title>
        <Card.Text>{highlightSearchTerm(post.content, search)}</Card.Text>
        <Card.Text>Created by {highlightSearchTerm(post.author, search)}</Card.Text>
        <Card.Text>Posted on {formatDate(post.created_at)}</Card.Text>
        <Link to={`/read/${post.id}`}>
          <Button variant="outline-primary" style={{margin:"10px"}}>Read More</Button>
        </Link>
        <br />
        {localStorage.getItem("token") && (
          <>
          <Link to={`/add`}>
              <Button variant="outline-warning">Add</Button>
            </Link>
            <Link to={`/edit/${post.id}`} style={{ margin: "10px" }}>
              <Button variant="outline-success">Edit</Button>
            </Link>
          
            
            <Button variant="outline-info" style={{margin:"10px"}} onClick={logout}>Logout</Button>
            <Button
            style={{margin:"10px"}}
              variant="outline-danger"
              onClick={async () => {
                await deleteBlogPost({
                  variables: { deleteBlogPostId: post.id },
                });
                window.location.reload();
              }}
            >
              Delete
            </Button>
          </>
        )}
      </Card.Body>
    </Card>
    </div>
  );


  return (
    <div className="bg-dark text-white vh-100">
    <Link to="/login">
              <Button variant="outline-secondary" style={{margin:"10px"}}>Admin Login</Button>
            </Link>
    <Container>
      <div className="row">
        <div className="col-md-8">
          <Row xs={1} md={3} lg={2} className="g-4">
            {filteredPosts.map((post) => (
              <div key={post.id}>
                <PostCard post={post} />
              </div>
            ))}
          </Row>
        </div>
        <div className="col-md-4">
          <Card bg="dark" text="white" className="mb-4" style={{ margin: "10px" }}>
            <Card.Body>
            
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search for..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </Card.Body>
            
          </Card>
          
        </div>
      </div>
    </Container>
    </div>
  );
};

export default Home;