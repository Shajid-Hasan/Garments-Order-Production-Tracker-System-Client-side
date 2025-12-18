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
            const res = await axios.get(`http://localhost:3000/orders/${id}`);
            setOrder(res.data);
            setNewStatus(res.data.status);
            setLoading(false);
        } catch (error) {
            console.error(error);
            toast.error("Failed to fetch order");
            setLoading(false);
        }
    };

    const handleStatusUpdate = async () => {
        try {
            await axios.patch(`http://localhost:3000/orders/${id}`, {
                status: newStatus,
            });
            toast.success("Order status updated");
            fetchOrder(); // refresh order
        } catch (error) {
            toast.error("Failed to update status");
        }
    };

    if (loading) return <p className="text-center mt-10">Loading order...</p>;
    if (!order) return <p className="text-center mt-10">Order not found</p>;

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h2 className="text-2xl font-bold mb-4">Order Details</h2>

            <div className="mb-6">
                <button
                    className="btn btn-sm btn-outline mb-4"
                    onClick={() => navigate("/dashboard/all-orders")}
                >
                    Back to Orders
                </button>

                <div className="border p-4 rounded-lg shadow-sm">
                    <p>
                        <span className="font-bold">Order ID:</span> {order._id}
                    </p>
                    <p>
                        <span className="font-bold">User Email:</span> {order.userEmail}
                    </p>
                    <p>
                        <span className="font-bold">Product:</span> {order.productTitle}
                    </p>
                    <p>
                        <span className="font-bold">Quantity:</span> {order.orderQuantity}
                    </p>
                    <p>
                        <span className="font-bold">Price:</span> ${order.price || "N/A"}
                    </p>
                    <p>
                        <span className="font-bold">Current Status:</span>{" "}
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
            </div>

            {/* Update Status */}
            <div className="mb-6">
                <h3 className="font-bold mb-2">Update Order Status</h3>
                <select
                    className="select select-bordered w-full max-w-xs"
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value)}
                >
                    <option value="pending">Pending</option>
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected</option>
                </select>
                <button
                    className="btn btn-sm btn-success mt-2"
                    onClick={handleStatusUpdate}
                >
                    Update Status
                </button>
            </div>

            {/* Tracking History */}
            <div>
                <h3 className="font-bold mb-2">Tracking History</h3>
                {order.trackingHistory && order.trackingHistory.length > 0 ? (
                    <ul className="steps steps-vertical">
                        {order.trackingHistory.map((track, index) => (
                            <li key={index} className="step step-primary">
                                {track.status} - {new Date(track.date).toLocaleString()}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-gray-500">No tracking history available</p>
                )}
            </div>
        </div>
    );
};

export default AdminOrderDetails;
