import React from "react";
import { NavLink, Outlet } from "react-router";

// ✅ React Icons
import { FaPlus, FaBoxOpen, FaTools, FaClock, FaCheck, FaUser } from "react-icons/fa";

const ManagerMenu = () => {
    return (
        <div className="flex min-h-screen">
            {/* ===== SIDEBAR ===== */}
            <div className="w-64 bg-base-200 p-4 fixed h-screen shadow-lg">
                <p className="menu-title px-2 text-xl mb-4 font-bold">
                    <span>Manager Panel</span>
                </p>

                <NavLink
                    to="add-product"
                    className={({ isActive }) =>
                        `flex items-center gap-2 px-4 py-2 mb-2 rounded-md text-sm transition-colors
                        ${isActive ? "font-semibold bg-base-300" : "font-normal hover:bg-base-100"}`
                    }
                >
                    <FaPlus /> Add Product
                </NavLink>

                <NavLink
                    to="manage-products"
                    className={({ isActive }) =>
                        `flex items-center gap-2 px-4 py-2 mb-2 rounded-md text-sm transition-colors
                        ${isActive ? "font-semibold bg-base-300" : "font-normal hover:bg-base-100"}`
                    }
                >
                    <FaTools /> Manage Products
                </NavLink>

                <NavLink
                    to="pending-orders"
                    className={({ isActive }) =>
                        `flex items-center gap-2 px-4 py-2 mb-2 rounded-md text-sm transition-colors
                        ${isActive ? "font-semibold bg-base-300" : "font-normal hover:bg-base-100"}`
                    }
                >
                    <FaClock /> Pending Orders
                </NavLink>

                <NavLink
                    to="approved-orders"
                    className={({ isActive }) =>
                        `flex items-center gap-2 px-4 py-2 mb-2 rounded-md text-sm transition-colors
                        ${isActive ? "font-semibold bg-base-300" : "font-normal hover:bg-base-100"}`
                    }
                >
                    <FaCheck /> Approved Orders
                </NavLink>

                <NavLink
                    to="profile"
                    className={({ isActive }) =>
                        `flex items-center gap-2 px-4 py-2 mb-2 rounded-md text-sm transition-colors
                        ${isActive ? "font-semibold bg-base-300" : "font-normal hover:bg-base-100"}`
                    }
                >
                    <FaUser /> My Profile
                </NavLink>
            </div>

            {/* ===== CONTENT AREA ===== */}
            <div className="flex-1 ml-64 p-6 bg-base-100 min-h-screen">
                <Outlet />
            </div>
        </div>
    );
};

export default ManagerMenu;
