import React from 'react';
import { Link, NavLink } from 'react-router';
import Logo from '../../../Component/Logo/Logo';
import useAuth from '../../../Hooks/useAuth';

const Navbar = () => {
    const { user, logOut } = useAuth();

    const handleLogOut = () => {
        logOut().catch(error => console.log(error));
    };

    const links = (
        <>
            <li><NavLink to="/">Home</NavLink></li>
            <li><NavLink to="/allProduct">All Products</NavLink></li>
            <li><NavLink to="/aboutUs">About Us</NavLink></li>
            <li><NavLink to="/contact">Contact</NavLink></li>
        </>
    );

    return (
        <div className="navbar bg-base-100 shadow-sm">
            {/* LEFT */}
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none"
                            viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </div>
                    <ul
                        tabIndex={-1}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow"
                    >
                        {links}
                    </ul>
                </div>

                <Link to="/" className="btn btn-ghost text-xl">
                    <Logo />
                </Link>
            </div>

            {/* CENTER */}
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {links}
                </ul>
            </div>

            {/* RIGHT */}
            <div className="navbar-end mr-5">
                {!user ? (
                    <div className="flex gap-3">
                        <NavLink
                            to="/login"
                            className="btn bg-gradient-to-r from-sky-400 to-blue-600 text-white"
                        >
                            Login
                        </NavLink>
                        <NavLink
                            to="/register"
                            className="btn bg-gradient-to-r from-pink-500 to-purple-600 text-white"
                        >
                            Register
                        </NavLink>
                    </div>
                ) : (
                    <div className="dropdown dropdown-end flex items-center gap-2">
                        {/* Hamburger icon on the left */}
                        <div tabIndex={0} className="btn btn-ghost p-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none"
                                viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                    d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </div>

                        {/* Avatar */}
                        <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full ring ring-primary ring-offset-2">
                                <img
                                    src={user?.photoURL || 'https://i.ibb.co/2kR5w9n/user.png'}
                                    alt="User"
                                />
                            </div>
                        </label>

                        {/* Dropdown */}
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-60 w-60 p-3 shadow"
                        >
                            {/* User Info */}
                            <li className="pointer-events-none">
                                <div className="flex flex-col text-center">
                                    <span className="font-semibold">
                                        {user?.displayName || 'User'}
                                    </span>
                                    <span className="text-sm text-gray-500 break-all">
                                        {user?.email}
                                    </span>
                                </div>
                            </li>

                            <div className="divider my-1"></div>

                            {/* Dashboard */}
                            <li>
                                <NavLink to="/dashboard">
                                    🏠 Dashboard
                                </NavLink>
                            </li>

                            {/* Update Profile */}
                            <li>
                                <NavLink to="/update-profile">
                                    ✏️ Update Profile
                                </NavLink>
                            </li>

                            {/* Logout */}
                            <li>
                                <button
                                    onClick={handleLogOut}
                                    className="text-red-500"
                                >
                                    🚪 Logout
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
