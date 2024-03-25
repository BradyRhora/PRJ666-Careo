import Head from "next/head";
import { Inter } from "next/font/google";
import TabNavigation from "@/components/TabNavigation";
import { Modal, Container, Button, Form} from "react-bootstrap";
import { useState } from "react";
import { deleteUser, logoutUser } from "@/lib/authenticate";
import { useRouter } from "next/router";
import bcrypt from 'bcryptjs';
import Link from 'next/link'

const inter = Inter({ subsets: ["latin"] });

export default function AccountDetails(){
    
    const router = useRouter();
    // Using a modal to show an alert window that prompts the user to re-enter their email to confirm
    const [showModal, setShowModal] = useState(false);
    const [emailInput, setEmailInput] = useState("");
    const [passwordInput, setPasswordInput] = useState("");

    const handleDeleteUser = async(e) => {
        e.preventDefault();


        if (!passwordInput || !emailInput){
            alert("Please fill in the email and password fields to delete your account.")
            return;
        }

        //Hashing password before sending it off
        const hashedPassword = await bcrypt.hash(passwordInput, 10);

        const wasSuccessful = await deleteUser(emailInput, hashedPassword);

        if(wasSuccessful){
            alert("Deletion was successful. Thank you for using CareO.");
            
            //Log user out from the session
            await logoutUser();
            
            await router.push('/')

            //Refresh the page to remove the log in status of the user
            router.reload();
        }
        else{
            alert("Incorrect email and/or password was provided.");
        }
    }

    return (
        <>

        <Head>
            <title>Account Details</title>
            <meta name="account" content="View your account" />
            <meta name="viewport" content="width-device-width, initial-scale=1" />
            <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className={`${inter.className}`}>
            <div style={{textAlign:"center"}} id="hero-text">
                <h1>Account</h1>
                <br />
                <TabNavigation/>
            </div>
            <br />
            <Container fluid style={{marginBottom: "5em"}}>
                <div style={{display: "flex", alignItems: "center", justifyContent: "center", flexDirection:"column"}}>
                    <Link href="/orders"><Button>View Orders</Button></Link>
                    <br/>
                    <Button variant="outline-danger" onClick={() => setShowModal(true)}>Delete Your Account</Button>
                </div>
            </Container>

            {/* Modal (Alert Window) */}
            <Modal show={showModal} onHide={() => setShowModal(false)} className="delete-modal">
                <Modal.Header closeButton>
                    <Modal.Title>Delete Account</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Are you sure you want to delete your account?</p>
                    <br />
                    <p>Please re-enter your email and password to confirm</p>
                    
                    {/* Using a form to get user input */}
                    <Form.Control type="text" placeholder="Enter your email." value={emailInput} onChange={(e) => setEmailInput(e.target.value)} />
                    <br/>
                    <Form.Control type="password" placeholder="Enter your password." value={passwordInput} onChange={(e) => setPasswordInput(e.target.value)} />
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowModal(false)}>No</Button>
                        <Button variant="danger" onClick={handleDeleteUser}>Yes</Button>
                    </Modal.Footer>
                </Modal.Body>
            </Modal>
      </main>

        </>
    )
}