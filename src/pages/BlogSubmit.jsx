import { useState } from "react";
import axios from "axios";

export default function BlogSubmit() {
  const [form, setForm] = useState({ name: "", title: "", content: "" });

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
      <div className="max-w-2xl mx-auto bg-gray-50 dark:bg-gray-800 p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">📝 Submit Your Blog</h2>
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
            placeholder="Your Blog Content"
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
    </section>
  );
}

