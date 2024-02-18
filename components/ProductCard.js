import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';

export default function ArtworkCard(prop) {
    return (
        <Card style={{ width: 'auto' }}>
            <Card.Img variant="top" src={prop.cartItem.primaryImageSmall? prop.cartItem.primaryImageSmall : "item.jpg"} />
            <Card.Body>
                <Card.Title>{prop.cartItem.productName? prop.cartItem.productName : "N/A"}</Card.Title>
                <Card.Text className='spaced-apart'>
                    {prop.cartItem.quantity? "Quantity: " + prop.cartItem.quantity : "0 "}&nbsp;
                    {prop.cartItem.price? "Price: $" + prop.cartItem.price : "$0 "}&nbsp;
                    <Button variant="primary"><Image src="delete.jpg" rounded alt="Delete icon" /></Button>
                </Card.Text>
            </Card.Body>
        </Card>
    );
}