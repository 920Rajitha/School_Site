import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const [isDark, setIsDark] = useState(false);
  const navigate = useNavigate();
  const isAdminLoggedIn = localStorage.getItem("adminLoggedIn");

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
  }, [isDark]);

  const handleAdminClick = () => {
    if (isAdminLoggedIn) {
      navigate("/admin-dashboard");
    } else {
      navigate("/admin-login");
    }
  };

  return (
    <nav className="fixed w-full bg-white dark:bg-gray-900 text-gray-800 dark:text-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Left: Logo + School Name */}
        <div className="flex items-center gap-3">
          <img src="/logo.png" alt="Logo" className="w-17 h-10" />
          <h1 className="text-lg font-bold">Harangala National School</h1>
        </div>

        {/* Right: Navigation + Toggle */}
        <div className="flex items-center gap-6">
          <div className="space-x-4 text-sm font-semibold hidden md:block">
            <a href="#home" className="hover:text-blue-500 transition">Home</a>
            <a href="#about" className="hover:text-blue-500 transition">About</a>
        
            <Link to="/admission" className="hover:text-blue-500 transition">Admission</Link>
            <Link to="/contact" className="hover:text-blue-500 transition">Contact</Link>
            <Link to="/news" className="hover:text-blue-500 transition"> 📰 News</Link>
            <Link to="/blog" className="hover:text-blue-500 transition">📝 Blog</Link>
            


            {/* ✅ Admin Dashboard Button */}
            <button
              onClick={handleAdminClick}
              className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition"
            >
              Admin Dashboard
            </button>
          </div>

          {/* Dark Mode Toggle */}
          <button
            onClick={() => setIsDark(!isDark)}
            className="bg-gray-200 dark:bg-gray-700 p-2 rounded-full transition"
          >
            {isDark ? "🌙" : "☀️"}
          </button>
        </div>
      </div>
    </nav>
  );
}
