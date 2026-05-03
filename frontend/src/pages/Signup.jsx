import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { registerApi } from "../api/authApi";



function Signup() {
  const BASE = import.meta.env.VITE_DJANGO_BASE_URL;
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const role = params.get("role");

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    password2: "",
  });

  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const getErrorMessage = (data) => {
    if (data.username) return Array.isArray(data.username) ? data.username[0] : data.username;
    if (data.email) return Array.isArray(data.email) ? data.email[0] : data.email;
    if (data.password) return Array.isArray(data.password) ? data.password[0] : data.password;
    if (data.password2) return Array.isArray(data.password2) ? data.password2[0] : data.password2;
    if (data.detail) return data.detail;
    return "Signup failed. Please try again.";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");

    if (form.password !== form.password2) {
      setMsg("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      const data = await registerApi(form, role);

      setMsg("Account created successfully! Redirecting to login...");

      setTimeout(() => {
        navigate("/login");
      }, 800);

    } catch (error) {
      setMsg(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  const isSuccess = msg.toLowerCase().includes("successfully");

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-slate-50 px-4 py-10">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg border border-slate-100 p-8 hover:shadow-xl transition-all duration-300">
        <div className="text-center mb-7">
          <div className="mx-auto mb-3 w-14 h-14 rounded-full bg-blue-50 flex items-center justify-center text-3xl">
            🛍️
          </div>

          <h2 className="text-3xl font-extrabold text-slate-900">
            Create Account
          </h2>

          <p className="text-sm text-slate-500 mt-2">
            Join Divya Cart and start shopping today
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Username
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                👤
              </span>
              <input
                name="username"
                type="text"
                onChange={handleChange}
                value={form.username}
                placeholder="Enter your username"
                required
                className="w-full pl-11 pr-4 py-3 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500 transition"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Email
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                ✉️
              </span>
              <input
                name="email"
                type="email"
                onChange={handleChange}
                value={form.email}
                placeholder="Enter your email"
                required
                className="w-full pl-11 pr-4 py-3 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500 transition"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Password
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                🔒
              </span>
              <input
                name="password"
                type="password"
                onChange={handleChange}
                value={form.password}
                placeholder="Enter password"
                required
                className="w-full pl-11 pr-4 py-3 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500 transition"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Confirm Password
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                🔐
              </span>
              <input
                name="password2"
                type="password"
                onChange={handleChange}
                value={form.password2}
                placeholder="Confirm password"
                required
                className="w-full pl-11 pr-4 py-3 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500 transition"
              />
            </div>
          </div>

          {msg && (
            <p
              className={`text-sm rounded-lg px-4 py-3 ${
                isSuccess
                  ? "bg-green-50 text-green-700"
                  : "bg-red-50 text-red-600"
              }`}
            >
              {msg}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed transition"
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        <p className="text-center text-sm text-slate-500 mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 font-semibold hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;