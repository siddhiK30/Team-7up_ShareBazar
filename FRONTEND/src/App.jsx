import React, { useEffect, useState } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar";
// ❌ REMOVE ExploreNavbar from here

import Home from "./pages/Home";
import Auth from "./pages/Auth";
import AdminAuth from "./pages/AdminAuth";
import AdminDashboard from "./components/AdminDashBoard";
import Market from "./pages/Market";
import Explore from "./pages/Explore";

function App() {
  const location = useLocation();

  // ✅ Hide navbar on admin + explore
  const hideNavbar =
    location.pathname.startsWith("/admin") ||
    location.pathname.startsWith("/explore");

  // Token logic (keep if needed later)
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    const updateToken = () => {
      setToken(localStorage.getItem("token"));
    };

    window.addEventListener("storage", updateToken);
    return () => window.removeEventListener("storage", updateToken);
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 font-sans selection:bg-green-500/30">

      {/* ✅ ONLY normal navbar (not for explore) */}
      {!hideNavbar && <Navbar />}

      <main>
        <Routes>
          {/* User Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/market" element={<Market />} />
          <Route path="/explore" element={<Explore />} />

          {/* Admin Routes */}
          <Route path="/admin" element={<AdminAuth />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />

          {/* Redirect */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;