import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Auth from './pages/Auth';
import AdminAuth from "./pages/AdminAuth";
import AdminDashboard from './components/AdminDashBoard';
import Market from "./pages/Market";

function App() {
  const location = useLocation();

  // Hide navbar on admin pages
  const hideNavbar = location.pathname.startsWith("/admin");

  return (
    <div className="min-h-screen bg-slate-950 font-sans selection:bg-green-500/30">
      
      {/* Navbar only for user pages */}
      {!hideNavbar && <Navbar />}

      <main>
        <Routes>
          {/* User Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/market" element={<Market />} />

          {/* Admin Routes */}
          <Route path="/admin" element={<AdminAuth />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />

          {/* Redirect unknown routes */}
          <Route path="*" element={<Navigate to="/" />} />
          <Route path="/market" element={<Market />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;