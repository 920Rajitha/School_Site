import { useState } from 'react';
import axios from 'axios';

export default function AdminNotice() {
  const [form, setForm] = useState({ title: '', content: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/notices', form);
      alert("Notice submitted successfully!");
      setForm({ title: '', content: '' });
    } catch (err) {
      console.error("Submit failed", err);
      alert("Failed to submit notice.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-12 px-4">
      <div className="max-w-xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-800 dark:text-white">
          Admin: Add New Notice
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Notice Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="w-full p-3 border rounded dark:bg-gray-700 dark:text-white"
            required
          />
          <textarea
            placeholder="Notice Content"
            value={form.content}
            onChange={(e) => setForm({ ...form, content: e.target.value })}
            className="w-full p-3 border rounded h-32 dark:bg-gray-700 dark:text-white"
            required
          ></textarea>
          <button
            type="submit"
            className="w-full bg-blue-700 text-white py-3 rounded hover:bg-blue-800 transition"
          >
            Post Notice
          </button>
        </form>
      </div>
    </div>
  );
}
