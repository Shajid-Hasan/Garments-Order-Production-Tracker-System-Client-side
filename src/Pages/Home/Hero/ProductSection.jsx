import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";

const ProductSection = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("http://localhost:3000/products")
            .then(res => res.json())
            .then(data => {
                setProducts(data); // ✅ show ALL products
                setLoading(false);
            })
            .catch(err => {
                console.error("Failed to load products", err);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (
            <div className="text-center py-16">
                <p className="text-lg font-semibold">Loading products...</p>
            </div>
        );
    }

    return (
        <section className="container mx-auto py-16 px-6">
            <h2 className="text-3xl font-bold text-center mb-10">
                Our Products
            </h2>

            {products.length === 0 ? (
                <p className="text-center text-gray-500">
                    No products available
                </p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
