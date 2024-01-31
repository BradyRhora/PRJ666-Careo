import { Card, Form, Alert, Button } from "react-bootstrap"
import styles from "@/styles/Home.module.css";
import { Inter } from "next/font/google";
import { useState } from 'react';

const inter = Inter({ subsets: ["latin"] });

export default function Login(){
    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");
    const [warning, setWarning] = useState("");

    return (
        <div>
            <div className="header-text">
                <h1>Welcome to Careo</h1>
                <h4>Please log in to continue</h4>
            </div>
            <div className='centered' style={{paddingTop: '50px'}}>
                <Form id="login-form">
                    <Form.Group>
                        <Form.Label>Username:</Form.Label>
                        <Form.Control type="text" value={user} id="userName" name="userName" onChange={(e)=>setUser(e.target.value)} placeholder="john.smith@gmail.com"/>
                    </Form.Group>
                    <br />
                    <Form.Group>
                        <Form.Label>Password:</Form.Label>
                        <Form.Control type="password" value={password} id="password" name="password" onChange={(e)=>setPassword(e.target.value)} placeholder="Password123" />
                    </Form.Group>
                    {warning && <><br/><Alert variant='danger'>{warning}</Alert></>}
                    <br />
                    <div className="spaced-apart">
                        <Form.Check style={{width:'auto'}} type="checkbox" label="Remember Me" />
                        <a href="forgot">Forgot password?</a>
                    </div>
                    <br />
                    <div id="login-buttons" className="spaced-apart">
                        <Button variant="primary" className="pull-right" type="submit">Login</Button>
                        <Button variant="secondary" className="pull-right" type="submit">Sign Up</Button>
                    </div>
                </Form>
            </div>
        </div>
    );
}