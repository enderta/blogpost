import React, {useEffect, useState} from 'react'
import {Button, Card, Container, Form, Image} from "react-bootstrap";
import { gql, useQuery, useMutation } from "@apollo/client";
function Login() {
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
   
const LOGIN = gql`
mutation Mutation($username: String!, $password: String!) {
  loginUser(username: $username, password: $password) {
    token
    user {
      id
      username
      password
    }
  }
}
`;

const [loginUser, { data }] = useMutation(LOGIN);

const handleSubmit = (e) => {
    e.preventDefault();
    loginUser({ variables: { username, password } });
    console.log(data);
    if (data) {
        localStorage.setItem("token", data.loginUser.token);
        window.location.href = "/home";
    }
}

const handleChanges = (e) => {
    if (e.target.name === "username") {
        setUserName(e.target.value);
    } else {
        setPassword(e.target.value);
    }
}



    return (
        
            <div>
                    <Container className="d-flex justify-content-center align-items-center">
                    <Card  text="white" className="mb-4" style={{ margin: "50px", background:"#200202"}}>
                           
                            <Form onSubmit={handleSubmit}>
                                <Form.Group controlId="formBasicEmail">
                                    <Form.Label>User Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter user name"
                                        name="username"
                                        value={username}
                                        data-testid="username"
                                        onChange={handleChanges}
                                    />
                                </Form.Group>
                                <Form.Group controlId="formBasicPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Password"
                                        name="password"
                                        value={password}
                                        data-testid="password"
                                        onChange={handleChanges}
                                    />
                                </Form.Group>
                                <br/>
                                <div className="d-flex justify-content-between">
                                    <Button variant={'outline-warning'} data-testid={"login"} type="submit">
                                        Login
                                    </Button>
                            
                                </div>
                            </Form>
                        </Card>
                        </Container>
                    
        </div>

    )
}

export default Login
