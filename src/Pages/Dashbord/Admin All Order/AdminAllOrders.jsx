import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

const AdminAllOrders = () => {
    const [orders, setOrders] = useState([]);
    const [filter, setFilter] = useState("all");
    const [search, setSearch] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const res = await axios.get(
                "https://garments-server-side.vercel.app/orders"
            );
            setOrders(res.data);
        } catch (err) {
            console.error("Failed to fetch orders:", err);
        }
    };

    // FILTER + SEARCH
    const filteredOrders = orders.filter((order) => {
        const matchStatus =
            filter === "all" || order.status === filter;

        const matchSearch =
            order._id?.toString().includes(search) ||
            order.userEmail
                ?.toLowerCase()
                .includes(search.toLowerCase());

        return matchStatus && matchSearch;
    });

    return (
        <div className="p-4 md:p-6">
            <h2 className="text-2xl font-bold mb-6">
                All Orders (Admin)
            </h2>

            {/* FILTER + SEARCH */}
            <div className="flex flex-col sm:flex-row gap-3 mb-6">
                <select
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    className="select select-bordered max-w-xs"
                >
                    <option value="all">All</option>
                    <option value="pending">Pending</option>
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected</option>
                </select>

                <input
                    type="text"
                    placeholder="Search by Order ID or Email"
                    className="input input-bordered w-full sm:max-w-xs"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            {/* ================= MOBILE CARD VIEW ================= */}
            <div className="space-y-4 sm:hidden">
                {filteredOrders.map((order) => (
                    <div
                        key={order._id}
                        className="bg-white shadow rounded-xl p-4 space-y-2"
                    >
                        <p className="text-xs break-all">
                            <b>Order ID:</b> {order._id}
                        </p>

                        <p>
                            <b>User:</b> {order.userEmail}
                        </p>

                        <p>
                            <b>Product:</b>{" "}
                            {order.productTitle}
                        </p>

                        <p>
                            <b>Quantity:</b>{" "}
                            {order.orderQuantity}
                        </p>

                        <span
                            className={`badge capitalize ${order.status === "approved"
                                    ? "badge-success"
                                    : order.status ===
                                        "rejected"
                                        ? "badge-error"
                                        : "badge-warning"
                                }`}
                        >
                            {order.status}
                        </span>

                        <div className="pt-2">
                            <button
                                className="w-full bg-blue-600 text-white py-2 rounded"
                                onClick={() =>
                                    navigate(
                                        `/dashboard/order/${order._id}`
                                    )
                                }
                            >
                                View Details
                            </button>
                        </div>
                    </div>
                ))}

                {filteredOrders.length === 0 && (
                    <p className="text-center text-gray-500">
                        No orders found
                    </p>
                )}
            </div>

            {/* ================= TABLE VIEW (TABLET + LAPTOP) ================= */}
            <div className="hidden sm:block overflow-x-auto">
                <table className="table table-zebra w-full">
                    <thead>
                        <tr>
                            <th>Order ID</th>
                            <th>User</th>
                            <th>Product</th>
                            <th>Quantity</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {filteredOrders.map((order) => (
                            <tr key={order._id}>
                                <td className="text-xs">
                                    {order._id}
                                </td>
                                <td>{order.userEmail}</td>
                                <td>{order.productTitle}</td>
                                <td>{order.orderQuantity}</td>

                                <td>
                                    <span
                                        className={`badge capitalize ${order.status ===
                                                "approved"
                                                ? "badge-success"
                                                : order.status ===
                                                    "rejected"
                                                    ? "badge-error"
                                                    : "badge-warning"
                                            }`}
                                    >
                                        {order.status}
                                    </span>
                                </td>

                                <td>
                                    <button
                                        className="btn btn-xs btn-info"
                                        onClick={() =>
                                            navigate(
                                                `/dashboard/order/${order._id}`
                                            )
                                        }
                                    >
                                        View
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {filteredOrders.length === 0 && (
                    <p className="text-center mt-6 text-gray-500">
                        No orders found
                    </p>
                )}
            </div>
        </div>
    );
};

export default AdminAllOrders;
