import React, {useState} from "react";
import {faSearch} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Navbar from "./Navbar";
import {gql, useQuery, useMutation} from "@apollo/client";
import {Link} from "react-router-dom";
import {Button, Card, Row, Container} from "react-bootstrap";
import "./Home.css";
import NewsTicker from './NewsTicker';
import ScrollToTop from "./ScrollToTop";

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
    window.location.href = "/home";
}
const Home = () => {
    const [search, setSearch] = useState("");
    const {loading, error, data} = useQuery(GET_POSTS);
    const [deleteBlogPost] = useMutation(DELETE_POST, {
        context: {
            headers: {
                authorization: localStorage.getItem('token'),
            },
        },
    });

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;
    console.log(data)
    const filteredPosts = [...data.getBlogPosts].sort((a, b) => {
        return new Date(b.created_at) - new Date(a.created_at);
    }).filter(
        (post) =>
            post.title.toLowerCase().includes(search.toLowerCase()) ||
            post.content.toLowerCase().includes(search.toLowerCase()) ||
            post.author.toLowerCase().includes(search.toLowerCase())
    );


    const formatDate = (dateString) => {
        const options = {year: 'numeric', month: '2-digit', day: '2-digit'};
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


    const PostCard = ({post}) => (
        <div>
            <Card className="mb-4" key={post.id} bg="dark" text="white" border="dark">
                <div style={{
                    position: 'relative',
                    paddingBottom: '75%',
                    overflow: 'hidden' // to ensure the image scales down if it's too large
                }}>
                    <Card.Img src={post.image_url} alt={post.title} style={{
                        position: 'absolute',
                        top: '0',
                        left: '0',
                        height: '100%',
                        width: '100%'
                    }}/>
                </div>
                <Card.Body>
                    <Card.Title>
                        {highlightSearchTerm(post.title, search)}
                    </Card.Title>
                    <Card.Text>{
                        post.content.length > 100 ?
                            (<div>
                                    {highlightSearchTerm(post.content.substring(0, 100), search)}
                                    <Link to={`/read/${post.id}`}>
                                        <Button variant="outline-primary" style={{margin: "10px"}}>Read More</Button>
                                    </Link>
                                </div>
                            ) :
                            (<div>
                                {highlightSearchTerm(post.content, search)}
                            </div>)


                    }</Card.Text>
                    <Card.Text>Created by {post.author}</Card.Text>
                    <Card.Text>Posted on {formatDate(post.created_at)}</Card.Text>

                    <br/>
                    {localStorage.getItem("token") && (
                        <>

                            <Link to={`/edit/${post.id}`} style={{margin: "10px"}}>
                                <Button variant="outline-success">Edit</Button>
                            </Link>
                            <Button
                                style={{margin: "10px"}}
                                variant="outline-danger"
                                onClick={async () => {
                                    await deleteBlogPost({
                                        variables: {deleteBlogPostId: post.id},
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
        <div>

            {!localStorage.getItem("token") ? (
                <div>
                    <Link to="/login">
                        <Button variant="outline-secondary" style={{margin: "10px"}}>Admin Login</Button>
                    </Link>
                </div>

            ) : (
                <div>
                    <Link to={`/add`}>
                        <Button variant="outline-warning" style={{margin: "10px"}}>Add</Button>
                    </Link>
                    <Button variant="outline-info" style={{margin: "10px"}} onClick={logout}>Logout</Button>
                </div>

            )}
            <Container>
                <div className="row">
                    <div className="col-md-8">
                        <Row xs={1} md={3} lg={2} className="g-4">
                            {filteredPosts.map((post) => (
                                <div key={post.id}>
                                    <PostCard post={post}/>
                                </div>
                            ))}
                        </Row>
                    </div>
                    <div className="col-md-4 col-sm-12">
                        <Card text="white" className="mb-4"
                              style={{margin: "10px", background: "#200202", position: "fixed"}}>
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

            <div>
                <ScrollToTop/>
            </div>
        </div>
    );
};

export default Home;