import { useState } from "react";
import axios from "axios";

export default function Admission() {
  const [form, setForm] = useState({
    name: "",
    age: "",
    contact: "",
    grade: "",
    gender: "Male",
    level: "O/L",
    olSubjects: Array(9).fill(""),
    stream: "",
  });

  const handleOLChange = (index, value) => {
    const updatedSubjects = [...form.olSubjects];
    updatedSubjects[index] = value;
    setForm({ ...form, olSubjects: updatedSubjects });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/admission", form);
      alert("Admission submitted successfully!");
      setForm({
        name: "",
        age: "",
        contact: "",
        grade: "",
        gender: "Male",
        level: "O/L",
        olSubjects: Array(9).fill(""),
        stream: "",
      });
    } catch (err) {
      console.error(err);
      alert("Submission failed");
    }
  };

  return (
    <div className="min-h-screen bg-blue-50 dark:bg-gray-900 py-12 px-4">
      <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 shadow-lg p-8 rounded-xl">
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-900 dark:text-white">Student Admission Form</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Student Name"
            className="w-full p-3 rounded border dark:bg-gray-700 dark:text-white"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
          <input
            type="number"
            placeholder="Age"
            className="w-full p-3 rounded border dark:bg-gray-700 dark:text-white"
            value={form.age}
            onChange={(e) => setForm({ ...form, age: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Grade"
            className="w-full p-3 rounded border dark:bg-gray-700 dark:text-white"
            value={form.grade}
            onChange={(e) => setForm({ ...form, grade: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Contact Number"
            className="w-full p-3 rounded border dark:bg-gray-700 dark:text-white"
            value={form.contact}
            onChange={(e) => setForm({ ...form, contact: e.target.value })}
            required
          />

          {/* Gender */}
          <div className="flex gap-4 items-center">
            <label className="text-sm font-medium">Gender:</label>
            <select
              className="p-2 rounded border dark:bg-gray-700 dark:text-white"
              value={form.gender}
              onChange={(e) => setForm({ ...form, gender: e.target.value })}
            >
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
          </div>

          {/* Level: O/L or A/L */}
          <div className="flex gap-4 items-center">
            <label className="text-sm font-medium">Education Level:</label>
            <select
              className="p-2 rounded border dark:bg-gray-700 dark:text-white"
              value={form.level}
              onChange={(e) => setForm({ ...form, level: e.target.value })}
            >
              <option>O/L</option>
              <option>A/L</option>
            </select>
          </div>

          {/* Show O/L subjects + stream only if A/L is selected */}
          {form.level === "A/L" && (
            <>
              <h3 className="font-semibold text-lg mt-4">O/L Subject Results</h3>
              {form.olSubjects.map((subject, index) => (
                <input
                  key={index}
                  type="text"
                  placeholder={`Subject ${index + 1} Result`}
                  className="w-full p-2 rounded border dark:bg-gray-700 dark:text-white mb-2"
                  value={subject}
                  onChange={(e) => handleOLChange(index, e.target.value)}
                />
              ))}

              {/* A/L Stream */}
              <div className="flex gap-4 items-center">
                <label className="text-sm font-medium">A/L Stream:</label>
                <select
                  className="p-2 rounded border dark:bg-gray-700 dark:text-white"
                  value={form.stream}
                  onChange={(e) => setForm({ ...form, stream: e.target.value })}
                >
                  <option value="">Select Stream</option>
                  <option>Bio</option>
                  <option>Mathematics</option>
                  <option>Commerce</option>
                  <option>Arts</option>
                </select>
              </div>
            </>
          )}

          <button
            type="submit"
            className="w-full bg-blue-800 text-white py-3 rounded hover:bg-blue-900 transition"
          >
            Submit Admission
          </button>
        </form>
      </div>
    </div>
  );
}
