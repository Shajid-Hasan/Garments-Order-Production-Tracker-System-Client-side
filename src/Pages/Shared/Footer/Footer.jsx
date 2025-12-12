import React from "react";
import { NavLink } from "react-router";

const Footer = () => {
    return (
        <footer className="bg-base-200 mt-10 pt-10">
            <div className="container mx-auto px-6">

                {/* Top Section */}
                <div className="grid md:grid-cols-3 gap-10 pb-10">

                    {/* Logo + Description */}
                    <div>
                        <h2 className="text-2xl font-bold mb-3">Shajid Textile</h2>
                        <p className="text-gray-600">
                            Premium textile products crafted with quality and dedication.
                            Your trusted partner in fabrics & garments.
                        </p>
                    </div>

                    {/* Useful Links */}
                    <div>
                        <h3 className="text-xl font-semibold mb-3">Useful Links</h3>
                        <ul className="space-y-2 text-gray-700">
                            <li><NavLink to="/" className="hover:text-blue-500">Home</NavLink></li>
                            <li><NavLink to="/allProduct" className="hover:text-blue-500">All Product</NavLink></li>
                            <li><NavLink to="/aboutUs" className="hover:text-blue-500">About Us</NavLink></li>
                            <li><NavLink to="/contact" className="hover:text-blue-500">Contact</NavLink></li>
                        </ul>
                    </div>

                    {/* Contact or More Info */}
                    <div>
                        <h3 className="text-xl font-semibold mb-3">Contact</h3>
                        <p className="text-gray-700">Email: support@shajidtextile.com</p>
                        <p className="text-gray-700">Phone: +880 123 456 789</p>
                        <p className="text-gray-700">Location: Dhaka, Bangladesh</p>
                    </div>

                </div>

                {/* Bottom Copy Section */}
                <div className="border-t border-gray-300 py-4 text-center text-gray-600">
                    © {new Date().getFullYear()} Shajid Textile — All Rights Reserved.
                </div>

            </div>
        </footer>
    );
};

export default Footer;
