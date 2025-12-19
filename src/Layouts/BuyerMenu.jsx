import React from "react";
import { NavLink, Outlet } from "react-router";

const BuyerMenu = () => {
    return (
        <div className="flex min-h-screen">
            {/* ===== SIDEBAR ===== */}
            <div className="w-64 bg-base-200 p-4">
                <div className="divider"></div>

                <p className="menu-title px-2 text-xs">
                    <span>Buyer Panel</span>
                </p>

                {/* My Orders */}
                <NavLink
                    to="/dashboard/buyer-orders"
                    className={({ isActive }) =>
                        `block px-2 py-1 text-sm rounded 
                        ${isActive ? "font-semibold bg-base-300" : "font-normal"}`
                    }
                >
                    🧾 My Orders
                </NavLink>

                {/* Track Order */}
                <NavLink
                    to="/dashboard/track-order"
                    className={({ isActive }) =>
                        `block px-2 py-1 text-sm rounded 
                        ${isActive ? "font-semibold bg-base-300" : "font-normal"}`
                    }
                >
                    📍 Track Order
                </NavLink>

                {/* Profile */}
                <NavLink
                    to="/dashboard/buyer-profile"
                    className={({ isActive }) =>
                        `block px-2 py-1 text-sm rounded 
                        ${isActive ? "font-semibold bg-base-300" : "font-normal"}`
                    }
                >
                    👤 My Profile
                </NavLink>
            </div>

            {/* ===== CONTENT ===== */}
            {/* <div className="flex-1 p-6 bg-base-100">
                <Outlet />
            </div> */}
        </div>
    );
};

export default BuyerMenu;
