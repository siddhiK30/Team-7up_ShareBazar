// src/App.jsx
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import AdminAuth from "./pages/AdminAuth";
import AdminDashboard from "./components/AdminDashBoard";
import Market from "./pages/Market";
import Explore from "./pages/Explore";
import PortfolioPage from "./pages/PortfolioPage";
import Dashboard from "./pages/Dashboard";

// ✅ User Route Guards
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";

// ✅ Admin Route Guards
import AdminProtectedRoute from "./components/AdminProtectedRoute";
import AdminPublicRoute from "./components/AdminPublicRoute";

function App() {
  const location = useLocation();

  // Hide navbar on these pages (they have their own navbar)
  const hideNavbar =
    location.pathname.startsWith("/admin") ||
    location.pathname.startsWith("/explore") ||
    location.pathname.startsWith("/portfolio") ||
    location.pathname.startsWith("/dashboard");

  return (
    <div className="min-h-screen bg-slate-950 font-sans selection:bg-green-500/30">
      {/* Navbar only for public pages */}
      {!hideNavbar && <Navbar />}

      <main>
        <Routes>
          {/* ══════ PUBLIC ROUTES ══════ */}
          <Route path="/" element={<Home />} />
          <Route path="/market" element={<Market />} />

          {/* ══════ USER AUTH (non-logged-in only) ══════ */}
          <Route
            path="/auth"
            element={
              <PublicRoute>
                <Auth />
              </PublicRoute>
            }
          />

          {/* ══════ USER PROTECTED ROUTES ══════ */}
          <Route
            path="/explore"
            element={
              <ProtectedRoute>
                <Explore />
              </ProtectedRoute>
            }
          />

          <Route
            path="/portfolio"
            element={
              <ProtectedRoute>
                <PortfolioPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          {/* ══════ ADMIN AUTH (non-logged-in admin only) ══════ */}
          <Route
            path="/admin"
            element={
              <AdminPublicRoute>
                <AdminAuth />
              </AdminPublicRoute>
            }
          />

          {/* ══════ ADMIN PROTECTED ROUTES ══════ */}
          <Route
            path="/admin/dashboard"
            element={
              <AdminProtectedRoute>
                <AdminDashboard />
              </AdminProtectedRoute>
            }
          />

          {/* ══════ FALLBACK ══════ */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;