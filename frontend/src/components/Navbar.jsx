import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { clearTokens,getAccessToken, getRole  } from "../utils/auth";


function Navbar(){

    const {cartItems} = useCart();
    const navigate = useNavigate();
   

    const cartCount = cartItems?.reduce(
    (total, item) => total + (item.quantity || 0),
    0
    );

    const isLoggedIn = !!getAccessToken();
    const role = getRole();  // ← 'admin' or 'customer' or null

    const handleLogout = () => {
        clearTokens();
        navigate("/login");
    }

    return (
        <nav className="bg-white shadow-md px-6 flex justify-between items-center">
            <Link to='/' className='text-2xl font-bold text-gray-800'>
            Divya Cart
            </Link>

            <div className="flex items-center gap-6">
                {!isLoggedIn ?(
                    <>
                    <Link to='/login' className="text-gray-8000 hover:text-gray-600 font-medium">
                    Login
                    </Link>
                     <Link to='/signup' className="text-gray-8000 hover:text-gray-600 font-medium">
                    Sign Up
                    </Link>
                    </>
                ):(
                                        <>
                        {/* Admin sees Analytics link */}
                        {role === 'admin' && (
                            <Link to='/admin/analytics' className="text-purple-600 hover:text-purple-800 font-medium">
                                Analytics
                            </Link>
                        )}

                        {/* Customer sees Cart link */}
                        {role === 'customer' && (
                            <Link to='/cart' className="relative text-gray-800 hover:text-gray-600 font-medium">
                                Cart
                                {cartCount > 0 && (
                                    <span className="absolute -top-2 -right-4 bg-red-500 text-white text-xs rounded-full px-1">
                                        {cartCount}
                                    </span>
                                )}
                            </Link>
                        )}
                    <button onClick={handleLogout} className="text-gray-800 hover:text-gray-600 font-medium">
                        Logout
                    </button>
                    </>
                )}


            </div>
            
        </nav>
    )

}

export default Navbar