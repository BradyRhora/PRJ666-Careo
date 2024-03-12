import { Form, Button, Row, Col } from "react-bootstrap";
import { useRouter } from "next/router";

import { atom, useAtom, useAtomValue } from "jotai";
import { orderInfoAtom } from "@/store";
import { use, useEffect } from "react";

const paymentAtom = atom("creditCard");

export default function PlaceOrder() {
    const orderInfo = useAtomValue(orderInfoAtom);
    const [paymentMethod, setPaymentMethod] = useAtom(paymentAtom);
    const router = useRouter();
    
    if (!orderInfo || !orderInfo.firstName) { // If shipping info has been lost due to refresh or direct navigation
        if (typeof window !== "undefined") { // Ensure we're on the client side
            router.push('/place-order');
        }
    }

    function changePaymentMethod(e) {
        setPaymentMethod(e.target.name);
    }

    return(
		<>
		<div style={{textAlign:"center", paddingTop:"10px"}} id="hero-text">
          <h3>Payment Information</h3>
        </div>
		<div className='centered' style={{paddingTop: '10px', flexDirection: 'column'}}>
            <Form id="payment-info-form">
                <Row className="mb-3">
                    <Form.Group as={Col} >
                        <Form.Label>Payment Method</Form.Label>
                        <div style={{display:'flex', flexDirection:'row', justifyContent:'space-evenly'}}>
                            <div class="form-check">
                                <input onChange={changePaymentMethod} class="form-check-input" type="radio" name="creditCard" id="flexRadioDefault1" checked={paymentMethod==="creditCard"}></input>
                                <label class="form-check-label" for="flexRadioDefault1">
                                    Credit Card
                                </label>
                            </div>
                            <div class="form-check">
                                <input onChange={changePaymentMethod} class="form-check-input" type="radio" name="paypal" id="flexRadioDefault2" checked={paymentMethod==="paypal"}></input>
                                <label class="form-check-label" for="flexRadioDefault2">
                                    PayPal
                                </label>
                            </div>
                        </div>
                    </Form.Group>
                </Row>
                {paymentMethod === "creditCard" && <>
				<Row className="mb-3">
					<Form.Group as={Col} >
						<Form.Label>Card Number</Form.Label>
						<Form.Control type="text" placeholder="123412340987" required></Form.Control>
					</Form.Group>
					<Form.Group as={Col}>
						<Form.Label>Expiry Date</Form.Label>
						<Form.Control type="text" placeholder="01/23" required></Form.Control>
					</Form.Group>
				</Row>
				<Row className="mb-3">
					<Form.Group as={Col}>
						<Form.Label>Security Code</Form.Label>
						<Form.Control type="text" placeholder="123" required></Form.Control>
					</Form.Group>
				</Row>
                </>}

                {paymentMethod === "paypal" && <>
                <Row className="mb-3">
                    <h4 style={{border:'2px solid red', textAlign:'center', padding:'20px'}}>PayPal payment not yet integrated</h4>
                </Row>
                </>}

                <Row>
                    <div id="order-summary">

                    </div>
                </Row>


				<Row className="mb-3">
					<Col>
						<Button variant="primary" type="Submit">Place Order</Button>
					</Col>				
				</Row>
			</Form>
		</div>
		</>
	);
}