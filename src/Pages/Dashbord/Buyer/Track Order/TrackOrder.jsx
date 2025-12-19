import { useParams } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";

const TrackOrder = () => {
    const { orderId } = useParams();
    const [tracking, setTracking] = useState([]);

    useEffect(() => {
        axios
            .get(`http://localhost:3000/orders/tracking/${orderId}`)
            .then(res => setTracking(res.data));
    }, [orderId]);

    return (
        <div>
            <h2 className="text-xl font-bold mb-4">Track Order</h2>

            <ul className="timeline timeline-vertical">
                {tracking.map((step, index) => (
                    <li key={index}>
                        <div className="timeline-start">
                            {step.date}
                        </div>
                        <div className="timeline-middle">
                            ●
                        </div>
                        <div className="timeline-end">
                            <h3 className="font-bold">{step.title}</h3>
                            <p>{step.location}</p>
                            <p className="text-sm">{step.note}</p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TrackOrder;
