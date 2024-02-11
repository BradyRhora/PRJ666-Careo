import { Form, Row, Col, Button } from "react-bootstrap";





export default function PlaceOrder(){
	return(
		<>
		<div style={{textAlign:"center", paddingTop:"10px"}} id="hero-text">
          <h3>Place Order</h3>
        </div>
		<div className='centered' style={{paddingTop: '10px'}}>
			<Form id="place-order-form">
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
				<Row className="mb-3">
					<Col>
						<Button variant="primary" type="Submit">Next: Payment</Button>
					</Col>				
				</Row>
			</Form>
		</div>
		</>
	);
}