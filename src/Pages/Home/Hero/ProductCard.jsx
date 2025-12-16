import { Link } from "react-router";

const ProductCard = ({ product }) => {
    const { id, image, title, category, price, rating } = product;

    return (
        <Link to={`/products/${id}`} className="group">
            <div className="border rounded-lg overflow-hidden shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-2xl">
                <div className="overflow-hidden">
                    <img
                        src={image}
                        alt={title}
                        className="w-full h-64 object-contain transition-transform duration-300 group-hover:scale-110"
                    />
                </div>

                <div className="p-4 bg-white">
                    <h3 className="text-xl font-semibold">{title}</h3>

                    <p className="text-gray-500 text-sm mt-1">
                        Category: <span className="text-gray-700">{category}</span>
                    </p>

                    <p className="text-gray-500 text-sm mt-1">
                        Available Quantity: <span className="text-gray-700">{rating?.count}</span>
                    </p>

                    <p className="font-bold text-lg mt-3">
                        $ {price}
                    </p>

                    <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors">
                        View Details
                    </button>
                </div>
            </div>
        </Link>
    );
};

export default ProductCard;
