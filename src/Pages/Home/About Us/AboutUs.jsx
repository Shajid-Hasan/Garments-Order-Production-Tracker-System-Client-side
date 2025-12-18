import React from "react";
import { motion } from "framer-motion";

const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: "easeOut" }
    }
};

const fadeLeft = {
    hidden: { opacity: 0, x: -50 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.6 }
    }
};

const fadeRight = {
    hidden: { opacity: 0, x: 50 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.6 }
    }
};

const AboutUs = () => {
    return (
        <div className="max-w-6xl mx-auto px-6 py-12 overflow-hidden">
            {/* ===== HEADER ===== */}
            <motion.div
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="text-center mb-12"
            >
                <h1 className="text-4xl font-bold mb-4">About Us</h1>
                <p className="text-gray-600 max-w-3xl mx-auto">
                    We are a modern Garments Order & Production Tracking platform
                    designed to connect buyers, managers, and administrators
                    under one smart system.
                </p>
            </motion.div>

            {/* ===== ABOUT CONTENT ===== */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                {/* LEFT */}
                <motion.div
                    variants={fadeLeft}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    <h2 className="text-2xl font-semibold mb-4">
                        Who We Are
                    </h2>
                    <p className="text-gray-700 mb-4 leading-relaxed">
                        Our platform helps garments businesses manage products,
                        orders, and production processes efficiently. We aim to
                        simplify communication between buyers and factory
                        managers while ensuring transparency and control.
                    </p>
                    <p className="text-gray-700 leading-relaxed">
                        From product creation to order approval and tracking,
                        everything is managed in one place to save time and
                        reduce errors.
                    </p>
                </motion.div>

                {/* RIGHT */}
                <motion.div
                    variants={fadeRight}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="bg-base-200 rounded-lg p-6 shadow"
                >
                    <h3 className="text-xl font-semibold mb-4">
                        What We Offer
                    </h3>

                    <ul className="space-y-3 text-gray-700">
                        <li>✔ Product & Order Management System</li>
                        <li>✔ Role-based Dashboard (Admin, Manager, Buyer)</li>
                        <li>✔ Secure Booking & Order Tracking</li>
                        <li>✔ Real-time Production Status Updates</li>
                        <li>✔ Easy Communication & Transparency</li>
                    </ul>
                </motion.div>
            </div>

            {/* ===== MISSION & VISION ===== */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-16">
                <motion.div
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="bg-base-100 p-6 rounded-lg shadow"
                >
                    <h3 className="text-xl font-semibold mb-3">Our Mission</h3>
                    <p className="text-gray-700 leading-relaxed">
                        Our mission is to make garments order management
                        smarter, faster, and more reliable by using modern web
                        technologies and user-friendly design.
                    </p>
                </motion.div>

                <motion.div
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="bg-base-100 p-6 rounded-lg shadow"
                >
                    <h3 className="text-xl font-semibold mb-3">Our Vision</h3>
                    <p className="text-gray-700 leading-relaxed">
                        We envision a digital garments industry where every
                        order, process, and delivery is transparent, trackable,
                        and efficient.
                    </p>
                </motion.div>
            </div>
        </div>
    );
};

export default AboutUs;
