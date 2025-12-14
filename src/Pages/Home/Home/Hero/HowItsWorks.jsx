const steps = [
    { title: "Choose Product", desc: "Select garments from our catalog" },
    { title: "Place Order", desc: "Submit order with quantity" },
    { title: "Production", desc: "We start cutting & sewing" },
    { title: "Delivery", desc: "Delivered to your address" },
];

const HowItWorks = () => {
    return (
        <section className="bg-gray-100 py-16">
            <h2 className="text-3xl font-bold text-center mb-10">
                How It Works
            </h2>

            <div className="container mx-auto grid md:grid-cols-4 gap-6 px-6">
                {steps.map((step, index) => (
                    <div key={index} className="bg-white p-6 rounded shadow text-center">
                        <div className="text-4xl font-bold text-blue-600 mb-3">
                            {index + 1}
                        </div>
                        <h3 className="text-lg font-semibold">
                            {step.title}
                        </h3>
                        <p className="text-gray-600 mt-2">
                            {step.desc}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default HowItWorks;
