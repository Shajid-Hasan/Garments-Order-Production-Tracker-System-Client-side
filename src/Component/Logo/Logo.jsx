import React from "react";
import { FaSocks } from "react-icons/fa";

const Logo = () => {
    return (
        <div className="flex items-center justify-center space-x-4 h-15 cursor-pointer">
            {/* Icon */}
            <FaSocks className="text-blue-500 text-4xl animate-bounce" />

            {/* Animated gradient text */}
            <h1 className="text-3xl md:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 animate-gradient-x">
                Shajid Textile
            </h1>
        </div>
    );
};

export default Logo;
