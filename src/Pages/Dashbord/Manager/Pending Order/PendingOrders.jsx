import { useEffect, useState } from "react";
import axios from "axios";

const PendingOrders = () => {
    const [orders, setOrders] = useState([]);

    const fetchOrders = async () => {
        const res = await axios.get("http://localhost:3000/orders/pending");
        setOrders(res.data);
    };

    const handleApprove = async (id) => {
        await axios.patch(`http://localhost:3000/orders/${id}/approve`);
        fetchOrders();
    };

    const handleReject = async (id) => {
        await axios.patch(`http://localhost:3000/orders/${id}/reject`);
        fetchOrders();
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Pending Orders</h2>
            <table className="w-full border">
                <thead>
                    <tr>
                        <th>Order ID</th>
                        <th>User</th>
                        <th>Product</th>
                        <th>Quantity</th>
                        <th>Order Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map(o => (
                        <tr key={o._id}>
                            <td>{o._id}</td>
                            <td>{o.userEmail}</td>
                            <td>{o.productName}</td>
                            <td>{o.quantity}</td>
                            <td>{new Date(o.createdAt).toLocaleDateString()}</td>
                            <td>
                                <button onClick={() => handleApprove(o._id)}>Approve</button>
                                <button onClick={() => handleReject(o._id)}>Reject</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default PendingOrders;
