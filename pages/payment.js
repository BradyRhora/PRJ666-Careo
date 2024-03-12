import { Form, Button, Row, Col } from "react-bootstrap";
import { useRouter } from "next/router";

import { atom, useAtom, useAtomValue } from "jotai";
import { orderInfoAtom } from "@/store";
import { use, useEffect } from "react";

const paymentAtom = atom("creditCard");
const billingAddressAtom = atom(true);

export default function PlaceOrder() {
    const orderInfo = useAtomValue(orderInfoAtom);
    const [billingAddressSame, setBillingAddressSame] = useAtom(billingAddressAtom);
    const [paymentMethod, setPaymentMethod] = useAtom(paymentAtom);

    const router = useRouter();
    
    if (!orderInfo || !orderInfo.firstName) { // If shipping info has been lost due to refresh or direct navigation
        if (typeof window !== "undefined") { // Ensure we're on the client side
            router.push('/place-order');
        }
    }

    function toggleBillingAddress(e) {
        setBillingAddressSame(e.target.checked);
    }

    function changePaymentMethod(e) {
        setPaymentMethod(e.target.name);
    }

    // TODO: maybe replace 'Credit Card' and 'PayPal' with icons
    return(
		<>
		<div style={{textAlign:"center", paddingTop:"10px"}} id="hero-text">
          <h3>Payment Information</h3>
        </div>
		<div className='centered' style={{paddingTop: '10px', flexDirection: 'column'}}>
            <Form id="payment-info-form">
                <Row className="mb-3">
                    <Form.Group as={Col} >
                        <p>Payment Method</p>
                        <div className="inline-flex">
                            <div className="form-check" style={{marginRight:'10px'}}>
                                <input onChange={changePaymentMethod} className="form-check-input" type="radio" name="creditCard" id="payment-method-credit" checked={paymentMethod==="creditCard"}></input>
                                <label className="form-check-label" for="payment-method-credit">
                                    Credit Card
                                </label>
                            </div>
                            <div className="form-check">
                                <input onChange={changePaymentMethod} className="form-check-input" type="radio" name="paypal" id="payment-method-paypal" checked={paymentMethod==="paypal"}></input>
                                <label className="form-check-label" for="payment-method-paypal">
                                    PayPal
                                </label>
                            </div>
                        </div>
                    </Form.Group>
                </Row>
                {paymentMethod === "creditCard" && <>
                <Row className="mb-3">
                    <Form.Group className="inline-flex">
                        <Form.Check checked={billingAddressSame} onChange={toggleBillingAddress} type="checkbox" id="same-billing-address" name="same-billing-address" value="same-billing-address" style={{marginRight:"10px"}}></Form.Check>
                        <Form.Label>Billing address same as shipping address</Form.Label>
                    </Form.Group>
                </Row>
                {billingAddressSame === false && <div id="billing-address-box">
                    <Row className="mb-3">
					<Form.Group as={Col} >
						<Form.Label>First name</Form.Label>
						<Form.Control type="text" placeholder="John" required></Form.Control>
					</Form.Group>
					<Form.Group as={Col}>
						<Form.Label>Last name</Form.Label>
						<Form.Control type="text" placeholder="Smith" required></Form.Control>
					</Form.Group>
				</Row>
				<Row className="mb-3">
					<Form.Group as={Col}>
						<Form.Label>Address</Form.Label>
						<Form.Control type="text" placeholder="1750 Finch Avenue East" required></Form.Control>
					</Form.Group>
				</Row>
				<Row className="mb-3">
					<Form.Group as={Col}>
						<Form.Label>Apartment, Suite, etc. (optional) </Form.Label>
						<Form.Control type="text" placeholder="Apt. 123"></Form.Control>
					</Form.Group>
				</Row>
				<Row className="mb-3">
					<Form.Group as={Col}>
						<Form.Label>City</Form.Label>
						<Form.Control type="text" placeholder="Toronto" required></Form.Control>
					</Form.Group>
					<Form.Group as={Col}>
						<Form.Label>Province</Form.Label>
						<Form.Select>
							<option value="1">AB</option>
							<option value="2">BC</option>
							<option value="3">MB</option>
							<option value="4">NB</option>
							<option value="5">NL</option>
							<option value="6">NS</option>
							<option value="7">ON</option>
							<option value="8">PE</option>
							<option value="9">QC</option>
							<option value="10">SK</option>
						</Form.Select>
					</Form.Group>
				</Row>
				<Row className="mb-3">
					<Form.Group as={Col}>
						<Form.Label>Country</Form.Label>
						<Form.Select>
							<option value="1">Canada</option>
						</Form.Select>
					</Form.Group>
				</Row>
				<Row className="mb-3">
					<Form.Group as={Col}>
						<Form.Label>Postal Code</Form.Label>
						<Form.Control type="text" placeholder="M2J 2X5"></Form.Control>
					</Form.Group>
				</Row>
                </div>}
				<Row className="mb-3">
					<Form.Group as={Col} >
						<Form.Label>Card Number</Form.Label>
						<Form.Control type="text" placeholder="123412340987" required></Form.Control>
					</Form.Group>
				</Row>
				<Row className="mb-3">                    
					<Form.Group as={Col}>
						<Form.Label>Expiry Date</Form.Label>
						<Form.Control type="text" placeholder="01/23" required></Form.Control>
					</Form.Group>
					<Form.Group as={Col}>
						<Form.Label>Security Code</Form.Label>
						<Form.Control type="text" placeholder="123" required></Form.Control>
					</Form.Group>
				</Row>
                </>}

                {paymentMethod === "paypal" && <>
                <Row className="mb-3">
                    <h4 style={{border:'2px solid red', borderRadius: '5px',textAlign:'center', padding:'20px'}}>PayPal payment not yet integrated</h4>
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