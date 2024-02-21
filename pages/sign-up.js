import { Form, Alert, Button } from "react-bootstrap"
import { Inter } from "next/font/google";
import { useState } from 'react';
import { registerUser } from "@/lib/authenticate";
import { useRouter } from "next/router";

import { useAtomValue } from "jotai";
import { userAtom } from "@/store";

// TODO: change 'user' terminology to 'email'; low priority

export default function SignUp(){
    const router = useRouter();
    const userData = useAtomValue(userAtom);

    // TODO: Move this functionality to middleware
    if (userData && userData.email) { // If user is already logged in, redirect to home page
        router.push("/");
     }

    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");
    const [checkPassword, setCheckPassword] = useState("");
    const [termsChecked, setTermsChecked] = useState(false);
    const [warning, setWarning] = useState("");


    

    //Opens tab to terms and conditions page. For now gives 404 error since there is no terms and conditions page yet.
    function onTermsClick(event){
        console.log('Terms and conditions link clicked');

    }

    const termsLabel = (
        <span> I agree to the &nbsp;
            <a href="/terms-and-conditions"
                target="_blank"
                onClick={onTermsClick}
            >Terms and Conditions</a>

        </span>
    );

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Check to see if fields are empty
        if (!user.trim() || !password.trim() || !checkPassword.trim()) {
            setWarning("Please fill out all fields.");
            return;
        }


        // Check if passwords match
        if (password !== checkPassword) {
            setWarning("Passwords do not match.");
            return;
        }
            
        // Password validation regular expression
        const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*?_<>.,()[\]|]).{8,}$/;

        if (!passwordRegex.test(password)){
            setWarning("Password must contain at least 8 characters, 1 number, and 1 special character (#,$^,?,etc.)")
            return;
        }

        // Check if user agreed to t and c
        if (!termsChecked){
            setWarning("Please agree to the Terms and Conditions") //This could also be an alert, if we want
        }
        try {
            await registerUser(user, password);
            // TODO: verify successful registration before pushing /login
            alert("Please check your email for a verification message.");
            router.push('/login');
        } catch(e) {
            console.log(e);
            // TODO: Do something to notify the user of the error
        }
    }

    return (
        <div>
            <div id="hero-text">
                <h1>Sign Up</h1>
            </div>
            <div className='centered'>
                <Form id="login-form" onSubmit={handleSubmit}>
                    <Form.Group>
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" value={user} id="email" name="email" onChange={(e)=>setUser(e.target.value)} placeholder="Enter valid email"/>
                    </Form.Group>
                    <br />
                    <Form.Group>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" value={password} id="password" name="password" onChange={(e)=>setPassword(e.target.value)} placeholder="Enter valid password" />
                        <Form.Label style={{fontSize: '13px'}}>Password must have a length of at least 8 characters, with 1 number, and 1 special character (#,$^,?,etc.)</Form.Label>
                    </Form.Group>
                    <br />
                    <Form.Group>
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control type="password" value={checkPassword} id="checkPassword" name="checkPassword" onChange={(e)=>setCheckPassword(e.target.value)} placeholder="Enter the password again" />
                    </Form.Group>
                    {warning && <><br/><Alert variant='danger'>{warning}</Alert></>}
                    <br />
                    <div>
                        <Form.Check style={{width:'auto'}} type="checkbox" label={termsLabel} checked={termsChecked} onChange={(e) => setTermsChecked(e.target.checked)}/>
                        <Form.Check style={{width:'auto'}} type="checkbox" label="Send me emails about product updates" />
                    </div>
                    <br />
                    <div className="centered">
                        <Button variant="primary" type="submit">Create Account</Button>
                    </div>
                </Form>
            </div>
        </div>
    );
}