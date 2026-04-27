import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { saveToken } from "../utils/auth";

function Login() {
  const BASE = import.meta.env.VITE_DJANGO_BASE_URL;

  const [form, setForm] = useState({ username: "", password: "" });
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");
    setLoading(true);

    try {
      const response = await fetch(`${BASE}/api/token/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (response.ok) {
        saveToken(data);
        setMsg("Login successful! Redirecting...");

        setTimeout(() => {
          navigate("/");
        }, 800);
      } else {
        setMsg(data.detail || "Login failed. Please try again.");
      }
    } catch (error) {
      setMsg("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const isSuccess = msg.toLowerCase().includes("successful");

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-slate-50 px-4 py-10">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg border border-slate-100 p-8 hover:shadow-xl transition-all duration-300">
        <div className="text-center mb-7">
          <div className="mx-auto mb-3 w-14 h-14 rounded-full bg-blue-50 flex items-center justify-center text-3xl">
            🛒
          </div>

          <h2 className="text-3xl font-extrabold text-slate-900">
            Welcome Back
          </h2>

          <p className="text-sm text-slate-500 mt-2">
            Login to continue shopping with Divya Cart
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
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
                placeholder="Enter your password"
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
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-center text-sm text-slate-500 mt-6">
          Don&apos;t have an account?{" "}
          <Link to="/signup" className="text-blue-600 font-semibold hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;