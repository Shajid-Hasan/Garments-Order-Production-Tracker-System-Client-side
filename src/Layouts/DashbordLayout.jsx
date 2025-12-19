import React, { useEffect, useState } from "react";
import { Link, NavLink, Outlet } from "react-router";
import ManagerMenu from "./ManagerMenu";
import BuyerMenu from "./BuyerMenu";
import useAuth from "../Hooks/useAuth";

const DashbordLayout = () => {
    const [role, setRole] = useState("");
    const [loading, setLoading] = useState(true);
    const {user} = useAuth()
    console.log(role)

    useEffect(() => {
        fetch(`http://localhost:3000/users/role?email=${user?.email}`, {
            credentials: "include",
        })
            .then(res => res.json())
            .then(data => {
                setRole(data.role); // admin | manager | buyer
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

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
                        ☰
                    </label>
                </div>

                <div className="p-6">
                    <Outlet />
                </div>
            </div>

            {/* ===== SIDEBAR ===== */}
            <div className="drawer-side">
                <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>

                <aside className="w-64 bg-base-200 min-h-full p-4">

                    {/* Home */}
                    <Link to="/" className="font-semibold block mb-2">
                        🏠 Home
                    </Link>

                    {/* ================= ADMIN ================= */}
                    {role === "admin" && (
                        <div className="flex flex-col gap-5">
                            <div className="divider"></div>
                            <p className="menu-title text-xs">Admin Panel</p>

                            <NavLink to="/dashboard/manage-users">
                                👥 Manage Users
                            </NavLink>

                            <NavLink to="/dashboard/all-products">
                                📦 All Products
                            </NavLink>

                            <NavLink to="/dashboard/all-orders">
                                🧾 All Orders
                            </NavLink>
                        </div>
                    )}

                    {/* ================= MANAGER ================= */}
                    {role === "manager" && (
                        <>
                            <div className="divider"></div>
                            <ManagerMenu />
                        </>
                    )}

                    {/* ================= BUYER ================= */}
                    {role === "buyer" && (
                        <>
                            <div className="divider"></div>
                            <BuyerMenu />
                        </>
                    )}
                </aside>
            </div>
        </div>
    );
};

export default DashbordLayout;
