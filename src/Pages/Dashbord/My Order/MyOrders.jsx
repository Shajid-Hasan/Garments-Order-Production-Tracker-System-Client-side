import React, { useEffect, useState } from "react";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";

const MyOrders = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch orders for the logged-in user
    useEffect(() => {
        if (!user) return;

        // setLoading(true);
        axiosSecure
            .get(`/booking?userEmail=${user.email}`)
            .then((res) => setOrders(res.data))
            .catch((err) => console.error(err))
            .finally(() => setLoading(false));
    }, [user, axiosSecure]);

    const handleView = (orderId) => {
        navigate(`/dashboard/track-order/${orderId}`);
    };

    const handleCancel = (orderId) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You want to cancel this order!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, cancel it!",
            cancelButtonText: "No",
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure
                    .patch(`/booking/${orderId}`, { status: "canceled" })
                    .then(() => {
                        Swal.fire("Canceled!", "Your order has been canceled.", "success");
                        setOrders((prev) =>
                            prev.map((order) =>
                                order.id === orderId ? { ...order, status: "canceled" } : order
                            )
                        );
                    })
                    .catch(() => Swal.fire("Error", "Failed to cancel order", "error"));
            }
        });
    };

    if (loading) return <p className="text-center mt-10">Loading...</p>;

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-6">My Orders</h2>
            {orders.length === 0 ? (
                <p>No orders found!</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="table table-zebra w-full">
                        <thead>
                            <tr>
                                <th>Order ID</th>
                                <th>Product</th>
                                <th>Quantity</th>
                                <th>Status</th>
                                <th>Payment</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order) => (
                                <tr key={order.id}>
                                    <td>{order.id}</td>
                                    <td>{order.productTitle}</td>
                                    <td>{order.orderQuantity}</td>
                                    <td className="capitalize">
                                        <span
                                            className={`badge ${order.status === "pending"
                                                    ? "badge-warning"
                                                    : order.status === "canceled"
                                                        ? "badge-error"
                                                        : "badge-success"
                                                }`}
                                        >
                                            {order.status}
                                        </span>
                                    </td>
                                    <td>{order.paymentMethod.toUpperCase()}</td>
                                    <td className="space-x-2">
                                        <button
                                            className="btn btn-xs btn-info"
                                            onClick={() => handleView(order.id)}
                                        >
                                            View
                                        </button>
                                        {order.status === "pending" && (
                                            <button
                                                className="btn btn-xs btn-error"
                                                onClick={() => handleCancel(order.id)}
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
            )}
        </div>
    );
};

export default MyOrders;
