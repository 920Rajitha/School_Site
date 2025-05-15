import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false); // ✅ for progress
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    // Hardcoded login
    if (form.username === "admin" && form.password === "admin123") {
      setLoading(true); // ✅ Show progress bar

      setTimeout(() => {
        localStorage.setItem("adminLoggedIn", true);
        navigate("/admin-dashboard");
      }, 2000); // wait 2 seconds
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-100 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-800 dark:text-white">
          Admin Login
        </h2>

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="text"
            placeholder="Username"
            className="w-full p-3 rounded border dark:bg-gray-700 dark:text-white"
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 rounded border dark:bg-gray-700 dark:text-white"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-700 hover:bg-blue-800 text-white py-3 rounded transition"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* ✅ Progress Bar */}
        {loading && (
          <div className="mt-4 w-full bg-gray-300 rounded-full overflow-hidden">
            <div className="h-2 bg-blue-600 animate-pulse w-full"></div>
          </div>
        )}
      </div>
    </div>
  );
}
