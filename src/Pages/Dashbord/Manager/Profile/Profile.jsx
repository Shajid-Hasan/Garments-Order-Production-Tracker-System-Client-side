import { useContext } from "react";
// import { AuthContext } from "../../Provider/AuthProvider";
import { useNavigate } from "react-router";
import axios from "axios";
import { AuthContext } from "../../../../Context/AuthContext";

const Profile = () => {
    const { user, logOut } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logOut();

        // clear jwt cookie
        await axios.post("http://localhost:5000/logout", {}, { withCredentials: true });

        navigate("/login");
    };

    return (
        <div className="max-w-2xl mx-auto p-6 bg-base-200 rounded-lg shadow">
            <h2 className="text-2xl font-bold mb-6">👤 My Profile</h2>

            {/* USER INFO */}
            <div className="space-y-3">
                <p>
                    <span className="font-semibold">Name:</span> {user?.name || user?.displayName}
                </p>

                <p>
                    <span className="font-semibold">Email:</span> {user?.email}
                </p>

                <p>
                    <span className="font-semibold">Role:</span>{" "}
                    <span className="badge badge-info">{user?.role}</span>
                </p>

                <p>
                    <span className="font-semibold">Account Status:</span>{" "}
                    {user?.status === "suspended" ? (
                        <span className="badge badge-error">Suspended</span>
                    ) : (
                        <span className="badge badge-success">Active</span>
                    )}
                </p>

                {/* SUSPEND INFO */}
                {user?.status === "suspended" && (
                    <div className="mt-4 p-4 bg-error/10 rounded">
                        <p className="font-semibold text-error">
                            Suspend Reason:
                        </p>
                        <p>{user?.suspendReason}</p>

                        <p className="font-semibold text-error mt-2">
                            Admin Feedback:
                        </p>
                        <p>{user?.suspendFeedback}</p>
                    </div>
                )}
            </div>

            {/* LOGOUT */}
            <div className="mt-6">
                <button
                    onClick={handleLogout}
                    className="btn btn-error w-full"
                >
                    🚪 Logout
                </button>
            </div>
        </div>
    );
};

export default Profile;
