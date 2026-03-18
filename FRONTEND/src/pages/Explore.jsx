// src/pages/ExplorePage.jsx
import React, { useEffect, useState, useMemo } from "react";
import { jwtDecode } from "jwt-decode";
import {
  Search,
  TrendingUp,
  TrendingDown,
  ShoppingCart,
  BarChart3,
  Briefcase,
  Activity,
} from "lucide-react";
import ExploreNavbar from "../components/ExploreNavbar";
import BuySellModal from "../components/BuySellModal";
import { Link } from "react-router-dom";
import axios from "axios";
import "../styles/ExplorePage.css";

const ExplorePage = () => {
  const [companies, setCompanies] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("ALL"); // ALL, GAINERS, LOSERS
  const [userId, setUserId] = useState(null);
  const [loadingCompanies, setLoadingCompanies] = useState(true);
  const [modal, setModal] = useState({
    open: false,
    type: null,
    company: null,
  });

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

  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    try {
      setLoadingCompanies(true);
      const res = await axios.get("http://localhost:8083/companies");
      setCompanies(res.data);
    } catch (err) {
      console.error("Failed to fetch companies", err);
    } finally {
      setLoadingCompanies(false);
    }
  };

  // ✅ Filter + Search
  const filtered = useMemo(() => {
    let result = companies;

    // Search
    if (search) {
      result = result.filter(
        (c) =>
          c.name?.toLowerCase().includes(search.toLowerCase()) ||
          c.symbol?.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Filter tabs
    if (filter === "GAINERS") {
      result = result.filter((c) => (c.change || 0) > 0);
    } else if (filter === "LOSERS") {
      result = result.filter((c) => (c.change || 0) < 0);
    }

    return result;
  }, [companies, search, filter]);

  const gainersCount = companies.filter((c) => (c.change || 0) > 0).length;
  const losersCount = companies.filter((c) => (c.change || 0) < 0).length;

  const openModal = (type, company) => {
    setModal({ open: true, type, company });
  };

  const closeModal = () => {
    setModal({ open: false, type: null, company: null });
  };

  return (
    <div className="explore-page">
      <ExploreNavbar />

      {/* ✅ Market Ticker Banner */}
      <div className="market-banner">
        <div className="market-ticker">
          {[...companies, ...companies].map((c, i) => (
            <div className="ticker-item" key={`${c.id}-${i}`}>
              <span className="ticker-name">{c.symbol || c.name}</span>
              <span className="ticker-price">₹{c.price?.toFixed(2)}</span>
              <span
                className={`ticker-change ${
                  (c.change || 0) >= 0 ? "up" : "down"
                }`}
              >
                {(c.change || 0) >= 0 ? "▲" : "▼"}{" "}
                {Math.abs(c.change || 0).toFixed(2)}%
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="explore-container">
        {/* ✅ Header */}
        <div className="explore-header">
          <div className="explore-title">
            <h1>
              Explore Stocks <span className="live-dot"></span>
            </h1>
            <p>Discover and invest in top-performing companies</p>
          </div>
          <div className="explore-actions">
            <Link to="/portfolio" className="btn-portfolio">
              <Briefcase size={18} />
              My Portfolio
            </Link>
          </div>
        </div>

        {/* ✅ Search & Filter Bar */}
        <div className="search-filter-bar">
          <div className="search-box">
            <Search size={18} className="search-icon" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by company name or symbol..."
            />
          </div>

          <div className="filter-tabs">
            <button
              className={`filter-tab ${filter === "ALL" ? "active" : ""}`}
              onClick={() => setFilter("ALL")}
            >
              All ({companies.length})
            </button>
            <button
              className={`filter-tab ${filter === "GAINERS" ? "active" : ""}`}
              onClick={() => setFilter("GAINERS")}
            >
              🟢 Gainers ({gainersCount})
            </button>
            <button
              className={`filter-tab ${filter === "LOSERS" ? "active" : ""}`}
              onClick={() => setFilter("LOSERS")}
            >
              🔴 Losers ({losersCount})
            </button>
          </div>

          <div className="stock-count-badge">
            Showing <span>{filtered.length}</span> stocks
          </div>
        </div>

        {/* ✅ Loading State */}
        {loadingCompanies ? (
          <div className="loading-grid">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="loading-card" />
            ))}
          </div>
        ) : (
          /* ✅ Stock Cards Grid */
          <div className="stocks-grid">
            {filtered.length > 0 ? (
              filtered.map((company) => (
                <StockCard
                  key={company.id}
                  company={company}
                  onBuy={() => openModal("BUY", company)}
                />
              ))
            ) : (
              <div className="no-results">
                <Search size={64} className="icon" />
                <h3>No stocks found</h3>
                <p>Try a different search term or filter</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* ✅ Buy Modal */}
      {modal.open && (
        <BuySellModal
          type={modal.type}
          company={modal.company}
          userId={userId}
          onClose={closeModal}
          onSuccess={(portfolioId) => {
            console.log("Bought in portfolio:", portfolioId);
            closeModal();
          }}
        />
      )}
    </div>
  );
};

// ✅ Professional Stock Card Component
const StockCard = ({ company, onBuy }) => {
  const change = company.change || 0;
  const isPositive = change >= 0;

  // Generate fake mini chart bars
  const chartBars = useMemo(() => {
    return Array.from({ length: 12 }, () => ({
      height: Math.random() * 80 + 20,
      isGreen: Math.random() > 0.4,
    }));
  }, [company.id]);

  // Generate fake stats
  const high = (company.price * (1 + Math.random() * 0.05)).toFixed(2);
  const low = (company.price * (1 - Math.random() * 0.05)).toFixed(2);
  const volume = (Math.random() * 10 + 1).toFixed(1) + "M";

  // Get initials for avatar
  const initials = company.name
    ? company.name
        .split(" ")
        .map((w) => w[0])
        .join("")
        .substring(0, 2)
        .toUpperCase()
    : "?";

  return (
    <div className="stock-card">
      {/* Header */}
      <div className="stock-card-header">
        <div className="stock-info">
          <div className={`stock-avatar ${!isPositive ? "negative" : ""}`}>
            {initials}
          </div>
          <div className="stock-details">
            <h3>{company.name}</h3>
            <span className="stock-symbol">
              {company.symbol || `STK${company.id}`}
            </span>
          </div>
        </div>

        <div className="stock-price-section">
          <p className="stock-price">₹{company.price?.toFixed(2)}</p>
          <div className={`stock-change ${isPositive ? "positive" : "negative"}`}>
            {isPositive ? (
              <TrendingUp size={14} />
            ) : (
              <TrendingDown size={14} />
            )}
            <span>
              {isPositive ? "+" : ""}
              {change.toFixed(2)}%
            </span>
          </div>
        </div>
      </div>

      {/* Mini Chart */}
      <div className="stock-mini-chart">
        {chartBars.map((bar, i) => (
          <div
            key={i}
            className={`chart-bar ${bar.isGreen ? "green" : "red"}`}
            style={{ height: `${bar.height}%` }}
          />
        ))}
      </div>

      {/* Stats */}
      <div className="stock-stats">
        <div className="stock-stat">
          <div className="stock-stat-label">High</div>
          <div className="stock-stat-value">₹{high}</div>
        </div>
        <div className="stock-stat">
          <div className="stock-stat-label">Low</div>
          <div className="stock-stat-value">₹{low}</div>
        </div>
        <div className="stock-stat">
          <div className="stock-stat-label">Volume</div>
          <div className="stock-stat-value">{volume}</div>
        </div>
      </div>

      {/* Buy Button */}
      <div className="stock-actions">
        <button className="btn-buy" onClick={onBuy}>
          <ShoppingCart size={16} />
          Buy Now
        </button>
      </div>
    </div>
  );
};

export default ExplorePage;