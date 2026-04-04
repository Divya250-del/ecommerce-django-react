import { createContext, useContext, useState,useEffect } from "react";
import { authFetch, getAccessToken } from "../utils/auth";
const CartContext = createContext();



export const CartProvider = ({children}) => {
    const BASEURL = import.meta.env.VITE_DJANGO_BASE_URL;
    const [cartItems, setCartItems] = useState([]);
    const [total,setTotal] = useState(0)

    const fetchCart = async () => {
        try{
            const res = await authFetch(`${BASEURL}/api/cart/`)        
            const data = await res.json();
            setCartItems(data.items || []);
            setTotal(data.total || []);
            

        }
        catch(error){
            console.error("Error fetching cart:",error)
        }

    }
    

    useEffect(() => {
        fetchCart();

    },[])

    // Add Product to Cart
    const addToCart = async(productID) => {
        try{
            await authFetch(`${BASEURL}/api/cart/add/`,{
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({product_id:  productID}),
            });
            fetchCart();

        }
        catch(error){
                    console.error("Error Adding to Cart",error);
        }

    }

    // Remove Product from cart
    const removeFromCart = async(itemId) => {
        try{
                await authFetch(`${BASEURL}/api/cart/remove/`,{
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({item_id: itemId}),
            });
            fetchCart();

        }
        catch(error){
            console.error("Error removing from cart",error);
        }

    }

    // update quantity
    const updateQuantity = async(itemId,quantity) => {

            if (quantity < 1){
                await removeFromCart(itemId);
                return ;
            }
            try{
                await authFetch(`${BASEURL}/api/cart/update/`,{
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({item_id: itemId,quantity:quantity}),
            });
            fetchCart();

        }
        catch(error){
            console.error("Error while updating quantity in cart",error);
        }


    };

    const clearCart = () => {
        setCartItems([]);
        setTotal(0);
    }

    return(
        <CartContext.Provider
        value = {{cartItems,total, addToCart, removeFromCart, updateQuantity,clearCart}}
        >
            {children}

        </CartContext.Provider>
    )

}
export const useCart = () => useContext(CartContext);