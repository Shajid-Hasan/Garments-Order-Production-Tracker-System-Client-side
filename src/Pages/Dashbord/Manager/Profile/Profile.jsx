import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import { AuthContext } from "../../../../Context/AuthContext";

const Profile = () => {
    const { user, logOut } = useContext(AuthContext);
    const navigate = useNavigate();

    const [dbUser, setDbUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user?.email) {
            axios
                .get(`http://localhost:3000/users/${user.email}`, {
                    withCredentials: true,
                })
                .then(res => {
                    setDbUser(res.data);
                    setLoading(false);
                })
                .catch(() => setLoading(false));
        }
    }, [user]);

    const handleLogout = async () => {
        await logOut();

        await axios.post(
            "http://localhost:3000/logout",
            {},
            { withCredentials: true }
        );

        navigate("/login");
    };

    if (loading) {
        return <p className="text-center mt-10">Loading profile...</p>;
    }

    return (
        <div className="max-w-2xl mx-auto p-6 bg-base-200 rounded-lg shadow">
            <h2 className="text-2xl font-bold mb-6">👤 My Profile</h2>

            <div className="space-y-3">
                <p>
                    <span className="font-semibold">Name:</span>{" "}
                    {dbUser?.name || user?.displayName}
                </p>

                <p>
                    <span className="font-semibold">Email:</span>{" "}
                    {user?.email}
                </p>

                <p>
                    <span className="font-semibold">Role:</span>{" "}
                    <span className="badge badge-info">
                        {dbUser?.role}
                    </span>
                </p>

                <p>
                    <span className="font-semibold">Account Status:</span>{" "}
                    {dbUser?.status === "suspended" ? (
                        <span className="badge badge-error">Suspended</span>
                    ) : (
                        <span className="badge badge-success">Active</span>
                    )}
                </p>

                {dbUser?.status === "suspended" && (
                    <div className="mt-4 p-4 bg-error/10 rounded">
                        <p className="font-semibold text-error">
                            Suspend Reason:
                        </p>
                        <p>{dbUser?.suspendReason}</p>

                        <p className="font-semibold text-error mt-2">
                            Admin Feedback:
                        </p>
                        <p>{dbUser?.suspendFeedback}</p>
                    </div>
                )}
            </div>

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
