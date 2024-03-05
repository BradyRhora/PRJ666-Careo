import { Button } from "react-bootstrap"
import { useRouter } from "next/router";

export default function Recommendation(){
    const router = useRouter();

    // Temporary placeholder data
    let recs = [
        {name: "Aveeno Moisturizer", price: 19.99, image: "https://via.placeholder.com/150"}, 
        {name: "Sephora Skincare", price: 24.99, image: "https://via.placeholder.com/150"},
        {name: "Aveeno Skincare", price: 89.99, image: "https://via.placeholder.com/150"},
        {name: "ABC Hair Product", price: 19.99, image: "https://via.placeholder.com/150"},
        {name: "XYZ Hair Product", price: 24.99, image: "https://via.placeholder.com/150"},
        {name: "Aveeno Hair Product", price: 89.99, image: "https://via.placeholder.com/150"},
        {name: "Aveeno Skincare", price: 19.99, image: "https://via.placeholder.com/150"},
        {name: "Sephora Skincare", price: 24.99, image: "https://via.placeholder.com/150"},
        {name: "Aveeno Skincare", price: 89.99, image: "https://via.placeholder.com/150"},
        {name: "ABC Hair Product", price: 19.99, image: "https://via.placeholder.com/150"},
        {name: "XYZ Hair Product", price: 24.99, image: "https://via.placeholder.com/150"}
    ]

    function selectRec(e){
        console.log('clicked on ' + e.currentTarget)
        let recs = document.querySelectorAll("#rec-table tr");
        recs.forEach(rec => {
            rec.classList.remove("rec-selected");
        });
        e.currentTarget.classList.add("rec-selected");
    }

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
                    <Button variant="primary" className="centered" type="submit">Add to Cart</Button>
                </div>
            </div>
        </>
    );
}