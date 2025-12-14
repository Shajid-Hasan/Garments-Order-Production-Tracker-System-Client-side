import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";

const ProductSection = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3000/products")
            .then(res => res.json())
            .then(data => {
                setProducts(data.slice(0, 6)); // limit 6
            });
    }, []);

    return (
        <section className="container mx-auto py-16 px-6">
            <h2 className="text-3xl font-bold text-center mb-10">
                Our Products
            </h2>

            <div className="grid md:grid-cols-3 gap-8">
                {products.map(product => (
                    <ProductCard key={product._id} product={product} />
                ))}
            </div>
        </section>
    );
};

export default ProductSection;
