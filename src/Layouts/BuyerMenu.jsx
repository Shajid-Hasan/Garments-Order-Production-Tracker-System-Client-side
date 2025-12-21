import React from "react";
import { NavLink } from "react-router";

// ✅ React Icons
import { FaFileInvoice, FaMapMarkedAlt, FaUser } from "react-icons/fa";

const BuyerMenu = () => {
    return (
        <div className="flex min-h-screen">
            {/* ===== SIDEBAR ===== */}
            <div className="w-64 bg-base-200 p-4 space-y-2">

                <p className="menu-title px-2 text-xl">
                    Buyer Panel
                </p>

                {/* My Orders */}
                <NavLink
                    to="/dashboard/buyer-orders"
                    className={({ isActive }) =>
                        `flex items-center gap-2 px-2 py-1 text-sm rounded 
                        ${isActive ? "font-semibold bg-base-300" : "font-normal"}`
                    }
                >
                    <FaFileInvoice />
                    My Orders
                </NavLink>

                {/* Track Order */}
                {/* <NavLink
                    to="/dashboard/track-order"
                    className={({ isActive }) =>
                        `flex items-center gap-2 px-2 py-1 text-sm rounded 
                        ${isActive ? "font-semibold bg-base-300" : "font-normal"}`
                    }
                >
                    <FaMapMarkedAlt />
                    Track Order
                </NavLink> */}

                {/* Profile */}
                <NavLink
                    to="/dashboard/buyer-profile"
                    className={({ isActive }) =>
                        `flex items-center gap-2 px-2 py-1 text-sm rounded 
                        ${isActive ? "font-semibold bg-base-300" : "font-normal"}`
                    }
                >
                    <FaUser />
                    My Profile
                </NavLink>

            </div>
        </div>
    );
};

export default BuyerMenu;
