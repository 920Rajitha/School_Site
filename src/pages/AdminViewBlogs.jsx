import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminViewBlogs() {
  const [blogs, setBlogs] = useState([]);

  const fetchBlogs = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/blogs/all");
      setBlogs(res.data);
    } catch (err) {
      console.error("Failed to fetch blogs", err);
    }
  };

  const approveBlog = async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/blogs/approve/${id}`);
      fetchBlogs();
    } catch {
      alert("Approval failed");
    }
  };

  const deleteBlog = async (id) => {
    if (!window.confirm("Are you sure you want to delete this blog?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/blogs/${id}`);
      fetchBlogs();
    } catch {
      alert("Delete failed");
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div className="dark:text-white">
      <h2 className="text-2xl font-bold mb-6">📝 View Blogs</h2>
      {blogs.length === 0 ? (
        <p>No blog posts found.</p>
      ) : (
        blogs.map((blog) => (
          <div key={blog.id} className="mb-6 p-4 rounded-lg bg-white dark:bg-gray-800 shadow">
            <h3 className="text-xl font-bold">{blog.title}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
              By {blog.name} | {new Date(blog.submittedOn).toLocaleString()}
            </p>
            <p className="mb-4">{blog.content}</p>
            {!blog.isApproved && (
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
            )}
            {blog.isApproved && <span className="text-green-500 font-semibold">✅ Approved</span>}
          </div>
        ))
      )}
    </div>
  );
}
