import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import axios from "axios";
import { toast } from "react-toastify";

const AdminOrderDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [newStatus, setNewStatus] = useState("");

    useEffect(() => {
        fetchOrder();
    }, []);

    const fetchOrder = async () => {
        try {
            const res = await axios.get(
                `https://garments-server-side.vercel.app/orders/${id}`
            );
            setOrder(res.data);
            setNewStatus(res.data.status);
            setLoading(false);
        } catch (error) {
            toast.error("Failed to fetch order");
            setLoading(false);
        }
    };

    const handleStatusUpdate = async () => {
        try {
            await axios.patch(
                `https://garments-server-side.vercel.app/orders/${id}`,
                { status: newStatus }
            );
            toast.success("Order status updated");
            fetchOrder();
        } catch {
            toast.error("Failed to update status");
        }
    };

    if (loading) return <p className="text-center mt-10">Loading...</p>;
    if (!order) return <p className="text-center mt-10">Order not found</p>;

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h2 className="text-2xl font-bold mb-4">
                Order Details
            </h2>

            <button
                className="btn btn-sm btn-outline mb-4"
                onClick={() =>
                    navigate("/dashboard/all-orders")
                }
            >
                ← Back to Orders
            </button>

            <div className="border p-4 rounded-lg shadow-sm space-y-2">
                <p><b>Order ID:</b> {order._id}</p>
                <p><b>User Email:</b> {order.userEmail}</p>

                <p>
                    <b>Product:</b>{" "}
                    {order.productTitle ||
                        order.productName ||
                        order.title ||
                        "N/A"}
                </p>

                <p>
                    <b>Quantity:</b>{" "}
                    {order.orderQuantity ||
                        order.quantity ||
                        "N/A"}
                </p>

                {/* <p>
                    <b>Price:</b>{" "}
                    {order.price ||
                        order.price ||
                        "N/A"}
                </p> */}

                <p>
                    <b>Status:</b>{" "}
                    <span
                        className={`badge capitalize ${order.status === "approved"
                                ? "badge-success"
                                : order.status === "rejected"
                                    ? "badge-error"
                                    : "badge-warning"
                            }`}
                    >
                        {order.status}
                    </span>
                </p>
            </div>

            {/* Update Status */}
            <div className="mt-6">
                <h3 className="font-bold mb-2">
                    Update Order Status
                </h3>

                <select
                    className="select select-bordered w-full max-w-xs"
                    value={newStatus}
                    onChange={(e) =>
                        setNewStatus(e.target.value)
                    }
                >
                    <option value="pending">Pending</option>
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected</option>
                </select>

                <button
                    className="btn btn-success btn-sm mt-2"
                    onClick={handleStatusUpdate}
                >
                    Update
                </button>
            </div>

            {/* Tracking */}
            <div className="mt-6">
                <h3 className="font-bold mb-2">
                    Tracking History
                </h3>

                {order.trackingHistory?.length ? (
                    <ul className="steps steps-vertical">
                        {order.trackingHistory.map(
                            (t, i) => (
                                <li
                                    key={i}
                                    className="step step-primary"
                                >
                                    {t.status} —{" "}
                                    {new Date(
                                        t.date
                                    ).toLocaleString()}
                                </li>
                            )
                        )}
                    </ul>
                ) : (
                    <p className="text-gray-500">
                        No tracking history
                    </p>
                )}
            </div>
        </div>
    );
};

export default AdminOrderDetails;
