import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import useAuth from "../../../../Hooks/useAuth";
import { motion } from "framer-motion";

const AddProduct = () => {
    const { user } = useAuth();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const [imagePreviews, setImagePreviews] = useState([]);

    // 🔹 Image Preview Handler
    const handleImagePreview = (e) => {
        const urls = e.target.value
            .split(",")
            .map((url) => url.trim())
            .filter(Boolean);
        setImagePreviews(urls);
    };

    // 🔹 Submit Handler
    const onSubmit = async (data) => {
        if (Number(data.minOrderQty) > Number(data.quantity)) {
            return toast.error("MOQ cannot be greater than available quantity");
        }

        const product = {
            title: data.title,
            name: data.name,
            description: data.description,
            category: data.category,
            price: Number(data.price), // ✅ USD price
            quantity: Number(data.quantity),
            minOrderQty: Number(data.minOrderQty),
            images: data.images.split(",").map(img => img.trim()),
            video: data.video || "",
            paymentMode: data.paymentMode,
            showOnHome: data.showOnHome || false,
            createdBy: user.email,
            createdAt: new Date(),
        };

        try {
            const res = await axios.post(
                "https://garments-server-side.vercel.app/products",
                product
            );

            if (res.data.insertedId) {
                toast.success("✅ Product added successfully!");
                reset();
                setImagePreviews([]);
            }
        } catch (error) {
            toast.error("❌ Failed to add product");
        }
    };

    return (
        <motion.div
            className="max-w-4xl mx-auto bg-base-100 p-6 rounded-xl shadow-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <h2 className="text-2xl font-bold mb-6 text-center text-primary animate-pulse">
                ➕ Add New Product
            </h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

                {/* Product Title */}
                <motion.div whileFocus={{ scale: 1.02 }}>
                    <input
                        {...register("title", { required: true })}
                        placeholder="Product Title"
                        className="input input-bordered w-full shadow-sm focus:scale-105 transition-transform duration-200"
                    />
                    {errors.title && (
                        <p className="text-red-500 text-sm mt-1">Product title is required</p>
                    )}
                </motion.div>

                {/* Product Name */}
                <motion.div whileFocus={{ scale: 1.02 }}>
                    <input
                        {...register("name", { required: true })}
                        placeholder="Product Name"
                        className="input input-bordered w-full shadow-sm focus:scale-105 transition-transform duration-200"
                    />
                </motion.div>

                {/* Description */}
                <motion.div whileFocus={{ scale: 1.02 }}>
                    <textarea
                        {...register("description", { required: true })}
                        placeholder="Product Description"
                        className="textarea textarea-bordered w-full shadow-sm focus:scale-105 transition-transform duration-200"
                    />
                </motion.div>

                {/* Category */}
                <motion.div whileFocus={{ scale: 1.02 }}>
                    <select
                        {...register("category", { required: true })}
                        className="select select-bordered w-full shadow-sm focus:scale-105 transition-transform duration-200"
                    >
                        <option value="">Select Category</option>
                        <option>Shirt</option>
                        <option>Pant</option>
                        <option>Jacket</option>
                        <option>Accessories</option>
                        <option>T-Shirt</option>
                    </select>
                </motion.div>

                {/* Price */}
                <motion.div className="relative" whileFocus={{ scale: 1.02 }}>
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-semibold">
                        $
                    </span>
                    <input
                        type="number"
                        step="0.01"
                        {...register("price", { required: true })}
                        placeholder="Price in USD"
                        className="input input-bordered w-full pl-8 shadow-sm focus:scale-105 transition-transform duration-200"
                    />
                </motion.div>

                {/* Quantity & MOQ */}
                <div className="grid grid-cols-2 gap-4">
                    <motion.input
                        type="number"
                        {...register("quantity", { required: true })}
                        placeholder="Available Quantity"
                        className="input input-bordered w-full shadow-sm focus:scale-105 transition-transform duration-200"
                    />
                    <motion.input
                        type="number"
                        {...register("minOrderQty", { required: true })}
                        placeholder="Minimum Order Quantity (MOQ)"
                        className="input input-bordered w-full shadow-sm focus:scale-105 transition-transform duration-200"
                    />
                </div>

                {/* Images */}
                <motion.div whileFocus={{ scale: 1.02 }}>
                    <input
                        {...register("images", { required: true })}
                        placeholder="Image URLs (comma separated)"
                        onChange={handleImagePreview}
                        className="input input-bordered w-full shadow-sm focus:scale-105 transition-transform duration-200"
                    />
                </motion.div>

                {imagePreviews.length > 0 && (
                    <div className="flex gap-2 mt-2 flex-wrap animate-fadeIn">
                        {imagePreviews.map((img, i) => (
                            <motion.img
                                key={i}
                                src={img}
                                alt="preview"
                                className="w-24 h-24 object-cover rounded border shadow-sm"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: i * 0.1 }}
                            />
                        ))}
                    </div>
                )}

                {/* Video */}
                <motion.input
                    {...register("video")}
                    placeholder="Demo Video Link (optional)"
                    className="input input-bordered w-full shadow-sm focus:scale-105 transition-transform duration-200"
                />

                {/* Payment Mode */}
                <motion.select
                    {...register("paymentMode", { required: true })}
                    className="select select-bordered w-full shadow-sm focus:scale-105 transition-transform duration-200"
                >
                    <option value="">Select Payment Mode</option>
                    <option value="Cash on Delivery">Cash on Delivery</option>
                    <option value="PayFirst">Pay First</option>
                </motion.select>

                {/* Show on Home */}
                <label className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        {...register("showOnHome")}
                        className="checkbox checkbox-sm"
                    />
                    Show on Home Page
                </label>

                {/* Submit */}
                <motion.button
                    type="submit"
                    className="btn btn-primary w-full text-lg font-semibold shadow-lg hover:scale-105 transition-transform duration-200"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                >
                    Add Product
                </motion.button>
            </form>
        </motion.div>
    );
};

export default AddProduct;
