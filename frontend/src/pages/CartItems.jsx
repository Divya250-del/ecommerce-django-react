import { useEffect, useState } from "react";
import { createCartApi } from "../api/cartApi";

function CartItems() {
    const BASEURL = import.meta.env.VITE_DJANGO_BASE_URL;

    const [cart, setCart] = useState(null);

    useEffect(() => {

        try {
        const data = await createCartApi();
        console.log("Cart created:", data);
        setCart(data);
        } catch (error) {
        console.error("Error:", error);
        }

    }, []);

    return (
        <div>
            { "Added to Cart successfully..."}
        </div>
    );
}

export default CartItems;