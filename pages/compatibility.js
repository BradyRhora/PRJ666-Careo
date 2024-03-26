import { useEffect, useState } from "react";
import 'react-confirm-alert/src/react-confirm-alert.css';

export default function Recommendation(){
    const [allproducts, setAllProducts] = useState();
	const [searchItem, setSearchItem] = useState();
	const [filteredProducts, setFilteredProducts] = useState();

    useEffect(() => {
        if (!allproducts) {
            fetch("/api/product/getallproducts").then(res => res.json()).then(data => {
                setAllProducts(data);

            });
        }

    }, [allproducts]);

	const handleInputChange = (e) => {
		const searchProduct = e.target.value;
		setSearchItem(searchProduct);

		if (searchProduct == ""){
			setFilteredProducts([]);

		}
		else{
			const filteredItems = allproducts.filter((p) =>
				p.name.toLowerCase().startsWith(searchProduct.toLowerCase())
			);

			setFilteredProducts(filteredItems);
		}
	}

	//onSearch will hand the request to get compatible products by sending either id or the name, need to decide later
	const onSearch = (e) => {

	}

	const handleProductSelect = (productName) => {
		setSearchItem(productName);
		setFilteredProducts([]);
	
	}

	return(
		<>
			<h2 id="hero-text">Product Compatibility</h2>
			<h5 style={{textAlign:"center"}}>Search a product name to check compatibility with other products</h5>
			<br></br>
			<div>
				<div className="centered">
					<input
						style={{width: "50%"}}
						type="text"
						value={searchItem}
						onChange={handleInputChange}	
						placeholder="Enter product name"
					/>
					<button onClick={() => onSearch(searchItem)}>Search</button>
				</div>
				<div className="centered">
					<table id="rec-table" style={{width:"50%"}}>
						<tbody>
							{filteredProducts && filteredProducts.map(p => 
								<tr onClick={() => handleProductSelect(p.name)} key={p._id}>
									<td>{p.name}</td>
								</tr>
							)}
						</tbody>
					</table>
				</div>
			</div>
			<div className="centered">
				<table id="rec-table" style={{width:"60%", margin:"1rem"}}>
					<tbody>
						<tr style={{background:'white'}}>
							<th className="centered">Compatible Products</th>
						</tr>
						<tr>
							<td>Product A</td>
						</tr>
						<tr>
							<td>Product B</td>
						</tr>
						<tr>
							<td>Product C</td>
						</tr>
					</tbody>
				</table>
			</div>


		</>
	)
}