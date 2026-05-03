import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { logoutApi } from "../api/authApi";
import { useAuth } from "../context/AuthContext";



function Navbar() {
  const { cartItems } = useCart();
  const navigate = useNavigate();
  const { user, setUser } = useAuth();

  const cartCount = cartItems?.reduce(
    (total, item) => total + (item.quantity || 0),
    0
  );
  const isLoggedIn = !!user;
  const role = user?.role;

  







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
    <header className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-5 py-4 flex items-center gap-6">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 text-2xl font-bold">
          <span className="text-3xl">🛒</span>
          <span className="text-blue-600">Divya</span>
          <span className="text-slate-900">Cart</span>
        </Link>

        {/* Category */}
        <select className="hidden md:block border border-slate-200 rounded-xl px-4 py-3 bg-slate-50 text-sm outline-none">
          <option>All Categories</option>
          <option>Electronics</option>
          <option>Beauty</option>
          <option>Sports</option>
          <option>Home</option>
        </select>

        {/* Search */}
        <div className="hidden md:flex flex-1">
          <input
            type="text"
            placeholder="Search for products..."
            className="w-full border border-slate-200 rounded-l-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-200"
          />
          <button className="bg-blue-600 text-white px-7 rounded-r-xl font-semibold hover:bg-blue-700">
            Search
          </button>
        </div>

        {/* Right Menu */}
        <div className="flex items-center gap-5 text-sm font-semibold">
          {!isLoggedIn ? (
            <>
              <Link to="/login" className="hover:text-blue-600">
                👤 Login
              </Link>
              <Link to="/signup-role" className="hover:text-blue-600">
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

              {role === "customer" && (
                <>
                  <Link to="/my-orders" className="hover:text-blue-600">
                    📦 My Orders
                  </Link>

                  <Link to="/cart" className="relative hover:text-blue-600">
                    🛒 Cart
                    {cartCount > 0 && (
                      <span className="absolute -top-3 -right-4 bg-blue-600 text-white text-xs rounded-full px-1.5">
                        {cartCount}
                      </span>
                    )}
                  </Link>
                </>
              )}
              <button
                onClick={handleLogout}
                className="hover:text-red-600 font-semibold"
              >
                Logout
              </button>
              
            </>
          )}
        </div>
      </div>

      {/* Second Nav Row */}
      <div className="max-w-7xl mx-auto px-5 py-3 hidden md:flex items-center gap-10 text-sm font-medium">
        <button className="bg-blue-600 text-white px-5 py-2 rounded-lg">
          ☰ Shop by Category
        </button>

        <Link to="/" className="text-blue-600 border-b-2 border-blue-600 pb-2">
          Home
        </Link>

        <Link to="/" className="hover:text-blue-600">
          Products
        </Link>

        <Link to="/" className="hover:text-blue-600">
          Deals
        </Link>

        <Link to="/" className="hover:text-blue-600">
          About Us
        </Link>

        <Link to="/" className="hover:text-blue-600">
          Contact Us
        </Link>
      </div>
    </header>
  );
}

export default Navbar;