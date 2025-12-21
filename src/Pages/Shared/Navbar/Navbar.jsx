import React from 'react';
import { Link, NavLink } from 'react-router';
import {
    FaHome,
    FaBoxOpen,
    FaInfoCircle,
    FaEnvelope,
    FaSignInAlt,
    FaUserPlus,
    FaTachometerAlt,
    FaUserEdit,
    FaSignOutAlt
} from "react-icons/fa";
import Logo from '../../../Component/Logo/Logo';
import useAuth from '../../../Hooks/useAuth';

const Navbar = () => {
    const { user, logOut } = useAuth();

    const handleLogOut = () => {
        logOut().catch(error => console.log(error));
    };

    const navLinkClass = ({ isActive }) =>
        isActive
            ? "text-primary font-semibold flex items-center gap-2"
            : "hover:text-primary flex items-center gap-2";

    const links = (
        <>
            <li>
                <NavLink to="/" className={navLinkClass}>
                    <FaHome /> Home
                </NavLink>
            </li>
            <li>
                <NavLink to="/allProduct" className={navLinkClass}>
                    <FaBoxOpen /> All Products
                </NavLink>
            </li>
            <li>
                <NavLink to="/aboutUs" className={navLinkClass}>
                    <FaInfoCircle /> About Us
                </NavLink>
            </li>
            <li>
                <NavLink to="/contact" className={navLinkClass}>
                    <FaEnvelope /> Contact
                </NavLink>
            </li>
        </>
    );

    return (
        <div className="navbar bg-base-100 shadow-md px-2 md:px-6">
            {/* LEFT */}
            <div className="navbar-start">
                {/* Mobile Menu */}
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        ☰
                    </label>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content mt-3 z-[50] p-2 shadow bg-base-100 rounded-box w-52"
                    >
                        {links}
                    </ul>
                </div>

                {/* Logo */}
                <Link to="/" className="flex items-center gap-2 ml-1">
                    <Logo />

                    {/* Responsive Logo Text */}
                    <span className="
                        font-bold text-primary
                        text-sm
                        md:text-base
                        lg:text-lg
                        hidden sm:inline
                    ">
                        Garments Tracker
                    </span>
                </Link>
            </div>

            {/* CENTER */}
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal gap-4">
                    {links}
                </ul>
            </div>

            {/* RIGHT */}
            <div className="navbar-end">
                {!user ? (
                    <div className="flex gap-2">
                        <NavLink
                            to="/login"
                            className="btn btn-sm md:btn-md bg-gradient-to-r from-sky-400 to-blue-600 text-white flex items-center gap-2"
                        >
                            <FaSignInAlt /> Login
                        </NavLink>
                        <NavLink
                            to="/register"
                            className="btn btn-sm md:btn-md bg-gradient-to-r from-pink-500 to-purple-600 text-white flex items-center gap-2"
                        >
                            <FaUserPlus /> Register
                        </NavLink>
                    </div>
                ) : (
                    <div className="dropdown dropdown-end">
                        {/* Avatar */}
                        <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                            <div className="w-9 md:w-10 rounded-full ring ring-primary ring-offset-2">
                                <img
                                    src={user?.photoURL || 'https://i.ibb.co/2kR5w9n/user.png'}
                                    alt="User"
                                />
                            </div>
                        </label>

                        {/* Dropdown */}
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content mt-3 z-[50] p-3 shadow bg-base-100 rounded-box w-60"
                        >
                            {/* User Info */}
                            <li className="pointer-events-none">
                                <div className="flex flex-col text-center">
                                    <span className="font-semibold">
                                        {user?.displayName || 'User'}
                                    </span>
                                    <span className="text-xs text-gray-500 break-all">
                                        {user?.email}
                                    </span>
                                </div>
                            </li>

                            <div className="divider my-1"></div>

                            <li>
                                <NavLink to="/dashboard" className="flex items-center gap-2">
                                    <FaTachometerAlt /> Dashboard
                                </NavLink>
                            </li>

                            <li>
                                <NavLink to="/update-profile" className="flex items-center gap-2">
                                    <FaUserEdit /> Update Profile
                                </NavLink>
                            </li>

                            <li>
                                <button
                                    onClick={handleLogOut}
                                    className="text-red-500 flex items-center gap-2"
                                >
                                    <FaSignOutAlt /> Logout
                                </button>
                            </li>
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Navbar;
