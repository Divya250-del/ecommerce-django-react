import { useEffect, useState } from "react";
import { getMyOrdersApi, getSellerOrdersApi } from "../api/orderApi";
import { useAuth } from "../context/AuthContext";

function OrderPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const { user } = useAuth();
  const role = user?.role;

  const fetchOrders = async () => {
    if (!role) return;

    setLoading(true);
    setError("");

    try {
      let data;

      if (role === "customer") {
        data = await getMyOrdersApi();
      } else if (role === "seller") {
        data = await getSellerOrdersApi();
      }

      setOrders(data?.results || data || []);
    } catch (error) {
      setError(
        error?.error ||
          error?.detail ||
          "Failed to load orders"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (role) {
      fetchOrders();
    }
  }, [role]);

  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center text-slate-500">
        Loading orders...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-8">
      <div className="max-w-5xl mx-auto">

        <div className="mb-6">
          <h1 className="text-3xl font-bold text-slate-900">
            {role === "seller" ? "Customer Orders" : "My Orders"}
          </h1>

          <p className="text-slate-500 mt-1">
            {role === "seller"
              ? "Orders containing your products"
              : "Track your recent purchases and order status"}
          </p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 border border-red-100 rounded-xl p-4 mb-5">
            {error}
          </div>
        )}

        {!error && orders.length === 0 && (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-10 text-center">
            <div className="text-5xl mb-3">📦</div>
            <h2 className="text-xl font-bold text-slate-800">
              No orders found
            </h2>
          </div>
        )}

        <div className="space-y-5">

          {/* CUSTOMER VIEW */}
          {role === "customer" &&
            orders.map((order) => (
              <div
                key={order.id}
                className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 p-5 border-b border-slate-100">
                  <div>
                    <h2 className="font-bold text-slate-900">
                      Order #{order.id}
                    </h2>

                    <p className="text-sm text-slate-500">
                      {new Date(order.created_at).toLocaleDateString(
                        "en-IN",
                        {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        }
                      )}
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 rounded-full text-sm font-semibold bg-yellow-50 text-yellow-700 capitalize">
                      {order.status}
                    </span>

                    <span className="font-bold text-blue-600">
                      ₹{order.total_amount}
                    </span>
                  </div>
                </div>

                <div className="p-5 space-y-4">
                  {order.items?.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center gap-4 border-b last:border-b-0 border-slate-100 pb-4 last:pb-0"
                    >
                      <img
                        src={item.product_image}
                        alt={item.product_name}
                        className="w-16 h-16 rounded-xl object-cover bg-slate-100"
                      />

                      <div className="flex-1">
                        <h3 className="font-semibold text-slate-800">
                          {item.product_name}
                        </h3>

                        <p className="text-sm text-slate-500">
                          Qty: {item.quantity} × ₹{item.price}
                        </p>
                      </div>

                      <p className="font-semibold text-slate-800">
                        ₹{Number(item.price) * item.quantity}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}

          {/* SELLER VIEW */}
          {role === "seller" &&
            orders.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5"
              >
                <div className="flex gap-4 items-center">

                  <img
                    src={item.product_image}
                    alt={item.product_name}
                    className="w-20 h-20 rounded-xl object-cover"
                  />

                  <div className="flex-1">
                    <h2 className="font-bold text-lg text-slate-900">
                      {item.product_name}
                    </h2>

                    <p className="text-slate-500">
                      Customer: {item.customer_name}
                    </p>

                    <p className="text-slate-500">
                      Quantity: {item.quantity}
                    </p>

                    <p className="text-slate-500">
                      Order ID: #{item.order_id}
                    </p>

                    <p className="text-slate-500">
                      Ordered On:{" "}
                      {new Date(item.ordered_at).toLocaleDateString("en-IN")}
                    </p>
                  </div>

                  <div className="font-bold text-blue-600 text-lg">
                    ₹{item.price}
                  </div>

                </div>
              </div>
            ))}

        </div>
      </div>
    </div>
  );
}

export default OrderPage;