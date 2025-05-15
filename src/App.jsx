import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Admission from './pages/Admission';
import AdminNotice from './pages/AdminNotice';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import ViewAdmissions from './pages/ViewAdmissions';
import News from "./pages/News"; 
import Blog from "./pages/Blog";
import BlogList from "./pages/BlogList";
import BlogSubmit from "./pages/BlogSubmit";
import AdminBlogs from "./pages/AdminBlogs";
import AdminViewBlogs from "./pages/AdminViewBlogs";// ✅ import new admin page

function App() {
  return (
    <Router>
      <Routes>
        {/* ✅ Routes */}
        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/admission" element={<Admission />} />
        <Route path="/admin-notice" element={<AdminNotice />} /> 
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/admission" element={<Admission />} />            // 🧒 student form
        <Route path="/view-admissions" element={<ViewAdmissions />} />
        <Route path="/news" element={<News />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog" element={<BlogList />} />
        <Route path="/blog-submit" element={<BlogSubmit />} /> 
        <Route path="/admin-blogs" element={<AdminBlogs />} />  
        <Route path="/admin-view-blogs" element={<AdminViewBlogs />} />  {/* ✅ NEW */}
      </Routes>
    </Router>
  );
}

export default App;
