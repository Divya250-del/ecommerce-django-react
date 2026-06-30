import { useEffect, useState,useRef } from "react";
import ProductCard from "../components/ProductCard";
import { getProductsApi } from "../api/productApi";
import { getCategoriesApi } from "../api/categoryApi";
import { useSearchParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";



function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [count, setCount] = useState(0);
  const [nextUrl, setNextUrl] = useState(null);
  const [prevUrl, setPrevUrl] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const [search, setSearch] = useState("");
  const [ordering, setOrdering] = useState("-created_at");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [categories, setCategories] = useState([]);


  const [searchParams] = useSearchParams();
  const selectedCategory = searchParams.get("category");

  const BASEURL = import.meta.env.VITE_DJANGO_BASE_URL;
  const productRef = useRef(null);

    const { user, setUser } = useAuth();
    const isLoggedIn = !!user;

  const scrollToProducts = () => {
    productRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  };



  

   const fetchProducts = async () => {
  setLoading(true);
  setError(null);

  try {
    const data = await getProductsApi({
      page: currentPage,
      search,
      ordering,
      min_price: minPrice,
      max_price: maxPrice,
      category: selectedCategory,
    });

    setProducts(data.results || []);
    setCount(data.count || 0);
    setNextUrl(data.next);
    setPrevUrl(data.previous);

  } catch (error) {
    setError(error.error || "Failed to fetch products");
  } finally {
    setLoading(false);
  }
};

  const handleNext = () => {
    if (nextUrl) setCurrentPage((prev) => prev + 1);
  };

  const handlePrev = () => {
    if (prevUrl) setCurrentPage((prev) => prev - 1);
  };

  const handleSearch = () => {
    setCurrentPage(1);
    fetchProducts();
  };

 

  const totalPages = Math.ceil(count / 6);

  useEffect(() => {
      const fetchCategories = async () => {
        try {
          const data = await getCategoriesApi();
          setCategories(data);
        } catch (error) {
          console.error("Error:", error);
        }
      };
  
      fetchCategories();
    }, []);

  useEffect(() => {
    fetchProducts();
  }, [currentPage, ordering,selectedCategory]);

  useEffect(() => {
  setCurrentPage(1);
}, [selectedCategory]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* Top Navbar */}


      <main className="max-w-7xl mx-auto px-5 py-6">
{/* Hero Section */}
<section className="bg-gradient-to-r from-slate-50 to-blue-50 rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between overflow-hidden">

  {/* Left Content */}
  <div className="max-w-xl">
    <p className="inline-block bg-blue-100 text-blue-700 font-semibold px-4 py-2 rounded-full text-sm">
      🚀 Modern E-Commerce Platform
    </p>

    <h1 className="mt-6 text-4xl md:text-5xl font-extrabold leading-tight text-slate-900">
      Shop Everything <br />
      <span className="text-blue-600">You Need</span>
    </h1>

    <p className="mt-5 text-slate-600 text-lg leading-relaxed">
      Discover premium products with a fast, secure, and seamless shopping
      experience. Browse categories, manage your cart, and checkout with
      confidence.
    </p>

    <div className="mt-8 flex gap-4">
      <button
        onClick={scrollToProducts}
        className="bg-blue-600 text-white px-7 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl"
      >
        Shop Now →
      </button>
    </div>
  </div>

  {/* Right Side */}
  <div className="mt-10 md:mt-0 flex flex-col items-center">

    <div className="text-[140px] md:text-[170px] drop-shadow-lg animate-bounce">
      🛍️
    </div>
<div className="grid grid-cols-2 gap-3 mt-3">

  <div className="bg-white rounded-xl px-5 py-3 shadow-md text-center">
    <p className="text-2xl">🔒</p>
    <p className="text-sm font-semibold text-slate-700">
      Secure Payment
    </p>
  </div>

  <div className="bg-white rounded-xl px-5 py-3 shadow-md text-center">
    <p className="text-2xl">🛍️</p>
    <p className="text-sm font-semibold text-slate-700">
      Multi-Category
    </p>
  </div>

  <div className="bg-white rounded-xl px-5 py-3 shadow-md text-center">
    <p className="text-2xl">👤</p>
    <p className="text-sm font-semibold text-slate-700">
      Customer & Seller
    </p>
  </div>

  <div className="bg-white rounded-xl px-5 py-3 shadow-md text-center">
    <p className="text-2xl">🛒</p>
    <p className="text-sm font-semibold text-slate-700">
      Smart Cart
    </p>
  </div>

</div>
   
  </div>

</section>


  




        {isLoggedIn && (
  <>
    {/* Filter Bar */}
    <section className="bg-white rounded-xl shadow-sm border border-slate-100 p-4 mb-6">
                <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="md:col-span-2 border border-slate-200 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-200"
            />

            <input
              type="number"
              placeholder="Min price"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              className="border border-slate-200 rounded-lg px-4 py-3 outline-none"
            />

            <input
              type="number"
              placeholder="Max price"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="border border-slate-200 rounded-lg px-4 py-3 outline-none"
            />

            <select
              value={ordering}
              onChange={(e) => setOrdering(e.target.value)}
              className="border border-slate-200 rounded-lg px-4 py-3 outline-none bg-white"
            >
              <option value="-created_at">Newest First</option>
              <option value="created_at">Oldest First</option>
              <option value="price">Price: Low to High</option>
              <option value="-price">Price: High to Low</option>
              <option value="name">Name: A to Z</option>
              <option value="-name">Name: Z to A</option>
            </select>
          </div>

          <button
            onClick={handleSearch}
            className="mt-4 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700"
          >
            Apply Filters
          </button>
    </section>

    {/* Products Header */}
    <div
      ref={productRef}
      className="flex items-center justify-between mb-5"
    >
      <div>
        <h2 className="text-2xl font-bold">Featured Products</h2>
        <p className="text-sm text-slate-500 mt-1">
          Showing {products.length} of {count} products
        </p>
      </div>

      <button className="text-blue-600 text-sm font-semibold">
        View All →
      </button>
    </div>

    {/* Loading */}
    {loading && (
      <div className="text-center py-16 text-slate-500">
        Loading products...
      </div>
    )}

    {/* Error */}
    {error && (
      <div className="text-center text-red-500 py-16">
        {error}
      </div>
    )}

    {/* Products */}
    {!loading && !error && (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.length > 0 ? (
          products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              showSellerActions={false}
            />
          ))
        ) : (
          <p className="col-span-full text-center text-slate-500 py-10">
            No Products Available...
          </p>
        )}
      </div>
    )}

    {/* Pagination */}
    {!loading && count > 0 && (
      <div className="flex justify-center items-center gap-5 py-10">
        <button
          onClick={handlePrev}
          disabled={!prevUrl}
          className="px-5 py-2 rounded-lg bg-white border border-slate-200 disabled:opacity-50 hover:bg-slate-100"
        >
          ← Previous
        </button>

        <span className="text-slate-600 font-medium">
          Page {currentPage} of {totalPages || 1}
        </span>

        <button
          onClick={handleNext}
          disabled={!nextUrl}
          className="px-5 py-2 rounded-lg bg-blue-600 text-white disabled:opacity-50 hover:bg-blue-700"
        >
          Next →
        </button>
      </div>
    )}

  </>
)}
      </main>
    </div>
  );
}

export default ProductList;