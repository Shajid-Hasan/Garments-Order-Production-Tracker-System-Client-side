import React from "react";
import { motion } from "framer-motion";
import { NavLink } from "react-router";

const Hero = () => {
    return (
        <div className="hero min-h-[75vh] sm:min-h-[80vh] lg:min-h-[85vh] bg-base-200 px-4 sm:px-6 lg:px-10">
            <div className="hero-content flex-col lg:flex-row-reverse gap-8 lg:gap-12">

                {/* HERO IMAGE */}
                <motion.img
                    src="https://i.postimg.cc/G2PVD39R/Best-Garments-in-Bangladesh.jpg"
                    className="
                        w-full
                        max-w-sm
                        sm:max-w-md
                        md:max-w-lg
                        lg:max-w-xl
                        rounded-lg
                        shadow-2xl
                    "
                    initial={{ opacity: 0, x: 120 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                />

                {/* TEXT CONTENT */}
                <motion.div
                    className="text-center lg:text-left"
                    initial={{ opacity: 0, x: -120 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h1
                        className="
                            font-bold
                            text-3xl
                            sm:text-4xl
                            md:text-5xl
                            lg:text-5xl
                            leading-tight
                        "
                    >
                        Premium Textile & Fabrics
                    </h1>

                    <p
                        className="
                            py-4
                            sm:py-5
                            md:py-6
                            text-base
                            sm:text-lg
                            max-w-xl
                            mx-auto
                            lg:mx-0
                        "
                    >
                        Explore our top-quality fabrics crafted with care & tradition.
                        Your trusted supplier in textile excellence.
                    </p>

                    <NavLink
                        to="/allProduct"
                        className="
                            btn
                            btn-primary
                            px-6
                            sm:px-8
                        "
                    >
                        View Product
                    </NavLink>
                </motion.div>
            </div>
        </div>
    );
};

export default Hero;
