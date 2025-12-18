import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import useAuth from "../../../Hooks/useAuth";
// import useAxiosSecure from "../../../Hooks/useAxios";
import useAuth from "../../../../Hooks/useAuth";
import useAxiosSecure from "../../../../Hooks/useAxios";
import { Link } from "react-router";

const ManageProducts = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);

    // ================= FETCH MANAGER PRODUCTS =================
    useEffect(() => {
        if (!user?.email) return;

        axiosSecure
            .get(`/products/manager?email=${user.email}`)
            .then(res => {
                setProducts(res.data);
                setLoading(false);
            })
            .catch(() => {
                setLoading(false);
            });
    }, [user?.email, axiosSecure]);

    // ================= DELETE PRODUCT =================
    const handleDelete = async (id) => {
        const confirm = window.confirm("Are you sure you want to delete this product?");
        if (!confirm) return;

        try {
            await axiosSecure.delete(`/products/${id}`);
            setProducts(products.filter(p => p._id !== id));
        } catch (error) {
            console.error(error);
        }
    };

    // ================= SEARCH FILTER =================
    const filteredProducts = products.filter(product =>
        product.name?.toLowerCase().includes(search.toLowerCase()) ||
        product.category?.toLowerCase().includes(search.toLowerCase())
    );

    if (loading) {
        return <p className="text-center mt-10">Loading products...</p>;
    }

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-6">🛠️ Manage Products</h2>

            {/* ================= SEARCH ================= */}
            <input
                type="text"
                placeholder="Search by product name or category..."
                className="input input-bordered w-full max-w-md mb-6"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

            {/* ================= TABLE ================= */}
            <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Payment Mode</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {filteredProducts.map(product => (
                            <tr key={product._id}>
                                <td>
                                    <img
                                        src={product.images?.[0] || product.image}
                                        alt={product.name}
                                        className="w-14 h-14 rounded object-cover"
                                    />
                                </td>
                                <td>{product.name}</td>
                                <td>৳ {product.price}</td>
                                <td>{product.paymentOption}</td>
                                <td className="space-x-2">
                                    {/* UPDATE */}
                                    <Link
                                        to={`/dashboard/update-product/${product._id}`}
                                        className="btn btn-xs btn-info"
                                    >
                                        Update
                                    </Link>

                                    {/* DELETE */}
                                    <button
                                        onClick={() => handleDelete(product._id)}
                                        className="btn btn-xs btn-error"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}

                        {filteredProducts.length === 0 && (
                            <tr>
                                <td colSpan="5" className="text-center text-gray-500">
                                    No products found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageProducts;
