import React from "react";
import { motion } from "framer-motion";
import { NavLink } from "react-router";

const Hero = () => {
    return (
        <div className="hero min-h-[85vh] bg-base-200 px-8">
            <div className="hero-content flex-col lg:flex-row-reverse">

                {/* hero image */}
                <motion.img
                    src="https://i.postimg.cc/G2PVD39R/Best-Garments-in-Bangladesh.jpg"
                    className="max-w-xl rounded-lg shadow-2xl"
                    initial={{ opacity: 0, x: 120 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                />

                {/* text */}
                <motion.div
                    initial={{ opacity: 0, x: -120 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h1 className="text-5xl font-bold">Premium Textile & Fabrics</h1>
                    <p className="py-6 text-lg">
                        Explore our top-quality fabrics crafted with care & tradition.
                        Your trusted supplier in textile excellence.
                    </p>

                    <NavLink to="/allProduct" className="btn btn-primary px-8">
                        View Product
                    </NavLink>
                </motion.div>
            </div>
        </div>
    );
};

export default Hero;
