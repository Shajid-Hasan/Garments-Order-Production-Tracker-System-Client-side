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
                const resUser = await axios.get(
                    `https://garments-server-side.vercel.app/users/${user.email}`,
                    { withCredentials: true }
                );
                let userData = resUser.data;

                const resRole = await axios.get(
                    `https://garments-server-side.vercel.app/users/role?email=${user.email}`,
                    { withCredentials: true }
                );
                userData.role = resRole.data.role || "buyer";

                setDbUser(userData);

                if (userData.role === "buyer") {
                    const resOrders = await axios.get(
                        `https://garments-server-side.vercel.app/orders?email=${user.email}`,
                        { withCredentials: true }
                    );
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
        await axios.post(
            "https://garments-server-side.vercel.app/logout",
            {},
            { withCredentials: true }
        );
        navigate("/login");
    };

    const getRoleIcon = (role) => {
        switch (role?.toLowerCase()) {
            case "manager":
                return <FaUserShield className="text-blue-500 mr-1" />;
            case "buyer":
                return <FaShoppingCart className="text-green-500 mr-1" />;
            default:
                return <FaUser className="text-gray-500 mr-1" />;
        }
    };

    if (loading) {
        return (
            <motion.p
                className="text-center mt-10 text-gray-500"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
            >
                Loading profile...
            </motion.p>
        );
    }

    return (
        <motion.div
            className="max-w-md mx-auto p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700"
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            {/* ================= PROFILE IMAGE ================= */}
            <motion.div
                className="flex justify-center mb-4"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.1 }}
            >
                <div className="relative">
                    <img
                        src={
                            user?.photoURL ||
                            "https://i.ibb.co/2kR5w9n/user.png"
                        }
                        alt="Profile"
                        className="w-28 h-28 rounded-full object-cover ring-4 ring-primary shadow-lg"
                    />
                    <span className="absolute bottom-1 right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></span>
                </div>
            </motion.div>

            <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-gray-100">
                👤 My Profile
            </h2>

            <motion.div className="space-y-3">
                {/* Name */}
                <motion.div
                    className="flex justify-between items-center p-3 bg-gray-100 dark:bg-gray-700 rounded-lg"
                    whileHover={{ scale: 1.02 }}
                >
                    <span className="font-medium text-gray-700 dark:text-gray-200">
                        Name
                    </span>
                    <span className="text-sm text-gray-900 dark:text-gray-100">
                        {dbUser?.name || user?.displayName || "User"}
                    </span>
                </motion.div>

                {/* Email */}
                <motion.div
                    className="flex justify-between items-center p-3 bg-gray-100 dark:bg-gray-700 rounded-lg"
                    whileHover={{ scale: 1.02 }}
                >
                    <span className="font-medium text-gray-700 dark:text-gray-200">
                        Email
                    </span>
                    <span className="text-sm text-gray-900 dark:text-gray-100 break-all">
                        {user?.email}
                    </span>
                </motion.div>

                {/* Role */}
                <motion.div
                    className="flex justify-between items-center p-3 bg-gray-100 dark:bg-gray-700 rounded-lg"
                    whileHover={{ scale: 1.02 }}
                >
                    <span className="font-medium text-gray-700 dark:text-gray-200">
                        Role
                    </span>
                    <span className="badge badge-info text-xs flex items-center gap-1 px-3">
                        {getRoleIcon(dbUser?.role)}
                        {dbUser?.role}
                    </span>
                </motion.div>

                {/* Buyer Orders */}
                {dbUser?.role === "buyer" && (
                    <motion.div
                        className="flex justify-between items-center p-3 bg-gray-100 dark:bg-gray-700 rounded-lg"
                        whileHover={{ scale: 1.02 }}
                    >
                        <span className="font-medium text-gray-700 dark:text-gray-200">
                            Total Orders
                        </span>
                        <span className="text-sm text-gray-900 dark:text-gray-100">
                            {orderCount}
                        </span>
                    </motion.div>
                )}

                {/* Status */}
                <motion.div
                    className="flex justify-between items-center p-3 bg-gray-100 dark:bg-gray-700 rounded-lg"
                    whileHover={{ scale: 1.02 }}
                >
                    <span className="font-medium text-gray-700 dark:text-gray-200">
                        Status
                    </span>
                    {dbUser?.status === "suspended" ? (
                        <span className="badge badge-error text-xs px-3">
                            Suspended
                        </span>
                    ) : (
                        <span className="badge badge-success text-xs px-3">
                            Active
                        </span>
                    )}
                </motion.div>

                {/* Suspended Info */}
                <AnimatePresence>
                    {dbUser?.status === "suspended" && (
                        <motion.div
                            className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-700 text-sm"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                        >
                            <p className="font-semibold text-red-600">
                                Reason:
                            </p>
                            <p className="text-red-700">
                                {dbUser?.suspendReason}
                            </p>

                            <p className="font-semibold text-red-600 mt-2">
                                Admin Feedback:
                            </p>
                            <p className="text-red-700">
                                {dbUser?.suspendFeedback}
                            </p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>

            {/* Logout */}
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
