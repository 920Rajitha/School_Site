import { useState } from "react";

// 🖼 Sample data (you can expand this)
const images = [
  { src: "/gallery/annual.jpg", title: "Annual Day", type: "Annual", year: 2023 },
  { src: "/gallery/sports.jpg", title: "Sports Meet", type: "Sports", year: 2024 },
  { src: "/gallery/exhibition.jpg", title: "Science Workshop", type: "Exhibition", year: 2023 },

];

const types = ["All", "Annual", "Sports", "Workshop", "Exhibition"];
const years = ["All", "2024", "2023"]; // Add more years as needed

export default function GallerySection() {
  const [modalImage, setModalImage] = useState(null);
  const [selectedType, setSelectedType] = useState("All");
  const [selectedYear, setSelectedYear] = useState("All");

  const filtered = images.filter((img) => {
    const typeMatch = selectedType === "All" || img.type === selectedType;
    const yearMatch = selectedYear === "All" || img.year.toString() === selectedYear;
    return typeMatch && yearMatch;
  });

  return (
    <section id="gallery" className="py-20 px-4 bg-white dark:bg-gray-900 text-gray-800 dark:text-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8">📷 School Gallery</h2>

        {/* Filter Controls */}
        <div className="flex flex-wrap justify-center gap-4 mb-10">
          {types.map((type) => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              className={`px-4 py-2 rounded-full text-sm font-semibold border ${
                selectedType === type
                  ? "bg-blue-700 text-white"
                  : "bg-gray-100 dark:bg-gray-700 dark:text-white"
              }`}
            >
              {type}
            </button>
          ))}
          <select
            className="p-2 rounded border dark:bg-gray-700 dark:text-white text-sm"
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
          >
            {years.map((y) => (
              <option key={y}>{y}</option>
            ))}
          </select>
        </div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <p className="text-center text-sm text-gray-500">No events found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {filtered.map((img, idx) => (
              <div key={idx} className="cursor-pointer group relative overflow-hidden rounded-xl shadow-md">
                <img
                  src={img.src}
                  alt={img.title}
                  onClick={() => setModalImage(img)}
                  className="w-full h-60 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 text-white text-sm p-2">
                  {img.title} • {img.year}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Modal */}
        {modalImage && (
          <div className="fixed inset-0 z-50 bg-black bg-opacity-80 flex items-center justify-center" onClick={() => setModalImage(null)}>
            <img src={modalImage.src} alt="Full Preview" className="max-w-full max-h-[90vh] rounded-lg shadow-lg" />
          </div>
        )}
      </div>
    </section>
  );
}
