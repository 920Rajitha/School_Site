import { useEffect, useState } from "react";
import axios from "axios";

export default function ViewComments() {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/contact/all");
        setComments(res.data);
      } catch (err) {
        console.error("Error fetching comments:", err);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow min-h-screen">
      <h2 className="text-2xl font-bold mb-6 dark:text-white">📬 Contact Form Messages</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left border dark:text-white">
          <thead className="bg-gray-200 dark:bg-gray-700">
            <tr>
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Message</th>
              <th className="p-3">Date</th>
            </tr>
          </thead>
          <tbody>
            {comments.map((c) => (
              <tr key={c.id} className="border-t dark:border-gray-600">
                <td className="p-3">{c.name}</td>
                <td className="p-3">{c.email}</td>
                <td className="p-3">{c.message}</td>
                <td className="p-3">{new Date(c.submittedOn).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
