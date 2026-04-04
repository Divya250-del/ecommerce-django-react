import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { clearTokens,getAccessToken } from "../utils/auth";

function Navbar(){

    const {cartItems} = useCart();
    const navigate = useNavigate();
   

    const cartCount = cartItems?.reduce(
    (total, item) => total + (item.quantity || 0),
    0
    );

    const isLoggedIn = !!getAccessToken();

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
                    <button onClick={handleLogout} className="text-gray-800 hover:text-gray-600 font-medium">
                        Logout
                    </button>
                )}


            </div>
             <Link to='/cart' className="relative text-gray-800 hover:text-gray-600 font-medium">
             Cart
             {
                cartCount > 0 && (

                    <span>
                        {cartCount}
                    </span>
                )
             }
            </Link>
        </nav>
    )

}

export default Navbar