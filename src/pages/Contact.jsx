import { useState } from "react";
import axios from "axios";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/contact", form);
      alert("✅ Message submitted successfully!");
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      alert("❌ Failed to send message.");
    }
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-blue-50 to-white dark:from-gray-800 dark:to-gray-900 py-20 px-4 text-gray-800 dark:text-white">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        {/* Left: 
        Contact Info */}

        

        
        <div>
          <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
            📍 Contact Information
          </h2>
          <p className="mb-2 font-medium">Harangala National School</p>
          <p className="mb-4 text-gray-600 dark:text-gray-400">Harangalagama,Nawalapitiya,Sri Lanka</p>

          <p className="mb-2">📞 <span className="font-medium">Phone:</span> 011-2222222</p>
          <p className="mb-6">📧 <span className="font-medium">Email:</span> school@harangala.lk</p>

          <div className="mt-8 space-y-2 text-sm text-gray-600 dark:text-gray-400">
            <p>🕒 Office Hours: 8:00am - 2:30pm</p>
            <p>📅 Monday to Friday</p>
          </div>
        </div>

        {/* Right: Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg space-y-5"
        >
          <h3 className="text-2xl font-semibold mb-4">✉️ Send us a message</h3>

          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full p-3 rounded-lg bg-gray-100 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:placeholder:text-gray-300"
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full p-3 rounded-lg bg-gray-100 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:placeholder:text-gray-300"
          />
          <textarea
            name="message"
            placeholder="Your Message"
            rows="5"
            value={form.message}
            onChange={handleChange}
            required
            className="w-full p-3 rounded-lg bg-gray-100 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:placeholder:text-gray-300"
          ></textarea>

          <button
            type="submit"
            className="bg-blue-700 hover:bg-blue-800 transition text-white font-semibold px-6 py-3 rounded-lg shadow"
          >
            Submit
          </button>
        </form>
      </div>
    </section>
  );
}
