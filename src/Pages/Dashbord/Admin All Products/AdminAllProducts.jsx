import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const AdminAllProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedProduct, setSelectedProduct] = useState(null);

    // FETCH PRODUCTS
    
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await axios.get(
                    "https://garments-server-side.vercel.app/products"
                );
                console.log(res.data)
                setProducts(res.data);
                setLoading(false);
            } catch (error) {
                toast.error("Failed to load products");
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    // SHOW ON HOME TOGGLE
    const handleShowOnHome = async (id, value) => {
        await axios.patch(
            `https://garments-server-side.vercel.app/products/${id}`,
            { showOnHome: value }
        );
        toast.success("Home page visibility updated");
        // fetchProducts();
    };

    // DELETE PRODUCT
    const handleDelete = async (id) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this product?"
        );
        if (!confirmDelete) return;

        await axios.delete(
            `https://garments-server-side.vercel.app/products/${id}`
        );
        toast.success("Product deleted successfully");
        // fetchProducts();
    };

    // UPDATE PRODUCT
    const handleUpdateProduct = async () => {
        try {
            await axios.patch(
                `https://garments-server-side.vercel.app/products/${selectedProduct._id}`,
                selectedProduct
            );
            toast.success("Product updated successfully");
            setSelectedProduct(null);
            // fetchProducts();
        } catch (error) {
            toast.error("Failed to update product");
        }
    };

    if (loading) {
        return (
            <p className="text-center mt-10">
                Loading products...
            </p>
        );
    }

    return (
        <div className="p-4 md:p-6">
            <h2 className="text-2xl font-bold mb-6">
                All Products (Admin)
            </h2>

            {/* ================= MOBILE CARD VIEW ================= */}
            <div className="space-y-4 sm:hidden">
                {products.map((product) => (
                    <div
                        key={product._id}
                        className="bg-white rounded-xl shadow p-4 space-y-2"
                    >
                        <div className="flex gap-3">
                            <img
                                src={product.images[0]}
                                alt={product.title}
                                className="w-20 h-20 rounded object-cover"
                            />
                            <div>
                                <h3 className="font-semibold">
                                    {product.title}
                                </h3>
                                <p className="text-sm text-gray-600">
                                    ${product.price}
                                </p>
                                <p className="text-xs text-gray-500">
                                    {product.category}
                                </p>
                            </div>
                        </div>

                        <p className="text-sm">
                            <b>Created By:</b>{" "}
                            {product.createdBy || "Admin"}
                        </p>

                        <div className="flex items-center gap-2">
                            <span className="text-sm">
                                Show on Home
                            </span>
                            <input
                                type="checkbox"
                                className="toggle toggle-success"
                                checked={product.showOnHome || false}
                                onChange={(e) =>
                                    handleShowOnHome(
                                        product._id,
                                        e.target.checked
                                    )
                                }
                            />
                        </div>

                        <div className="flex gap-2 pt-2">
                            <button
                                className="flex-1 bg-blue-600 text-white py-2 rounded"
                                onClick={() =>
                                    setSelectedProduct(product)
                                }
                            >
                                Update
                            </button>

                            <button
                                className="flex-1 bg-red-600 text-white py-2 rounded"
                                onClick={() =>
                                    handleDelete(product._id)
                                }
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* ================= TABLE VIEW (TABLET + LAPTOP) ================= */}
            <div className="hidden sm:block overflow-x-auto">
                <table className="table table-zebra w-full">
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>Product Name</th>
                            <th>Price</th>
                            <th>Category</th>
                            <th>Created By</th>
                            <th>Show on Home</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {products.map((product) => (
                            <tr key={product._id}>
                                <td>
                                    <img
                                        src={product.images[0]}
                                        alt={product.title}
                                        className="w-14 h-14 object-cover rounded"
                                    />
                                </td>

                                <td>{product.title}</td>
                                <td>${product.price}</td>
                                <td>{product.category}</td>
                                <td>{product.createdBy || "Admin"}</td>

                                <td>
                                    <input
                                        type="checkbox"
                                        className="toggle toggle-success"
                                        checked={
                                            product.showOnHome || false
                                        }
                                        onChange={(e) =>
                                            handleShowOnHome(
                                                product._id,
                                                e.target.checked
                                            )
                                        }
                                    />
                                </td>

                                <td className="space-x-2">
                                    <button
                                        className="btn btn-xs btn-info"
                                        onClick={() =>
                                            setSelectedProduct(product)
                                        }
                                    >
                                        Update
                                    </button>

                                    <button
                                        className="btn btn-xs btn-error"
                                        onClick={() =>
                                            handleDelete(product._id)
                                        }
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* ================= UPDATE MODAL ================= */}
            {selectedProduct && (
                <dialog open className="modal">
                    <div className="modal-box max-w-xl">
                        <h3 className="font-bold text-lg mb-4">
                            Update Product
                        </h3>

                        <input
                            type="text"
                            className="input input-bordered w-full mb-2"
                            value={selectedProduct.title}
                            placeholder="Product Name"
                            onChange={(e) =>
                                setSelectedProduct({
                                    ...selectedProduct,
                                    title: e.target.value,
                                })
                            }
                        />

                        <textarea
                            className="textarea textarea-bordered w-full mb-2"
                            value={
                                selectedProduct.description || ""
                            }
                            placeholder="Description"
                            onChange={(e) =>
                                setSelectedProduct({
                                    ...selectedProduct,
                                    description: e.target.value,
                                })
                            }
                        />

                        <input
                            type="number"
                            className="input input-bordered w-full mb-2"
                            value={selectedProduct.price}
                            placeholder="Price"
                            onChange={(e) =>
                                setSelectedProduct({
                                    ...selectedProduct,
                                    price: Number(e.target.value),
                                })
                            }
                        />

                        <input
                            type="text"
                            className="input input-bordered w-full mb-2"
                            value={selectedProduct.category}
                            placeholder="Category"
                            onChange={(e) =>
                                setSelectedProduct({
                                    ...selectedProduct,
                                    category: e.target.value,
                                })
                            }
                        />

                        <input
                            type="text"
                            className="input input-bordered w-full mb-2"
                            value={selectedProduct.image}
                            placeholder="Image URL"
                            onChange={(e) =>
                                setSelectedProduct({
                                    ...selectedProduct,
                                    image: e.target.value,
                                })
                            }
                        />

                        <input
                            type="text"
                            className="input input-bordered w-full mb-2"
                            value={
                                selectedProduct.demoVideo || ""
                            }
                            placeholder="Demo Video URL"
                            onChange={(e) =>
                                setSelectedProduct({
                                    ...selectedProduct,
                                    demoVideo: e.target.value,
                                })
                            }
                        />

                        <input
                            type="text"
                            className="input input-bordered w-full mb-4"
                            value={
                                selectedProduct.paymentOptions || ""
                            }
                            placeholder="Payment Options"
                            onChange={(e) =>
                                setSelectedProduct({
                                    ...selectedProduct,
                                    paymentOptions: e.target.value,
                                })
                            }
                        />

                        <div className="modal-action">
                            <button
                                className="btn btn-success"
                                onClick={handleUpdateProduct}
                            >
                                Save Changes
                            </button>

                            <button
                                className="btn"
                                onClick={() =>
                                    setSelectedProduct(null)
                                }
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </dialog>
            )}
        </div>
    );
};

export default AdminAllProducts;
