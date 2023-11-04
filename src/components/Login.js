import React, {useEffect, useState} from 'react'
import {Button, Card, Form, Image} from "react-bootstrap";
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
            <div>
                <Image
                    src="https://static1.makeuseofimages.com/wordpress/wp-content/uploads/2016/10/camera-photo-lens-stock-images.jpg"
                    style={{position: "absolute", opacity: '0.5', height: "100%", width: "100%"}}/>
            </div>
            <div className="bg-dark container">
                <div className="row">
                    <div className="col-md-6 offset-md-3">

                        <Card
                            className={'bg-dark text-light'}
                            style={{margin: '10px', padding: '10px', opacity: '0.9'}}
                        >
                            <h1
                                className="text-center"
                                style={{color: 'goldenrod'}}
                            >
                                Login
                            </h1>
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
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Login
