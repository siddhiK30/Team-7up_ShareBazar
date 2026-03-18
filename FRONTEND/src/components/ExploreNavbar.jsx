import React, { useEffect, useState } from "react";
import { TrendingUp, User, Wallet, Briefcase } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { getWallet } from "../services/WalletService";

const ExploreNavbar = () => {
  const [userEmail, setUserEmail] = useState("User");
  const [walletBalance, setWalletBalance] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUserEmail(decoded.sub);

        // ✅ Fetch wallet balance
        const userId = decoded.userId || decoded.sub;
        getWallet(userId)
          .then((data) => setWalletBalance(data.balance))
          .catch(() => setWalletBalance(null));
      } catch {
        setUserEmail("User");
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
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
            <Link to="/explore" className="hover:text-emerald-500 transition">
              Stocks
            </Link>
            <Link to="/portfolio" className="flex items-center space-x-1 hover:text-emerald-500 transition">
              <Briefcase className="w-4 h-4" />
              <span>Portfolio</span>
            </Link>
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex items-center space-x-4">

          {/* ✅ Wallet Balance */}
          {walletBalance !== null && (
            <div className="flex items-center space-x-2 bg-blue-50 
                            border border-blue-200 px-4 py-2 rounded-full">
              <Wallet className="w-4 h-4 text-blue-500" />
              <span className="text-sm font-bold text-blue-700">
                ₹{Number(walletBalance).toLocaleString("en-IN", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </span>
            </div>
          )}

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
            className="bg-red-500 text-white px-4 py-2 rounded-md 
                       hover:bg-red-600 transition font-semibold text-sm"
          >
            Logout
          </button>

        </div>
      </div>
    </nav>
  );
};

export default ExploreNavbar;