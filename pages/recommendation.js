import { Button } from "react-bootstrap"
import { useRouter } from "next/router";
import { atom, useAtom } from "jotai";
import Image from 'next/image';
import { useEffect, useMemo, useState } from "react";
import { Col, Row } from "react-bootstrap";

export default function Recommendation(){
    const router = useRouter();
    
    const [recs, setRecs] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState({});

    

    /*
    const recs = useMemo(() => [
        {name: "Organic Lavender Moisturizer 255ml", price: 19.99, image: "https://via.placeholder.com/150"}, 
        {name: "Anti-Aging Serum 130ml", price: 24.99, image: "https://via.placeholder.com/150"},
        {name: "Hydrating Facial Cream 275ml", price: 89.99, image: "https://via.placeholder.com/150"},
        {name: "Volumizing Shampoo 500ml", price: 19.99, image: "https://via.placeholder.com/150"},
        {name: "Curl Defining Gel 200ml", price: 24.99, image: "https://via.placeholder.com/150"},
        {name: "Repairing Hair Mask 150ml", price: 89.99, image: "https://via.placeholder.com/150"},
        {name: "Gentle Cleansing Milk 200ml", price: 19.99, image: "https://via.placeholder.com/150"},
        {name: "Brightening Face Serum 30ml", price: 24.99, image: "https://via.placeholder.com/150"},
        {name: "Moisturizing Night Cream 50ml", price: 89.99, image: "https://via.placeholder.com/150"},
        {name: "Volumizing Hair Spray 250ml", price: 19.99, image: "https://via.placeholder.com/150"},
        {name: "Smoothing Hair Oil 100ml", price: 24.99, image: "https://via.placeholder.com/150"},
        {name: "Refreshing Facial Toner 150ml", price: 14.99, image: "https://via.placeholder.com/150"},
        {name: "Soothing Facial Mask 100ml", price: 14.99, image: "https://via.placeholder.com/150"},
        {name: "Hydrating Lip Mask 10ml", price: 9.99, image: "https://via.placeholder.com/150"},
        {name: "Repairing Hair Serum 50ml", price: 29.99, image: "https://via.placeholder.com/150"},
        {name: "Exfoliating Scrub 200ml", price: 12.99, image: "https://via.placeholder.com/150"},
        {name: "Nourishing Body Lotion 300ml", price: 16.99, image: "https://via.placeholder.com/150"},
        {name: "Revitalizing Eye Cream 30ml", price: 29.99, image: "https://via.placeholder.com/150"},
        {name: "Soothing Lip Balm 5ml", price: 8.99, image: "https://via.placeholder.com/150"}
    ], []);
    */

    fetch("/api/recommendations/getrecommendations").then(res => res.json()).then(data => {
        setRecs(data);
    })

    useEffect(() => {
        if (recs[0])
            setSelectedProduct(recs[0]);
    }, []);

    function selectRec(e){
        let rows = document.querySelectorAll("#rec-table tr");
        rows.forEach(row => {
            row.classList.remove("rec-selected");
        });
        e.currentTarget.classList.add("rec-selected");
        setSelectedProduct(recs[e.currentTarget.rowIndex]);
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
                        <table id="rec-table">
                            <tbody>
                                {recs.map((rec, i) => (
                                    <tr onClick={selectRec} key={i} className={(i == 0) ? "rec-selected" : null}>
                                        <td><p>{rec.name}</p><p>${rec.price}</p></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <br/>
                    <div className="button-menu">
                        <Button variant="primary" className="centered">Save List</Button>
                        <Button variant="secondary" className="centered">Load List</Button>
                    </div>
                    <br/>

                    <div id="rec-selected-box">
                        {selectedProduct && <>
                            <Row>
                                <Col>
                                    <Row>
                                        <Image width={100} height={100} src={selectedProduct.image} alt="product image" />
                                    </Row>
                                </Col>
                                <Col>
                                    <Row style={{flexWrap:"wrap"}}>
                                        <h5>{selectedProduct.name}</h5>
                                        <p>${selectedProduct.price}</p>
                                    </Row>
                                </Col>
                            </Row>
                        </>}
                    </div>
                    <br/>
                    
                    <Button variant="primary" className="centered" type="submit">Add to Cart</Button>
                    <br/>
                </div>
            </div>
        </>
    );
}