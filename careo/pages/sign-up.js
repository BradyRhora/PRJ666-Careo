import { Card, Form, Alert, Button } from "react-bootstrap"
import styles from "@/styles/Home.module.css";
import { Inter } from "next/font/google";
import { useState } from 'react';

const inter = Inter({ subsets: ["latin"] });

export default function SignUp(){
    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");
    const [checkPassword, setCheckPassword] = useState("");
    const [warning, setWarning] = useState("");

    //Opens tab to terms and conditions page. For now gives 404 error since there is no terms and conditions page yet.
    function onTermsClick(event){
        console.log('Terms and conditions link clicked');

    }

    const termsLabel = (
        <span> I agree to the 
            <a href="/terms-and-conditions"
                target="_blank"
                onClick={onTermsClick}
            >Terms and Conditions</a>

        </span>
    );

    return (
        <div>
            <div className="header-text">
                <h1>Sign Up</h1>
            </div>
            <div className='centered' style={{paddingTop: '50px'}}>
                <Form id="login-form">
                    <Form.Group>
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="text" value={user} id="email" name="email" onChange={(e)=>setUser(e.target.value)} placeholder="Enter valid email"/>
                    </Form.Group>
                    <br />
                    <Form.Group>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" value={password} id="password" name="password" onChange={(e)=>setPassword(e.target.value)} placeholder="Enter valid password" />
                        <Form.Label style={{fontSize: '13px'}}>Password must contain at least 8 characters, 1 number, and 1 special character (#,$^,?,etc.)</Form.Label>
                    </Form.Group>
                    <br />
                    <Form.Group>
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control type="password" value={checkPassword} id="checkPassword" name="checkPassword" onChange={(e)=>setCheckPassword(e.target.value)} placeholder="Enter the password again" />
                    </Form.Group>
                    {warning && <><br/><Alert variant='danger'>{warning}</Alert></>}
                    <br />
                    <div>
                        <Form.Check style={{width:'auto'}} type="checkbox" label={termsLabel} />
                        <Form.Check style={{width:'auto'}} type="checkbox" label="Send me emails about product updates" />
                    </div>
                    <br />
                    <div className={styles.center}>
                        <Button variant="primary" type="submit">Create Account</Button>
                    </div>
                </Form>
            </div>
        </div>
    );
}