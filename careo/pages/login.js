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
            <div>
                <Card bg="light">
                    <Card.Body>
                        <h2>Welcome to Careo</h2>
                        Please log in to continue
                    </Card.Body>
                </Card>
            </div>
            <div className={styles.centerContainer}>
                <Form>
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
                    <Button variant="primary" className="pull-right" type="submit">Login</Button>
                    &emsp; {/* This adds a space between the button and link*/}
                    <a href="pages/forgot-password">Forgot password?</a>
                </Form>
            </div>
        </div>
    );
}