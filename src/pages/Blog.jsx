import { useEffect, useState } from "react";
import axios from "axios";

export default function Blog() {
  const [blogs, setBlogs] = useState([]);
  const [form, setForm] = useState({ name: "", title: "", content: "" });

  const fetchBlogs = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/blogs/approved");
      setBlogs(res.data);
    } catch (err) {
      console.error("Failed to load blogs", err);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/blogs", form);
      alert("Blog submitted for approval ✅");
      setForm({ name: "", title: "", content: "" });
    } catch (err) {
      alert("❌ Submission failed");
    }
  };

  return (
    <section className="min-h-screen py-20 px-4 bg-white dark:bg-gray-900 text-gray-800 dark:text-white">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8">📝 Student Blog</h2>

        {/* Blog Submission Form */}
        <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl shadow-md mb-12">
          <h3 className="text-xl font-semibold mb-4">✍️ Submit Your Blog</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full p-3 rounded bg-white dark:bg-gray-700"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
            <input
              type="text"
              placeholder="Blog Title"
              className="w-full p-3 rounded bg-white dark:bg-gray-700"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              required
            />
            <textarea
              placeholder="Blog Content"
              className="w-full p-3 rounded bg-white dark:bg-gray-700"
              rows="6"
              value={form.content}
              onChange={(e) => setForm({ ...form, content: e.target.value })}
              required
            ></textarea>
            <button className="w-full bg-blue-700 text-white p-3 rounded hover:bg-blue-800 transition">
              Submit Blog
            </button>
          </form>
        </div>

        {/* Approved Blog Posts */}
        <h3 className="text-2xl font-bold mb-4">📚 Latest Approved Posts</h3>
        {blogs.length === 0 ? (
          <p className="text-gray-500">No approved blogs yet.</p>
        ) : (
          blogs.map((blog) => (
            <div key={blog.id} className="mb-8 bg-gray-100 dark:bg-gray-800 p-6 rounded-xl shadow">
              <h4 className="text-xl font-bold text-blue-800 dark:text-yellow-300 mb-2">{blog.title}</h4>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">By {blog.name} • {new Date(blog.submittedOn).toLocaleString()}</p>
              <p>{blog.content}</p>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
