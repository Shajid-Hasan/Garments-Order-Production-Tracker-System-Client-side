import React from "react";
import { FaSocks } from "react-icons/fa";

const Logo = () => {
    return (
        <div className="flex items-center justify-center gap-2 sm:gap-3 md:gap-4 cursor-pointer">
            {/* Icon */}
            <FaSocks
                className="
                    text-blue-500
                    text-2xl
                    sm:text-2xl
                    md:text-2xl
                    lg:text-3xl
                    animate-bounce
                "
            />

            {/* Brand Text */}
            <h1
                className="
                    font-extrabold
                    text-transparent
                    bg-clip-text
                    bg-gradient-to-r
                    from-blue-500
                    via-purple-500
                    to-pink-500
                    animate-gradient-x

                    text-lg
                    sm:text-xl
                    md:text-1xl
                    lg:text-2xl
                    xl:text-2xl
                "
            >
                Shajid Textile
            </h1>
        </div>
    );
};

export default Logo;
