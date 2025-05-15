import { useEffect, useState } from "react";
import axios from "axios";

export default function BlogList() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/blogs/approved")
      .then(res => setBlogs(res.data))
      .catch(err => console.error("Failed to load blogs", err));
  }, []);

  return (
    <section className="min-h-screen py-20 px-4 bg-white dark:bg-gray-900 text-gray-800 dark:text-white">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-10">📚 Student Blog Posts</h2>

        {blogs.length === 0 ? (
          <p className="text-center text-gray-500">No blogs available yet.</p>
        ) : (
          blogs.map((blog) => (
            <div key={blog.id} className="mb-8 bg-gray-50 dark:bg-gray-800 p-6 rounded-xl shadow-md">
              <h3 className="text-xl font-bold mb-2 text-blue-800 dark:text-yellow-300">{blog.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">By {blog.name} • {new Date(blog.submittedOn).toLocaleString()}</p>
              <p className="text-gray-700 dark:text-white">{blog.content}</p>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
