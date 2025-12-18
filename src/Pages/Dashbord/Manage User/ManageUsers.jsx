import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const ManageUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    const [selectedUser, setSelectedUser] = useState(null);
    const [modalType, setModalType] = useState(""); // role | suspend
    const [role, setRole] = useState("");
    const [suspendReason, setSuspendReason] = useState("");

    const fetchUsers = async () => {
        const res = await axios.get("http://localhost:3000/users");
        setUsers(res.data);
        setLoading(false);
    };

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        fetchUsers();
    }, []);

    // UPDATE ROLE
    const handleUpdateRole = async () => {
        await axios.patch(
            `http://localhost:3000/users/role/${selectedUser._id}`,
            { role }
        );
        toast.success("User role updated");
        closeModal();
        fetchUsers();
    };

    // SUSPEND / ACTIVATE
    const handleSuspend = async (status) => {
        if (status === "suspended" && !suspendReason) {
            toast.error("Suspend reason required");
            return;
        }

        await axios.patch(
            `http://localhost:3000/users/status/${selectedUser._id}`,
            {
                status,
                reason: status === "suspended" ? suspendReason : null
            }
        );

        toast.success(
            status === "suspended"
                ? "User suspended successfully"
                : "User activated successfully"
        );

        closeModal();
        fetchUsers();
    };

    const closeModal = () => {
        setSelectedUser(null);
        setModalType("");
        setRole("");
        setSuspendReason("");
    };

    if (loading) return <p className="text-center mt-10">Loading...</p>;

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

                                <td>
                                    <span className="badge badge-info capitalize">
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
                                    {/* UPDATE ROLE */}
                                    <button
                                        className="btn btn-xs btn-info"
                                        onClick={() => {
                                            setSelectedUser(user);
                                            setRole(user.role);
                                            setModalType("role");
                                        }}
                                    >
                                        Update Role
                                    </button>

                                    {/* SUSPEND / ACTIVATE */}
                                    <button
                                        className="btn btn-xs btn-warning"
                                        onClick={() => {
                                            setSelectedUser(user);
                                            setModalType("suspend");
                                        }}
                                    >
                                        {user.status === "active"
                                            ? "Suspend"
                                            : "Activate"}
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* MODAL */}
            {selectedUser && (
                <dialog open className="modal">
                    <div className="modal-box">
                        {/* ROLE UPDATE */}
                        {modalType === "role" && (
                            <>
                                <h3 className="font-bold text-lg mb-3">
                                    Update User Role
                                </h3>

                                <select
                                    className="select select-bordered w-full"
                                    value={role}
                                    onChange={(e) =>
                                        setRole(e.target.value)
                                    }
                                >
                                    <option value="buyer">Buyer</option>
                                    <option value="manager">Manager</option>
                                    <option value="admin">Admin</option>
                                </select>

                                <div className="modal-action">
                                    <button
                                        className="btn btn-success"
                                        onClick={handleUpdateRole}
                                    >
                                        Update
                                    </button>
                                    <button
                                        className="btn"
                                        onClick={closeModal}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </>
                        )}

                        {/* SUSPEND */}
                        {modalType === "suspend" && (
                            <>
                                <h3 className="font-bold text-lg mb-3">
                                    {selectedUser.status === "active"
                                        ? "Suspend User"
                                        : "Activate User"}
                                </h3>

                                {selectedUser.status === "active" && (
                                    <textarea
                                        className="textarea textarea-bordered w-full"
                                        placeholder="Suspend reason"
                                        value={suspendReason}
                                        onChange={(e) =>
                                            setSuspendReason(e.target.value)
                                        }
                                    />
                                )}

                                <div className="modal-action">
                                    {selectedUser.status === "active" ? (
                                        <button
                                            className="btn btn-warning"
                                            onClick={() =>
                                                handleSuspend("suspended")
                                            }
                                        >
                                            Suspend
                                        </button>
                                    ) : (
                                        <button
                                            className="btn btn-success"
                                            onClick={() =>
                                                handleSuspend("active")
                                            }
                                        >
                                            Activate
                                        </button>
                                    )}

                                    <button
                                        className="btn"
                                        onClick={closeModal}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </dialog>
            )}
        </div>
    );
};

export default ManageUsers;
