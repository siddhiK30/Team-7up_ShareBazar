// src/pages/ExplorePage.jsx
import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { Search, TrendingUp, TrendingDown, ShoppingCart, DollarSign } from "lucide-react";
import ExploreNavbar from "../components/ExploreNavbar";
import BuySellModal from "../components/BuySellModal";
import { Link } from "react-router-dom";
import axios from "axios";

const ExplorePage = () => {
  const [companies, setCompanies] = useState([]);
  const [search, setSearch] = useState("");
  const [userId, setUserId] = useState(null);
  const [modal, setModal] = useState({
    open: false,
    type: null,      // "BUY" | "SELL"
    company: null,
  });

  // ✅ Get userId from token
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUserId(decoded.userId || decoded.sub);
      } catch {
        setUserId(null);
      }
    }
  }, []);

  // ✅ Fetch companies/stocks
  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    try {
      const res = await axios.get("http://localhost:8083/companies"); // adjust URL
      setCompanies(res.data);
    } catch (err) {
      console.error("Failed to fetch companies", err);
    }
  };

  const filtered = companies.filter((c) =>
    c.name?.toLowerCase().includes(search.toLowerCase())
  );

  const openModal = (type, company) => {
    setModal({ open: true, type, company });
  };

  const closeModal = () => {
    setModal({ open: false, type: null, company: null });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <ExploreNavbar />

      <div className="max-w-7xl mx-auto px-6 py-8">

        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Explore Stocks</h1>
            <p className="text-gray-500 mt-1">
              Buy and sell from top companies
            </p>
          </div>

          {/* Portfolio Button */}
          <Link
            to="/portfolio"
            className="flex items-center space-x-2 bg-emerald-500 text-white 
                       px-5 py-2.5 rounded-lg hover:bg-emerald-600 transition font-semibold"
          >
            <TrendingUp className="w-4 h-4" />
            <span>My Portfolio</span>
          </Link>
        </div>

        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-4 top-3 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search companies..."
            className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 
                       rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-300"
          />
        </div>

        {/* Company Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((company) => (
            <CompanyCard
              key={company.id}
              company={company}
              onBuy={() => openModal("BUY", company)}
              // onSell={() => openModal("SELL", company)}
            />
          ))}
        </div>
      </div>

      {/* Buy/Sell Modal */}
      {modal.open && (
        <BuySellModal
          type={modal.type}
          company={modal.company}
          userId={userId}
          onClose={closeModal}
        />
      )}
    </div>
  );
};

// ✅ Company Card
const CompanyCard = ({ company, onBuy, onSell }) => {
  const isPositive = (company.change || 0) >= 0;

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition">

      {/* Top */}
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="font-bold text-gray-900 text-lg">{company.name}</h3>
          <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">
            {company.symbol || `#${company.id}`}
          </span>
        </div>

        <div className="text-right">
          <p className="text-xl font-bold text-gray-900">
            ₹{company.price?.toFixed(2) || "N/A"}
          </p>
          <p
            className={`text-sm font-semibold flex items-center justify-end space-x-1
                        ${isPositive ? "text-emerald-500" : "text-red-500"}`}
          >
            {isPositive ? (
              <TrendingUp className="w-3.5 h-3.5" />
            ) : (
              <TrendingDown className="w-3.5 h-3.5" />
            )}
            <span>
              {isPositive ? "+" : ""}
              {company.change?.toFixed(2) || "0.00"}%
            </span>
          </p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex space-x-3 mt-2">
        <button
          onClick={onBuy}
          className="flex-1 flex items-center justify-center space-x-1.5
                     bg-emerald-500 text-white py-2 rounded-lg 
                     hover:bg-emerald-600 transition font-semibold text-sm"
        >
          <ShoppingCart className="w-4 h-4" />
          <span>Buy</span>
        </button>

        {/* <button
          onClick={onSell}
          className="flex-1 flex items-center justify-center space-x-1.5
                     bg-red-500 text-white py-2 rounded-lg 
                     hover:bg-red-600 transition font-semibold text-sm"
        >
          <DollarSign className="w-4 h-4" />
          <span>Sell</span>
        </button> */}
      </div>
    </div>
  );
};

export default ExplorePage;