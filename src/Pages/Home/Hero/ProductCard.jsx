import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

const AllProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        fetch("http://localhost:3000/products")
            .then(res => res.json())
            .then(data => {
                setProducts(data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center mt-10">
                <p className="text-xl font-semibold">Loading products...</p>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto p-5">
            <h2 className="text-3xl font-bold mb-5 text-center">
                All Products
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map(product => {
                    const image = product.images?.length
                        ? product.images[0]
                        : "https://via.placeholder.com/300x300?text=No+Image";

                    return (
                        <div
                            key={product._id}
                            className="card bg-base-100 shadow-lg border rounded-lg"
                        >
                            <figure className="px-4 pt-4">
                                <img
                                    src={image}
                                    alt={product.title}
                                    className="h-48 w-full object-contain"
                                />
                            </figure>

                            <div className="card-body">
                                <h3 className="card-title text-lg font-semibold">
                                    {product.title}
                                </h3>

                                <p className="text-sm text-gray-500">
                                    Category: {product.category}
                                </p>

                                <p className="text-lg font-bold mt-2">
                                    ৳ {product.price}
                                </p>

                                <p className="text-sm text-gray-500">
                                    Available Quantity: {product.quantity}
                                </p>

                                <div className="card-actions mt-4">
                                    <button
                                        className="btn btn-primary w-full"
                                        onClick={() =>
                                            navigate(`/products/${product._id}`)
                                        }
                                    >
                                        View Details
                                    </button>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default AllProducts;
