import { Form, Alert, Button } from "react-bootstrap"
import { useRouter } from "next/router";
import { useAtom } from "jotai";
import {Col, Row } from "react-bootstrap"; 
import ProductCard from "@/components/ProductCard";
import { cartItemsAtom, userAtom } from "@/store";
import TabNavigation from "@/components/TabNavigation";
//import { isAuthenticated } from "@/lib/authenticate";

//Going to use atoms to keep track of products selected for purchase, for now just hardcoding some products for testing
export default function Recommendation(){
    const router = useRouter();

    return (
        <>
            <div style={{textAlign:"center"}} id="hero-text">
                <h1>Recommendations</h1><br/>
                <TabNavigation/>
            </div>
            <div>
                <div className='centered' style={{paddingTop: '50px', paddingLeft: '30px'}}>
                    <p>Product recommendations are based on Care Profile conditions</p>
                </div>
                <div className='centered' style={{paddingTop: '50px'}}>
                    <Button variant="primary" className="centered" type="submit">Add to Cart</Button>
                </div>
            </div>
        </>
    );
}