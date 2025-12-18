import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import useAuth from "../../../../Hooks/useAuth";

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
            name: data.name,
            description: data.description,
            category: data.category,
            price: Number(data.price),
            quantity: Number(data.quantity),
            minOrderQty: Number(data.minOrderQty),
            images: data.images
                .split(",")
                .map((img) => img.trim()),
            video: data.video || "",
            paymentMode: data.paymentMode,
            showOnHome: data.showOnHome || false,
            createdBy: user.email,
            createdAt: new Date(),
        };

        try {
            const res = await axios.post(
                "http://localhost:3000/products",
                product
            );
            if (res.data.insertedId) {
                toast.success(" Product added successfully!");
                reset();
                setImagePreviews([]);
            }
        } catch (error) {
            toast.error("❌ Failed to add product");
        }
    };

    return (
        <div className="max-w-4xl mx-auto bg-base-100 p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">
                ➕ Add New Product
            </h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Product Name */}
                <input
                    {...register("name", { required: true })}
                    placeholder="Product Name"
                    className="input input-bordered w-full"
                />
                {errors.name && (
                    <p className="text-red-500 text-sm">
                        Product name is required
                    </p>
                )}

                {/* Description */}
                <textarea
                    {...register("description", { required: true })}
                    placeholder="Product Description"
                    className="textarea textarea-bordered w-full"
                />
                {errors.description && (
                    <p className="text-red-500 text-sm">
                        Description is required
                    </p>
                )}

                {/* Category */}
                <select
                    {...register("category", { required: true })}
                    className="select select-bordered w-full"
                >
                    <option value="">Select Category</option>
                    <option>Shirt</option>
                    <option>Pant</option>
                    <option>Jacket</option>
                    <option>Accessories</option>
                    <option>T-Shirt</option>
                </select>

                {/* Price */}
                <input
                    type="number"
                    {...register("price", { required: true })}
                    placeholder="Price"
                    className="input input-bordered w-full"
                />

                {/* Quantity */}
                <input
                    type="number"
                    {...register("quantity", { required: true })}
                    placeholder="Available Quantity"
                    className="input input-bordered w-full"
                />

                {/* MOQ */}
                <input
                    type="number"
                    {...register("minOrderQty", { required: true })}
                    placeholder="Minimum Order Quantity (MOQ)"
                    className="input input-bordered w-full"
                />

                {/* Images */}
                <input
                    {...register("images", { required: true })}
                    placeholder="Image URLs (comma separated)"
                    onChange={handleImagePreview}
                    className="input input-bordered w-full"
                />
                {imagePreviews.length > 0 && (
                    <div className="flex gap-2 mt-2 flex-wrap">
                        {imagePreviews.map((img, i) => (
                            <img
                                key={i}
                                src={img}
                                alt="preview"
                                className="w-20 h-20 object-cover rounded border"
                            />
                        ))}
                    </div>
                )}

                {/* Video */}
                <input
                    {...register("video")}
                    placeholder="Demo Video Link (optional)"
                    className="input input-bordered w-full"
                />

                {/* Payment Mode */}
                <select
                    {...register("paymentMode", { required: true })}
                    className="select select-bordered w-full"
                >
                    <option value="">Select Payment Mode</option>
                    <option value="COD">Cash on Delivery</option>
                    <option value="PayFirst">PayFirst</option>
                </select>

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
                <button type="submit" className="btn btn-primary w-full">
                    Add Product
                </button>
            </form>
        </div>
    );
};

export default AddProduct;
