import React from "react";

const ProductCard = ({ product }) => {
    return (
        <div className="border rounded-lg shadow-md p-4 hover:shadow-lg transition duration-300">
            <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover rounded-md"
            />

            <h3 className="text-xl font-semibold mt-4">{product.name}</h3>

            <p className="text-gray-600 mt-2">{product.description}</p>

            <div className="flex justify-between items-center mt-4">
                <span className="text-lg font-bold text-blue-600">${product.price}</span>
                <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                    Buy Now
                </button>
            </div>
        </div>
    );
};

export default ProductCard;
