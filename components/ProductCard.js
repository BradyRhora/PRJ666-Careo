import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';

export default function ArtworkCard(prop) {
    return (
        <Card style={{ width: 'auto' }}>
            <Card.Img variant="top" src={prop.cartItem.primaryImageSmall? prop.cartItem.primaryImageSmall : "https://images.pexels.com/photos/19644201/pexels-photo-19644201/free-photo-of-close-up-of-a-jar-of-cream.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"} maxWidth="50%"/>
            <Card.Body>
                <Card.Title>{prop.cartItem.productName? prop.cartItem.productName : "N/A"}</Card.Title>
                <Card.Text className='spaced-apart'>
                    {prop.cartItem.quantity? "Quantity: " + prop.cartItem.quantity : "0 "}&nbsp;
                    {prop.cartItem.price? "Price: $" + prop.cartItem.price : "$0 "}&nbsp;
                    <Button variant="outline-danger"><Image src="/assets/trash.png" rounded alt="Delete icon" /></Button>
                </Card.Text>
            </Card.Body>
        </Card>
    );
}