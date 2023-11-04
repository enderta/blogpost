import React from "react";
import { Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

const NavigationBar = () => {
    const logout = () => {
        localStorage.clear();
        window.location.href = "/landingpage";
    };

    return (
        <div style={{margin:"80px"}}>
            {localStorage.getItem("token") ? (
                <Navbar bg="dark" variant="dark" expand="lg" fixed="top">
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Item>
                                <Link to="/home" className="nav-link">
                                    Home
                                </Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Link to="/add" className="nav-link">
                                   Add
                                </Link>
                            </Nav.Item>
                            <Nav.Link onClick={logout} className="nav-link">
                                Logout
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            ) : (
                <Navbar bg="dark" variant="dark" expand="lg" fixed="top">
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Item>
                                <Link to="/home" className="nav-link">
                                    Home
                                </Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Link to="/login" className="nav-link">
                                    Login
                                </Link>
                            </Nav.Item>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            )}
        </div>
    );
};

export default NavigationBar;