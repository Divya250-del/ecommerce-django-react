import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { logoutApi } from "../api/authApi";
import { useAuth } from "../context/AuthContext";
import { getCategoriesApi } from "../api/categoryApi";
import { useEffect, useState } from "react";


function Navbar() {
  const { cartItems } = useCart();
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
  const { user, setUser } = useAuth();

  const cartCount = cartItems?.reduce(
    (total, item) => total + (item.quantity || 0),
    0
  );
  const isLoggedIn = !!user;
  const role = user?.role;

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
    

  







  const handleLogout = async () => {
    try {
      await logoutApi();// 🔥 cookie delete
      setUser(null);
      navigate("/login");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

 return (
  <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm">

    {/* Top Navbar */}
    <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

      {/* Left */}
      <div className="flex items-center gap-8">

        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-3 group"
        >
          <div className="text-4xl group-hover:scale-110 transition duration-300">
            🛒
          </div>

          <div>
            <h2 className="text-3xl font-extrabold tracking-tight">
              <span className="text-slate-900">Shop</span>
              <span className="text-blue-600">io</span>
            </h2>

            <p className="text-xs text-slate-500 -mt-1">
              Smart Shopping Platform
            </p>
          </div>
        </Link>

        {/* Categories */}

        <select
          onChange={(e) =>
            navigate(
              e.target.value
                ? `/?category=${e.target.value}`
                : "/"
            )
          }
          className="hidden lg:block bg-slate-50 border border-slate-200 rounded-xl px-5 py-3 text-sm font-medium outline-none hover:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
        >
          <option value="">All Categories</option>

          {categories.map((category) => (
            <option
              key={category.id}
              value={category.slug}
            >
              {category.name}
            </option>
          ))}
        </select>

      </div>

      {/* Right */}

      <div className="flex items-center gap-3 text-sm font-semibold">

        {!isLoggedIn ? (
          <>
            <Link
              to="/login"
              className="px-4 py-2 rounded-lg hover:bg-slate-100 transition"
            >
              👤 Login
            </Link>

            <Link
              to="/signup-role"
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl shadow-md transition"
            >
              Sign Up
            </Link>
          </>
        ) : (
          <>

            {role === "admin" && (
              <Link
                to="/admin/analytics"
                className="text-purple-600 hover:text-purple-800"
              >
                📊 Analytics
              </Link>
            )}

            {(role === "customer" || role === "seller") && (
              <Link
                to="/my-orders"
                className="hover:text-blue-600 transition"
              >
                📦 My Orders
              </Link>
            )}

            {role === "customer" && (
              <Link
                to="/cart"
                className="relative hover:text-blue-600 transition"
              >
                🛒 Cart

                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-4 bg-red-500 text-white text-[10px] font-bold rounded-full px-1.5 py-0.5 shadow">
                    {cartCount}
                  </span>
                )}
              </Link>
            )}

            <button
              onClick={handleLogout}
              className="bg-red-50 text-red-600 hover:bg-red-100 px-4 py-2 rounded-lg transition"
            >
              Logout
            </button>

          </>
        )}

      </div>

    </div>

    {/* Bottom Navbar */}

    <div className="border-t border-slate-100 bg-white">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center gap-10">

        <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl font-semibold shadow-md transition">
          ☰ Shop by Category
        </button>

        <Link
          to="/"
          className="text-blue-600 font-semibold border-b-[3px] border-blue-600 pb-2"
        >
          Home
        </Link>

        {role === "seller" && (
          <Link
            to="/my-products"
            className="hover:text-blue-600 transition"
          >
            📦 My Products
          </Link>
        )}

      </div>
    </div>

  </header>
);
}

export default Navbar;