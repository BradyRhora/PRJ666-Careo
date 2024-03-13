import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
import { useEffect, useState } from 'react';
import { useAtomValue, useAtom } from 'jotai';
import { userAtom, cartItemsAtom } from '@/store';


export default function ArtworkCard(prop) {
    const [product, setProduct] = useState({});
    const [cart, setCart] = useAtom(cartItemsAtom);
    const user = useAtomValue(userAtom);

    useEffect(() => {
        setProduct(prop.cartItem);
    }, [prop.cartItem])

    function removeFromCart() {
        fetch("/api/cart/removefromcart?userId=" + user._id + "&productId=" + product.productId._id + "&quantity=1", {
            method: 'POST'
        }).then(res => res.json()).then(data => {
            setCart(data.items);
        });
    }
    
    function formatPrice(price){
        return Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'}).format(price);
    }


    return (
        <Card style={{ width: 'auto' }}>
            <Card.Img style={{maxHeight: '400px'}} variant="top" src={product.productId?.image? product.productId?.image : "https://images.pexels.com/photos/19644201/pexels-photo-19644201/free-photo-of-close-up-of-a-jar-of-cream.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"}/>
            <Card.Body>
                <Card.Title>{product.productId?.name? product.productId?.name : "N/A"}</Card.Title>
                <Card.Text className='spaced-apart'>
                    {product.quantity? "Quantity: " + product.quantity : "0 "}<br/>
                    {product.productId?.price? "Price: " + formatPrice(product.productId?.price) : "$0 "}&nbsp;
                    <Button onClick={removeFromCart} variant="outline-danger"><Image src="/assets/trash.png" rounded alt="Delete icon" /></Button>
                </Card.Text>
            </Card.Body>
        </Card>
    );
}