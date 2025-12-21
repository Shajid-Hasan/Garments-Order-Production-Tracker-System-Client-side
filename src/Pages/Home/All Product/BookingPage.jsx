import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import Swal from "sweetalert2";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxios";
import useUserRole from "../../../Hooks/useUserRole";

const BookingPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const { user, loading: authLoading } = useAuth();
    const { role, roleLoading } = useUserRole();
    const axiosSecure = useAxiosSecure();

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        quantity: 1,
        contactNumber: "",
        deliveryAddress: "",
        additionalNotes: "",
        paymentMethod: "cod",
    });

    // ================= Redirect if not logged in =================
    useEffect(() => {
        if (!authLoading && !user) {
            navigate("/login");
        }
    }, [user, authLoading, navigate]);

    // ================= Fetch Product =================
    useEffect(() => {
        if (!id) return;

        axiosSecure
            .get(`/products/${id}`)
            .then(res => {
                setProduct(res.data);
                setFormData(prev => ({
                    ...prev,
                    quantity: res.data.minOrderQty || 1,
                }));
            })
            .catch(() => setError("Failed to load product"))
            .finally(() => setLoading(false));
    }, [id, axiosSecure]);

    // ================= Handle Input Change =================
    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === "quantity") {
            const qty = Number(value);
            if (qty < product.minOrderQty || qty > product.quantity) return;
            setFormData(prev => ({ ...prev, quantity: qty }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    // ================= Submit Booking =================
    const handleSubmit = async (e) => {
        e.preventDefault();

        //  FINAL ROLE CHECK
        if (role !== "buyer") {
            Swal.fire({
                icon: "error",
                title: "Booking Not Allowed",
                text: "only buyer can booking",
            });
            return;
        }

        const confirm = await Swal.fire({
            title: "Confirm Order",
            html: `
                <p><b>Product:</b> ${product.name}</p>
                <p><b>Quantity:</b> ${formData.quantity}</p>
                <p><b>Total Price:</b> $${(formData.quantity * product.price).toFixed(2)}</p>
            `,
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Place Order",
        });

        if (!confirm.isConfirmed) return;

        const bookingData = {
            userEmail: user.email,
            productId: product._id,
            productName: product.name,
            unitPrice: product.price,
            orderQuantity: formData.quantity,
            orderPrice: product.price * formData.quantity,
            firstName: formData.firstName,
            lastName: formData.lastName,
            contactNumber: formData.contactNumber,
            deliveryAddress: formData.deliveryAddress,
            additionalNotes: formData.additionalNotes,
            paymentMethod: formData.paymentMethod,
        };

        try {
            await axiosSecure.post("/booking", bookingData);

            Swal.fire({
                icon: "success",
                title: "Order Successful",
            });

            navigate("/dashboard/my-orders");
        } catch (err) {
            Swal.fire({
                icon: "error",
                title: "Order Failed",
                text: "Something went wrong",
            });
        }
    };

    // ================= LOADING GUARD (VERY IMPORTANT) =================
    if (loading || authLoading || roleLoading) {
        return <p className="text-center mt-10">Loading...</p>;
    }

    if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;
    if (!product || !user) return null;

    const isBuyer = role === "buyer";

    return (
        <div className="max-w-2xl mx-auto p-6">
            <h2 className="text-2xl font-bold mb-6">
                Order Product: {product.name}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">

                {/* Email */}
                <input
                    value={user.email}
                    readOnly
                    className="input input-bordered w-full bg-gray-100"
                />

                {/* Product */}
                <input
                    value={product.title}
                    readOnly
                    className="input input-bordered w-full bg-gray-100"
                />

                {/* Price */}
                <input
                    value={product.price}
                    readOnly
                    className="input input-bordered w-full bg-gray-100"
                />

                {/* Name */}
                <div className="grid grid-cols-2 gap-4">
                    <input
                        name="firstName"
                        placeholder="First Name"
                        onChange={handleChange}
                        className="input input-bordered"
                        required
                        disabled={!isBuyer}
                    />
                    <input
                        name="lastName"
                        placeholder="Last Name"
                        onChange={handleChange}
                        className="input input-bordered"
                        required
                        disabled={!isBuyer}
                    />
                </div>

                {/* Quantity */}
                <input
                    type="number"
                    name="quantity"
                    value={formData.quantity}
                    min={product.minOrderQty}
                    max={product.quantity}
                    onChange={handleChange}
                    disabled={!isBuyer}
                    className="input input-bordered w-full"
                />

                {/* Total */}
                <input
                    value={formData.quantity * product.price}
                    readOnly
                    className="input input-bordered w-full bg-gray-100"
                />

                {/* Contact */}
                <input
                    name="contactNumber"
                    placeholder="Contact Number"
                    onChange={handleChange}
                    className="input input-bordered w-full"
                    required
                    disabled={!isBuyer}
                />

                {/* Address */}
                <textarea
                    name="deliveryAddress"
                    placeholder="Delivery Address"
                    onChange={handleChange}
                    className="textarea textarea-bordered w-full"
                    required
                    disabled={!isBuyer}
                />
                
                {/* Payment */}
                <select
                    name="paymentMethod"
                    onChange={handleChange}
                    className="select w-full"
                >
                    <option value="cod">Cash on Delivery</option>
                    <option value="online">Online Payment</option>
                </select>

                {/* Button */}
                <button
                    type="submit"
                    disabled={!isBuyer}
                    className="btn btn-primary w-full"
                >
                    {isBuyer ? "Confirm Order" : "Only Buyer Can Book"}
                </button>
            </form>
        </div>
    );
};

export default BookingPage;
