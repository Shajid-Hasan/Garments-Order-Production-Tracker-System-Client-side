import { useParams, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";
import useAuth from "../../../../Hooks/useAuth";

// ✅ React Icons
import { FaBoxOpen, FaMapMarkerAlt, FaStickyNote } from "react-icons/fa";
import { MdOutlinePayments } from "react-icons/md";
import { BsCheckCircleFill } from "react-icons/bs";
import { HiOutlineMap } from "react-icons/hi";

// ✅ Google Maps
import { GoogleMap, Marker, LoadScript } from "@react-google-maps/api";

const TrackOrder = () => {
    const { orderId } = useParams();
    const navigate = useNavigate();
    const { user, loading } = useAuth();

    const [tracking, setTracking] = useState([]);
    const [orderInfo, setOrderInfo] = useState(null);
    const [dataLoading, setDataLoading] = useState(true);

    // 🔒 LOGIN GUARD
    useEffect(() => {
        if (!loading && !user) navigate("/login");
    }, [user, loading, navigate]);

    // 📦 FETCH TRACKING DATA
    useEffect(() => {
        if (!orderId) return;

        axios
            .get(`https://garments-server-side.vercel.app/orders/tracking/${orderId}`, {
                withCredentials: true,
            })
            .then(res => {
                setTracking(res.data.trackingSteps || []);
                setOrderInfo(res.data.orderInfo || null);
            })
            .finally(() => setDataLoading(false));
    }, [orderId]);

    if (loading || dataLoading) {
        return (
            <div className="flex justify-center items-center h-64">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        );
    }

    if (!tracking.length) {
        return (
            <p className="text-center mt-10 text-gray-500">
                No tracking information available.
            </p>
        );
    }

    const latestIndex = tracking.length - 1;

    return (
        <div className="max-w-5xl mx-auto p-6">

            {/* ===== ORDER SUMMARY ===== */}
            <div className="bg-base-200 rounded-xl p-6 shadow mb-8 animate-fadeIn">
                <h2 className="text-2xl font-bold flex items-center gap-2">
                    <FaBoxOpen className="text-primary" />
                    Track Your Order
                </h2>

                {orderInfo && (
                    <div className="grid md:grid-cols-2 gap-4 mt-4 text-sm">
                        <p><b>Order ID:</b> {orderInfo.orderId}</p>
                        <p><b>Product:</b> {orderInfo.productName}</p>

                        <p className="flex items-center gap-2">
                            <b>Status:</b>
                            <span className="badge badge-info">
                                {orderInfo.status.charAt(0).toUpperCase() + orderInfo.status.slice(1)}
                            </span>
                        </p>

                        <p className="flex items-center gap-2">
                            <MdOutlinePayments />
                            <span className="badge badge-outline">
                                {orderInfo.paymentMethod === "cod" ? "Cash on Delivery" : "Online Payment"}
                            </span>
                        </p>
                    </div>
                )}
            </div>

            {/* ===== TIMELINE VIEW ===== */}
            <div className="bg-base-100 rounded-xl shadow p-6 animate-slideUp">
                <h3 className="text-lg font-semibold mb-4">
                    Production & Shipping Timeline
                </h3>

                <ul className="timeline timeline-vertical">
                    {tracking.map((step, index) => {
                        const isLatest = index === latestIndex;

                        return (
                            <li key={index}>
                                <div className="timeline-start text-sm text-gray-500">
                                    {step.date}
                                </div>

                                <div className="timeline-middle">
                                    <span
                                        className={`w-4 h-4 rounded-full block border-4 ${isLatest
                                            ? "bg-green-500 border-green-200"
                                            : "bg-gray-400 border-gray-200"
                                            }`} />
                                </div>

                                <div
                                    className={`timeline-end p-5 rounded-xl ${isLatest
                                        ? "bg-green-50 border border-green-400 shadow"
                                        : "bg-base-200"
                                        }`}
                                >
                                    <h4 className="font-semibold text-lg flex items-center gap-2">
                                        <FaBoxOpen className="text-primary" />
                                        {step.title}
                                    </h4>

                                    <p className="text-sm text-gray-600 mt-1 flex items-center gap-2">
                                        <FaMapMarkerAlt className="text-error" />
                                        {step.location}
                                    </p>

                                    {step.note && (
                                        <p className="text-sm mt-2 flex items-center gap-2 text-gray-700">
                                            <FaStickyNote className="text-warning" />
                                            {step.note}
                                        </p>
                                    )}

                                    {isLatest && (
                                        <span className="badge badge-success mt-3 flex items-center gap-1">
                                            <BsCheckCircleFill />
                                            Latest Update
                                        </span>
                                    )}
                                </div>
                            </li>
                        );
                    })}
                </ul>
            </div>

            {/* ===== OPTIONAL MAP ===== */}
            <div className="mt-10 bg-base-200 rounded-xl p-6 shadow animate-fadeIn">
                <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                    <HiOutlineMap />
                    Current Location (Optional)
                </h3>

                {orderInfo.lat && orderInfo.lng ? (
                    <div className="h-64 w-full rounded-lg overflow-hidden">
                        <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAP_KEY}>
                            <GoogleMap
                                mapContainerStyle={{ width: '100%', height: '100%' }}
                                center={{ lat: parseFloat(orderInfo.lat), lng: parseFloat(orderInfo.lng) }}
                                zoom={12}
                            >
                                <Marker position={{ lat: parseFloat(orderInfo.lat), lng: parseFloat(orderInfo.lng) }} />
                            </GoogleMap>
                        </LoadScript>
                    </div>
                ) : (
                    <div className="h-64 bg-gray-300 rounded-lg flex items-center justify-center">
                        <p className="text-gray-600 text-sm">Map not available</p>
                    </div>
                )}
            </div>

            {/* ===== READ-ONLY NOTICE ===== */}
            <p className="text-center text-xs text-gray-400 mt-8">
                Tracking information is read-only. Users cannot modify any data.
            </p>
        </div>
    );
};

export default TrackOrder;
