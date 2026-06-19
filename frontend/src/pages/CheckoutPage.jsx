import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { createOrderApi,razorpayVerificationApi } from "../api/orderApi";

function CheckoutPage() {
    const BASEURL = import.meta.env.VITE_DJANGO_BASE_URL;
    const navigate = useNavigate();
    const { clearCart } = useCart();

    // Removed payment_method state since it's Razorpay only
    const [form, setForm] = useState({
        name: "",
        address: "",
        phone: ""
    });

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(null);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    // Helper utility to inject the Razorpay external script dynamically
    const loadRazorpayScript = () => {
        return new Promise((resolve) => {
            const script = document.createElement('script');
            script.src = 'https://checkout.razorpay.com/v1/checkout.js';
            script.async = true;
            script.onload = () => resolve(true);
            script.onerror = () => resolve(false);
            document.body.appendChild(script);
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");

        try {
            // Step 1: Load Razorpay SDK
            const isScriptLoaded = await loadRazorpayScript();
            if (!isScriptLoaded) {
                setMessage("Failed to load payment gateway. Are you online?");
                setLoading(false);
                return;
            }

            // Step 2: Create Order in your Django Backend via your API helper
            const orderData = await createOrderApi(form);

            // Step 3: Configure Razorpay Options
            const options = {
                key: "rzp_test_T3QITUs8QoFkiJ", 
                amount: orderData.amount,     
                currency: orderData.currency, 
                name: "E-Commerce Store",
                description: `Payment for Order #${orderData.order_id}`,
                order_id: orderData.razorpay_order_id, // Connects checkout to backend tracking
                
                // Triggers automatically when customer inputs OTP & payment passes successfully
                handler: async function (razorpayResponse) {
                    setLoading(true);
                    setMessage("Verifying payment security signature...");

                    try {
                        // Step 4: Send validation payload back to Django for verification
                        const verifyResponse = await razorpayVerificationApi({
                                razorpay_order_id: razorpayResponse.razorpay_order_id,
                                razorpay_payment_id: razorpayResponse.razorpay_payment_id,
                                razorpay_signature: razorpayResponse.razorpay_signature
                            });
                        


                            setMessage("Payment verified! Order Placed successfully.");
                            clearCart();
                            setTimeout(() => {
                                navigate("/");
                            }, 2000);
                        }
                     catch (err) {
                        setMessage("Network error occurred during verification.");
                    } finally {
                        setLoading(false);
                    }
                },
                prefill: {
                    name: form.name,
                    contact: form.phone,
                    email: "customer@example.com" // Replace with authenticated user's email if available
                },
                theme: {
                    color: "#2563EB" // Matches your blue submit button
                },
                modal: {
                    ondismiss: function () {
                        setLoading(false);
                        setMessage("Payment cancelled by user.");
                    }
                }
            };

            // Step 5: Open the checkout UI modal layer
            const paymentModal = new window.Razorpay(options);
            paymentModal.open();

        } catch (error) {
            setMessage(error.error || "Failed to initiate order. Please try again.");
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex justify-center items-center p-6">
            <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
                <h1 className="text-3xl font-bold text-center mb-6">
                    Checkout
                </h1>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        name="name"
                        placeholder="Full Name"
                        value={form.name}
                        onChange={handleChange}
                        required
                        className="w-full border rounded-lg p-2"
                    />
                    <textarea
                        name="address"
                        placeholder="Full Address"
                        value={form.address}
                        onChange={handleChange}
                        required
                        className="w-full border rounded-lg p-2"
                    />
                    <input
                        type="tel"
                        name="phone"
                        placeholder="Phone Number"
                        value={form.phone}
                        onChange={handleChange}
                        required
                        className="w-full border rounded-lg p-2"
                    />

                    {/* Dropdown removed cleanly here */}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300 disabled:bg-blue-400"
                    >
                        {loading ? "Processing..." : "Place Order & Pay"}
                    </button>
                    
                    {message && (
                        <p className="text-center text-blue-700 font-semibold mt-4">
                            {message}
                        </p>
                    )}
                </form>
            </div>
        </div>
    );
}

export default CheckoutPage;