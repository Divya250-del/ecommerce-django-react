import { useEffect, useState } from "react";
import ProductCard  from "../components/ProductCard";

function ProductList(){
    const [products,setProducts] = useState([]);
    const [loading,setLoading] = useState([]);
    const [error,setError] = useState(null);

    // pagination state
    const [count, setCount]               = useState(0);      // total products in DB
    const [nextUrl, setNextUrl]           = useState(null);   // next page URL from API
    const [prevUrl, setPrevUrl]           = useState(null);   // previous page URL from API
    const [currentPage, setCurrentPage]   = useState(1);      // which page user is on

    // filter + search state
    const [search, setSearch]             = useState('');         // search input value
    const [ordering, setOrdering]         = useState('-created_at'); // default → newest first
    const [minPrice, setMinPrice]         = useState('');         // min price input
    const [maxPrice, setMaxPrice]         = useState('');         // max price input

    const BASEURL = import.meta.env.VITE_DJANGO_BASE_URL;

    const buildUrl = () => {
    // start with base URL
    let url = `${BASEURL}/api/products/?page=${currentPage}`;

    // add search if user typed something
    if (search)   url += `&search=${search}`;

    // add ordering always
    if (ordering) url += `&ordering=${ordering}`;

    // add price filters if user entered values
    if (minPrice) url += `&min_price=${minPrice}`;
    if (maxPrice) url += `&max_price=${maxPrice}`;

    return url;
    };



    const fetchProducts = (url) => {
    // show loading spinner
    setLoading(true);

    fetch(url)
        .then((response) => {
            if (!response.ok) {
                throw new Error("Failed to fetch products");
            }
            return response.json();
        })
        .then((data) => {
            // data is now an object, not array
            // so we read data.results for products
            setProducts(data.results);   // ← array of 6 products
            setCount(data.count);        // ← total products (25)
            setNextUrl(data.next);       // ← next page URL or null
            setPrevUrl(data.previous);   // ← previous page URL or null
            setLoading(false);
        })
        .catch((error) => {
            setError(error.message);
            setLoading(false);
        });
    };

    // called when user clicks Next →
    const handleNext = () => {
        if (nextUrl) {
            setCurrentPage(prev => prev + 1);
            // currentPage change triggers useEffect → fetchProducts
        }
    };

    // called when user clicks ← Previous
    const handlePrev = () => {
        if (prevUrl) {
            setCurrentPage(prev => prev - 1);
        }
    };

    // called when user clicks Search button
    const handleSearch = () => {
        setCurrentPage(1);  // reset to page 1 when searching
        fetchProducts(buildUrl());
    };

    // total pages calculation
    const totalPages = Math.ceil(count / 6);
    // count=25, page_size=6 → Math.ceil(25/6) = 5 pages




    useEffect(() => {
    const url = buildUrl();
    fetchProducts(url);
}, [currentPage, ordering]);
    // ↑ re-fetch when page changes or ordering changes
    // search and price filters will have their own trigger (search button)

    if (loading){
        return <div>Loading...</div>
    }
 return (
    <div className="min-h-screen bg-gray-100">

        {/* Header */}
        <h1 className="text-3xl font-bold text-center py-6 bg-white shadow-md">
            Product List
        </h1>

        {/* Search + Filter bar */}
        <div className="flex flex-wrap gap-3 p-4 bg-white shadow-sm">

            {/* Search input */}
            <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="border rounded px-3 py-2 flex-1"
            />

            {/* Min price */}
            <input
                type="number"
                placeholder="Min price"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                className="border rounded px-3 py-2 w-28"
            />

            {/* Max price */}
            <input
                type="number"
                placeholder="Max price"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                className="border rounded px-3 py-2 w-28"
            />

            {/* Sort dropdown */}
            <select
                value={ordering}
                onChange={(e) => setOrdering(e.target.value)}
                className="border rounded px-3 py-2"
            >
                <option value="-created_at">Newest First</option>
                <option value="created_at">Oldest First</option>
                <option value="price">Price: Low to High</option>
                <option value="-price">Price: High to Low</option>
                <option value="name">Name: A to Z</option>
                <option value="-name">Name: Z to A</option>
            </select>

            {/* Search button */}
            <button
                onClick={handleSearch}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
                Search
            </button>

        </div>

        {/* Results count */}
        <p className="text-center text-gray-500 py-2">
            Showing {products.length} of {count} products
        </p>

        {/* Loading */}
        {loading && <div className="text-center py-10">Loading...</div>}

        {/* Error */}
        {error && <div className="text-center text-red-500 py-10">{error}</div>}

        {/* Products grid */}
        {!loading && !error && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
                {products.length > 0 ? (
                    products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))
                ) : (
                    <p className="col-span-full text-center text-gray-500">
                        No Products Available...
                    </p>
                )}
            </div>
        )}

        {/* Pagination controls */}
        {!loading && (
            <div className="flex justify-center items-center gap-6 py-6">

                {/* Previous button */}
                <button
                    onClick={handlePrev}
                    disabled={!prevUrl}
                    className="bg-gray-200 px-4 py-2 rounded disabled:opacity-50 hover:bg-gray-300"
                >
                    ← Previous
                </button>

                {/* Page info */}
                <span className="text-gray-600">
                    Page {currentPage} of {totalPages}
                </span>

                {/* Next button */}
                <button
                    onClick={handleNext}
                    disabled={!nextUrl}
                    className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50 hover:bg-blue-600"
                >
                    Next →
                </button>

            </div>
        )}

    </div>
);
}

export default ProductList
