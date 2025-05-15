import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminBlogs() {
  const [blogs, setBlogs] = useState([]);

  const fetchPending = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/blogs/pending");
      setBlogs(res.data);
    } catch (err) {
      console.error("Failed to fetch blogs", err);
    }
  };

  const approveBlog = async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/blogs/approve/${id}`);
      fetchPending(); // Refresh
    } catch {
      alert("Approval failed");
    }
  };

  const deleteBlog = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/blogs/${id}`);
      fetchPending(); // Refresh
    } catch {
      alert("Delete failed");
    }
  };

  useEffect(() => {
    fetchPending();
  }, []);

  return (
    <section className="min-h-screen py-20 px-4 bg-white dark:bg-gray-900 text-gray-800 dark:text-white">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center">🛡 Pending Blog Approvals</h2>

        {blogs.length === 0 ? (
          <p className="text-center text-gray-500">No pending blogs.</p>
        ) : (
          blogs.map((blog) => (
            <div key={blog.id} className="mb-6 bg-gray-100 dark:bg-gray-800 p-6 rounded-xl shadow">
              <h3 className="text-xl font-bold mb-2 text-blue-700 dark:text-yellow-300">{blog.title}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">By {blog.name}</p>
              <p className="mb-4">{blog.content}</p>
              <div className="flex gap-4">
                <button
                  onClick={() => approveBlog(blog.id)}
                  className="bg-green-600 text-white px-4 py-2 rounded"
                >
                  ✅ Approve
                </button>
                <button
                  onClick={() => deleteBlog(blog.id)}
                  className="bg-red-600 text-white px-4 py-2 rounded"
                >
                  ❌ Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
