import React, { useEffect, useState } from "react";
import { TrendingUp, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const ExploreNavbar = () => {
  const [userEmail, setUserEmail] = useState("User");
  const navigate = useNavigate();

  // ✅ Get user from token
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUserEmail(decoded.sub);
      } catch {
        setUserEmail("User");
      }
    }
  }, []);

  // ✅ Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/"); // go to home
  };

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">

        {/* LEFT */}
        <div className="flex items-center space-x-10">

          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="bg-emerald-500 p-1.5 rounded-md">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-900">
              Share<span className="text-emerald-500">Bazar</span>
            </span>
          </Link>

          {/* Links */}
          <div className="flex items-center space-x-6 font-medium text-gray-700">
            <Link to="/" className="hover:text-emerald-500 transition">
              Stocks
            </Link>

            <Link to="/" className="hover:text-emerald-500 transition">
              Mutual Funds
            </Link>
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex items-center space-x-4">

          {/* User */}
          <div className="flex items-center space-x-2 bg-gray-100 px-3 py-1.5 rounded-full">
            <User className="w-4 h-4 text-emerald-600" />
            <span className="text-sm font-semibold text-gray-800">
              {userEmail}
            </span>
          </div>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
          >
            Logout
          </button>

        </div>
      </div>
    </nav>
  );
};

export default ExploreNavbar;