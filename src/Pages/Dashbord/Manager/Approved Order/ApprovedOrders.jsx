import { useEffect, useState } from "react";
import { FaMapMarkerAlt, FaClipboardList, FaCheckCircle } from "react-icons/fa";

const ApprovedOrders = () => {
    const [orders, setOrders] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [trackingModal, setTrackingModal] = useState(false);
    const [viewModal, setViewModal] = useState(false);

    console.log(orders)
    const [trackingData, setTrackingData] = useState({
        location: "",
        note: "",
        status: "Cutting Completed"
    });

    // ================= FETCH APPROVED ORDERS =================
    useEffect(() => {
        fetch("http://localhost:3000/orders/approved")
            .then(res => res.json())
            .then(data => setOrders(data))
            .catch(err => console.error(err));
    }, []);

    // ================= ADD TRACKING =================
    const handleAddTracking = () => {
        fetch(`http://localhost:3000/orders/${selectedOrder._id}/tracking`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                ...trackingData,
                date: new Date()
            })
        })
            .then(res => res.json())
            .then(() => {
                setTrackingModal(false);
                setTrackingData({
                    location: "",
                    note: "",
                    status: "Cutting Completed"
                });
            });
    };

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-6 animate-pulse">✅ Approved Orders</h2>

            <div className="overflow-x-auto">
                <table className="table table-zebra w-full table-fixed border rounded-lg shadow-md">
                    <thead className="bg-base-200">
                        <tr>
                            <th>Order ID</th>
                            <th>User</th>
                            <th>Product</th>
                            <th className="text-center">Qty</th>
                            <th>Approved Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.length === 0 && (
                            <tr>
                                <td colSpan="6" className="text-center text-gray-500">
                                    No approved orders found
                                </td>
                            </tr>
                        )}

                        {orders.map(order => (
                            <tr key={order._id} className="hover:bg-base-100 transition-all duration-300">
                                <td className="text-xs break-all">{order._id}</td>
                                <td>{order.firstName + ' ' + order.lastName || "N/A"}</td>
                                <td>{order.productName || "N/A"}</td>
                                <td className="text-center font-semibold flex items-center justify-center gap-1">
                                    <FaClipboardList className="text-green-500 animate-bounce" />
                                    {order.orderQuantity || 0}
                                </td>
                                <td>
                                    {order.updatedAt
                                        ? new Date(order.updatedAt).toLocaleDateString()
                                        : "N/A"}
                                </td>
                                <td className="flex gap-2 justify-center">
                                    <button
                                        className="btn btn-xs btn-success animate-pulse flex items-center gap-1"
                                        onClick={() => {
                                            setSelectedOrder(order);
                                            setTrackingModal(true);
                                        }}
                                    >
                                        <FaCheckCircle /> Add Tracking
                                    </button>

                                    <button
                                        className="btn btn-xs btn-info animate-pulse"
                                        onClick={() => {
                                            setSelectedOrder(order);
                                            setViewModal(true);
                                        }}
                                    >
                                        View Tracking
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* ================= ADD TRACKING MODAL ================= */}
            {trackingModal && (
                <div className="modal modal-open">
                    <div className="modal-box">
                        <h3 className="font-bold text-lg mb-4">Add Tracking</h3>

                        <input
                            type="text"
                            placeholder="Location"
                            className="input input-bordered w-full mb-3"
                            value={trackingData.location}
                            onChange={e =>
                                setTrackingData({ ...trackingData, location: e.target.value })
                            }
                        />

                        <textarea
                            placeholder="Note"
                            className="textarea textarea-bordered w-full mb-3"
                            value={trackingData.note}
                            onChange={e =>
                                setTrackingData({ ...trackingData, note: e.target.value })
                            }
                        />

                        <select
                            className="select select-bordered w-full mb-4"
                            value={trackingData.status}
                            onChange={e =>
                                setTrackingData({ ...trackingData, status: e.target.value })
                            }
                        >
                            <option>Cutting Completed</option>
                            <option>Sewing Started</option>
                            <option>Finishing</option>
                            <option>QC Checked</option>
                            <option>Packed</option>
                            <option>Shipped</option>
                            <option>Out for Delivery</option>
                        </select>

                        <div className="modal-action">
                            <button className="btn btn-success" onClick={handleAddTracking}>
                                Save
                            </button>
                            <button className="btn" onClick={() => setTrackingModal(false)}>
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* ================= VIEW TRACKING MODAL ================= */}
            {viewModal && (
                <div className="modal modal-open">
                    <div className="modal-box">
                        <h3 className="font-bold text-lg mb-4">Tracking Timeline</h3>

                        {selectedOrder?.trackingHistory?.length > 0 ? (
                            <ul className="timeline timeline-vertical">
                                {selectedOrder.trackingHistory.map((track, index) => (
                                    <li key={index}>
                                        <div className="timeline-start text-xs">
                                            {new Date(track.date).toLocaleString()}
                                        </div>
                                        <div className="timeline-middle">●</div>
                                        <div className="timeline-end">
                                            <p className="font-semibold">{track.status}</p>
                                            <p className="text-sm flex items-center gap-1">
                                                <FaMapMarkerAlt className="text-red-500" />
                                                {track.location}
                                            </p>
                                            <p className="text-xs text-gray-500">{track.note}</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-gray-500">No tracking info available.</p>
                        )}

                        <div className="modal-action">
                            <button className="btn" onClick={() => setViewModal(false)}>
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ApprovedOrders;
