

export default function Recommendation(){
	return(
		<>
			<h2 id="hero-text">Product Compatibility (Coming Soon)</h2>
			<h5 style={{textAlign:"center"}}>Search a product name to check compatibility with other products</h5>
			<div className="centered">
				<select style={{margin:"1rem", width:"50%", padding:"0.5rem"}}>
					<option value="1">Product A</option>
					<option value="2">Product AA</option>
					<option value="3">Product AAA</option>
					<option value="4">Product B</option>
					<option value="5">Product BB</option>
					<option value="6">Product BBB</option>
					<option value="7">Product C</option>
					<option value="8">Product CC</option>
					<option value="9">Product CCC</option>
					<option value="10">Product D</option>
				</select>	
			</div>

			<div className="centered">
				<table id="rec-table" style={{width:"50%", margin:"1rem"}}>
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