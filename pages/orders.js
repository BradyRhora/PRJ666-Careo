import { useEffect } from 'react';
import {atom, useAtomValue, useAtom} from 'jotai';
import { userAtom } from '@/store';
const ordersAtom = atom([]);

const OrdersPage = () => {
    const user = useAtomValue(userAtom);
    const [orders, setOrders] = useAtom(ordersAtom);


    // TODO: Fetch only a specified number of orders, and either fetch more as user scrolls or separate into pages
    // get orders from /api/order/getuserorders?userId=#
    useEffect(() => {
        const userId = user._id;
        fetch(`/api/order/getuserorders?userId=${userId}`)
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            if (data.status && data.status != 200) return;
            data = data.sort((a, b) => new Date(b.order_date) - new Date(a.order_date));
            data.forEach((order) => {
                order.order_date = new Date(order.order_date).toLocaleDateString('en-US', {month: 'long', day: 'numeric', year: 'numeric'});
                if (order.payment_method === 'creditCard') order.payment_method = 'Credit Card';
                else if (order.payment_method === 'paypal') order.payment_method = 'PayPal';
            });
            setOrders(data)
        });
    }, [user]);

    return (<>        
		<div style={{textAlign:"center", paddingTop:"10px"}} id="hero-text">
            <h3>Order History</h3>
        </div>
        <div style={{flowDirection:"column"}}className="centered">
            <ul>
                {orders && orders?.length > 0 && orders.map((order) => (
                    <div key={order._id} class="order-box">
                        <p><b>Order ID:</b> {order._id}</p>
                        <p><b>Date:</b> {order.order_date}</p>
                        <p><b>Total:</b> ${order.total}</p>
                        <p><b>Shipping Address:</b> {order.shipping_address}</p>
                        <p><b>Billing Address:</b> {order.billing_address}</p>
                        <p><b>Payment Method:</b> {order.payment_method}</p>
                        <ul>
                            {order.items.map((item) => (
                                <li key={item.productId._id}>{item.quantity}x {item.productId.name}</li>
                            ))}
                        </ul>
                    </div>
                ))}
            </ul>
        </div>
    </>);
};

export default OrdersPage;