import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
import { useEffect, useState } from 'react';


export default function ArtworkCard(prop) {
    const [product, setProduct] = useState({});

    useEffect(() => {
        setProduct(prop.cartItem);
    }, [prop.cartItem])

    function removeFromCart() {
        // TODO: implement this
    }

    return (
        <Card style={{ width: 'auto' }}>
            <Card.Img style={{maxHeight: '400px'}} variant="top" src={product.productId?.image? product.productId?.image : "https://images.pexels.com/photos/19644201/pexels-photo-19644201/free-photo-of-close-up-of-a-jar-of-cream.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"}/>
            <Card.Body>
                <Card.Title>{product.productId?.name? product.productId?.name : "N/A"}</Card.Title>
                <Card.Text className='spaced-apart'>
                    {product.quantity? "Quantity: " + product.quantity : "0 "}&nbsp;
                    {product.productId?.price? "Price: $" + product.productId?.price : "$0 "}&nbsp;
                    <Button onClick={removeFromCart} variant="outline-danger"><Image src="/assets/trash.png" rounded alt="Delete icon" /></Button>
                </Card.Text>
            </Card.Body>
        </Card>
    );
}