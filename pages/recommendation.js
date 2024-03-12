import { Button, Card, Modal } from "react-bootstrap"
import { useRouter } from "next/router";
import { atom, useAtom } from "jotai";
import Image from 'next/image';
import { useEffect, useMemo, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { addSavedLists } from "@/lib/addSavedList";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

export default function Recommendation(){
    const router = useRouter();  
    const [recs, setRecs] = useState();
    const [selectedProduct, setSelectedProduct] = useState({});    

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
        let rows = document.querySelectorAll("#rec-table tr");
        rows.forEach(row => {
            row.classList.remove("rec-selected");
        });
        e.currentTarget.classList.add("rec-selected");
        setSelectedProduct(recs[e.currentTarget.rowIndex]);
    }

    const saveCurrList = async () => {
        if(recs && recs[0]) {
            addSavedLists(recs);       

            confirmAlert({
                title: 'Current recommendation list saved!',
                buttons: [
                    {
                        label: 'Ok',
                    },
                ]
            });
        }
    }

    const loadSavedList = () => {      
        let viewList = fetch("/api/recommendations/getsavedlist").then(res => res.json()).then(data => {
            if(data.savedLists != undefined){
                if(data.savedLists.length > 0) {
                    const reccLists = [];
                    for (let i = 0; i < data.savedLists.length; i++){
                        reccLists.push("Saved list " + (i + 1));

                    }

                    confirmAlert({
                        customUI: ({ onClose }) => {
                            return (
                                <div className='custom-ui'>
                                    <h4>Please select a saved list to load:</h4>
                                    <table id="rec-table">
                                        <tbody>
                                            {reccLists.map((rec, i) => (
                                                <tr onClick={() => {setRecs(data.savedLists[i].savedRecc); onClose();}} key={i}>
                                                    <td><p>Saved list {i + 1}</p></td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            );
                        }
                    });
                }
            }
            else{
                confirmAlert({
                    title: 'No saved list found!',
                    message: 'Please save recommendation list to load them.',
                    buttons: [
                        {
                            label: 'Ok',
                        },
                    ]
                });
            }
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
                                    <tr onClick={selectRec} key={i} className={(i == 0) ? "rec-selected" : null}>
                                        <td><p>{rec.name}</p><p>${rec.price}</p></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table> :
                        <p>Loading...</p>}
                    </div>
                    <br/>
                    <div className="button-menu">
                        <Button variant="primary" className="centered" onClick={saveCurrList}>Save List</Button>
                        <Button variant="secondary" className="centered" onClick={loadSavedList}>Load List</Button>
                    </div>
                    <br/>
                    <div>
                    </div>
                    <div id="rec-selected-box">
                        { (selectedProduct && selectedProduct.length > 0) ?
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
                            </Row> : <p>Loading...</p>}
                    </div>
                    <br/>
                    
                    <Button variant="primary" className="centered" type="submit">Add to Cart</Button>
                    <br/>
                </div>
            </div>
        </>
    );
}