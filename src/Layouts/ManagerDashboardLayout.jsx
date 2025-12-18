import React from "react";
import { NavLink, Outlet } from "react-router";

const ManagerDashboardLayout = () => {
    return (
        <div className="flex min-h-screen">
            {/* ===== SIDEBAR ===== */}
            <div className="w-64 bg-base-200 p-4">
                <div className="divider"></div>

                <p className="menu-title px-2 text-xs">
                    <span>Manager Panel</span>
                </p>

                <NavLink
                    to="add-product"
                    className={({ isActive }) =>
                        `block px-2 py-1 text-sm rounded 
                        ${isActive ? "font-semibold bg-base-300" : "font-normal"}`
                    }
                >
                    ➕ Add Product
                </NavLink>

                <NavLink
                    to="manage-products"
                    className={({ isActive }) =>
                        `block px-2 py-1 text-sm rounded 
                        ${isActive ? "font-semibold bg-base-300" : "font-normal"}`
                    }
                >
                    🛠️ Manage Products
                </NavLink>

                <NavLink
                    to="pending-orders"
                    className={({ isActive }) =>
                        `block px-2 py-1 text-sm rounded 
                        ${isActive ? "font-semibold bg-base-300" : "font-normal"}`
                    }
                >
                    ⏳ Pending Orders
                </NavLink>

                <NavLink
                    to="approved-orders"
                    className={({ isActive }) =>
                        `block px-2 py-1 text-sm rounded 
                        ${isActive ? "font-semibold bg-base-300" : "font-normal"}`
                    }
                >
                    ✅ Approved Orders
                </NavLink>

                <NavLink
                    to="profile"
                    className={({ isActive }) =>
                        `block px-2 py-1 text-sm rounded 
                        ${isActive ? "font-semibold bg-base-300" : "font-normal"}`
                    }
                >
                    👤 My Profile
                </NavLink>
            </div>
        </div>
    );
};

export default ManagerDashboardLayout;
