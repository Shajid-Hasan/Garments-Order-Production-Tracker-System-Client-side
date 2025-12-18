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
        const res = await axios.get("http://localhost:3000/orders");
        setOrders(res.data);
    };

    // Filter + Search
    const filteredOrders = orders.filter(order => {
        const matchStatus =
            filter === "all" || order.status === filter;

        const matchSearch =
            order._id?.toString().includes(search) ||
            order.userEmail?.toLowerCase().includes(search.toLowerCase());

        return matchStatus && matchSearch;
    });

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-6">
                All Orders (Admin)
            </h2>

            {/* FILTER + SEARCH */}
            <div className="flex gap-4 mb-4">
                <select
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    className="select select-bordered"
                >
                    <option value="all">All</option>
                    <option value="pending">Pending</option>
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected</option>
                </select>

                <input
                    type="text"
                    placeholder="Search by Order ID or Email"
                    className="input input-bordered w-full max-w-xs"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            {/* TABLE */}
            <div className="overflow-x-auto">
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
                                        className={`badge capitalize ${order.status === "approved"
                                                ? "badge-success"
                                                : order.status === "rejected"
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
