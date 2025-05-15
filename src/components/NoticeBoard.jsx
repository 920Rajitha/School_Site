import { useEffect, useState } from "react";
import axios from "axios";

export default function NoticeBoard() {
  const [notices, setNotices] = useState([]);

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/notices");
        setNotices(res.data);
      } catch (err) {
        console.error("Error fetching notices:", err);
      }
    };
    fetchNotices();
  }, []);

  return (
    <section id="notices" className="py-16 px-4 bg-blue-50 dark:bg-gray-800">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-10 dark:text-white">📢 Notice Board</h2>

        {notices.length === 0 ? (
          <p className="text-center text-gray-600 dark:text-gray-300">No notices available.</p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {notices.map((notice, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-700 rounded-xl shadow-md p-6 transition transform hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-bold text-blue-800 dark:text-yellow-400">{notice.title}</h3>
                  <span className="text-sm bg-blue-100 text-blue-700 dark:bg-gray-600 dark:text-white px-2 py-1 rounded">
                    {new Date(notice.postedOn).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-sm text-gray-700 dark:text-gray-200">{notice.content}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
