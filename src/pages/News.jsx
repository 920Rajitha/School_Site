export default function News() {
    return (
      <section className="min-h-screen py-20 px-4 bg-white dark:bg-gray-900 text-gray-800 dark:text-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">📰 School News & Announcements</h2>
  
          {/* This will display news posts dynamically */}
          <p className="text-center text-gray-500">No announcements yet. (Admin can add via dashboard)</p>
        </div>
      </section>
    );
  }

  