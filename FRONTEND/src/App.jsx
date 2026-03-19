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
import WalletPage from "./pages/WalletPage";

import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import AdminProtectedRoute from "./components/AdminProtectedRoute";
import AdminPublicRoute from "./components/AdminPublicRoute";

function App() {
  const location = useLocation();

  // ✅ FIXED: Added /wallet to hide public navbar
  const hideNavbar =
    location.pathname.startsWith("/admin") ||
    location.pathname.startsWith("/explore") ||
    location.pathname.startsWith("/portfolio") ||
    location.pathname.startsWith("/dashboard") ||
    location.pathname.startsWith("/wallet");       // ← ADD THIS

  return (
    <div className="min-h-screen bg-slate-950 font-sans selection:bg-green-500/30">
      {!hideNavbar && <Navbar />}

      <main>
        <Routes>
          {/* PUBLIC ROUTES */}
          <Route path="/" element={<Home />} />
          <Route path="/market" element={<Market />} />

          {/* USER AUTH */}
          <Route
            path="/auth"
            element={
              <PublicRoute>
                <Auth />
              </PublicRoute>
            }
          />

          {/* ✅ PROTECTED ROUTES */}
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
          {/* ✅ FIXED: Wallet is now protected too */}
          <Route
            path="/wallet"
            element={
              <ProtectedRoute>
                <WalletPage />
              </ProtectedRoute>
            }
          />

          {/* ADMIN ROUTES */}
          <Route
            path="/admin"
            element={
              <AdminPublicRoute>
                <AdminAuth />
              </AdminPublicRoute>
            }
          />
          <Route
            path="/admin/dashboard"
            element={
              <AdminProtectedRoute>
                <AdminDashboard />
              </AdminProtectedRoute>
            }
          />

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;