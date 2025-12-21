import { useEffect, useState } from "react";
import axios from "axios";
import { FaUser, FaBoxOpen, FaCalendarAlt } from "react-icons/fa";

const PendingOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    const [selectedOrder, setSelectedOrder] = useState(null);
    const [showViewModal, setShowViewModal] = useState(false);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [actionType, setActionType] = useState("");

    // ================= FETCH PENDING ORDERS =================
    const fetchOrders = async () => {
        try {
            setLoading(true);
            const res = await axios.get(
                "https://garments-server-side.vercel.app/orders/pending"
            );
            setOrders(res.data);
        } catch (err) {
            console.error("Fetch failed:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    // ================= HANDLERS =================
    const handleApprove = (order) => {
        setSelectedOrder(order);
        setActionType("approve");
        setShowConfirmModal(true);
    };

    const handleReject = (order) => {
        setSelectedOrder(order);
        setActionType("reject");
        setShowConfirmModal(true);
    };

    const handleView = (order) => {
        setSelectedOrder(order);
        setShowViewModal(true);
    };

    // ================= CONFIRM ACTION =================
    const confirmAction = async () => {
        if (!selectedOrder?._id || !actionType) return;

        try {
            if (actionType === "approve") {
                await axios.patch(
                    `https://garments-server-side.vercel.app/orders/${selectedOrder._id}/approve`
                );
                alert("✅ Order Approved Successfully");
            }

            if (actionType === "reject") {
                await axios.patch(
                    `https://garments-server-side.vercel.app/orders/${selectedOrder._id}/reject`
                );
                alert("❌ Order Rejected Successfully");
            }

            setShowConfirmModal(false);
            setSelectedOrder(null);
            setActionType("");
            fetchOrders();
        } catch (error) {
            console.error(
                "Action failed:",
                error.response?.data || error.message
            );
        }
    };

    // ================= LOADING =================
    if (loading) {
        return (
            <div className="p-6 text-center text-gray-500">
                Loading...
            </div>
        );
    }

    return (
        <div className="p-4 sm:p-6 md:p-10 max-w-full mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8">
                ⏳ Pending Orders
            </h2>

            {/* ================= MOBILE CARD VIEW ================= */}
            <div className="block sm:hidden space-y-4">
                {orders.length === 0 && (
                    <p className="text-center text-gray-400 text-sm">
                        No pending orders found
                    </p>
                )}

                {orders.map((order) => (
                    <div
                        key={order._id}
                        className="bg-white rounded-xl shadow p-4 space-y-2"
                    >
                        <p className="text-xs text-gray-400 break-all">
                            <b>Order ID:</b> {order._id}
                        </p>

                        <p className="text-sm">
                            <FaUser className="inline mr-2 text-blue-500" />
                            {order.userName || order.userEmail || "N/A"}
                        </p>

                        <p className="text-sm">
                            <FaBoxOpen className="inline mr-2 text-yellow-500" />
                            {Array.isArray(order.productName)
                                ? order.productName.join(", ")
                                : order.productName || "N/A"}
                        </p>

                        <p className="text-sm">
                            <b>Qty:</b> {order.orderQuantity ?? "N/A"}
                        </p>

                        <p className="text-sm text-gray-500">
                            <FaCalendarAlt className="inline mr-2" />
                            {order.createdAt
                                ? new Date(order.createdAt).toLocaleDateString()
                                : "N/A"}
                        </p>

                        <div className="flex gap-2 pt-2">
                            <button
                                onClick={() => handleApprove(order)}
                                className="flex-1 bg-green-600 text-white py-2 rounded text-sm font-medium hover:bg-green-700 transition"
                            >
                                Approve
                            </button>

                            <button
                                onClick={() => handleReject(order)}
                                className="flex-1 bg-red-600 text-white py-2 rounded text-sm font-medium hover:bg-red-700 transition"
                            >
                                Reject
                            </button>

                            <button
                                onClick={() => handleView(order)}
                                className="flex-1 bg-blue-600 text-white py-2 rounded text-sm font-medium hover:bg-blue-700 transition"
                            >
                                View
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* ================= DESKTOP / TABLET TABLE ================= */}
            <div className="hidden sm:block bg-white rounded-xl shadow overflow-x-auto w-full">
                <table className="table-fixed min-w-[900px] w-full">
                    <thead className="bg-gray-50">
                        <tr>
                            {[
                                "Order ID",
                                "User",
                                "Product",
                                "Qty",
                                "Date",
                                "Actions",
                            ].map((h) => (
                                <th
                                    key={h}
                                    className="w-1/6 py-4 text-sm uppercase text-gray-600 text-center"
                                >
                                    {h}
                                </th>
                            ))}
                        </tr>
                    </thead>

                    <tbody>
                        {orders.length === 0 && (
                            <tr>
                                <td
                                    colSpan="6"
                                    className="py-8 text-center text-gray-400"
                                >
                                    No pending orders found
                                </td>
                            </tr>
                        )}

                        {orders.map((order) => (
                            <tr
                                key={order._id}
                                className="hover:bg-gray-50 transition"
                            >
                                <td className="px-4 py-4 text-sm">
                                    {order._id}
                                </td>

                                <td className="px-4 py-4 text-sm">
                                    <FaUser className="inline mr-2 text-blue-500" />
                                    {order.userName ||
                                        order.userEmail ||
                                        "N/A"}
                                </td>

                                <td className="px-4 py-4 text-sm">
                                    <FaBoxOpen className="inline mr-2 text-yellow-500" />
                                    {Array.isArray(order.productName)
                                        ? order.productName.join(", ")
                                        : order.productName || "N/A"}
                                </td>

                                <td className="px-4 py-4 text-center">
                                    {order.orderQuantity ?? "N/A"}
                                </td>

                                <td className="px-4 py-4 text-center">
                                    <FaCalendarAlt className="inline mr-2 text-gray-400" />
                                    {order.createdAt
                                        ? new Date(
                                            order.createdAt
                                        ).toLocaleDateString()
                                        : "N/A"}
                                </td>

                                <td className="px-4 py-4 flex justify-center gap-3 flex-wrap">
                                    <button
                                        onClick={() => handleApprove(order)}
                                        className="bg-green-600 hover:bg-green-700 text-white px-1 py-2 rounded text-sm font-medium transition"
                                    >
                                        Approve
                                    </button>

                                    <button
                                        onClick={() => handleReject(order)}
                                        className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded text-sm font-medium transition"
                                    >
                                        Reject
                                    </button>

                                    <button
                                        onClick={() => handleView(order)}
                                        className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded text-sm font-medium transition"
                                    >
                                        View
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* ================= VIEW MODAL ================= */}
            {showViewModal && selectedOrder && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-3">
                    <div className="bg-white p-6 rounded-lg w-full max-w-md">
                        <h3 className="text-xl font-bold mb-4">
                            Order Details
                        </h3>

                        <div className="space-y-2 text-sm">
                            <p><b>Order ID:</b> {selectedOrder._id}</p>
                            <p><b>User:</b> {selectedOrder.userName || selectedOrder.userEmail}</p>
                            <p><b>Product:</b> {Array.isArray(selectedOrder.productName) ? selectedOrder.productName.join(", ") : selectedOrder.productName}</p>
                            <p><b>Quantity:</b> {selectedOrder.orderQuantity}</p>
                            <p><b>Status:</b> {selectedOrder.status}</p>
                            <p><b>Date:</b> {new Date(selectedOrder.createdAt).toLocaleDateString()}</p>
                        </div>

                        <div className="text-right mt-6">
                            <button
                                onClick={() => setShowViewModal(false)}
                                className="px-4 py-2 border rounded"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* ================= CONFIRM MODAL ================= */}
            {showConfirmModal && selectedOrder && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-3">
                    <div className="bg-white p-6 rounded-lg w-full max-w-sm">
                        <h3 className="text-lg font-bold mb-3">
                            Confirm {actionType === "approve" ? "Approval" : "Rejection"}
                        </h3>

                        <p className="text-sm text-gray-600 mb-4">
                            Are you sure you want to <b>{actionType}</b> this order?
                        </p>

                        <div className="flex justify-end gap-3">
                            <button
                                onClick={() => setShowConfirmModal(false)}
                                className="px-4 py-2 border rounded"
                            >
                                Cancel
                            </button>

                            <button
                                onClick={confirmAction}
                                className={`px-4 py-2 rounded text-white ${actionType === "approve"
                                    ? "bg-green-600"
                                    : "bg-red-600"
                                    }`}
                            >
                                Confirm
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PendingOrders;
