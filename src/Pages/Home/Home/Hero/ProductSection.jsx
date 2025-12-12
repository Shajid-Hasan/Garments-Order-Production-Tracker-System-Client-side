import React, { useEffect, useState } from "react";

const ProductSection = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch("")
            .then(res => res.json())
            .then(data => setProducts(data));
    }, []);

    return (
        <div className="container mx-auto py-16 px-6">
            <h2 className="text-3xl font-bold mb-6 text-center">Our Products</h2>

            <div className="grid md:grid-cols-3 gap-8 mt-8">
                {products.map(product => (
                    <ProductCard key={product._id} product={product} />
                ))}
            </div>
        </div>
    );
};

export default ProductSection;
