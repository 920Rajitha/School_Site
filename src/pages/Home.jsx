import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import NoticeBoard from "../components/NoticeBoard";
import GallerySection from "../components/GallerySection"; // Background image

export default function Home() {
  const [tab, setTab] = useState("history");
  const [students, setStudents] = useState(0);
  const [staff, setStaff] = useState(0);
  const [awards, setAwards] = useState(0);

  useEffect(() => {
    let s = 0,
      st = 0,
      a = 0;
    const interval = setInterval(() => {
      if (s < 1200) setStudents((s += 20));
      if (st < 80) setStaff((st += 2));
      if (a < 25) setAwards((a += 1));
      if (s >= 1200 && st >= 80 && a >= 25) clearInterval(interval);
    }, 30);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-blue-50 dark:bg-gray-900 text-gray-800 dark:text-white scroll-smooth">
      <Navbar />

      {/* Welcome Section */}
      <section
        id="home"
        className="h-screen flex flex-col items-center justify-center bg-cover bg-center text-white px-4 relative"
        style={{
          backgroundImage: `url('${import.meta.env.BASE_URL}hero-bg.jpg')`, // ✅ Updated path
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>

        <div className="relative z-10 text-center max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-extrabold drop-shadow-md mb-4">
            Welcome to{" "}
            <span className="text-yellow-400">Harangala National School</span>
          </h1>
          <p className="text-lg md:text-xl font-medium drop-shadow-sm">
            A place of <span className="text-blue-300">learning</span>,{" "}
            <span className="text-green-300">growth</span>, and{" "}
            <span className="text-pink-300">excellence</span>.
          </p>
          <p className="mt-2 text-sm md:text-base">
            Empowering the future of our nation. 🇱🇰
          </p>

          <a
            href="#about"
            className="mt-6 inline-block px-6 py-3 bg-blue-700 hover:bg-blue-800 rounded-full text-white text-sm font-semibold shadow-md transition"
          >
            Learn More About Us
          </a>
        </div>
      </section>

      {/* About Section */}
      <section
        id="about"
        className="py-20 px-4 bg-white dark:bg-gray-900 text-gray-800 dark:text-white"
      >
        <div className="max-w-6xl mx-auto space-y-10">
          {/* Principal Welcome */}
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-2">
              Welcome Message from the Principal
            </h2>
            <p className="text-lg max-w-3xl mx-auto">
              "At Harangala National School, we believe in shaping young minds
              with discipline, knowledge, and compassion. We invite you to
              explore our rich legacy of education and excellence."
            </p>
          </div>

          {/* Counters */}
          <div className="flex justify-center gap-10 text-center text-blue-700 dark:text-yellow-300 font-bold text-2xl">
            <div>
              <p>{students}+</p>
              <span className="text-sm">Students</span>
            </div>
            <div>
              <p>{staff}+</p>
              <span className="text-sm">Teachers</span>
            </div>
            <div>
              <p>{awards}+</p>
              <span className="text-sm">Achievements</span>
            </div>
          </div>

          {/* Tabs */}
          <div className="bg-gray-100 dark:bg-gray-800 rounded-xl p-6 shadow-lg">
            <div className="flex justify-center gap-6 mb-6">
              {["history", "mission", "vision"].map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={`px-4 py-2 rounded-full font-semibold transition ${
                    tab === t
                      ? "bg-blue-600 text-white"
                      : "bg-white dark:bg-gray-700 text-gray-800 dark:text-white border"
                  }`}
                >
                  {t.charAt(0).toUpperCase() + t.slice(1)}
                </button>
              ))}
            </div>

            {tab === "history" && (
              <p className="text-center max-w-3xl mx-auto">
                Established in the heart of Harangala, our school has nurtured
                generations of learners for over 50 years. We proudly uphold a
                tradition of excellence in academics and community service.
              </p>
            )}
            {tab === "mission" && (
              <p className="text-center max-w-3xl mx-auto">
                To foster a nurturing learning environment where students grow
                intellectually, emotionally, and socially to become responsible
                global citizens.
              </p>
            )}
            {tab === "vision" && (
              <p className="text-center max-w-3xl mx-auto">
                To be a nationally recognized school committed to innovation,
                inclusion, and inspirational leadership in education.
              </p>
            )}
          </div>

          {/* Gallery Section */}
          <GallerySection />
        </div>
      </section>

      {/* Notice Board Section */}
      <NoticeBoard />

      {/* Contact Section */}
      <section
        id="contact"
        className="py-16 px-4 bg-white dark:bg-gray-800"
      >
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Contact Us</h2>
          <p>We're here to help! For inquiries, reach out via phone or email.</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-blue-900 dark:bg-gray-950 text-white px-6 py-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo */}
          <div className="text-center md:text-left">
            <img
              src={`${import.meta.env.BASE_URL}logo.png`} // ✅ Updated path
              alt="School Logo"
              className="w-18 h-16 mx-auto md:mx-0 mb-2"
            />
            <h3 className="text-xl font-bold">Harangala National School</h3>
            <p className="text-sm mt-2 text-gray-300">
              Inspiring minds. Building futures.
            </p>
          </div>

          {/* Links */}
          <div className="text-center md:text-left">
            <h4 className="text-lg font-semibold mb-2">Quick Links</h4>
            <ul className="space-y-1 text-sm text-gray-300">
              <li><a href="#home" className="hover:underline">Home</a></li>
              <li><a href="#about" className="hover:underline">About</a></li>
              <li><a href="#contact" className="hover:underline">Contact</a></li>
              <li><a href="/admission" className="hover:underline">Admissions</a></li>
              <li><a href="/admin-login" className="hover:underline">Admin Panel</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="text-center md:text-left">
            <h4 className="text-lg font-semibold mb-2">Contact Us</h4>
            <p className="text-sm text-gray-300">📍 Harangala, Sri Lanka</p>
            <p className="text-sm text-gray-300">📞 011-2222222</p>
            <p className="text-sm text-gray-300">📧 school@harangala.lk</p>
          </div>
        </div>

        <div className="text-center text-sm text-gray-400 mt-10 border-t border-blue-700 pt-4">
          © {new Date().getFullYear()} Harangala National School. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
