import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { BarChart3, TrendingUp, Zap } from "lucide-react";
import ExploreNavbar from "../components/ExploreNavbar";
import TradeForm from "../components/TradeForm";
import WalletCard from "../components/WalletCard";
import HoldingsCard from "../components/HoldingsCard";
import OrderHistory from "../components/OrderHistory";
import PortfolioManagement from "../components/PortfolioManagement";
import { getUserPortfolios, createPortfolio, getPortfolioHoldings } from "../services/PortfolioService";
import { creditWallet } from "../services/WalletService";
import "../styles/TradingPage.css";

const TradingPage = () => {
  const [userId, setUserId] = useState(null);
  const [portfolios, setPortfolios] = useState([]);
  const [selectedPortfolio, setSelectedPortfolio] = useState(null);
  const [holdings, setHoldings] = useState([]);
  const [walletBalance, setWalletBalance] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedCompany, setSelectedCompany] = useState({
    id: 1,
    name: "Company 1",
    price: 150.5,
  });

  // Get userId from token
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

  // Fetch portfolios
  useEffect(() => {
    if (!userId) return;
    fetchPortfolios();
  }, [userId]);

  const fetchPortfolios = async () => {
    try {
      setLoading(true);
      const data = await getUserPortfolios(userId);
      setPortfolios(data || []);
      if (data && data.length > 0) {
        setSelectedPortfolio(data[0]);
        fetchHoldings(data[0].id);
      }
    } catch (err) {
      setError("Failed to load portfolios");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchHoldings = async (portfolioId) => {
    try {
      const data = await getPortfolioHoldings(portfolioId);
      setHoldings(data || []);
    } catch (err) {
      console.error("Failed to load holdings:", err);
      setHoldings([]);
    }
  };

  const handleCreatePortfolio = async (name) => {
    try {
      const newPortfolio = await createPortfolio(userId, name);
      setPortfolios([...portfolios, newPortfolio]);
      return newPortfolio;
    } catch (err) {
      throw err;
    }
  };

  const handleSelectPortfolio = (portfolio) => {
    setSelectedPortfolio(portfolio);
    fetchHoldings(portfolio.id);
  };

  const handleAddFunds = async (amount) => {
    try {
      const result = await creditWallet(userId, amount);
      setWalletBalance(walletBalance + amount);
      alert("Funds added successfully!");
    } catch (err) {
      throw err;
    }
  };

  const handleTradingComplete = (order) => {
    // Refresh holdings after successful trade
    if (selectedPortfolio) {
      fetchHoldings(selectedPortfolio.id);
    }
    alert("Order placed successfully!");
  };

  return (
    <div className="trading-page">
      <ExploreNavbar />

      <div className="page-content">
        <div className="page-header">
          <div className="header-content">
            <h1>Trading Dashboard</h1>
            <p>
              Buy and sell stocks to build your portfolio and maximize returns
            </p>
          </div>
          <div className="header-stats">
            <div className="stat">
              <BarChart3 size={20} />
              <span>{portfolios.length} Portfolios</span>
            </div>
            <div className="stat">
              <TrendingUp size={20} />
              <span>{holdings.length} Holdings</span>
            </div>
          </div>
        </div>

        {error && <div className="error-banner">{error}</div>}

        <div className="trading-layout">
          {/* Left Section */}
          <div className="left-section">
            <WalletCard
              userId={userId}
              walletBalance={walletBalance}
              onAddFunds={handleAddFunds}
            />

            <PortfolioManagement
              portfolios={portfolios}
              onSelectPortfolio={handleSelectPortfolio}
              onCreatePortfolio={handleCreatePortfolio}
              loading={loading}
            />
          </div>

          {/* Middle Section */}
          <div className="middle-section">
            <div className="company-selector">
              <h3>Select a Stock to Trade</h3>
              <div className="company-options">
                <div className="option-item selected">
                  <div className="option-header">
                    <h4>{selectedCompany.name}</h4>
                    <span className="company-id">ID: {selectedCompany.id}</span>
                  </div>
                  <div className="option-price">
                    <span className="price-label">Current Price</span>
                    <span className="price-value">
                      ₹{selectedCompany.price.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {selectedPortfolio && (
              <TradeForm
                company={selectedCompany}
                userId={userId}
                portfolios={portfolios}
                onTradingComplete={handleTradingComplete}
              />
            )}

            {!selectedPortfolio && (
              <div className="no-portfolio-message">
                <Zap size={40} />
                <p>Create a portfolio to start trading!</p>
              </div>
            )}
          </div>

          {/* Right Section */}
          <div className="right-section">
            <HoldingsCard holdings={holdings} loading={loading} />
          </div>
        </div>

        {/* Bottom Section */}
        <div className="order-history-section">
          <OrderHistory orders={[]} loading={false} />
        </div>
      </div>
    </div>
  );
};

export default TradingPage;
