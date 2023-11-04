import React, { useState } from "react";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Navbar from "./Navbar";
import { gql, useQuery, useMutation } from "@apollo/client";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

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

export default function Home() {
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
    const date = new Date(dateString);
  
    // Check if it's a valid date
    if (isNaN(date)) {
      return "Invalid Date";
    }
  
    return date.toLocaleDateString("en-GB");
  };
  

  const highlightSearchTerm = (text, searchTerm) => {
    const parts = text.split(new RegExp(`(${searchTerm})`, "gi"));
    return (
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
    );
  };

  const PostCard = ({ post }) => (
    <div className="card mb-4" key={post.id}>
      <img src={post.image_url} className="card-img-top" alt={post.title} />
      <div className="card-body">
        <h2 className="card-title">
          {highlightSearchTerm(post.title, search)}
        </h2>
        <p className="card-text">{highlightSearchTerm(post.content, search)}</p>
        <p className="card-text">{highlightSearchTerm(post.author, search)}</p>
        <Link to={`/read/${post.id}`} className="btn btn-primary">
          Read More &raquo;
        </Link>
        {localStorage.getItem("token") && (
          <>
            <Link to={`/edit/${post.id}`} className="btn btn-primary">
              Edit
            </Link>
            <Button
              variant="danger"
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
      </div>
      <div className="card-footer text-muted">
        Posted on {highlightSearchTerm(formatDate(post.created_at), search)} by{" "}
        {highlightSearchTerm(post.author, search)}
      </div>
    </div>
  );

  return (
    <>
      <Navbar />
      <div className="container">
        <div className="row">
          <div className="col-md-8">
            {filteredPosts.map((post) => (
              <PostCard post={post} />
            ))}
          </div>
          <div className="col-md-4">
            <div className="card mb-4">
              <div className="card-body">
                <h5 className="card-title">
                  <FontAwesomeIcon icon={faSearch} /> Search
                </h5>
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search for..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                  <span className="input-group-btn">
                    <button className="btn btn-secondary" type="button">
                      Go!
                    </button>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
