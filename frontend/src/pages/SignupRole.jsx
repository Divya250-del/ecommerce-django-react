import { useNavigate } from "react-router-dom";

function SignupRole() {
  const navigate = useNavigate();

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-slate-50 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md text-center">

        <h2 className="text-2xl font-bold mb-6">
          Join Divya Cart
        </h2>

        <p className="text-gray-500 mb-6">
          Choose how you want to continue
        </p>

        <div className="space-y-4">

          {/* Customer */}
          <button
            onClick={() => navigate("/signup?role=customer")}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700"
          >
            🛒 Continue as Customer
          </button>

          {/* Seller */}
          <button
            onClick={() => navigate("/signup?role=seller")}
            className="w-full border border-gray-300 py-3 rounded-lg font-semibold hover:bg-gray-100"
          >
            🏪 Continue as Seller
          </button>

        </div>
      </div>
    </div>
  );
}

export default SignupRole;