import { useEffect, useState } from "react";
import axios from "axios";

export default function ViewAdmissions() {
  const [admissions, setAdmissions] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/admission/all")
      .then(res => setAdmissions(res.data))
      .catch(err => console.error("Failed to fetch admissions", err));
  }, []);

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow min-h-screen overflow-x-auto">
      <h2 className="text-2xl font-bold mb-6 text-blue-800 dark:text-white">📋 All Submitted Admissions</h2>

      <table className="min-w-full border text-sm">
        <thead className="bg-blue-700 text-white">
          <tr>
            <th className="p-3">Name</th>
            <th className="p-3">Age</th>
            <th className="p-3">Grade</th>
            <th className="p-3">Gender</th>
            <th className="p-3">Contact</th>
            <th className="p-3">Level</th>
            <th className="p-3">Stream</th>
            <th className="p-3">O/L Results</th>
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-gray-900 text-gray-800 dark:text-white">
          {admissions.map((a) => (
            <tr key={a.id} className="border-t dark:border-gray-700">
              <td className="p-3">{a.name}</td>
              <td className="p-3">{a.age}</td>
              <td className="p-3">{a.grade}</td>
              <td className="p-3">{a.gender}</td>
              <td className="p-3">{a.contact}</td>
              <td className="p-3">{a.level}</td>
              <td className="p-3">{a.stream || "-"}</td>
              <td className="p-3">
                {a.olSubjects
                  ? a.olSubjects.split(",").map((s, i) => (
                      <span key={i} className="block text-xs">{s}</span>
                    ))
                  : "-"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
