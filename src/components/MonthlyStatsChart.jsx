import { useEffect, useState } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// ✅ Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function MonthlyStatsChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/stats/monthly-admissions")
      .then(res => setData(res.data))
      .catch(err => console.error("Chart Data Error:", err));
  }, []);

  // Prepare chart labels and values
  const labels = data.map((item) => item.month || "Unknown");
  const values = data.map((item) => item.count);

  const chartData = {
    labels,
    datasets: [
      {
        label: "📈 Admissions per Month",
        data: values,
        backgroundColor: "#2563eb", // Tailwind blue-600
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Monthly Admissions Stats" },
    },
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md mt-6">
      <Bar data={chartData} options={options} />
    </div>
  );
}
