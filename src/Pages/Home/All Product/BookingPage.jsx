import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import axios from "axios";

const currentUser = {
    role: "customer",
    accountStatus: "active",
    email: "customer@example.com"
};

const BookingPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
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
        paymentMethod: "cod", // "cod" or "online"
    });

    useEffect(() => {
        axios.get(`http://localhost:3000/products/${id}`)
            .then(res => setProduct(res.data))
            .catch(err => setError(err.message))
            .finally(() => setLoading(false));
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === "quantity") {
            const qty = parseInt(value);
            if (qty > product.rating.count) return; // max quantity
            if (qty < 1) return; // min quantity
            setFormData(prev => ({ ...prev, [name]: qty }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const orderData = {
            email: currentUser.email,
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
            status: "pending"
        };

        try {
            // Save booking
            await axios.post("http://localhost:3000/orders", orderData);

            // Conditional payment
            if (formData.paymentMethod === "online") {
                // Redirect to a payment page (Stripe, PayFast, etc.)
                navigate(`/payment/${product.id}`);
            } else {
                // Cash on Delivery, redirect to My Orders
                alert("Booking successful! Check your orders.");
                navigate("/dashboard/my-orders");
            }
        } catch (err) {
            console.error("Booking failed:", err);
            alert("Failed to place the booking.");
        }
    };

    if (loading) return <p className="text-center mt-10">Loading...</p>;
    if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;
    if (!product) return <p className="text-center mt-10">Product not found!</p>;

    return (
        <div className="max-w-2xl mx-auto p-6">
            <h2 className="text-2xl font-bold mb-4">Book / Order {product.title}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">

                {/* Read-only fields */}
                <div>
                    <label>Email</label>
                    <input type="email" value={currentUser.email} readOnly className="border rounded p-2 w-full bg-gray-100" />
                </div>
                <div>
                    <label>Product Title</label>
                    <input type="text" value={product.title} readOnly className="border rounded p-2 w-full bg-gray-100" />
                </div>
                <div>
                    <label>Unit Price ($)</label>
                    <input type="number" value={product.price} readOnly className="border rounded p-2 w-full bg-gray-100" />
                </div>

                {/* User input */}
                <div>
                    <label>First Name</label>
                    <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} className="border rounded p-2 w-full" required />
                </div>
                <div>
                    <label>Last Name</label>
                    <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} className="border rounded p-2 w-full" required />
                </div>
                <div>
                    <label>Order Quantity</label>
                    <input type="number" name="quantity" value={formData.quantity} onChange={handleChange} min={1} max={product.rating.count} className="border rounded p-2 w-full" required />
                </div>
                <div>
                    <label>Order Price ($)</label>
                    <input type="number" value={formData.quantity * product.price} readOnly className="border rounded p-2 w-full bg-gray-100" />
                </div>
                <div>
                    <label>Contact Number</label>
                    <input type="text" name="contactNumber" value={formData.contactNumber} onChange={handleChange} className="border rounded p-2 w-full" required />
                </div>
                <div>
                    <label>Delivery Address</label>
                    <textarea name="deliveryAddress" value={formData.deliveryAddress} onChange={handleChange} className="border rounded p-2 w-full" required />
                </div>
                <div>
                    <label>Additional Notes / Instructions</label>
                    <textarea name="additionalNotes" value={formData.additionalNotes} onChange={handleChange} className="border rounded p-2 w-full" />
                </div>

                {/* Payment Option */}
                <div>
                    <label>Payment Method</label>
                    <select name="paymentMethod" value={formData.paymentMethod} onChange={handleChange} className="border rounded p-2 w-full">
                        <option value="cod">Cash on Delivery</option>
                        <option value="online">Online Payment</option>
                    </select>
                </div>

                <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors">
                    Submit Booking
                </button>
            </form>
        </div>
    );
};

export default BookingPage;
