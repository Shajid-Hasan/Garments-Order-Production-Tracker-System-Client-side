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

    useEffect(() => {
        if (!user) return;

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
                                order.id === orderId
                                    ? { ...order, status: "canceled" }
                                    : order
                            )
                        );
                    })
                    .catch(() =>
                        Swal.fire("Error", "Failed to cancel order", "error")
                    );
            }
        });
    };

    if (loading) return <p className="text-center mt-10">Loading...</p>;

    return (
        <div className="p-4 sm:p-6">
            <h2 className="text-xl sm:text-2xl font-bold mb-6">My Orders</h2>

            {orders.length === 0 ? (
                <p>No orders found!</p>
            ) : (
                <>
                    {/* ================= MOBILE VIEW (SM) ================= */}
                    <div className="grid gap-4 sm:hidden">
                        {orders.map((order) => (
                            <div
                                key={order.id}
                                className="bg-white rounded-xl shadow p-4 space-y-2"
                            >
                                <p className="text-xs text-gray-400 break-all">
                                    <b>Order ID:</b> {order.id}
                                </p>

                                <p className="text-sm">
                                    <b>Product:</b> {order.productTitle}
                                </p>

                                <p className="text-sm">
                                    <b>Quantity:</b> {order.orderQuantity}
                                </p>

                                <p className="text-sm capitalize">
                                    <b>Status:</b>{" "}
                                    <span
                                        className={`badge ml-1 ${order.status === "pending"
                                                ? "badge-warning"
                                                : order.status === "canceled"
                                                    ? "badge-error"
                                                    : "badge-success"
                                            }`}
                                    >
                                        {order.status}
                                    </span>
                                </p>

                                <p className="text-sm">
                                    <b>Payment:</b>{" "}
                                    {order.paymentMethod.toUpperCase()}
                                </p>

                                <div className="flex gap-2 pt-2">
                                    <button
                                        className="btn btn-xs btn-info flex-1"
                                        onClick={() => handleView(order.id)}
                                    >
                                        View
                                    </button>

                                    {order.status === "pending" && (
                                        <button
                                            className="btn btn-xs btn-error flex-1"
                                            onClick={() => handleCancel(order.id)}
                                        >
                                            Cancel
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* ================= TABLET & DESKTOP (MD / LG) ================= */}
                    <div className="hidden sm:block overflow-x-auto">
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
                                        <td>
                                            {order.paymentMethod.toUpperCase()}
                                        </td>
                                        <td className="space-x-2">
                                            <button
                                                className="btn btn-xs btn-info"
                                                onClick={() =>
                                                    handleView(order.id)
                                                }
                                            >
                                                View
                                            </button>

                                            {order.status === "pending" && (
                                                <button
                                                    className="btn btn-xs btn-error"
                                                    onClick={() =>
                                                        handleCancel(order.id)
                                                    }
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
                </>
            )}
        </div>
    );
};

export default MyOrders;
