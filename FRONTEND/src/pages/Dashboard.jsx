// import React, { useEffect, useState } from 'react';
// import { Briefcase, TrendingUp, ArrowUpRight, ArrowDownRight, Activity, User } from 'lucide-react';
// import { jwtDecode } from 'jwt-decode'; // <-- We imported the decoder

// const Dashboard = () => {
//   const [userEmail, setUserEmail] = useState('');

//   // When the dashboard loads, extract the real user info from the Spring Boot Token
//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       try {
//         const decodedToken = jwtDecode(token);
//         // Spring Boot sets the "subject" (sub) to the user's email in JwtUtil.java
//         setUserEmail(decodedToken.sub); 
//       } catch (error) {
//         console.error("Invalid token");
//       }
//     }
//   }, []);

//   // Mock data for the UI (Waiting for backend team to build the Portfolio API)
//   const portfolio = [
//     { symbol: 'RELIANCE', shares: 15, avgPrice: 2840.50, ltp: 2910.25, change: 2.45 },
//     { symbol: 'TCS', shares: 10, avgPrice: 3950.00, ltp: 3890.10, change: -1.51 },
//     { symbol: 'HDFCBANK', shares: 45, avgPrice: 1420.75, ltp: 1455.00, change: 2.41 },
//   ];

//   const calculateTotalValue = () => portfolio.reduce((acc, stock) => acc + (stock.shares * stock.ltp), 0);
//   const calculateTotalInvested = () => portfolio.reduce((acc, stock) => acc + (stock.shares * stock.avgPrice), 0);
  
//   const totalValue = calculateTotalValue();
//   const totalInvested = calculateTotalInvested();
//   const totalReturns = totalValue - totalInvested;
//   const returnsPercentage = (totalReturns / totalInvested) * 100;

//   return (
//     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
//       {/* REAL BACKEND DATA DISPLAYED HERE */}
//       <div className="flex items-center justify-between mb-8">
//         <div className="flex items-center space-x-3">
//           <Briefcase className="w-8 h-8 text-emerald-500" />
//           <h1 className="text-3xl font-bold text-gray-900">My Portfolio</h1>
//         </div>
        
//         {userEmail && (
//           <div className="hidden md:flex items-center space-x-2 bg-white px-4 py-2 rounded-full border border-gray-200 shadow-sm">
//             <div className="bg-emerald-100 p-1 rounded-full">
//               <User className="w-4 h-4 text-emerald-600" />
//             </div>
//             <span className="text-sm font-semibold text-gray-700">{userEmail}</span>
//           </div>
//         )}
//       </div>

//       {/* Top Overview Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
//         <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
//           <p className="text-sm font-medium text-gray-500 mb-1">Total Investment</p>
//           <p className="text-3xl font-bold text-gray-900">₹{totalInvested.toLocaleString('en-IN')}</p>
//         </div>
        
//         <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
//           <p className="text-sm font-medium text-gray-500 mb-1">Current Value</p>
//           <p className="text-3xl font-bold text-gray-900">₹{totalValue.toLocaleString('en-IN')}</p>
//         </div>

//         <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
//           <p className="text-sm font-medium text-gray-500 mb-1">Total Returns</p>
//           <div className="flex items-center space-x-2">
//             <p className={`text-3xl font-bold ${totalReturns >= 0 ? 'text-emerald-500' : 'text-red-500'}`}>
//               {totalReturns >= 0 ? '+' : ''}₹{totalReturns.toLocaleString('en-IN')}
//             </p>
//             <span className={`flex items-center text-sm font-semibold px-2 py-1 rounded-md ${totalReturns >= 0 ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'}`}>
//               {totalReturns >= 0 ? <ArrowUpRight className="w-4 h-4 mr-1" /> : <ArrowDownRight className="w-4 h-4 mr-1" />}
//               {returnsPercentage.toFixed(2)}%
//             </span>
//           </div>
//         </div>
//       </div>

//       {/* Holdings Table Area */}
//       <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
//         <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
//           <h2 className="text-lg font-bold text-gray-900 flex items-center">
//             <Activity className="w-5 h-5 mr-2 text-emerald-500" />
//             Your Holdings
//           </h2>
//         </div>
        
//         <div className="overflow-x-auto">
//           <table className="w-full text-left border-collapse">
//             <thead>
//               <tr className="border-b border-gray-100 text-xs uppercase text-gray-500 bg-white">
//                 <th className="p-4 font-semibold">Instrument</th>
//                 <th className="p-4 font-semibold text-right">Qty</th>
//                 <th className="p-4 font-semibold text-right">Avg. Cost</th>
//                 <th className="p-4 font-semibold text-right">LTP</th>
//                 <th className="p-4 font-semibold text-right">Current Value</th>
//                 <th className="p-4 font-semibold text-right">P&L</th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-gray-50">
//               {portfolio.map((stock, idx) => {
//                 const currentValue = stock.shares * stock.ltp;
//                 const pnl = currentValue - (stock.shares * stock.avgPrice);
//                 return (
//                   <tr key={idx} className="hover:bg-gray-50/50 transition cursor-pointer">
//                     <td className="p-4">
//                       <p className="font-bold text-gray-900">{stock.symbol}</p>
//                       <p className="text-xs text-gray-500">NSE</p>
//                     </td>
//                     <td className="p-4 text-right font-medium text-gray-900">{stock.shares}</td>
//                     <td className="p-4 text-right text-gray-600">₹{stock.avgPrice.toFixed(2)}</td>
//                     <td className="p-4 text-right font-medium text-gray-900">₹{stock.ltp.toFixed(2)}</td>
//                     <td className="p-4 text-right font-medium text-gray-900">₹{currentValue.toLocaleString('en-IN')}</td>
//                     <td className={`p-4 text-right font-bold ${pnl >= 0 ? 'text-emerald-500' : 'text-red-500'}`}>
//                       {pnl >= 0 ? '+' : ''}₹{pnl.toLocaleString('en-IN')}
//                       <p className="text-xs font-medium opacity-80">{stock.change > 0 ? '+' : ''}{stock.change}%</p>
//                     </td>
//                   </tr>
//                 );
//               })}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;




import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import {
  Briefcase,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  ArrowDownRight,
  Activity,
  User,
  BarChart3,
  ShoppingCart,
  DollarSign,
  Wallet,
  PieChart,
  Clock,
  Zap,
  Eye,
} from "lucide-react";
import { Link } from "react-router-dom";
import ExploreNavbar from "../components/ExploreNavbar";
import { getUserPortfolios, getPortfolioHoldings } from "../services/PortfolioService";
import { getWallet } from "../services/WalletService";
import axios from "axios";
import "../styles/Dashboard.css";

const Dashboard = () => {
  const [userEmail, setUserEmail] = useState("");
  const [userId, setUserId] = useState(null);
  const [holdings, setHoldings] = useState([]);
  const [portfolios, setPortfolios] = useState([]);
  const [walletBalance, setWalletBalance] = useState(0);
  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUserEmail(decoded.sub);
        setUserId(decoded.userId || decoded.sub);
      } catch {
        console.error("Invalid token");
      }
    }
  }, []);

  useEffect(() => {
    if (!userId) return;
    fetchDashboardData();
  }, [userId]);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      // Fetch portfolios
      const portfolioData = await getUserPortfolios(userId);
      setPortfolios(portfolioData || []);

      // Fetch all holdings from all portfolios
      let allHoldings = [];
      for (const p of portfolioData || []) {
        try {
          const h = await getPortfolioHoldings(p.id);
          allHoldings = [
            ...allHoldings,
            ...(h || []).map((holding) => ({
              ...holding,
              portfolioName: p.name,
              portfolioId: p.id,
            })),
          ];
        } catch (e) {
          console.error("Error fetching holdings for portfolio", p.id);
        }
      }
      setHoldings(allHoldings);

      // Fetch wallet
      try {
        const wallet = await getWallet(userId);
        setWalletBalance(wallet.balance || 0);
      } catch {
        setWalletBalance(0);
      }

      // Fetch recent orders
      try {
        const ordersRes = await axios.get(
          `http://localhost:8086/orders/user/${userId}`
        );
        setRecentOrders((ordersRes.data || []).slice(-5).reverse());
      } catch {
        setRecentOrders([]);
      }
    } catch (err) {
      console.error("Dashboard data fetch failed:", err);
    } finally {
      setLoading(false);
    }
  };

  // Calculate totals
  const totalInvested = holdings.reduce(
    (sum, h) => sum + h.quantity * h.avgBuyPrice,
    0
  );
  const totalValue = holdings.reduce(
    (sum, h) => sum + h.quantity * h.currentPrice,
    0
  );
  const totalReturns = totalValue - totalInvested;
  const returnsPercent =
    totalInvested > 0
      ? ((totalReturns / totalInvested) * 100).toFixed(2)
      : "0.00";
  const isPositive = totalReturns >= 0;

  // Top performers (sorted by P/L %)
  const topPerformers = [...holdings]
    .sort((a, b) => (b.profitLossPercent || 0) - (a.profitLossPercent || 0))
    .slice(0, 5);

  // Current time for market status
  const now = new Date();
  const hours = now.getHours();
  const isMarketOpen = hours >= 9 && hours < 16; // 9 AM to 4 PM IST

  // Get user initials
  const userInitials = userEmail
    ? userEmail.substring(0, 2).toUpperCase()
    : "U";

  return (
    <div className="dashboard-page">
      <ExploreNavbar />

      {/* ✅ Welcome Banner */}
      <div className="welcome-banner">
        <div className="welcome-content">
          <div className="welcome-left">
            <h1>
              Welcome back <span className="wave">👋</span>
            </h1>
            <p>
              Here's what's happening with your investments today
            </p>
          </div>

          <div className="welcome-right">
            <div className="market-status">
              <div className={`status-dot ${isMarketOpen ? "" : "closed"}`} />
              <span>
                Market {isMarketOpen ? "Open" : "Closed"}
              </span>
            </div>

            {userEmail && (
              <div className="user-badge">
                <div className="user-avatar">{userInitials}</div>
                <div className="user-info">
                  <div className="user-name">
                    {userEmail.split("@")[0]}
                  </div>
                  <div className="user-email">{userEmail}</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="dashboard-container">
        {/* ✅ Overview Cards */}
        <div className="overview-cards">
          {/* Invested */}
          <div className="overview-card invested">
            <div className="card-header">
              <div className="card-icon blue">
                <Briefcase size={20} />
              </div>
            </div>
            <div className="card-label">Total Invested</div>
            <div className="card-value">
              ₹
              {totalInvested.toLocaleString("en-IN", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </div>
            <div className="card-sub">
              Across {portfolios.length} portfolio
              {portfolios.length !== 1 ? "s" : ""}
            </div>
          </div>

          {/* Current Value */}
          <div className="overview-card current">
            <div className="card-header">
              <div className="card-icon green">
                <BarChart3 size={20} />
              </div>
            </div>
            <div className="card-label">Current Value</div>
            <div className="card-value">
              ₹
              {totalValue.toLocaleString("en-IN", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </div>
            <div className="card-sub">{holdings.length} stocks held</div>
          </div>

          {/* Returns */}
          <div
            className={`overview-card returns ${
              isPositive ? "positive" : "negative"
            }`}
          >
            <div className="card-header">
              <div className={`card-icon ${isPositive ? "green" : "red"}`}>
                {isPositive ? (
                  <TrendingUp size={20} />
                ) : (
                  <TrendingDown size={20} />
                )}
              </div>
              <div className={`card-trend ${isPositive ? "up" : "down"}`}>
                {isPositive ? (
                  <ArrowUpRight size={12} />
                ) : (
                  <ArrowDownRight size={12} />
                )}
                {returnsPercent}%
              </div>
            </div>
            <div className="card-label">Total Returns</div>
            <div className={`card-value ${isPositive ? "positive" : "negative"}`}>
              {isPositive ? "+" : ""}₹
              {totalReturns.toLocaleString("en-IN", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </div>
            <div className="card-sub">
              {isPositive ? "Profit" : "Loss"} overall
            </div>
          </div>

          {/* Wallet */}
          <div className="overview-card holdings-count">
            <div className="card-header">
              <div className="card-icon purple">
                <Wallet size={20} />
              </div>
            </div>
            <div className="card-label">Wallet Balance</div>
            <div className="card-value">
              ₹
              {walletBalance.toLocaleString("en-IN", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </div>
            <div className="card-sub">Available to invest</div>
          </div>
        </div>

        {/* ✅ Main Grid */}
        <div className="dashboard-grid">
          {/* Left - Holdings Table */}
          <div className="holdings-section">
            <div className="section-header">
              <h2 className="section-title">
                <Activity size={18} className="icon" />
                Your Holdings
              </h2>
              <span className="section-badge">
                {holdings.length} Stock{holdings.length !== 1 ? "s" : ""}
              </span>
            </div>

            {loading ? (
              <div className="empty-holdings">
                <p>Loading your holdings...</p>
              </div>
            ) : holdings.length > 0 ? (
              <div className="holdings-table-wrapper">
                <table className="holdings-table">
                  <thead>
                    <tr>
                      <th>Instrument</th>
                      <th>Qty</th>
                      <th>Avg. Cost</th>
                      <th>LTP</th>
                      <th>Current Value</th>
                      <th>P&L</th>
                    </tr>
                  </thead>
                  <tbody>
                    {holdings.map((stock, idx) => {
                      const currentValue =
                        stock.quantity * stock.currentPrice;
                      const pnl = stock.profitLoss || 0;
                      const pnlPercent = stock.profitLossPercent || 0;
                      const isUp = pnl >= 0;
                      const initials = stock.companyCode
                        ? stock.companyCode.substring(0, 2)
                        : "??";

                      return (
                        <tr key={idx}>
                          <td>
                            <div className="stock-cell">
                              <div
                                className={`stock-icon ${
                                  !isUp ? "negative" : ""
                                }`}
                              >
                                {initials}
                              </div>
                              <div className="stock-cell-info">
                                <div className="stock-name">
                                  {stock.companyCode || `#${stock.companyId}`}
                                </div>
                                <div className="stock-exchange">
                                  {stock.companyName || "NSE"} •{" "}
                                  {stock.portfolioName}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="td-qty">{stock.quantity}</td>
                          <td className="td-avg">
                            ₹{stock.avgBuyPrice.toFixed(2)}
                          </td>
                          <td className="td-ltp">
                            ₹{stock.currentPrice.toFixed(2)}
                          </td>
                          <td className="td-value">
                            ₹{currentValue.toLocaleString("en-IN")}
                          </td>
                          <td
                            className={`td-pnl ${
                              isUp ? "positive" : "negative"
                            }`}
                          >
                            {isUp ? "+" : ""}₹{pnl.toFixed(2)}
                            <span className="pnl-percent">
                              {isUp ? "+" : ""}
                              {pnlPercent.toFixed(2)}%
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="empty-holdings">
                <div className="empty-icon">
                  <Briefcase size={28} />
                </div>
                <h3>No holdings yet</h3>
                <p>Start investing to see your portfolio here</p>
              </div>
            )}
          </div>

          {/* Right Sidebar */}
          <div className="sidebar-section">
            {/* Quick Actions */}
            <div className="quick-actions-card">
              <h3>
                <Zap size={16} />
                Quick Actions
              </h3>
              <div className="quick-actions-grid">
                <Link to="/explore" className="quick-action-btn">
                  <div className="action-icon green">
                    <ShoppingCart size={18} />
                  </div>
                  <span>Buy Stocks</span>
                </Link>
                <Link to="/portfolio" className="quick-action-btn">
                  <div className="action-icon blue">
                    <PieChart size={18} />
                  </div>
                  <span>Portfolio</span>
                </Link>
                <Link to="/explore" className="quick-action-btn">
                  <div className="action-icon purple">
                    <Eye size={18} />
                  </div>
                  <span>Explore</span>
                </Link>
                <Link to="/portfolio" className="quick-action-btn">
                  <div className="action-icon orange">
                    <Wallet size={18} />
                  </div>
                  <span>Wallet</span>
                </Link>
              </div>
            </div>

            {/* Top Performers */}
            {topPerformers.length > 0 && (
              <div className="performers-card">
                <h3>
                  <TrendingUp size={16} />
                  Top Performers
                </h3>
                {topPerformers.map((stock, idx) => {
                  const change = stock.profitLossPercent || 0;
                  const isUp = change >= 0;
                  return (
                    <div key={idx} className="performer-item">
                      <div className="performer-left">
                        <div
                          className={`performer-rank ${
                            idx === 0 ? "top" : ""
                          }`}
                        >
                          {idx + 1}
                        </div>
                        <span className="performer-name">
                          {stock.companyCode || `#${stock.companyId}`}
                        </span>
                      </div>
                      <div
                        className={`performer-change ${
                          isUp ? "up" : "down"
                        }`}
                      >
                        {isUp ? (
                          <ArrowUpRight size={14} />
                        ) : (
                          <ArrowDownRight size={14} />
                        )}
                        {isUp ? "+" : ""}
                        {change.toFixed(2)}%
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Recent Activity */}
            <div className="activity-card">
              <h3>
                <Clock size={16} />
                Recent Activity
              </h3>
              {recentOrders.length > 0 ? (
                recentOrders.map((order, idx) => (
                  <div key={idx} className="activity-item">
                    <div
                      className={`activity-dot ${
                        order.orderType === "BUY" ? "buy" : "sell"
                      }`}
                    />
                    <div className="activity-info">
                      <div className="activity-text">
                        <span className="highlight">
                          {order.orderType}
                        </span>{" "}
                        {order.quantity} shares
                      </div>
                      <div className="activity-time">
                        Company #{order.companyId}
                      </div>
                    </div>
                    <div className="activity-amount">
                      ₹{(order.quantity * order.price).toFixed(2)}
                    </div>
                  </div>
                ))
              ) : (
                <div
                  style={{
                    textAlign: "center",
                    padding: "20px",
                    color: "#9ca3af",
                    fontSize: "13px",
                  }}
                >
                  No recent activity
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;