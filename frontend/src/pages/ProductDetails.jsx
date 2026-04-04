import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

function ProductDetails(){
    const {id} = useParams();
    const BASEURL = import.meta.env.VITE_DJANGO_BASE_URL;

    const [product,setProduct] = useState(null);
    const [loading,setLoading] = useState(true);
    const [error,setError] = useState(true);
    const { addToCart } = useCart();



    useEffect( () =>{
        fetch(`${BASEURL}/api/products/${id}`)
        .then((response) =>{
            if(!response.ok){
                throw new Error("Failed to fetch products");
            }
            return response.json();
        })
        .then((data) => {
            setProduct(data);
            setLoading(false);
        })
        .catch((error) => {
            setError(error.message);
            setLoading(false);
        });
    },[]);
    
    if(loading){
        return <div>Loading...</div>
    }

    if(!product){
        return <div>No Product Found</div>
    }

    const handleAddToCart = () =>{
        if(!localStorage.getItem('access_token')){
            window.location.href = "/login";
            return;
        }

        addToCart(product.id);
    }



    return(
        <div className="min-h-screen bg-gray-100 flex justify-center items-center py-10">
            <div className="bg-white rounded-xl shadow-md p-6 max-w-3xl w-full">
                <div className="flex flex-col md:flex-row gap-8">
                    <img
                        src={`${product.image}`}
                        alt={product.name}
                        className="w-full md:w-1/2 h-auto object-cover rounded-lg"
                    />
                    <div className="flex-1">
                        <h1 className="text-3xl font-bold text-gray-800 mb-2">
                            ${product.name}
                        </h1>
                    </div>
                    <p className="text-gray-600 mb-4">{product.description}</p>
                    <p className="text-2xl font-semibold text-green-600 mb-6">
                        {product.price}
                    </p>
                    
                    <Link to={`/cart`}>
                    <button onClick={handleAddToCart}className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
                        Add to Cart
                    </button>
                    </Link>


                </div>
            </div>           
        </div>
    )
}

export default ProductDetails





