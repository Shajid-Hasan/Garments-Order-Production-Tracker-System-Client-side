import { useEffect, useState } from "react";
import useAuth from "../../../../Hooks/useAuth";
import useAxiosSecure from "../../../../Hooks/useAxios";
import { FaTrashAlt, FaBoxOpen } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const ManageProducts = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [productToDelete, setProductToDelete] = useState(null);

    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [productToUpdate, setProductToUpdate] = useState(null);

    console.log()

    // ================= FETCH PRODUCTS =================
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

    // ================= UPDATE PRODUCT =================
    const handleUpdateClick = (product) => {
        setProductToUpdate(product);
        setShowUpdateModal(true);
    };

    const confirmUpdate = async () => {
        if (!productToUpdate) return;
        try {
            const updatedProduct = { ...productToUpdate };
            await axiosSecure.patch(`/products/${productToUpdate._id}`, updatedProduct);
            setProducts(products.map(p => (p._id === productToUpdate._id ? updatedProduct : p)));
            setShowUpdateModal(false);
            setProductToUpdate(null);
        } catch (error) {
            console.error(error);
            alert("Failed to update product");
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
                <table className="table w-full table-fixed border-collapse border-spacing-2 shadow-lg rounded-lg">
                    <thead className="bg-base-200">
                        <tr>
                            <th className="w-[15%]">Image</th>
                            <th className="w-[25%]">Name</th>
                            <th className="w-[15%]">Price</th>
                            <th className="w-[20%]">Payment</th>
                            <th className="w-[25%]">Actions</th>
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
                                <td>{product.paymentMode || product.payment || "N/A"}</td>

                                <td className="flex gap-2">
                                    <button
                                        onClick={() => handleUpdateClick(product)}
                                        className="btn btn-xs btn-info"
                                    >
                                        Update
                                    </button>
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

            {/* ================= DELETE MODAL ================= */}
            <AnimatePresence>
                {showDeleteModal && productToDelete && (
                    <motion.div
                        className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <motion.div
                            className="bg-white p-6 rounded-lg w-[380px] shadow-lg"
                            initial={{ scale: 0.8 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0.8 }}
                        >
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
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* ================= UPDATE MODAL ================= */}
            <AnimatePresence>
                {showUpdateModal && productToUpdate && (
                    <motion.div
                        className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <motion.div
                            className="bg-white p-6 rounded-lg w-[400px] shadow-2xl"
                            initial={{ scale: 0.8 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0.8 }}
                        >
                            <h3 className="text-lg font-bold mb-3">Update Product</h3>
                            <input
                                type="text"
                                placeholder="Product Name"
                                className="input input-bordered w-full mb-3"
                                value={productToUpdate.name}
                                onChange={e =>
                                    setProductToUpdate({ ...productToUpdate, name: e.target.value })
                                }
                            />
                            <input
                                type="number"
                                placeholder="Price"
                                className="input input-bordered w-full mb-3"
                                value={productToUpdate.price}
                                onChange={e =>
                                    setProductToUpdate({ ...productToUpdate, price: parseFloat(e.target.value) })
                                }
                            />
                            <input
                                type="text"
                                placeholder="Payment Mode"
                                className="input input-bordered w-full mb-3"
                                value={productToUpdate.paymentMode || ""}
                                onChange={e =>
                                    setProductToUpdate({ ...productToUpdate, paymentMode: e.target.value })
                                }
                            />

                            <div className="flex justify-end gap-3 mt-3">
                                <button
                                    onClick={() => {
                                        setShowUpdateModal(false);
                                        setProductToUpdate(null);
                                    }}
                                    className="px-4 py-2 border rounded"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={confirmUpdate}
                                    className="px-4 py-2 bg-green-600 text-white rounded"
                                >
                                    Save
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ManageProducts;
