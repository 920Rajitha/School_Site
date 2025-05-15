import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post("http://localhost:5000/api/auth/login", form);
      setLoading(false);
      alert("Login successful!");
      navigate("/home");
    } catch (err) {
      console.error(err);
      alert("Login failed");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-300 dark:from-gray-800 dark:to-gray-900">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg">
        <h1 className="text-2xl font-bold text-center text-blue-800 dark:text-white mb-1">
          Harangala National School
        </h1>
        <h2 className="text-center text-xl font-semibold text-gray-700 dark:text-gray-200 mb-6">
          Login to your account
        </h2>

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 border rounded dark:bg-gray-700 dark:text-white"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 border rounded dark:bg-gray-700 dark:text-white"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />

          {/* ✅ Rounded Loading Button */}
          <button
            type="submit"
            className="w-full py-3 bg-blue-700 text-white rounded-full hover:bg-blue-800 transition flex items-center justify-center"
          >
            {loading ? (
              <div className="h-5 w-5 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              "Login"
            )}
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-4">
          Don’t have an account?{" "}
          <a href="/" className="text-blue-600 hover:underline">Sign Up</a>
        </p>
      </div>
    </div>
  );
}
