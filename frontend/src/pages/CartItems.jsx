import { useEffect, useState } from "react";

function CartItems() {
    const BASEURL = import.meta.env.VITE_DJANGO_BASE_URL;

    const [cart, setCart] = useState(null);

    useEffect(() => {
        console.log("BASEURL:", BASEURL);

        fetch(`${BASEURL}/api/createcart/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error("Failed to fetch cart");
            }
            return response.json();
        })
        .then((data) => {
            console.log("Cart created:", data);
            setCart(data);
        })
        .catch((error) => {
            console.error("Error:", error);
        });

    }, []);

    return (
        <div>
            { "Added to Cart successfully..."}
        </div>
    );
}

export default CartItems;