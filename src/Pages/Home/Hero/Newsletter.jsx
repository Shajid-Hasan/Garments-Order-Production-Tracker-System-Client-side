// src/components/Newsletter/Newsletter.jsx
import React from "react";
import { motion } from "framer-motion";

const Newsletter = () => {
    return (
        <section className="py-20">
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                viewport={{ once: true }}
                className="max-w-4xl mx-auto px-4 text-center"
            >
                <h2 className="text-4xl md:text-5xl font-bold mb-4">
                    Stay Updated
                </h2>

                <p className="text-lg md:text-xl text-gray-600 mb-10">
                    Subscribe to our newsletter and get{" "}
                    <span className="font-semibold text-gray-900">
                        10% off
                    </span>{" "}
                    your first order.
                </p>

                <motion.form
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                    className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto bg-gray-100 p-6 rounded-2xl shadow-xl"
                >
                    <input
                        type="email"
                        placeholder="Enter your email"
                        required
                        className="flex-1 px-6 py-3 rounded-xl text-black outline-none focus:ring-2 focus:ring-gray-300"
                    />

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        type="submit"
                        className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-xl shadow-md hover:bg-blue-700 transition"
                    >
                        Subscribe
                    </motion.button>
                </motion.form>
            </motion.div>
        </section>
    );
};

export default Newsletter;
