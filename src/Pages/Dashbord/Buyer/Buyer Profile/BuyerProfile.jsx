import { useEffect, useState } from "react";
import useAuth from "../../../../Hooks/useAuth";
import { motion } from "framer-motion";
import { FaUserCircle } from "react-icons/fa";
import axios from "axios";

const BuyerProfile = () => {
    const { user, logOut } = useAuth(); // Getting the current authenticated user
    const [orderCount, setOrderCount] = useState(0); // State to store order count
    const [suspendReason, setSuspendReason] = useState(""); // To store suspension reason

    // ================= Fetch User Orders =================
    useEffect(() => {
        if (!user?.email) return;

        // Fetch orders for the logged-in user
        axios
            .get(`https://garments-server-side.vercel.app/orders?email=${user.email}`, {
                withCredentials: true,
            })
            .then(res => setOrderCount(res.data.length)) // Set order count
            .catch(err => console.error(err));

        // Check if the user is suspended and get the suspension reason if applicable
        axios
            .get(`https://garments-server-side.vercel.app/users/${user.email}`)
            .then(res => {
                if (res.data.status === "suspended") {
                    setSuspendReason(res.data.suspendReason); // Get suspension reason
                }
            })
            .catch(err => console.error(err));
    }, [user?.email]); // Runs when user email changes

    return (
        <div className="max-w-md mx-auto mt-10 p-4">
            <motion.h2
                className="text-2xl font-bold mb-6 text-center"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                My Profile
            </motion.h2>

            <motion.div
                className="card bg-base-200 p-6 rounded-xl shadow-lg flex flex-col items-center gap-4"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                {/* PROFILE IMAGE */}
                {user?.photoURL ? (
                    <motion.img
                        src={user.photoURL}
                        alt="User"
                        className="w-24 h-24 rounded-full border-4 border-primary object-cover shadow-md"
                        whileHover={{ scale: 1.1 }}
                        transition={{ type: "spring", stiffness: 300 }}
                    />
                ) : (
                    <motion.div
                        className="w-24 h-24 rounded-full bg-gray-300 flex items-center justify-center text-5xl text-gray-500 border-4 border-primary shadow-md"
                        whileHover={{ scale: 1.1 }}
                        transition={{ type: "spring", stiffness: 300 }}
                    >
                        <FaUserCircle />
                    </motion.div>
                )}

                {/* USER INFO */}
                <motion.p
                    className="text-lg font-semibold"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    Name: {user?.displayName || "No Name"}
                </motion.p>

                <motion.p
                    className="text-gray-600"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                >
                    Email: {user?.email || "No Email"}
                </motion.p>

                <motion.p
                    className="text-gray-600"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                >
                    Role: {user?.role || "buyer"}
                </motion.p>

                <motion.p
                    className="text-gray-600"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                >
                    Total Orders: {orderCount}
                </motion.p>

                {/* SUSPEND FEEDBACK */}
                {suspendReason && (
                    <motion.p
                        className="text-red-500 font-semibold"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                    >
                        You are suspended! Reason: {suspendReason}
                    </motion.p>
                )}

                {/* LOGOUT BUTTON */}
                <motion.button
                    onClick={logOut}
                    className="btn btn-error mt-4 w-full"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 300 }}
                >
                    Logout
                </motion.button>
            </motion.div>
        </div>
    );
};

export default BuyerProfile;
