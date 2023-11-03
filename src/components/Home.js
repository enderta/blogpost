
import React from "react";
import {useEffect, useState} from "react";
import {faBookOpenReader, faSearch} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Navbar from "./Navbar";


export default function Home() {
    const [posts, setPosts] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [search, setSearch] = React.useState("");

 
    console.log(posts)
    return (
        <div>
            <div style={{background:"black"}}>
                <Navbar search={setSearch}/>
                <div>
                    <FontAwesomeIcon icon={faSearch} color={'goldenRod'} style={{margin: "5px"}}/>
                    <input
                        type="text"
                        placeholder="Search"

                        onChange={(e) => {
                            setSearch(e.target.value);
                        }}
                        style={{border: "1px solid black", borderRadius: "5px", padding: "5px", margin: "5px"}}
                    />
                </div>
                <div className="container" >
                    <div className="row">
                        <div className="col-md-12">
                            <h1 style={{color: "goldenrod", textAlign: "center"}}>Posts</h1>
                            {loading ? <h5 style={{color: "goldenrod", textAlign: "center"}}>loading...</h5> : (
                                <div className="row">
                                    {posts.map((post) => (
                                        // eslint-disable-next-line react/jsx-key
                                        <div className="col-md-4">
                                            <div className="card"
                                                 style={{height: "30rem", width: "18rem", margin: "5px",border:"1px solid goldenrod", background:"black"}}>
                                                <img className={"card-img-top"} src={post.image_url}
                                                     alt="Card image cap"/>
                                                <div className="card-body">
                                                    <h6 className="card-title mb-2 text-muted">Title: {post.title}</h6>
                                                    <h6 className="card-subtitle mb-2 text-muted">Author: {post.author}</h6>
                                                    <p style={{color:"white"}}>
                                                        {post.content.length > 100 ? post.content.substring(0, 100) + "..." : post.content}
                                                    </p>
                                                    <h6 className="card-subtitle mb-2 text-muted">
                                                        Posted: {new Date(post.created_at).toLocaleDateString()}
                                                    </h6>
                                                    {post.updated_at ? (
                                                        <h6 className="card-subtitle mb-2 text-muted">
                                                            Updated: {new Date(post.updated_at).toLocaleDateString()}
                                                        </h6>
                                                    ) : (
                                                        <></>)
                                                    }
                                                    <span>
                                                <Link href={`posts/${post.id}`}>
                                                    <span style={{fontSize: "2rem"}}>
                                                        &#128214;
                                                    </span>
                                                </Link>
                                            </span>

                                                </div>


                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}