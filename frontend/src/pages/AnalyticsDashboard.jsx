import { useEffect, useState } from "react";
import axios from "axios";
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    BarChart, Bar,
    PieChart, Pie, Cell, Legend
} from "recharts";

import { getAccessToken  } from "../utils/auth";

const BASE_URL = "http://127.0.0.1:8000/api/analytic";

const COLORS = ["#8b5cf6", "#06b6d4", "#f59e0b", "#10b981", "#ef4444"];

function AnalyticsDashboard() {
    const [summary, setSummary]               = useState(null);
    const [revenue, setRevenue]               = useState([]);
    const [topProducts, setTopProducts]       = useState([]);
    const [ordersByStatus, setOrdersByStatus] = useState([]);
    const [loading, setLoading]               = useState(true);

    useEffect(() => {
        const token = getAccessToken();
        const headers = { Authorization: `Bearer ${token}` };


        Promise.all([
            axios.get(`${BASE_URL}/summary/`,          { headers }),
            axios.get(`${BASE_URL}/revenue/`,          { headers }),
            axios.get(`${BASE_URL}/top-products/`,     { headers }),
            axios.get(`${BASE_URL}/orders-by-status/`, { headers }),
        ])
        .then(([summaryRes, revenueRes, topRes, statusRes]) => {
            setSummary(summaryRes.data);
            setRevenue(revenueRes.data);
            setTopProducts(topRes.data);
            setOrdersByStatus(statusRes.data);
        })
        .catch(err => console.error("Analytics fetch error:", err))
        .finally(() => setLoading(false));
    }, []);

    if (loading) return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <p className="text-purple-600 text-xl font-semibold">Loading Analytics...</p>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <h1 className="text-3xl font-bold text-purple-700 mb-8">Analytics Dashboard</h1>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                <SummaryCard title="Total Revenue"   value={`₹${summary?.total_revenue}`}   color="bg-purple-500" />
                <SummaryCard title="Total Orders"    value={summary?.total_orders}            color="bg-cyan-500"   />
                <SummaryCard title="Total Customers" value={summary?.total_customers}         color="bg-amber-500"  />
            </div>

            {/* Revenue Over Time — Line Chart */}
            <div className="bg-white rounded-2xl shadow p-6 mb-8">
                <h2 className="text-xl font-semibold text-gray-700 mb-4">Revenue Over Time (Last 30 Days)</h2>
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={revenue}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="day" tick={{ fontSize: 11 }} />
                        <YAxis />
                        <Tooltip formatter={(val) => `₹${val}`} />
                        <Line type="monotone" dataKey="revenue" stroke="#8b5cf6" strokeWidth={2} dot={false} />
                    </LineChart>
                </ResponsiveContainer>
            </div>

            {/* Top Products — Bar Chart */}
            <div className="bg-white rounded-2xl shadow p-6 mb-8">
                <h2 className="text-xl font-semibold text-gray-700 mb-4">Top 10 Products by Revenue</h2>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={topProducts}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="product" tick={{ fontSize: 11 }} />
                        <YAxis />
                        <Tooltip formatter={(val) => `₹${val}`} />
                        <Bar dataKey="revenue" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </div>

            {/* Orders by Status — Pie Chart */}
            <div className="bg-white rounded-2xl shadow p-6 mb-8">
                <h2 className="text-xl font-semibold text-gray-700 mb-4">Orders by Status</h2>
                <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                        <Pie
                            data={ordersByStatus}
                            dataKey="order_count"
                            nameKey="status"
                            cx="50%"
                            cy="50%"
                            outerRadius={100}
                            label={({ status, percent }) =>
                                `${status} ${(percent * 100).toFixed(0)}%`
                            }
                        >
                            {ordersByStatus.map((_, index) => (
                                <Cell key={index} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Legend />
                        <Tooltip formatter={(val) => `${val} orders`} />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}

// Reusable Summary Card Component
function SummaryCard({ title, value, color }) {
    return (
        <div className={`${color} text-white rounded-2xl shadow p-6`}>
            <p className="text-sm font-medium opacity-80">{title}</p>
            <p className="text-4xl font-bold mt-2">{value}</p>
        </div>
    );
}

export default AnalyticsDashboard;