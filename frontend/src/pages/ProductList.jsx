import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { getProductsApi } from "../api/productApi";

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

  const BASEURL = import.meta.env.VITE_DJANGO_BASE_URL;

  

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
    fetchProducts();
  }, [currentPage, ordering]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* Top Navbar */}


      <main className="max-w-7xl mx-auto px-5 py-6">
        {/* Hero Section */}
        <section className="bg-blue-50 rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between overflow-hidden">
          <div className="max-w-xl">
            <p className="text-blue-600 font-bold text-sm mb-4">
              BEST QUALITY PRODUCTS
            </p>
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
              Find Everything <br />
              You <span className="text-blue-600">Need</span>
            </h1>
            <p className="mt-5 text-slate-600">
              Discover amazing products at the best prices. Quality you can
              trust, service you can count on.
            </p>

            <div className="mt-7 flex gap-4">
              <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700">
                Shop Now →
              </button>
              <button className="bg-white border border-slate-200 px-6 py-3 rounded-lg font-semibold shadow-sm">
                View Deals
              </button>
            </div>
          </div>

          <div className="mt-8 md:mt-0 text-center">
            <div className="text-8xl md:text-9xl">🛒</div>
            <div className="bg-blue-600 text-white rounded-full w-28 h-28 flex items-center justify-center font-bold text-xl mx-auto -mt-8">
              50% <br /> OFF
            </div>
          </div>
        </section>

        {/* Category Icons */}
        <section className="grid grid-cols-4 md:grid-cols-8 gap-5 py-8 text-center">
          {[
            ["💻", "Electronics"],
            ["🏠", "Home"],
            ["👕", "Fashion"],
            ["🧴", "Beauty"],
            ["⚽", "Sports"],
            ["📘", "Books"],
            ["🧸", "Toys"],
            ["🔘", "More"],
          ].map(([icon, label]) => (
            <div key={label} className="flex flex-col items-center gap-2">
              <div className="w-14 h-14 rounded-full bg-white shadow-sm flex items-center justify-center text-2xl">
                {icon}
              </div>
              <p className="text-xs font-medium">{label}</p>
            </div>
          ))}
        </section>

        {/* Service Bar */}
        <section className="bg-white rounded-xl shadow-sm border border-slate-100 grid grid-cols-1 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-slate-100 mb-8">
          {[
            ["🚚", "Free Shipping", "On orders over $50"],
            ["🔄", "Easy Returns", "30-day return policy"],
            ["💳", "Secure Payment", "100% secure payment"],
            ["🎧", "24/7 Support", "Dedicated support"],
          ].map(([icon, title, desc]) => (
            <div key={title} className="flex items-center gap-4 p-5">
              <span className="text-blue-600 text-xl">{icon}</span>
              <div>
                <h4 className="font-bold text-sm">{title}</h4>
                <p className="text-xs text-slate-500">{desc}</p>
              </div>
            </div>
          ))}
        </section>

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
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-2xl font-bold">Featured Products</h2>
            <p className="text-sm text-slate-500 mt-1">
              Showing {products.length} of {count} products
            </p>
          </div>
          <button className="text-blue-600 text-sm font-semibold">View All →</button>
        </div>

        {/* Loading */}
        {loading && (
          <div className="text-center py-16 text-slate-500">Loading products...</div>
        )}

        {/* Error */}
        {error && (
          <div className="text-center text-red-500 py-16">{error}</div>
        )}

        {/* Products Grid */}
        {!loading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.length > 0 ? (
              products.map((product) => (
                <ProductCard key={product.id} product={product} />
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
      </main>
    </div>
  );
}

export default ProductList;