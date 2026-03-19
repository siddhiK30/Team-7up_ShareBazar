import React, { useEffect, useState } from "react";
import { TrendingUp, User, Wallet, Briefcase, Plus } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { getWallet, addMoneyToWallet, createWallet } from "../services/WalletService";
import AddMoneyModal from "./AddMoneyModal";

const ExploreNavbar = () => {
  const [userEmail, setUserEmail] = useState("User");
  const [userId, setUserId] = useState(null);
  const [walletBalance, setWalletBalance] = useState(null);
  const [showAddMoney, setShowAddMoney] = useState(false);
  const [addingMoney, setAddingMoney] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUserEmail(decoded.sub);
        const id = decoded.userId || decoded.sub;
        setUserId(id);
        fetchBalance(id);
      } catch (err) {
        console.error("Token decode error:", err);
      }
    }
  }, []);

  // ✅ THIS IS THE KEY FIX — auto-create wallet if 404
  const fetchBalance = async (id) => {
    try {
      const data = await getWallet(id);
      console.log("Wallet found:", data);
      setWalletBalance(data.balance);
    } catch (err) {
      console.log("Wallet not found for userId:", id, "— Creating...");
      try {
        const newWallet = await createWallet(id);
        console.log("Wallet created:", newWallet);
        // ✅ After creating, fetch again to get proper format
        const data = await getWallet(id);
        setWalletBalance(data.balance);
      } catch (createErr) {
        console.error("Failed to create wallet:", createErr);
        setWalletBalance(null);
      }
    }
  };

  const handleAddMoney = async (amount) => {
    if (!userId) return;
    try {
      setAddingMoney(true);
      await addMoneyToWallet(userId, amount);
      await fetchBalance(userId);
      setShowAddMoney(false);
    } catch (err) {
      alert("Failed to add money: " + (typeof err === "string" ? err : err.message || err));
    } finally {
      setAddingMoney(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <>
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
          {/* LEFT */}
          <div className="flex items-center space-x-10">
            <Link to="/" className="flex items-center space-x-2">
              <div className="bg-emerald-500 p-1.5 rounded-md">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-gray-900">
                Share<span className="text-emerald-500">Bazar</span>
              </span>
            </Link>

            <div className="flex items-center space-x-6 font-medium text-gray-700">
              <Link to="/explore" className="hover:text-emerald-500 transition">
                Stocks
              </Link>
              <Link to="/portfolio" className="flex items-center space-x-1 hover:text-emerald-500 transition">
                <Briefcase className="w-4 h-4" />
                <span>Portfolio</span>
              </Link>
              <Link
    to="/wallet"
    className="flex items-center space-x-1 hover:text-emerald-500 transition"
  >
    <Wallet className="w-4 h-4" />
    <span>Wallet</span>
  </Link>
            </div>
          </div>

          

          {/* RIGHT */}
          <div className="flex items-center space-x-4">
            {/* ✅ Wallet Balance + Add Button */}
            {walletBalance !== null ? (
              <div className="flex items-center space-x-2">
                <div className="flex items-center space-x-2 bg-blue-50 border border-blue-200 px-4 py-2 rounded-full">
                  <Wallet className="w-4 h-4 text-blue-500" />
                  <span className="text-sm font-bold text-blue-700">
                    ₹{Number(walletBalance).toLocaleString("en-IN", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </span>
                </div>
                <button
                  onClick={() => setShowAddMoney(true)}
                  className="flex items-center space-x-1 bg-emerald-500 text-white px-3 py-2 rounded-full hover:bg-emerald-600 transition font-semibold text-sm"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-2 bg-gray-100 px-4 py-2 rounded-full">
                <Wallet className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-500">Loading wallet...</span>
              </div>
            )}

            {/* User */}
            <div className="flex items-center space-x-2 bg-gray-100 px-3 py-1.5 rounded-full">
              <User className="w-4 h-4 text-emerald-600" />
              <span className="text-sm font-semibold text-gray-800">{userEmail}</span>
            </div>

            {/* Logout */}
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition font-semibold text-sm"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      {/* ✅ Modal */}
      <AddMoneyModal
        isOpen={showAddMoney}
        onClose={() => setShowAddMoney(false)}
        onConfirm={handleAddMoney}
        loading={addingMoney}
      />
    </>
  );
};

export default ExploreNavbar;