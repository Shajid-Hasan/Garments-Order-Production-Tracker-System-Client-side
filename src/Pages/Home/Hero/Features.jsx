// src/components/Features/Features.jsx
import React from "react";
import { motion } from "framer-motion";
import { FaTruck, FaShieldAlt, FaStar, FaHeadphones } from "react-icons/fa"; // Using React Icons

const features = [
    {
        icon: <FaTruck className="w-8 h-8" />,
        title: "Fast & Free Delivery",
        desc: "Get your order delivered within 2-3 days, completely free on orders above $50.",
    },
    {
        icon: <FaShieldAlt className="w-8 h-8" />,
        title: "Secure Payments",
        desc: "Shop with confidence using encrypted payments and buyer protection.",
    },
    {
        icon: <FaStar className="w-8 h-8" />,
        title: "Premium Quality",
        desc: "Handpicked products with top-notch materials and craftsmanship.",
    },
    {
        icon: <FaHeadphones className="w-8 h-8" />,
        title: "24/7 Support",
        desc: "Our team is here to help you anytime, day or night.",
    },
];

const Features = () => {
    return (
        <section className="py-20 lg:py-28 bg-gradient-to-b from-transparent to-gray-50/50">
            <div className="max-w-7xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        Why Thousands Trust Us
                    </h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        We go above and beyond to deliver the best shopping experience.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.15, duration: 0.7 }}
                            viewport={{ once: true }}
                            className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 
                         border border-gray-100 hover:border-transparent overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                            <div className="relative z-10">
                                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center text-white mb-6 
                                group-hover:scale-110 transition-transform duration-300">
                                    {feature.icon}
                                </div>
                                <h3 className="text-2xl font-semibold text-gray-900 mb-3">
                                    {feature.title}
                                </h3>
                                <p className="text-gray-600 leading-relaxed">
                                    {feature.desc}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Features;
