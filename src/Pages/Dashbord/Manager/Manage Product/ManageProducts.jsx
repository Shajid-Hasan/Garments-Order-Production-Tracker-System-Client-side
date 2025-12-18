import { useEffect, useState } from "react";
import { Link } from "react-router";
import useAuth from "../../../../Hooks/useAuth";
// import useAuth from "../../../Hooks/useAuth";

const ManageProducts = () => {
    const { user } = useAuth();
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);

    // ================= FETCH MANAGER PRODUCTS =================
    useEffect(() => {
        if (!user?.email) return;

        fetch(`http://localhost:3000/products/manager?email=${user.email}`)
            .then(res => res.json())
            .then(data => {
                setProducts(data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, [user]);

    // ================= DELETE PRODUCT =================
    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this product?");
        if (!confirmDelete) return;

        const res = await fetch(`http://localhost:3000/products/${id}`, {
            method: "DELETE",
        });

        if (res.ok) {
            setProducts(products.filter(p => p._id !== id));
        }
    };

    // ================= SEARCH FILTER =================
    const filteredProducts = products.filter(product =>
        product.name?.toLowerCase().includes(search.toLowerCase()) ||
        product.category?.toLowerCase().includes(search.toLowerCase())
    );

    if (loading) {
        return <p className="text-center mt-10">Loading...</p>;
    }

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-6">📦 Manage Products</h2>

            {/* ================= SEARCH ================= */}
            <input
                type="text"
                placeholder="Search by name or category..."
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
                                        src={product.images?.[0] || "https://via.placeholder.com/60"}
                                        alt={product.name}
                                        className="w-14 h-14 object-cover rounded"
                                    />
                                </td>
                                <td>{product.name}</td>
                                <td>${product.price}</td>
                                <td>{product.paymentMode}</td>
                                <td className="space-x-2">
                                    <Link
                                        to={`/dashboard/update-product/${product._id}`}
                                        className="btn btn-xs btn-info"
                                    >
                                        Update
                                    </Link>

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
