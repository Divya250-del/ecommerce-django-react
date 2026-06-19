import { useEffect, useState } from "react";
import { fetchSellerOwnProducts } from "../api/productApi";
import { Link, useNavigate } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { deleteProductApi } from "../api/productApi";


  


const SellerProducts = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const data = await fetchSellerOwnProducts();
    setProducts(data.results);
  };

  const handleDelete = async (id) => {
  try {
    await deleteProductApi(id);

    setProducts((prev) =>
      prev.filter((product) => product.id !== id)
    );
  } catch (error) {
    console.error(error);
  }
};
  return (
    <div>
      <div className="flex justify-between items-center mb-6">

        <button onClick={() => navigate("/seller/products/create")}>
        + Add Product
        </button>
      </div>


        {/* Products Grid */}
        { (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.length > 0 ? (
              products.map((product) => (
                <ProductCard key={product.id} product={product} showSellerActions={true} onDelete={handleDelete} />
              ))
            ) : (
              <p className="col-span-full text-center text-slate-500 py-10">
                No Products Available...
              </p>
            )}
          </div>
        )}


       

    </div>
  );
};

export default SellerProducts;