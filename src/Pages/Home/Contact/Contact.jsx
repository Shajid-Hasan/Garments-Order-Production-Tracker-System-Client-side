import React, { useState } from "react";
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

const Contact = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: ""
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        alert("Message sent successfully!");
        setFormData({ name: "", email: "", message: "" });
    };

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
                <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
                <p className="text-gray-600 max-w-3xl mx-auto">
                    Have questions or need support? Feel free to reach out to us.
                    Our team is always ready to help you.
                </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                {/* ===== CONTACT INFO ===== */}
                <motion.div
                    variants={fadeLeft}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    <h2 className="text-2xl font-semibold mb-4">
                        Get In Touch
                    </h2>
                    <p className="text-gray-700 mb-4 leading-relaxed">
                        Whether you have a question about features, pricing, or
                        anything else, our team is ready to answer all your
                        questions.
                    </p>

                    <ul className="space-y-3 text-gray-700">
                        <li>📍 Address: Dhaka, Bangladesh</li>
                        <li>📞 Phone: +880 1234 567 890</li>
                        <li>📧 Email: support@garments-tracker.com</li>
                    </ul>
                </motion.div>

                {/* ===== CONTACT FORM ===== */}
                <motion.div
                    variants={fadeRight}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="bg-base-200 rounded-lg p-6 shadow"
                >
                    <h3 className="text-xl font-semibold mb-4">
                        Send Us a Message
                    </h3>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <input
                            type="text"
                            name="name"
                            placeholder="Your Name"
                            className="input input-bordered w-full"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />

                        <input
                            type="email"
                            name="email"
                            placeholder="Your Email"
                            className="input input-bordered w-full"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />

                        <textarea
                            name="message"
                            placeholder="Your Message"
                            className="textarea textarea-bordered w-full h-32"
                            value={formData.message}
                            onChange={handleChange}
                            required
                        />

                        <button
                            type="submit"
                            className="btn btn-primary w-full"
                        >
                            Send Message
                        </button>
                    </form>
                </motion.div>
            </div>
        </div>
    );
};

export default Contact;
