// src/pages/PortfolioPage.jsx
import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import {
  TrendingUp,
  TrendingDown,
  Briefcase,
  BarChart3,
  ArrowLeft,
  PieChart,
  Activity,
} from "lucide-react";
import { Link } from "react-router-dom";
import ExploreNavbar from "../components/ExploreNavbar";
import HoldingsCard from "../components/HoldingsCard";
import PortfolioManagement from "../components/PortfolioManagement";
import {
  getUserPortfolios,
  createPortfolio,
  getPortfolioHoldings,
} from "../services/PortfolioService";
import "../styles/EnhancedPortfolioPage.css";

const PortfolioPage = () => {
  const [portfolios, setPortfolios] = useState([]);
  const [selectedPortfolio, setSelectedPortfolio] = useState(null);
  const [holdings, setHoldings] = useState([]);
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [holdingsLoading, setHoldingsLoading] = useState(false);
  const [error, setError] = useState("");
  const [stats, setStats] = useState({
    totalValue: 0,
    totalInvested: 0,
    totalGain: 0,
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUserId(decoded.userId || decoded.sub);
      } catch {
        setError("Invalid token");
      }
    }
  }, []);

  useEffect(() => {
    if (!userId) return;
    fetchPortfolios();
  }, [userId]);

  const fetchPortfolios = async () => {
    try {
      setLoading(true);
      const data = await getUserPortfolios(userId);
      setPortfolios(data || []);
    } catch (err) {
      setError("Failed to load portfolios");
    } finally {
      setLoading(false);
    }
  };

  const fetchHoldings = async (portfolioId) => {
    if (!portfolioId) return;
    try {
      setHoldingsLoading(true);
      setHoldings([]);
      setStats({ totalValue: 0, totalInvested: 0, totalGain: 0 });
      const data = await getPortfolioHoldings(portfolioId);
      setHoldings(data || []);
      calculateStats(data || []);
    } catch (err) {
      setHoldings([]);
      calculateStats([]);
    } finally {
      setHoldingsLoading(false);
    }
  };

  const handleCreatePortfolio = async (name) => {
    const newPortfolio = await createPortfolio(userId, name);
    await fetchPortfolios();
    return newPortfolio;
  };

  const handlePortfolioDeleted = async () => {
    await fetchPortfolios();
    setSelectedPortfolio(null);
    setHoldings([]);
    setStats({ totalValue: 0, totalInvested: 0, totalGain: 0 });
  };

  const calculateStats = (holdingsData) => {
    const totalInvested = holdingsData.reduce(
      (sum, h) => sum + h.quantity * h.avgBuyPrice,
      0
    );
    const totalValue = holdingsData.reduce(
      (sum, h) => sum + h.quantity * h.currentPrice,
      0
    );
    const totalGain = holdingsData.reduce(
      (sum, h) => sum + (h.profitLoss || 0),
      0
    );
    setStats({ totalValue, totalInvested, totalGain });
  };

  const handleSelectPortfolio = (portfolio) => {
    setSelectedPortfolio(portfolio);
    fetchHoldings(portfolio.id);
  };

  const gainPercent =
    stats.totalInvested > 0
      ? ((stats.totalGain / stats.totalInvested) * 100).toFixed(2)
      : "0.00";

  return (
    <div className="portfolio-page">
      <ExploreNavbar />

      {/* ✅ Portfolio Banner */}
      <div className="portfolio-banner">
        <div className="banner-content">
          <div className="banner-top">
            <div className="banner-left">
              <Link to="/explore" className="back-link">
                <ArrowLeft size={16} />
                Back to Explore
              </Link>
              <h1>Portfolio Dashboard</h1>
              <p className="viewing-label">
                {selectedPortfolio ? (
                  <>
                    Currently viewing:{" "}
                    <span className="portfolio-name-badge">
                      {selectedPortfolio.name}
                    </span>
                  </>
                ) : (
                  "Select a portfolio to get started"
                )}
              </p>
            </div>

            <div className="banner-right">
              <div className="banner-stat">
                <div className="stat-icon">
                  <PieChart size={16} />
                </div>
                <div className="stat-text">
                  <span className="stat-number">{portfolios.length}</span>
                  <span className="stat-label-text">Portfolios</span>
                </div>
              </div>

              <div className="banner-stat">
                <div className="stat-icon">
                  <Activity size={16} />
                </div>
                <div className="stat-text">
                  <span className="stat-number">{holdings.length}</span>
                  <span className="stat-label-text">Holdings</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ✅ Page Content */}
      <div className="page-content">
        {error && <div className="error-banner">⚠️ {error}</div>}

        {/* ✅ Stats Cards (overlapping banner) */}
        <div className="stats-row">
          <div className="stat-card invested">
            <div className="stat-card-icon">
              <Briefcase size={22} />
            </div>
            <div className="stat-card-content">
              <span className="stat-label">Total Invested</span>
              <span className="stat-value">
                ₹
                {stats.totalInvested.toLocaleString("en-IN", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </span>
            </div>
          </div>

          <div className="stat-card current">
            <div className="stat-card-icon">
              <BarChart3 size={22} />
            </div>
            <div className="stat-card-content">
              <span className="stat-label">Current Value</span>
              <span className="stat-value">
                ₹
                {stats.totalValue.toLocaleString("en-IN", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </span>
            </div>
          </div>

          <div
            className={`stat-card ${stats.totalGain >= 0 ? "gain" : "loss"}`}
          >
            <div className="stat-card-icon">
              {stats.totalGain >= 0 ? (
                <TrendingUp size={22} />
              ) : (
                <TrendingDown size={22} />
              )}
            </div>
            <div className="stat-card-content">
              <span className="stat-label">Total Gain/Loss</span>
              <span className="stat-value">
                {stats.totalGain >= 0 ? "+" : ""}₹
                {stats.totalGain.toLocaleString("en-IN", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
                <small className="gain-percent"> ({gainPercent}%)</small>
              </span>
            </div>
          </div>
        </div>

        {/* ✅ Two Column Layout */}
        <div className="portfolio-layout">
          {/* Left - Portfolio List */}
          <div className="left-section">
            <PortfolioManagement
              portfolios={portfolios}
              onSelectPortfolio={handleSelectPortfolio}
              onCreatePortfolio={handleCreatePortfolio}
              onPortfolioDeleted={handlePortfolioDeleted}
              loading={loading}
            />
          </div>

          {/* Right - Holdings */}
          <div className="right-section">
            {selectedPortfolio ? (
              <HoldingsCard
                holdings={holdings}
                loading={holdingsLoading}
                portfolioId={selectedPortfolio?.id}
                onUpdate={() => fetchHoldings(selectedPortfolio?.id)}
              />
            ) : (
              <div className="no-selection">
                <div className="empty-icon-wrapper">
                  <Briefcase size={32} />
                </div>
                <h3>Select a Portfolio</h3>
                <p>
                  Choose a portfolio from the left to view its holdings and
                  performance
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioPage;