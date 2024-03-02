import { Form, Alert, Button } from "react-bootstrap"
import { useRouter } from "next/router";
import { useAtom } from "jotai";
import {Col, Row } from "react-bootstrap"; 
import ProductCard from "@/components/ProductCard";
import { cartItemsAtom, userAtom } from "@/store";
import TabNavigation from "@/components/TabNavigation";
//import { isAuthenticated } from "@/lib/authenticate";

//Going to use atoms to keep track of products selected for purchase, for now just hardcoding some products for testing
export default function ShoppingCart(){
    const router = useRouter();
    const [cartItems, setCartItems] = useAtom(cartItemsAtom);

    //No IsAuthenticated() function in authenticate.js
    /*if (!isAuthenticated()) {
		router.push('/login');
	}*/

    if(!cartItems){
        return null;

    }

    const handleCheckout = async (e) => {
        e.preventDefault();
        router.push('/place-order');
        
    }

    return (
        <>
            <div style={{textAlign:"center"}} id="hero-text">
                <h1>Your Cart</h1><br/>
                <TabNavigation/>
            </div>
            <div>
                <div className='centered' style={{paddingTop: '50px', paddingLeft: '30px'}}>
                    {cartItems.length > 0 ?
                        <Row className="gy-4">
                            {cartItems.map((item, i) => (
                                <Col lg={3} key={i}><ProductCard cartItem={item} /></Col>
                            ))}
                        </Row> : <><br/><br/><h4>No items in the cart.</h4></>
                    }
                </div>
                <div className='centered' style={{paddingTop: '50px'}}>
                    <Button variant="primary" className="centered" type="submit" onClick={handleCheckout}>Checkout</Button>
                </div>
            </div>
        </>
    );
}