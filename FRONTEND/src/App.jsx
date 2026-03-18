import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Auth from './pages/Auth';
import AdminAuth from "./pages/AdminAuth";
import AdminDashboard from './components/AdminDashBoard';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const token = localStorage.getItem("token");

  return (
    <div className="min-h-screen bg-slate-950 font-sans selection:bg-green-500/30">
      <Navbar />
      <main>
        <Routes>

          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />

          {/* Admin Login */}
          <Route
            path="/admin"
            element={
              token ? <Navigate to="/admin/dashboard" /> : <AdminAuth />
            }
          />

          {/* Protected Dashboard */}
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          {/* Fallback Route */}
          <Route path="*" element={<Navigate to="/" />} />

        </Routes>
      </main>
    </div>
  );
}

export default App;