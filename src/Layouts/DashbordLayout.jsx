import React from "react";
// import { Link, NavLink, Outlet } from "react-router-dom";
import Logo from "../Component/Logo/Logo";
import { Link, NavLink, Outlet } from "react-router";
import ManagerDashboardLayout from "./ManagerDashboardLayout";
import BuyerDashboardLayout from "./BuyerDashboardLayout";

const DashbordLayout = () => {
    return (
        <div className="drawer lg:drawer-open min-h-screen">
            <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />

            {/* ================= MAIN CONTENT ================= */}
            <div className="drawer-content flex flex-col">

                {/* Top Navbar */}
                <div className="navbar bg-base-300 px-4">
                    <label
                        htmlFor="dashboard-drawer"
                        className="btn btn-square btn-ghost lg:hidden"
                    >
                        ☰
                    </label>

                </div>

                {/* Page Content */}
                <div className="p-6">
                    <Outlet />
                </div>
            </div>

            {/* ================= SIDEBAR ================= */}
            <div className="drawer-side">
                <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>

                <aside className="w-64 bg-base-200 min-h-full p-4">
                    <ul className="menu space-y-1">

                        {/* Home */}
                        <li>
                            <Link to="/" className="font-semibold">
                                🏠 Home
                            </Link>
                        </li>

                        <div className="divider"></div>

                        {/* ADMIN DASHBOARD LINKS */}
                        <li className="menu-title">
                            <span>Admin Panel</span>
                        </li>

                        <li>
                            <NavLink
                                to="/dashboard/manage-users"
                                className={({ isActive }) =>
                                    isActive ? "active font-semibold" : ""
                                }
                            >
                                👥 Manage Users
                            </NavLink>
                        </li>

                        <li>
                            <NavLink
                                to="/dashboard/all-products"
                                className={({ isActive }) =>
                                    isActive ? "active font-semibold" : ""
                                }
                            >
                                📦 All Products
                            </NavLink>
                        </li>

                        <li>
                            <NavLink
                                to="/dashboard/all-orders"
                                className={({ isActive }) =>
                                    isActive ? "active font-semibold" : ""
                                }
                            >
                                🧾 All Orders
                            </NavLink>
                        </li>
                    </ul>
                    <ManagerDashboardLayout/>
                    {/* <BuyerDashboardLayout/> */}
                </aside>
            </div>
        </div>
    );
};

export default DashbordLayout;
