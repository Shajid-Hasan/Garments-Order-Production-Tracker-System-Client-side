import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import { AuthContext } from "../../../../Context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import { FaUser, FaShoppingCart, FaUserShield } from "react-icons/fa";

const Profile = () => {
    const { user, logOut } = useContext(AuthContext);
    const navigate = useNavigate();

    const [dbUser, setDbUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [orderCount, setOrderCount] = useState(0);

    // ================= FETCH USER + ROLE =================
    useEffect(() => {
        if (!user?.email) return;

        const fetchUser = async () => {
            try {
                const resUser = await axios.get(`https://garments-server-side.vercel.app/users/${user.email}`, { withCredentials: true });
                let userData = resUser.data;

                const resRole = await axios.get(`https://garments-server-side.vercel.app/users/role?email=${user.email}`, { withCredentials: true });
                userData.role = resRole.data.role || "buyer";

                setDbUser(userData);

                // Fetch order count if buyer
                if (userData.role === "buyer") {
                    const resOrders = await axios.get(`https://garments-server-side.vercel.app/orders?email=${user.email}`, { withCredentials: true });
                    setOrderCount(resOrders.data.length);
                }

            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, [user?.email]);

    const handleLogout = async () => {
        await logOut();
        await axios.post("https://garments-server-side.vercel.app/logout", {}, { withCredentials: true });
        navigate("/login");
    };

    const getRoleIcon = (role) => {
        switch (role?.toLowerCase()) {
            case "manager":
                return <FaUserShield className="inline text-blue-500 mr-1" />;
            case "buyer":
                return <FaShoppingCart className="inline text-green-500 mr-1" />;
            default:
                return <FaUser className="inline text-gray-500 mr-1" />;
        }
    };

    if (loading) {
        return (
            <motion.p className="text-center mt-6 text-gray-500" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                Loading profile...
            </motion.p>
        );
    }

    return (
        <motion.div
            className="max-w-md mx-auto p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
        >
            <h2 className="text-2xl font-bold mb-4 text-center text-gray-800 dark:text-gray-100">👤 My Profile</h2>

            <motion.div className="space-y-3">
                {/* Name */}
                <div className="flex justify-between items-center p-3 bg-gray-100 dark:bg-gray-700 rounded-lg">
                    <span className="font-medium text-gray-700 dark:text-gray-200">Name:</span>
                    <span className="text-gray-900 dark:text-gray-100 text-sm">{dbUser?.name || user?.displayName}</span>
                </div>

                {/* Email */}
                <div className="flex justify-between items-center p-3 bg-gray-100 dark:bg-gray-700 rounded-lg">
                    <span className="font-medium text-gray-700 dark:text-gray-200">Email:</span>
                    <span className="text-gray-900 dark:text-gray-100 text-sm">{user?.email}</span>
                </div>

                {/* Role */}
                <div className="flex justify-between items-center p-3 bg-gray-100 dark:bg-gray-700 rounded-lg">
                    <span className="font-medium text-gray-700 dark:text-gray-200">Role:</span>
                    <span className="badge badge-info px-3 py-0.5 text-xs flex items-center">
                        {getRoleIcon(dbUser?.role)}
                        {dbUser?.role}
                    </span>
                </div>

                {/* Buyer-specific order count */}
                {dbUser?.role === "buyer" && (
                    <div className="flex justify-between items-center p-3 bg-gray-100 dark:bg-gray-700 rounded-lg">
                        <span className="font-medium text-gray-700 dark:text-gray-200">Total Orders:</span>
                        <span className="text-gray-900 dark:text-gray-100 text-sm">{orderCount}</span>
                    </div>
                )}

                {/* Account Status */}
                <div className="flex justify-between items-center p-3 bg-gray-100 dark:bg-gray-700 rounded-lg">
                    <span className="font-medium text-gray-700 dark:text-gray-200">Status:</span>
                    {dbUser?.status === "suspended" ? (
                        <motion.span className="badge badge-error px-3 py-0.5 text-xs" initial={{ scale: 0.8 }} animate={{ scale: 1 }}>
                            Suspended
                        </motion.span>
                    ) : (
                        <motion.span className="badge badge-success px-3 py-0.5 text-xs" initial={{ scale: 0.8 }} animate={{ scale: 1 }}>
                            Active
                        </motion.span>
                    )}
                </div>

                {/* Suspended Info */}
                <AnimatePresence>
                    {dbUser?.status === "suspended" && (
                        <motion.div
                            className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-700 text-sm"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                        >
                            <p className="font-semibold text-red-600 dark:text-red-400">Reason:</p>
                            <p className="text-red-700 dark:text-red-300">{dbUser?.suspendReason}</p>

                            <p className="font-semibold text-red-600 dark:text-red-400 mt-2">Admin Feedback:</p>
                            <p className="text-red-700 dark:text-red-300">{dbUser?.suspendFeedback}</p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>

            {/* Logout Button */}
            <motion.div className="mt-6">
                <button
                    onClick={handleLogout}
                    className="btn btn-error w-full py-2 text-base font-medium shadow hover:scale-105 transition-transform duration-300"
                >
                    Logout
                </button>
            </motion.div>
        </motion.div>
    );
};

export default Profile;
