import { useEffect, useState } from "react";
import axios from "axios";
import useAuth from "../../../../Hooks/useAuth"; // Custom hook for authentication

// React Icons
import { FaRegCreditCard, FaBoxOpen, FaTrashAlt } from "react-icons/fa";
import { BsCheckCircleFill } from "react-icons/bs";
import { Link } from "react-router";

const BuyerOrders = () => {
    const { user } = useAuth(); // Getting the current authenticated user
    const [orders, setOrders] = useState([]); // State to store orders

    // ================= FETCH ORDERS =================
    useEffect(() => {
        if (!user?.email) return; // Check if the user is logged in

        // Fetch orders for the logged-in user
        axios
            .get(
                `https://garments-server-side.vercel.app/booking/search?email=${user.email}`,
                { withCredentials: true } // Ensure that credentials are sent with the request
            )
            .then(res => setOrders(res.data)) // Set the orders in state
            .catch(err => console.error(err)); // Log error if any
    }, [user?.email]); // Trigger this effect whenever the user email changes

    // ================= CANCEL ORDER =================
    const handleCancel = async (id) => {
        const confirm = window.confirm("Cancel this order?"); // Confirmation before canceling
        if (!confirm) return;

        try {
            // Make a request to cancel the order
            await axios.delete(
                `https://garments-server-side.vercel.app/orders/${id}`,
                { withCredentials: true }
            );
            // Remove the canceled order from state
            setOrders(prev => prev.filter(o => o._id !== id));
        } catch (err) {
            console.error(err);
            alert("Failed to cancel order"); // Alert if cancel fails
        }
    };

    return (
        <div className="p-4 md:p-6">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">
                🧾 My Orders
            </h2>

            {orders.length === 0 ? (
                <p className="text-center text-gray-500">No orders found.</p>
            ) : (
                <>
                    {/* ================= MOBILE (SM) ================= */}
                    <div className="grid gap-4 sm:hidden">
                        {orders.map(order => (
                            <div
                                key={order._id}
                                className="bg-white rounded-xl shadow p-4 space-y-2"
                            >
                                <p className="text-xs text-gray-400 break-all">
                                    <b>Order ID:</b> {order._id}
                                </p>

                                <p className="flex items-center gap-2 text-sm">
                                    <FaBoxOpen className="text-primary" />
                                    {order.productName}
                                </p>

                                <p className="text-sm">
                                    <b>Quantity:</b> {order.orderQuantity}
                                </p>

                                <p className="text-sm">
                                    <b>Status:</b>{" "}
                                    <span
                                        className={`badge ml-1 ${order.status === "pending"
                                            ? "badge-warning"
                                            : order.status === "shipped"
                                                ? "badge-info"
                                                : "badge-success"
                                            }`}
                                    >
                                        {order.status.charAt(0).toUpperCase() +
                                            order.status.slice(1)}
                                    </span>
                                </p>

                                <p className="flex items-center gap-2 text-sm">
                                    <FaRegCreditCard />
                                    {order.paymentMethod === "online"
                                        ? "Online"
                                        : "Cash on Delivery"}
                                </p>

                                <p className="font-semibold text-sm">
                                    Total: ${order.orderPrice.toFixed(2)}
                                </p>

                                <div className="flex gap-2 pt-2">
                                    <Link
                                        to={`/dashboard/track-order/${order._id}`}
                                        className="btn btn-xs btn-info flex-1 flex items-center justify-center gap-1"
                                    >
                                        <BsCheckCircleFill />
                                        Track
                                    </Link>

                                    {order.status === "pending" && (
                                        <button
                                            onClick={() => handleCancel(order._id)}
                                            className="btn btn-xs btn-error flex-1 flex items-center justify-center gap-1"
                                        >
                                            <FaTrashAlt />
                                            Cancel
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* ================= TABLET & DESKTOP (MD / LG) ================= */}
                    <div className="hidden sm:block overflow-x-auto">
                        <table className="table table-zebra table-fixed w-full min-w-[700px]">
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
                                    <tr key={order._id} className="hover:bg-base-100">
                                        <td className="font-mono text-sm break-all">
                                            {order._id}
                                        </td>

                                        <td className="flex items-center gap-2">
                                            <FaBoxOpen className="text-primary" />
                                            {order.productName}
                                        </td>

                                        <td className="text-center">
                                            {order.orderQuantity}
                                        </td>

                                        <td className="text-center">
                                            <span
                                                className={`badge ${order.status === "pending"
                                                    ? "badge-warning"
                                                    : order.status === "shipped"
                                                        ? "badge-info"
                                                        : "badge-success"
                                                    }`}
                                            >
                                                {order.status.charAt(0).toUpperCase() +
                                                    order.status.slice(1)}
                                            </span>
                                        </td>

                                        <td className="text-center flex items-center justify-center gap-1">
                                            <FaRegCreditCard className="text-gray-500" />
                                            <span className="badge badge-outline">
                                                {order.paymentMethod === "online"
                                                    ? "Online"
                                                    : "Cash on Delivery"}
                                            </span>
                                        </td>

                                        <td className="text-center font-semibold">
                                            ${order.orderPrice.toFixed(2)}
                                        </td>

                                        <td className="flex flex-col md:flex-row gap-2 justify-center">
                                            <Link
                                                to={`/dashboard/track-order/${order._id}`}
                                                className="btn btn-xs btn-info flex items-center gap-1"
                                            >
                                                <BsCheckCircleFill />
                                                Track
                                            </Link>

                                            {order.status === "pending" && (
                                                <button
                                                    onClick={() =>
                                                        handleCancel(order._id)
                                                    }
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
                </>
            )}
        </div>
    );
};

export default BuyerOrders;
