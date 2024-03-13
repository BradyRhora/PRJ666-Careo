import { Button } from "react-bootstrap"
import { useRouter } from "next/router";
import { atom, useAtom, useAtomValue } from "jotai";
import Image from 'next/image';
import { useEffect, useMemo, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { userAtom, cartItemsAtom } from "@/store";

export default function Recommendation(){
    const router = useRouter();
    const user = useAtomValue(userAtom);
    const [recs, setRecs] = useState();
    const [selectedProduct, setSelectedProduct] = useState({});
    const [cartItems, setCartItems] = useAtom(cartItemsAtom);
    
    useEffect(() => {
        if (!recs) {
            fetch("/api/recommendations/getrecommendations").then(res => res.json()).then(data => {
                setRecs(data);
            });
        }

        if (recs && recs[0])
            setSelectedProduct(recs[0]);
    }, [recs]);

    function selectRec(e){
        setSelectedProduct(recs[e.currentTarget.rowIndex]);
    }

    function formatPrice(price){
        return Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'}).format(price);
    }

    function addSelectedProductToCart(){
        fetch("/api/cart/addtocart", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                userId: user._id,
                productId: selectedProduct._id,
                quantity: 1
            })
        }).then(res => res.json()).then(data => {
            setCartItems(data.items);
        });
    }

    /* TODO: The selected product box (rec-selected-box) still needs a section for ingredients and will have to be modified when the actual recommendation system is implemented */
    return (
        <>
            <div style={{textAlign:"center"}} id="hero-text">
                <h1>Recommendations</h1><br/>
            </div>
            <div>
                <div className='centered' style={{flexDirection:"column"}}>
                    <p>Product recommendations are based on Care Profile conditions</p>                    
                    
                    <div id="recommendation-box">
                        { recs && recs.length > 0 ? 
                        <table id="rec-table">
                            <tbody>
                                {recs.map((rec, i) => (
                                    <tr onClick={selectRec} key={i} className={(rec._id == selectedProduct._id) ? "rec-selected" : null}>
                                        <td><p>{rec.name}</p><p>{formatPrice(rec.price)}</p></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table> :
                        <p>Loading...</p>}
                    </div>
                    <br/>
                    <div className="button-menu">
                        <Button variant="primary" className="centered">Save List</Button>
                        <Button variant="secondary" className="centered">Load List</Button>
                    </div>
                    <br/>

                    <div id="rec-selected-box">
                        { selectedProduct && selectedProduct.name ?
                            <Row>
                                <Col>
                                    <Row>
                                        <Image width={128} height={128} src={selectedProduct.image} alt="product image" />
                                    </Row>
                                </Col>
                                <Col>
                                    <Row style={{flexWrap:"wrap"}}>
                                        <h5>{selectedProduct.name}</h5>
                                        <p>{formatPrice(selectedProduct.price)}</p>
                                    </Row>
                                </Col>
                            </Row> : <p>Nothing selected.</p>}
                    </div>
                    <br/>                    
                    <Button variant="primary" onClick={addSelectedProductToCart} className="centered" type="submit">Add to Cart</Button>
                    <br/>
                </div>
            </div>
        </>
    );
}