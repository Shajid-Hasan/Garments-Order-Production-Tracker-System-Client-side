import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import axios from "axios";

const currentUser = {
    role: "customer", // "customer" allowed to book
    accountStatus: "active",
    email: "customer@example.com"
};

const ProductDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:3000/products/${id}`)
            .then(res => setProduct(res.data))
            .catch(err => setError(err.message))
            .finally(() => setLoading(false));
    }, [id]);

    const handleBooking = () => {
        // Redirect to booking page with product info
        navigate(`/booking/${product.id}`);
    };

    if (loading) return <p className="text-center mt-10">Loading...</p>;
    if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;
    if (!product) return <p className="text-center mt-10">Product not found!</p>;

    return (
        <div className="max-w-4xl mx-auto p-6 flex flex-col md:flex-row gap-6">
            <div className="flex-1">
                <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-auto object-contain rounded-lg shadow-lg"
                />
            </div>
            <div className="flex-1 space-y-4">
                <h1 className="text-3xl font-bold">{product.title}</h1>
                <p className="text-gray-500">Category: <span className="text-gray-800">{product.category}</span></p>
                <p className="text-gray-500">Available Quantity: <span className="text-gray-800">{product.rating.count}</span></p>
                <p className="text-xl font-bold">$ {product.price}</p>
                <p className="text-gray-700">{product.description}</p>

                {/* Order / Booking Button */}
                {(currentUser.role === "customer" && currentUser.accountStatus === "active") ? (
                    <button
                        onClick={handleBooking}
                        className="mt-4 w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition-colors"
                    >
                        Book / Order Now
                    </button>
                ) : (
                    <button
                        disabled
                        className="mt-4 w-full bg-gray-400 text-white py-2 rounded cursor-not-allowed"
                    >
                        Cannot Book
                    </button>
                )}
            </div>
        </div>
    );
};

export default ProductDetails;
