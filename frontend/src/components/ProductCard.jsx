import { Link,useNavigate } from "react-router-dom";



function ProductCard({ product, showSellerActions = false, onDelete, }) {
  
  const navigate = useNavigate();
  return (
    <div className="group bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden">
      <div className="relative overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-56 object-contain p-4 group-hover:scale-105 transition-transform duration-300"
        />

   
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

        <div className="mt-4">
          {showSellerActions ? (
            <div className="flex gap-2">
              <button
                onClick={() => navigate(`/products/${product.id}/edit`)}
                className="flex-1 bg-yellow-500 text-white py-2.5 rounded-xl"
              >
                Edit
              </button>
            <button
              onClick={() => onDelete(product.id)}
              className="flex-1 bg-red-500 text-white py-2.5 rounded-xl"
            >
              Delete
            </button>
            </div>
          ) : (
            <Link to={`/product/${product.id}`} className="block w-full mt-3">
              <button className="w-full bg-blue-600 text-white py-2.5 rounded-xl hover:bg-blue-700 transition-all duration-200 font-medium shadow-sm">
                Add to Cart
              </button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductCard;