import { useEffect, useState } from "react";
import axios from "axios";
import useAuth from "../../../../Hooks/useAuth";
import { Link } from "react-router";

const BuyerOrders = () => {
    const { user } = useAuth();
    const [orders, setOrders] = useState([]);
    console.log(user)

    useEffect(() => {
        axios
            .get(`http://localhost:3000/orders?email=${user.email}`)
            .then(res => setOrders(res.data));
    }, [user.email]);

    const handleCancel = async (id) => {
        const confirm = window.confirm("Cancel this order?");
        if (!confirm) return;

        await axios.delete(`http://localhost:3000/orders/${id}`);
        setOrders(orders.filter(o => o._id !== id));
    };

    return (
        <div>
            <h2 className="text-xl font-bold mb-4">My Orders</h2>

            <table className="table">
                <thead>
                    <tr>
                        <th>Order ID</th>
                        <th>Product</th>
                        <th>Qty</th>
                        <th>Status</th>
                        <th>Payment</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {orders.map(order => (
                        <tr key={order._id}>
                            <td>{order._id}</td>
                            <td>{order.productName}</td>
                            <td>{order.quantity}</td>
                            <td>{order.status}</td>
                            <td>{order.payment}</td>
                            <td className="space-x-2">
                                <Link
                                    to={`/dashboard/buyer/track-order/${order._id}`}
                                    className="btn btn-xs btn-info"
                                >
                                    View
                                </Link>

                                {order.status === "Pending" && (
                                    <button
                                        onClick={() => handleCancel(order._id)}
                                        className="btn btn-xs btn-error"
                                    >
                                        Cancel
                                    </button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default BuyerOrders;
