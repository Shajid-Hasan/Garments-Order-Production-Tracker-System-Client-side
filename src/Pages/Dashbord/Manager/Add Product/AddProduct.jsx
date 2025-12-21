import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import useAuth from "../../../../Hooks/useAuth";
import { motion } from "framer-motion";
import {
    FaTag,
    FaBox,
    FaAlignLeft,
    FaListAlt,
    FaDollarSign,
    FaWarehouse,
    FaSortAmountUp,
    FaImage,
    FaVideo,
    FaMoneyBillWave,
    FaCheckCircle,
    FaPlusCircle
} from "react-icons/fa";

const AddProduct = () => {
    const { user } = useAuth();
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const [imagePreviews, setImagePreviews] = useState([]);

    // Image Preview
    const handleImagePreview = (e) => {
        const urls = e.target.value
            .split(",")
            .map(url => url.trim())
            .filter(Boolean);
        setImagePreviews(urls);
    };

    // Submit
    const onSubmit = async (data) => {
        if (Number(data.minOrderQty) > Number(data.quantity)) {
            return toast.error("MOQ cannot be greater than available quantity");
        }

        const product = {
            title: data.title,
            name: data.name,
            description: data.description,
            category: data.category,
            price: Number(data.price),
            quantity: Number(data.quantity),
            minOrderQty: Number(data.minOrderQty),
            images: data.images.split(",").map(img => img.trim()),
            video: data.video || "",
            paymentMode: data.paymentMode,
            showOnHome: data.showOnHome || false,
            createdBy: user?.email,
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
        } catch {
            toast.error("❌ Failed to add product");
        }
    };

    return (
        <motion.div
            className="max-w-full md:max-w-3xl lg:max-w-4xl mx-auto bg-base-100 p-4 md:p-6 rounded-xl shadow-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
        >
            <h2 className="text-xl md:text-2xl font-bold mb-6 text-center text-primary">
                <FaPlusCircle className="inline mr-2" /> Add New Product
            </h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

                {/* Title */}
                <div className="relative">
                    <FaTag className="absolute left-3 top-3 text-gray-400" />
                    <input
                        {...register("title", { required: true })}
                        placeholder="Product Title"
                        className="input input-bordered w-full pl-10"
                    />
                </div>

                {/* Name */}
                <div className="relative">
                    <FaBox className="absolute left-3 top-3 text-gray-400" />
                    <input
                        {...register("name", { required: true })}
                        placeholder="Product Name"
                        className="input input-bordered w-full pl-10"
                    />
                </div>

                {/* Description */}
                <div className="relative">
                    <FaAlignLeft className="absolute left-3 top-4 text-gray-400" />
                    <textarea
                        {...register("description", { required: true })}
                        placeholder="Product Description"
                        className="textarea textarea-bordered w-full pl-10"
                    />
                </div>

                {/* Category */}
                <div className="relative">
                    <FaListAlt className="absolute left-3 top-3 text-gray-400" />
                    <select
                        {...register("category", { required: true })}
                        className="select select-bordered w-full pl-10"
                    >
                        <option value="">Select Category</option>
                        <option>Shirt</option>
                        <option>Pant</option>
                        <option>Jacket</option>
                        <option>Accessories</option>
                        <option>T-Shirt</option>
                    </select>
                </div>

                {/* Price */}
                <div className="relative">
                    <FaDollarSign className="absolute left-3 top-3 text-gray-400" />
                    <input
                        type="number"
                        step="0.01"
                        {...register("price", { required: true })}
                        placeholder="Price (USD)"
                        className="input input-bordered w-full pl-10"
                    />
                </div>

                {/* Quantity & MOQ */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="relative">
                        <FaWarehouse className="absolute left-3 top-3 text-gray-400" />
                        <input
                            type="number"
                            {...register("quantity", { required: true })}
                            placeholder="Available Quantity"
                            className="input input-bordered w-full pl-10"
                        />
                    </div>

                    <div className="relative">
                        <FaSortAmountUp className="absolute left-3 top-3 text-gray-400" />
                        <input
                            type="number"
                            {...register("minOrderQty", { required: true })}
                            placeholder="Minimum Order Quantity"
                            className="input input-bordered w-full pl-10"
                        />
                    </div>
                </div>

                {/* Images */}
                <div className="relative">
                    <FaImage className="absolute left-3 top-3 text-gray-400" />
                    <input
                        {...register("images", { required: true })}
                        placeholder="Image URLs (comma separated)"
                        onChange={handleImagePreview}
                        className="input input-bordered w-full pl-10"
                    />
                </div>

                {/* Image Preview */}
                {imagePreviews.length > 0 && (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                        {imagePreviews.map((img, i) => (
                            <img
                                key={i}
                                src={img}
                                alt="preview"
                                className="w-full h-24 object-cover rounded border"
                            />
                        ))}
                    </div>
                )}

                {/* Video */}
                <div className="relative">
                    <FaVideo className="absolute left-3 top-3 text-gray-400" />
                    <input
                        {...register("video")}
                        placeholder="Demo Video Link (optional)"
                        className="input input-bordered w-full pl-10"
                    />
                </div>

                {/* Payment */}
                <div className="relative">
                    <FaMoneyBillWave className="absolute left-3 top-3 text-gray-400" />
                    <select
                        {...register("paymentMode", { required: true })}
                        className="select select-bordered w-full pl-10"
                    >
                        <option value="">Select Payment Mode</option>
                        <option value="Cash on Delivery">Cash on Delivery</option>
                        <option value="PayFirst">Pay First</option>
                    </select>
                </div>

                {/* Show on Home */}
                <label className="flex items-center gap-2">
                    <FaCheckCircle className="text-green-500" />
                    <input type="checkbox" {...register("showOnHome")} className="checkbox checkbox-sm" />
                    Show on Home Page
                </label>

                {/* Submit */}
                <button className="btn btn-primary w-full text-lg">
                    <FaPlusCircle className="mr-2" />
                    Add Product
                </button>
            </form>
        </motion.div>
    );
};

export default AddProduct;
