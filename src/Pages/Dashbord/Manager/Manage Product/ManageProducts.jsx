import { useEffect, useState } from "react";
import { Link } from "react-router";
import useAuth from "../../../../Hooks/useAuth";
import useAxiosSecure from "../../../../Hooks/useAxios";
import { FaTrashAlt, FaBoxOpen } from "react-icons/fa";

const ManageProducts = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [productToDelete, setProductToDelete] = useState(null);

    // ================= FETCH MANAGER PRODUCTS =================
    useEffect(() => {
        if (!user?.email) return;

        axiosSecure
            .get(`/products/manager?email=${user.email}`)
            .then(res => setProducts(res.data))
            .catch(err => console.error(err))
            .finally(() => setLoading(false));
    }, [user?.email, axiosSecure]);

    // ================= DELETE PRODUCT =================
    const handleDeleteClick = (product) => {
        setProductToDelete(product);
        setShowDeleteModal(true);
    };

    const confirmDelete = async () => {
        if (!productToDelete) return;

        try {
            await axiosSecure.delete(`/products/${productToDelete._id}`);
            setProducts(products.filter(p => p._id !== productToDelete._id));
            setShowDeleteModal(false);
            setProductToDelete(null);
        } catch (error) {
            console.error(error);
            alert("Failed to delete product");
        }
    };

    // ================= SEARCH FILTER =================
    const filteredProducts = products.filter(p =>
        p.name?.toLowerCase().includes(search.toLowerCase()) ||
        p.category?.toLowerCase().includes(search.toLowerCase())
    );

    if (loading) return <p className="text-center mt-10">Loading products...</p>;

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-6">🛠️ Manage Products</h2>

            {/* ================= SEARCH INPUT ================= */}
            <input
                type="text"
                placeholder="Search by product name or category..."
                className="input input-bordered w-full max-w-md mb-6"
                value={search}
                onChange={e => setSearch(e.target.value)}
            />

            {/* ================= PRODUCTS TABLE ================= */}
            <div className="overflow-x-auto">
                <table className="table table-zebra w-full table-fixed border rounded-lg shadow-md">
                    <thead className="bg-base-200">
                        <tr>
                            <th className="w-[15%]">Image</th>
                            <th className="w-[30%]">Name</th>
                            <th className="w-[15%]">Price</th>
                            <th className="w-[20%]">Payment Mode</th>
                            <th className="w-[20%]">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {filteredProducts.length === 0 && (
                            <tr>
                                <td colSpan="5" className="text-center text-gray-500">
                                    No products found
                                </td>
                            </tr>
                        )}

                        {filteredProducts.map(product => (
                            <tr key={product._id} className="hover:bg-base-100 transition-all">
                                <td>
                                    <img
                                        src={product.images?.[0] || ""}
                                        alt={product.name}
                                        className="w-14 h-14 rounded object-cover"
                                    />
                                </td>

                                <td className="flex items-center gap-2">
                                    <FaBoxOpen className="text-primary" />
                                    {product.name}
                                </td>

                                <td>$ {product.price}</td>

                                <td>
                                    {product.paymentMode || product.payment || product.paymentType || "N/A"}
                                </td>

                                <td className="flex gap-2">
                                    {/* ================= UPDATE BUTTON ================= */}
                                    <Link
                                        to={`/dashboard/update-product/${product._id}`}
                                        className="btn btn-xs btn-info"
                                    >
                                        Update
                                    </Link>

                                    {/* ================= DELETE BUTTON ================= */}
                                    <button
                                        onClick={() => handleDeleteClick(product)}
                                        className="btn btn-xs btn-error flex items-center gap-1"
                                    >
                                        <FaTrashAlt /> Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* ================= DELETE CONFIRM MODAL ================= */}
            {showDeleteModal && productToDelete && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg w-[380px]">
                        <h3 className="text-lg font-bold mb-3">Confirm Delete</h3>
                        <p className="text-sm text-gray-600 mb-4">
                            Are you sure you want to delete <b>{productToDelete.name}</b>?
                        </p>
                        <div className="flex justify-end gap-3">
                            <button
                                onClick={() => {
                                    setShowDeleteModal(false);
                                    setProductToDelete(null);
                                }}
                                className="px-4 py-2 border rounded"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={confirmDelete}
                                className="px-4 py-2 bg-red-600 text-white rounded"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManageProducts;
