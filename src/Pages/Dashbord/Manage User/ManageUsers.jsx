import React, { useEffect, useState } from "react";
import axios from "axios";

const ManageUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        axios
            .get("http://localhost:3000/users")
            .then(res => {
                setUsers(res.data);
                setLoading(false);
            })
            .catch(err => {
                setError("Failed to load users");
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <p className="text-center mt-10">Loading users...</p>;
    }

    if (error) {
        return <p className="text-center mt-10 text-red-500">{error}</p>;
    }

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-6">Manage Users</h2>

            <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {users.map((user, index) => (
                            <tr key={user._id}>
                                <td>{index + 1}</td>
                                <td>{user.name || "N/A"}</td>
                                <td>{user.email}</td>
                                <td className="capitalize">
                                    <span className="badge badge-info">
                                        {user.role}
                                    </span>
                                </td>
                                <td>
                                    <span
                                        className={`badge ${user.status === "active"
                                                ? "badge-success"
                                                : "badge-error"
                                            }`}
                                    >
                                        {user.status}
                                    </span>
                                </td>
                                <td className="space-x-2">
                                    <button className="btn btn-xs btn-info">
                                        Update Role
                                    </button>
                                    <button className="btn btn-xs btn-warning">
                                        Suspend
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {users.length === 0 && (
                    <p className="text-center mt-6 text-gray-500">
                        No users found
                    </p>
                )}
            </div>
        </div>
    );
};

export default ManageUsers;
