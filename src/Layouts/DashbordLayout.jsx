import React, { useEffect, useState } from "react";
import { Link, NavLink, Outlet } from "react-router";
import ManagerMenu from "./ManagerMenu";
import BuyerMenu from "./BuyerMenu";
import useAuth from "../Hooks/useAuth";

// ✅ React Icons
import { FaHome, FaUsers, FaBoxOpen, FaFileInvoice } from "react-icons/fa";
import { HiMenuAlt2 } from "react-icons/hi";

const DashbordLayout = () => {
    const [role, setRole] = useState("");
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();

    useEffect(() => {
        if (!user?.email) return;

        fetch(`http://localhost:3000/users/role?email=${user.email}`, {
            credentials: "include",
        })
            .then(res => res.json())
            .then(data => {
                setRole(data.role);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, [user]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        );
    }

    return (
        <div className="drawer lg:drawer-open min-h-screen">
            <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />

            {/* ===== MAIN CONTENT ===== */}
            <div className="drawer-content flex flex-col">
                <div className="navbar bg-base-300 px-4">
                    <label
                        htmlFor="dashboard-drawer"
                        className="btn btn-square btn-ghost lg:hidden"
                    >
                        <HiMenuAlt2 size={22} />
                    </label>
                </div>

                <div className="p-6">
                    <Outlet />
                </div>
            </div>

            {/* ===== SIDEBAR ===== */}
            <div className="drawer-side">
                <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>

                <aside className="w-64 bg-base-200 min-h-full p-4 space-y-3">

                    {/* Home */}
                    <Link
                        to="/"
                        className="font-semibold flex items-center gap-2"
                    >
                        <FaHome />
                        Home
                    </Link>

                    {/* Divider */}
                    <div className="divider my-2"></div>

                    {/* ================= ADMIN ================= */}
                    {role === "admin" && (
                        <div className="space-y-2 flex flex-col">
                            <p className="menu-title text-xs">Admin Panel</p>

                            <NavLink
                                to="/dashboard/manage-users"
                                className="flex items-center gap-2"
                            >
                                <FaUsers />
                                Manage Users
                            </NavLink>

                            <NavLink
                                to="/dashboard/all-products"
                                className="flex items-center gap-2"
                            >
                                <FaBoxOpen />
                                All Products
                            </NavLink>

                            <NavLink
                                to="/dashboard/all-orders"
                                className="flex items-center gap-2"
                            >
                                <FaFileInvoice />
                                All Orders
                            </NavLink>
                        </div>
                    )}

                    {/* ================= MANAGER ================= */}
                    {role === "manager" && <ManagerMenu />}

                    {/* ================= BUYER ================= */}
                    {role === "buyer" && <BuyerMenu />}

                </aside>
            </div>
        </div>
    );
};

export default DashbordLayout;
