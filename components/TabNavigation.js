import Nav from 'react-bootstrap/Nav';

export default function TabNavigation() {
    return (
        <Nav justify variant='tabs' id='tab-nav'>
            <Nav.Item>
                <Nav.Link href='/user-profile'>Profile</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link href='/recommendation'>Recommendation</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link href='/compatibility'>Compatibility</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link href='/shopping-cart'>Cart</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link href='/account-details'>Account</Nav.Link>
            </Nav.Item>
        </Nav>
    );
}