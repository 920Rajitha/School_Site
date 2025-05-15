import { useEffect, useState } from "react";
import axios from "axios";

export default function ManageTeachers() {
  const [form, setForm] = useState({
    name: "",
    subject: "",
    contact: "",
    email: "",
  });

  const [teachers, setTeachers] = useState([]);

  // ✅ Fetch all teachers
  const fetchTeachers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/teachers");
      setTeachers(res.data);
    } catch (err) {
      console.error("Failed to fetch teachers", err);
    }
  };

  useEffect(() => {
    fetchTeachers();
  }, []);

  // ✅ Add new teacher
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/teachers", form);
      setForm({ name: "", subject: "", contact: "", email: "" });
      fetchTeachers();
      alert("Teacher added!");
    } catch (err) {
      console.error("Add teacher error", err);
      alert("Failed to add teacher");
    }
  };

  // ✅ Delete teacher
  const deleteTeacher = async (id) => {
    if (!window.confirm("Are you sure you want to delete this teacher?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/teachers/${id}`);
      fetchTeachers();
    } catch (err) {
      console.error("Delete error", err);
    }
  };

  return (
    <div className="text-gray-800 dark:text-white">
      <h2 className="text-2xl font-bold mb-6">👨‍🏫 Manage Teachers</h2>

      {/* ✅ Add Form */}
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
        <input
          type="text"
          placeholder="Teacher Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
          className="p-3 rounded border dark:bg-gray-700 dark:text-white"
        />
        <input
          type="text"
          placeholder="Subject"
          value={form.subject}
          onChange={(e) => setForm({ ...form, subject: e.target.value })}
          required
          className="p-3 rounded border dark:bg-gray-700 dark:text-white"
        />
        <input
          type="text"
          placeholder="Contact Number"
          value={form.contact}
          onChange={(e) => setForm({ ...form, contact: e.target.value })}
          required
          className="p-3 rounded border dark:bg-gray-700 dark:text-white"
        />
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="p-3 rounded border dark:bg-gray-700 dark:text-white"
        />
        <button
          type="submit"
          className="col-span-full bg-blue-800 text-white py-3 px-6 rounded hover:bg-blue-900"
        >
          ➕ Add Teacher
        </button>
      </form>

      {/* ✅ Teacher List */}
      <h3 className="text-xl font-semibold mb-4">📋 Teacher List</h3>
      {teachers.length === 0 ? (
        <p>No teachers added yet.</p>
      ) : (
        <div className="space-y-4">
          {teachers.map((t) => (
            <div
              key={t.id}
              className="bg-white dark:bg-gray-800 p-4 rounded shadow-md flex justify-between items-center"
            >
              <div>
                <p className="font-bold">{t.name}</p>
                <p className="text-sm text-gray-500 dark:text-gray-300">{t.subject} | {t.contact} | {t.email}</p>
              </div>
              <button
                onClick={() => deleteTeacher(t.id)}
                className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
              >
                🗑 Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
