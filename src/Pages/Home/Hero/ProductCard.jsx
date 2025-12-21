import { Link } from "react-router";

const ProductCard = ({ product }) => {
    const {
        _id,
        title,
        category,
        price,
        quantity,
        images,
    } = product;


    // ✅ Handle image safely
    const image =
        images && images.length > 0
            ? images[0]
            : "https://via.placeholder.com/300x300?text=No+Image";

            console.log(image)
    return (
        <Link to={`/products/${_id}`} className="group">
            <div className="border rounded-lg overflow-hidden shadow-md transition duration-300 hover:shadow-xl hover:-translate-y-1">

                {/* Product Image */}
                <div className="overflow-hidden">
                    <img
                        src={image}
                        alt={title}
                        className="w-full h-64 object-contain transition-transform duration-300 group-hover:scale-110"
                    />
                </div>

                {/* Product Info */}
                <div className="p-4 bg-white">
                    <h3 className="text-lg font-semibold truncate">
                        {title}
                    </h3>

                    <p className="text-sm text-gray-500 mt-1">
                        Category:
                        <span className="text-gray-700"> {category}</span>
                    </p>

                    <p className="text-sm text-gray-500 mt-1">
                        Available Quantity:
                        <span className="text-gray-700"> {quantity}</span>
                    </p>

                    <p className="text-lg font-bold mt-3 text-blue-600">
                        $ {price}
                    </p>

                    <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
                        View Details
                    </button>
                </div>
            </div>
        </Link>
    );
};

export default ProductCard;
