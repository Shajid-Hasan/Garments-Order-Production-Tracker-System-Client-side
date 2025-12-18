import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import Swal from "sweetalert2";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxios";

const BookingPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        quantity: 1,
        contactNumber: "",
        deliveryAddress: "",
        additionalNotes: "",
        paymentMethod: "cod",
    });

    // Fetch product
    useEffect(() => {
        axiosSecure
            .get(`/products/${id}`)
            .then(res => setProduct(res.data))
            .catch(err => setError(err.message))
            .finally(() => setLoading(false));
    }, [id, axiosSecure]);

    // Redirect if not logged in
    useEffect(() => {
        if (!user) {
            navigate("/login", { state: `/products/${id}/booking` });
        }
    }, [user, navigate, id]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === "quantity") {
            const qty = Number(value);
            if (qty < 1 || qty > product.rating.count) return;
            setFormData(prev => ({ ...prev, quantity: qty }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // SweetAlert2 confirmation before submitting
        const result = await Swal.fire({
            title: "Confirm Booking",
            html: `
                <p>Product: <b>${product.title}</b></p>
                <p>Quantity: <b>${formData.quantity}</b></p>
                <p>Total Price: <b>$${(formData.quantity * product.price).toFixed(2)}</b></p>
                <p>Payment Method: <b>${formData.paymentMethod === "cod" ? "Cash on Delivery" : "Online"}</b></p>
            `,
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Yes, Place Order",
            cancelButtonText: "Cancel",
            confirmButtonColor: "#2563eb",
            cancelButtonColor: "#dc2626",
        });

        if (!result.isConfirmed) return; // User cancelled

        const bookingData = {
            userEmail: user.email,
            productId: product.id,
            productTitle: product.title,
            unitPrice: product.price,
            orderQuantity: formData.quantity,
            orderPrice: formData.quantity * product.price,
            firstName: formData.firstName,
            lastName: formData.lastName,
            contactNumber: formData.contactNumber,
            deliveryAddress: formData.deliveryAddress,
            additionalNotes: formData.additionalNotes,
            paymentMethod: formData.paymentMethod,
            status: "pending",
            createdAt: new Date(),
        };

        try {
            await axiosSecure.post("/booking", bookingData);

            if (formData.paymentMethod === "online") {
                navigate(`/payment/${product.id}`);
            } else {
                Swal.fire({
                    icon: "success",
                    title: "Booking Successful!",
                    text: "Your order has been placed successfully.",
                    confirmButtonColor: "#2563eb",
                });
                navigate("/dashboard/my-orders");
            }
        } catch (err) {
            console.error(err);
            Swal.fire({
                icon: "error",
                title: "Booking Failed",
                text: "Something went wrong. Please try again.",
                confirmButtonColor: "#dc2626",
            });
        }
    };

    if (loading) return <p className="text-center mt-10">Loading...</p>;
    if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;
    if (!product) return null;

    return (
        <div className="max-w-2xl mx-auto p-6">
            <h2 className="text-2xl font-bold mb-6">
                Book / Order: {product.title}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">

                {/* Read-only */}
                <input
                    type="email"
                    value={user?.email}
                    readOnly
                    className="input input-bordered w-full bg-gray-100"
                />

                <input
                    type="text"
                    value={product.title}
                    readOnly
                    className="input input-bordered w-full bg-gray-100"
                />

                <input
                    type="number"
                    value={product.price}
                    readOnly
                    className="input input-bordered w-full bg-gray-100"
                />

                <div className="grid grid-cols-2 gap-4">
                    <input
                        name="firstName"
                        placeholder="First Name"
                        value={formData.firstName}
                        onChange={handleChange}
                        className="input input-bordered"
                        required
                    />
                    <input
                        name="lastName"
                        placeholder="Last Name"
                        value={formData.lastName}
                        onChange={handleChange}
                        className="input input-bordered"
                        required
                    />
                </div>

                <input
                    type="number"
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleChange}
                    min={1}
                    max={product.rating.count}
                    className="input input-bordered w-full"
                />

                <input
                    type="number"
                    value={formData.quantity * product.price}
                    readOnly
                    className="input input-bordered w-full bg-gray-100"
                />

                <input
                    name="contactNumber"
                    placeholder="Contact Number"
                    value={formData.contactNumber}
                    onChange={handleChange}
                    className="input input-bordered w-full"
                    required
                />

                <textarea
                    name="deliveryAddress"
                    placeholder="Delivery Address"
                    value={formData.deliveryAddress}
                    onChange={handleChange}
                    className="textarea textarea-bordered w-full"
                    required
                />

                <textarea
                    name="additionalNotes"
                    placeholder="Additional Notes"
                    value={formData.additionalNotes}
                    onChange={handleChange}
                    className="textarea textarea-bordered w-full"
                />

                <select
                    name="paymentMethod"
                    value={formData.paymentMethod}
                    onChange={handleChange}
                    className="select select-bordered w-full"
                >
                    <option value="cod">Cash on Delivery</option>
                    <option value="online">Online Payment</option>
                </select>

                <button className="btn btn-primary w-full">
                    Confirm Booking
                </button>
            </form>
        </div>
    );
};

export default BookingPage;
