// 📦 Imports
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ViewAdmissions from "./ViewAdmissions";
import AddNotice from "./AdminNotice";
import ViewComments from "./ViewComments";
import AdminViewBlogs from "./AdminViewBlogs";
import ManageTeachers from "./ManageTeachers";
import MonthlyStatsChart from "../components/MonthlyStatsChart";

import {
  FaClipboardList,
  FaComments,
  FaSignOutAlt,
  FaUserGraduate,
  FaBullhorn,
  FaBlog,
  FaTachometerAlt,
  FaHome,
} from "react-icons/fa";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [view, setView] = useState("home");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [stats, setStats] = useState({ admissions: 0, notices: 0, blogs: 0 });

  // 🔐 Check admin login
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("adminLoggedIn");
    if (!isLoggedIn) {
      navigate("/admin-login");
    }
  }, [navigate]);

  // 📈 Fetch real-time stats
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/stats");
        setStats(res.data);
      } catch (err) {
        console.error("Failed to fetch stats", err);
      }
    };
    fetchStats();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("adminLoggedIn");
    navigate("/admin-login");
  };

  const handleBackToHome = () => {
    localStorage.removeItem("adminLoggedIn"); // 🔓 Clear login session
    navigate("/home"); // 🏠 Go to homepage
  };
  

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white transition-all">
      {/* 📱 Topbar (mobile) */}
      <div className="flex justify-between items-center md:hidden p-4 bg-blue-800 text-white">
        <h2 className="text-lg font-bold">Admin Panel</h2>
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-3xl">☰</button>
      </div>

      {/* 🧭 Sidebar */}
      <aside
        className={`w-64 bg-blue-900 text-white p-6 space-y-4 fixed md:relative top-0 left-0 z-50 h-full transition-transform duration-300 ease-in-out 
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        <h2 className="text-2xl font-bold mb-6 hidden md:block">Admin Panel</h2>

        {[
          { key: "home", label: "Dashboard", icon: <FaTachometerAlt /> },
          { key: "notice", label: "Add Notice", icon: <FaBullhorn /> },
          { key: "admissions", label: "View Admissions", icon: <FaUserGraduate /> },
          { key: "comments", label: "View Comments", icon: <FaComments /> },
          { key: "blogs", label: "View Blogs", icon: <FaBlog /> },
          { key: "teachers", label: "Manage Teachers", icon: <FaClipboardList /> },
        ].map((item) => (
          <button
            key={item.key}
            onClick={() => setView(item.key)}
            className={`flex items-center gap-3 text-left p-2 rounded w-full hover:bg-blue-700 transition ${
              view === item.key ? "bg-blue-700" : ""
            }`}
          >
            {item.icon} {item.label}
          </button>
        ))}

        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 p-2 mt-4 rounded w-full flex items-center gap-2"
        >
          <FaSignOutAlt /> Logout
        </button>
      </aside>

      {/* 🖥 Main Panel */}
      <main className="flex-1 p-6 mt-4 md:mt-0">
        {view === "home" && (
          <>
            {/* 🏠 Back to Home */}
            <div className="flex justify-end mb-4">
              <button
                onClick={handleBackToHome}
                className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
              >
                <FaHome /> Back to Home
              </button>
            </div>

            <h1 className="text-3xl font-bold mb-6">🎉 Welcome Admin</h1>

            {/* 🔢 Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8">
              <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md">
                <p className="text-sm text-gray-400">🧾 Admissions</p>
                <h2 className="text-2xl font-bold text-blue-700 dark:text-yellow-300">
                  +{stats.admissions}
                </h2>
              </div>
              <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md">
                <p className="text-sm text-gray-400">📢 Notices</p>
                <h2 className="text-2xl font-bold text-blue-700 dark:text-yellow-300">
                  +{stats.notices}
                </h2>
              </div>
              <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md">
                <p className="text-sm text-gray-400">📝 Blogs</p>
                <h2 className="text-2xl font-bold text-blue-700 dark:text-yellow-300">
                  +{stats.blogs}
                </h2>
              </div>
            </div>

            {/* 📈 Chart Section */}
            <MonthlyStatsChart />

            <p className="text-gray-600 dark:text-gray-300 mt-6">
              Use the sidebar to manage admissions, notices, blogs, and student comments efficiently.
            </p>
          </>
        )}

        {view === "notice" && <AddNotice />}
        {view === "admissions" && <ViewAdmissions />}
        {view === "comments" && <ViewComments />}
        {view === "blogs" && <AdminViewBlogs />}
        {view === "teachers" && <ManageTeachers />}
      </main>
    </div>
  );
}
