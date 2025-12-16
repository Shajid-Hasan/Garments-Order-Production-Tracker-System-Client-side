import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const reviews = [
    { name: "Rahim Uddin", comment: "Excellent quality garments and fast delivery!" },
    { name: "Karim Fashion", comment: "Very professional production tracking system." },
    { name: "Nabila Traders", comment: "Best factory management solution we have used." },
    { name: "Ali & Sons", comment: "Reliable service and fast support!" },
    { name: "FashionHub", comment: "Great quality, highly recommend!" },
];

const CustomerReviewCarousel = () => {
    return (
        <section className="py-16 container mx-auto px-6">
            <h2 className="text-3xl font-bold text-center mb-10">
                Customer Feedback
            </h2>

            <Swiper
                modules={[Autoplay, Pagination, Navigation]}
                spaceBetween={30}
                slidesPerView={1}
                loop
                autoplay={{ delay: 3000, disableOnInteraction: false }}
                pagination={{ clickable: true }}
                navigation
                breakpoints={{
                    640: { slidesPerView: 1 },
                    768: { slidesPerView: 2 },
                    1024: { slidesPerView: 3 },
                    
                }}
            >
                {reviews.map((review, idx) => (
                    <SwiperSlide key={idx} className="h-full">
                        <div className="h-full max-w-md mx-auto flex flex-col justify-between text-center border p-8 rounded-lg shadow-lg transition-transform transform hover:scale-105 bg-white">
                            <p className="italic text-gray-700 text-lg mb-4">
                                “{review.comment}”
                            </p>
                            <h4 className="mt-4 font-semibold text-blue-600">
                                — {review.name}
                            </h4>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    );
};

export default CustomerReviewCarousel;
