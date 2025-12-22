import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";

const ProductSection = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("https://garments-server-side.vercel.app/products")
            .then(res => res.json())
            .then(data => {
                setProducts(data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Failed to load products", err);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center py-20">
                <p className="text-base sm:text-lg font-semibold">
                    Loading products...
                </p>
            </div>
        );
    }

    return (
        <section className="max-w-7xl mx-auto py-12 sm:py-14 lg:py-16 px-4 sm:px-6 lg:px-8">
            {/* SECTION TITLE */}
            <h2
                className="
                    text-2xl
                    sm:text-3xl
                    lg:text-4xl
                    font-bold
                    text-center
                    mb-8
                    sm:mb-10
                "
            >
                Our Products
            </h2>

            {products.length === 0 ? (
                <p className="text-center text-gray-500 text-sm sm:text-base">
                    No products available
                </p>
            ) : (
                <div
                    className="
                        grid
                        grid-cols-1
                        sm:grid-cols-2
                        lg:grid-cols-3
                        gap-6
                        sm:gap-8
                    "
                >
                    {products.map(product => (
                        <ProductCard
                            key={product._id}
                            product={product}
                        />
                    ))}
                </div>
            )}
        </section>
    );
};

export default ProductSection;
