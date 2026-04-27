import { Link } from "react-router-dom";

function ProductCard({ product }) {
  return (
    <div className="group bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden">
      <div className="relative overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-56 object-contain p-4 group-hover:scale-105 transition-transform duration-300"
        />

        <button className="absolute top-3 right-3 bg-white p-2 rounded-full shadow hover:bg-gray-100">
          ♡
        </button>
      </div>

      <div className="p-4">
        {product.category?.name && (
          <p className="text-xs text-gray-400 mb-1">
            {product.category.name}
          </p>
        )}

        <h2 className="text-md font-semibold text-gray-800 line-clamp-1">
          {product.name}
        </h2>

        <p className="text-lg font-bold text-gray-900 mt-1">
          ${product.price}
        </p>

        <div className="mt-4 flex gap-2">
          <Link to={`/product/${product.id}`} className="flex-1">
            <button className="w-full border border-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-100">
              View
            </button>
          </Link>

          <button className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
            Add
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;