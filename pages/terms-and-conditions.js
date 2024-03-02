import { Container, ListGroup} from "react-bootstrap"
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function termsAndConditions(){


    return (
        <section>
            <Container>
                <div id="hero-text">
                    <h1>Terms and Conditions</h1>
                    <ListGroup style={{textAlign:"left"}}>
                        <ListGroup.Item>Registration Process<br />
                            &emsp; Users must provide accurate and complete information during the registration process. <br />
                            &emsp; Users are responsible for maintaining the confidentiality of their account information.
                        </ListGroup.Item>
                        <ListGroup.Item>User Responsibilities <br />
                            &emsp; Users must be at least 18 years old or have parental consent to register on the website. <br />
                            &emsp; Users are responsible for all activities conducted under their account.
                        </ListGroup.Item>
                        <ListGroup.Item>Prohibited Activities <br />
                            &emsp; Users must not share their account credentials with third parties.
                        </ListGroup.Item>
                        <ListGroup.Item>Privacy Policy <br />
                            &emsp; The website collects and processes user data according to its privacy policy. <br />
                            &emsp; Users consent to the collection and use of their personal information as outlined in the privacy policy.
                        </ListGroup.Item>
                        <ListGroup.Item>Termination of Account <br />
                            &emsp; The website collects and processes user data according to its privacy policy. <br />
                            &emsp; Users can request the deletion of their account at any time.
                        </ListGroup.Item>
                        <ListGroup.Item>Limitation of Liability <br />
                            &emsp; The website is not liable for any damages or losses incurred by users while using the platform. <br />
                            &emsp; Users use the website at their own risk.
                        </ListGroup.Item>
                        <ListGroup.Item>Changes to Terms and Conditions <br />
                            &emsp; The website reserves the right to modify the terms and conditions at any time. <br />
                            &emsp; Users will be notified of any changes to the terms and conditions.
                        </ListGroup.Item>
                    </ListGroup>
                </div>
            </Container>
        </section>
    );
}