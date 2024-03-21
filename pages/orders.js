import { useEffect } from 'react';
import {atom, useAtomValue, useAtom} from 'jotai';
import { userAtom } from '@/store';
const ordersAtom = atom([]);

const OrdersPage = () => {
    const user = useAtomValue(userAtom);
    const [orders, setOrders] = useAtom(ordersAtom);

    // get orders from /api/order/getuserorders?userId=#
    useEffect(() => {
        const userId = user._id;
        fetch(`/api/order/getuserorders?userId=${userId}`)
        .then((res) => res.json())
        .then((data) => setOrders(data))
        .then(() => console.log(orders));
    }, []);

    return (<>        
		<div style={{textAlign:"center", paddingTop:"10px"}} id="hero-text">
            <h3>Order History</h3>
        </div>
        <div style={{flowDirection:"column"}}className="centered">
            <ul>
                {orders && orders?.length > 0 && orders.map((order) => (
                    <li key={order._id}>{order.name}</li>
                ))}
            </ul>
        </div>
    </>);
};

export default OrdersPage;