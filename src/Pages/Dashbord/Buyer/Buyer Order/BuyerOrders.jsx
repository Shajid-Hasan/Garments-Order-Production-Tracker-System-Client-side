import { useEffect, useState } from "react";
import axios from "axios";
import useAuth from "../../../../Hooks/useAuth";
import { Link } from "react-router";

// ✅ React Icons
import { FaRegCreditCard, FaBoxOpen, FaTrashAlt } from "react-icons/fa";
import { BsCheckCircleFill } from "react-icons/bs";

const BuyerOrders = () => {
    const { user } = useAuth();
    const [orders, setOrders] = useState([]);

    // ================= FETCH ORDERS =================
    useEffect(() => {
        if (!user?.email) return;

        axios
            .get(`http://localhost:3000/orders?email=${user.email}`, {
                withCredentials: true
            })
            .then(res => setOrders(res.data))
            .catch(err => console.error(err));
    }, [user?.email]);

    // ================= CANCEL ORDER =================
    const handleCancel = async (id) => {
        const confirm = window.confirm("Cancel this order?");
        if (!confirm) return;

        try {
            await axios.delete(`http://localhost:3000/orders/${id}`, {
                withCredentials: true
            });

            setOrders(prev => prev.filter(o => o._id !== id));
        } catch (err) {
            console.error(err);
            alert("Failed to cancel order");
        }
    };

    return (
        <div className="p-4 md:p-6">
            <h2 className="text-3xl font-bold mb-6 text-center">🧾 My Orders</h2>

            {orders.length === 0 ? (
                <p className="text-center text-gray-500">
                    No orders found.
                </p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="table table-zebra table-fixed w-full min-w-[700px] border rounded-lg shadow-md">
                        <thead className="bg-base-200">
                            <tr>
                                <th className="w-[20%] text-left">Order ID</th>
                                <th className="w-[25%] text-left">Product</th>
                                <th className="w-[8%] text-center">Qty</th>
                                <th className="w-[12%] text-center">Status</th>
                                <th className="w-[15%] text-center">Payment</th>
                                <th className="w-[10%] text-center">Total</th>
                                <th className="w-[10%] text-center">Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {orders.map(order => (
                                <tr key={order._id} className="hover:bg-base-100 transition-all">
                                    <td className="font-mono text-sm break-all">{order._id}</td>

                                    <td className="flex items-center gap-2">
                                        <FaBoxOpen className="text-primary" />
                                        {order.productName}
                                    </td>

                                    <td className="text-center">{order.orderQuantity}</td>

                                    <td className="text-center">
                                        <span
                                            className={`badge ${order.status === "pending"
                                                ? "badge-warning"
                                                : order.status === "shipped"
                                                    ? "badge-info"
                                                    : "badge-success"
                                                }`}
                                        >
                                            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                        </span>
                                    </td>

                                    <td className="text-center flex items-center justify-center gap-1">
                                        <FaRegCreditCard className="text-gray-500" />
                                        <span className="badge badge-outline">
                                            {order.paymentMethod === "online" ? "Online" : "Cash on Delivery"}
                                        </span>
                                    </td>

                                    <td className="text-center font-semibold">${order.orderPrice.toFixed(2)}</td>

                                    <td className="flex flex-col md:flex-row gap-2 justify-center">
                                        {/* TRACK ORDER */}
                                        <Link
                                            to={`/dashboard/track-order/${order._id}`}
                                            className="btn btn-xs btn-info flex items-center gap-1"
                                        >
                                            <BsCheckCircleFill />
                                            Track
                                        </Link>

                                        {/* CANCEL ORDER */}
                                        {order.status === "pending" && (
                                            <button
                                                onClick={() => handleCancel(order._id)}
                                                className="btn btn-xs btn-error flex items-center gap-1"
                                            >
                                                <FaTrashAlt />
                                                Cancel
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default BuyerOrders;
