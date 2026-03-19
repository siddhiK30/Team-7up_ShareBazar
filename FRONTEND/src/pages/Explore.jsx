// import React, { useEffect, useState, useMemo } from "react";
// import { jwtDecode } from "jwt-decode";
// import {
//   Search,
//   TrendingUp,
//   TrendingDown,
//   ShoppingCart,
//   Briefcase,
//   Package,
// } from "lucide-react";
// import ExploreNavbar from "../components/ExploreNavbar";
// import BuySellModal from "../components/BuySellModal";
// import { Link } from "react-router-dom";
// import axios from "axios";
// import "../styles/ExplorePage.css";

// const ExplorePage = () => {
//   const [companies, setCompanies] = useState([]);
//   const [search, setSearch] = useState("");
//   const [filter, setFilter] = useState("ALL");
//   const [userId, setUserId] = useState(null);
//   const [loadingCompanies, setLoadingCompanies] = useState(true);
//   const [modal, setModal] = useState({
//     open: false,
//     type: null,
//     company: null,
//   });

//   // ✅ Key to force re-render of navbar (refreshes wallet)
//   const [refreshKey, setRefreshKey] = useState(0);

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       try {
//         const decoded = jwtDecode(token);
//         setUserId(decoded.userId || decoded.sub);
//       } catch {
//         setUserId(null);
//       }
//     }
//   }, []);

//   useEffect(() => {
//     fetchCompanies();
//   }, []);

//   const fetchCompanies = async () => {
//     try {
//       setLoadingCompanies(true);
//       const res = await axios.get("http://localhost:8083/companies");
//       setCompanies(res.data);
//     } catch (err) {
//       console.error("Failed to fetch companies", err);
//     } finally {
//       setLoadingCompanies(false);
//     }
//   };

//   const filtered = useMemo(() => {
//     let result = companies;
//     if (search) {
//       result = result.filter(
//         (c) =>
//           c.name?.toLowerCase().includes(search.toLowerCase()) ||
//           c.symbol?.toLowerCase().includes(search.toLowerCase())
//       );
//     }
//     if (filter === "GAINERS") {
//       result = result.filter((c) => (c.change || 0) > 0);
//     } else if (filter === "LOSERS") {
//       result = result.filter((c) => (c.change || 0) < 0);
//     }
//     return result;
//   }, [companies, search, filter]);

//   const gainersCount = companies.filter((c) => (c.change || 0) > 0).length;
//   const losersCount = companies.filter((c) => (c.change || 0) < 0).length;

//   const openModal = (type, company) => {
//     setModal({ open: true, type, company });
//   };

//   const closeModal = () => {
//     setModal({ open: false, type: null, company: null });
//   };

//   // ✅ Called when buy/sell succeeds — refreshes everything
//   const handleOrderSuccess = () => {
//     fetchCompanies();
//     setRefreshKey((prev) => prev + 1); // forces navbar to re-fetch wallet
//   };

//   return (
//     <div className="explore-page">
//       {/* ✅ Key forces navbar to re-mount and refresh wallet */}
//       <ExploreNavbar key={refreshKey} />

//       {/* Market Ticker */}
//       <div className="market-banner">
//         <div className="market-ticker">
//           {[...companies, ...companies].map((c, i) => (
//             <div className="ticker-item" key={`${c.id}-${i}`}>
//               <span className="ticker-name">{c.symbol || c.name}</span>
//               <span className="ticker-price">₹{c.price?.toFixed(2)}</span>
//               <span
//                 className={`ticker-change ${
//                   (c.change || 0) >= 0 ? "up" : "down"
//                 }`}
//               >
//                 {(c.change || 0) >= 0 ? "▲" : "▼"}{" "}
//                 {Math.abs(c.change || 0).toFixed(2)}%
//               </span>
//             </div>
//           ))}
//         </div>
//       </div>

//       <div className="explore-container">
//         {/* Header */}
//         <div className="explore-header">
//           <div className="explore-title">
//             <h1>
//               Explore Stocks <span className="live-dot"></span>
//             </h1>
//             <p>Discover and invest in top-performing companies</p>
//           </div>
//           <div className="explore-actions">
//             <Link to="/portfolio" className="btn-portfolio">
//               <Briefcase size={18} />
//               My Portfolio
//             </Link>
//           </div>
//         </div>

//         {/* Search & Filter */}
//         <div className="search-filter-bar">
//           <div className="search-box">
//             <Search size={18} className="search-icon" />
//             <input
//               type="text"
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//               placeholder="Search by company name or symbol..."
//             />
//           </div>

//           <div className="filter-tabs">
//             <button
//               className={`filter-tab ${filter === "ALL" ? "active" : ""}`}
//               onClick={() => setFilter("ALL")}
//             >
//               All ({companies.length})
//             </button>
//             <button
//               className={`filter-tab ${filter === "GAINERS" ? "active" : ""}`}
//               onClick={() => setFilter("GAINERS")}
//             >
//               🟢 Gainers ({gainersCount})
//             </button>
//             <button
//               className={`filter-tab ${filter === "LOSERS" ? "active" : ""}`}
//               onClick={() => setFilter("LOSERS")}
//             >
//               🔴 Losers ({losersCount})
//             </button>
//           </div>

//           <div className="stock-count-badge">
//             Showing <span>{filtered.length}</span> stocks
//           </div>
//         </div>

//         {/* Loading */}
//         {loadingCompanies ? (
//           <div className="loading-list">
//             {[1, 2, 3, 4, 5].map((i) => (
//               <div key={i} className="loading-row" />
//             ))}
//           </div>
//         ) : (
//           <>
//             {filtered.length > 0 && (
//               <div className="stock-table">
//                 {/* Table Header — hidden on mobile */}
//                 <div className="stock-table-header">
//                   <div className="col-company">Company</div>
//                   <div className="col-price">Price</div>
//                   <div className="col-change">Change</div>
//                   <div className="col-high">High</div>
//                   <div className="col-low">Low</div>
//                   <div className="col-volume">Volume</div>
//                   <div className="col-shares">Shares</div>
//                   <div className="col-action">Action</div>
//                 </div>

//                 {filtered.map((company) => (
//                   <StockRow
//                     key={company.id}
//                     company={company}
//                     onBuy={() => openModal("BUY", company)}
//                   />
//                 ))}
//               </div>
//             )}

//             {filtered.length === 0 && (
//               <div className="no-results">
//                 <Search size={64} className="icon" />
//                 <h3>No stocks found</h3>
//                 <p>Try a different search term or filter</p>
//               </div>
//             )}
//           </>
//         )}
//       </div>

//       {/* ✅ Buy/Sell Modal */}
//       {modal.open && (
//         <BuySellModal
//           type={modal.type}
//           company={modal.company}
//           userId={userId}
//           onClose={() => {
//             closeModal();
//             handleOrderSuccess(); // ✅ Refresh everything when modal closes
//           }}
//           onSuccess={() => {
//             // ✅ DON'T close — let user see success message
//             // Just refresh data in background
//             handleOrderSuccess();
//           }}
//         />
//       )}
//     </div>
//   );
// };

// // ✅ Stock Row Component
// const StockRow = ({ company, onBuy }) => {
//   const change = company.change || 0;
//   const isPositive = change >= 0;

//   const high = (company.price * (1 + Math.random() * 0.05)).toFixed(2);
//   const low = (company.price * (1 - Math.random() * 0.05)).toFixed(2);
//   const volume = (Math.random() * 10 + 1).toFixed(1) + "M";
//   const shares = Math.floor(Math.random() * 50000 + 10000).toLocaleString(
//     "en-IN"
//   );

//   const initials = company.name
//     ? company.name
//         .split(" ")
//         .map((w) => w[0])
//         .join("")
//         .substring(0, 2)
//         .toUpperCase()
//     : "?";

//   return (
//     <div
//       className={`stock-row ${isPositive ? "row-positive" : "row-negative"}`}
//     >
//       <div className="col-company">
//         <div className={`stock-avatar-sm ${isPositive ? "" : "negative"}`}>
//           {initials}
//         </div>
//         <div className="company-info">
//           <span className="company-name">{company.name}</span>
//           <span className="company-symbol">
//             {company.symbol || `STK${company.id}`}
//           </span>
//         </div>
//       </div>

//       <div className="col-price">
//         <span className="price-value">
//           ₹
//           {company.price?.toLocaleString("en-IN", {
//             minimumFractionDigits: 2,
//             maximumFractionDigits: 2,
//           })}
//         </span>
//       </div>

//       <div className={`col-change ${isPositive ? "positive" : "negative"}`}>
//         <div className="change-badge">
//           {isPositive ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
//           <span>
//             {isPositive ? "+" : ""}
//             {change.toFixed(2)}%
//           </span>
//         </div>
//       </div>

//       <div className="col-high">
//         <span className="stat-value green">₹{high}</span>
//       </div>

//       <div className="col-low">
//         <span className="stat-value red">₹{low}</span>
//       </div>

//       <div className="col-volume">
//         <span className="stat-value">{volume}</span>
//       </div>

//       <div className="col-shares">
//         <div className="shares-info">
//           <Package size={14} />
//           <span>{shares}</span>
//         </div>
//       </div>

//       <div className="col-action">
//         <button className="btn-buy-row" onClick={onBuy}>
//           <ShoppingCart size={14} />
//           <span className="btn-buy-text">Buy</span>
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ExplorePage;


import React, { useEffect, useState, useMemo, useRef } from "react";
import { jwtDecode } from "jwt-decode";
import {
  Search,
  TrendingUp,
  TrendingDown,
  ShoppingCart,
  Briefcase,
  Package,
  Wifi,
  WifiOff,
} from "lucide-react";
import ExploreNavbar from "../components/ExploreNavbar";
import BuySellModal from "../components/BuySellModal";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  connectWebSocket,
  disconnectWebSocket,
} from "../services/WebSocketService";
import "../styles/ExplorePage.css";

const ExplorePage = () => {
  const [companies, setCompanies] = useState([]);
  const [livePrices, setLivePrices] = useState({});
  const [previousPrices, setPreviousPrices] = useState({});
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("ALL");
  const [userId, setUserId] = useState(null);
  const [loadingCompanies, setLoadingCompanies] = useState(true);
  const [wsConnected, setWsConnected] = useState(false);
  const [modal, setModal] = useState({
    open: false,
    type: null,
    company: null,
  });
  const [refreshKey, setRefreshKey] = useState(0);
  const prevPricesRef = useRef({});

  // ✅ Get userId from JWT
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

  // ✅ Fetch companies (static data: name, symbol, id)
  useEffect(() => {
    fetchCompanies();
  }, []);

  // ✅ Connect WebSocket for live prices
  useEffect(() => {
    connectWebSocket((prices) => {
      // prices = { "TCS": 3505.18, "INFY": 1476.96, ... }

      // Save previous prices for change calculation
      setPreviousPrices({ ...prevPricesRef.current });
      prevPricesRef.current = { ...prices };

      setLivePrices(prices);
      setWsConnected(true);
    });

    return () => {
      disconnectWebSocket();
    };
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

  // ✅ Merge live prices with company data
  const companiesWithLivePrices = useMemo(() => {
    return companies.map((c) => {
      const symbol = c.symbol || c.companyCode || "";
      const livePrice = livePrices[symbol];
      const prevPrice = previousPrices[symbol];

      const currentPrice = livePrice
        ? parseFloat(livePrice)
        : c.price || c.faceValue || 0;
      const oldPrice = prevPrice
        ? parseFloat(prevPrice)
        : currentPrice;
      const change =
        oldPrice > 0 ? ((currentPrice - oldPrice) / oldPrice) * 100 : 0;

      return {
        ...c,
        price: currentPrice,
        change: change,
        symbol: symbol,
      };
    });
  }, [companies, livePrices, previousPrices]);

  // ✅ Filter + Search
  const filtered = useMemo(() => {
    let result = companiesWithLivePrices;
    if (search) {
      result = result.filter(
        (c) =>
          c.name?.toLowerCase().includes(search.toLowerCase()) ||
          c.companyName?.toLowerCase().includes(search.toLowerCase()) ||
          c.symbol?.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (filter === "GAINERS") {
      result = result.filter((c) => (c.change || 0) > 0);
    } else if (filter === "LOSERS") {
      result = result.filter((c) => (c.change || 0) < 0);
    }
    return result;
  }, [companiesWithLivePrices, search, filter]);

  const gainersCount = companiesWithLivePrices.filter(
    (c) => (c.change || 0) > 0
  ).length;
  const losersCount = companiesWithLivePrices.filter(
    (c) => (c.change || 0) < 0
  ).length;

  const openModal = (type, company) => {
    setModal({ open: true, type, company });
  };

  const closeModal = () => {
    setModal({ open: false, type: null, company: null });
  };

  const handleOrderSuccess = () => {
    fetchCompanies();
    setRefreshKey((prev) => prev + 1);
    window.dispatchEvent(new Event("wallet-refresh"));
  };

  return (
    <div className="explore-page">
      <ExploreNavbar key={refreshKey} />

      {/* Market Ticker with LIVE prices */}
      <div className="market-banner">
        <div className="market-ticker">
          {[...companiesWithLivePrices, ...companiesWithLivePrices].map(
            (c, i) => (
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
            )
          )}
        </div>
      </div>

      <div className="explore-container">
        {/* Header */}
        <div className="explore-header">
          <div className="explore-title">
            <h1>
              Explore Stocks{" "}
              {wsConnected ? (
                <span className="live-badge">
                  <Wifi size={14} />
                  LIVE
                </span>
              ) : (
                <span className="offline-badge">
                  <WifiOff size={14} />
                  Connecting...
                </span>
              )}
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

        {/* Search & Filter */}
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
              All ({companiesWithLivePrices.length})
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

        {/* Loading */}
        {loadingCompanies ? (
          <div className="loading-list">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="loading-row" />
            ))}
          </div>
        ) : (
          <>
            {filtered.length > 0 && (
              <div className="stock-table">
                <div className="stock-table-header">
                  <div className="col-company">Company</div>
                  <div className="col-price">Price</div>
                  <div className="col-change">Change</div>
                  <div className="col-high">Day High</div>
                  <div className="col-low">Day Low</div>
                  <div className="col-volume">Volume</div>
                  <div className="col-action">Action</div>
                </div>

                {filtered.map((company) => (
                  <StockRow
                    key={company.id}
                    company={company}
                    onBuy={() => openModal("BUY", company)}
                  />
                ))}
              </div>
            )}

            {filtered.length === 0 && (
              <div className="no-results">
                <Search size={64} className="icon" />
                <h3>No stocks found</h3>
                <p>Try a different search term or filter</p>
              </div>
            )}
          </>
        )}
      </div>

      {/* Buy/Sell Modal */}
      {modal.open && (
        <BuySellModal
          type={modal.type}
          company={modal.company}
          userId={userId}
          onClose={() => {
            closeModal();
            handleOrderSuccess();
          }}
          onSuccess={() => {
            handleOrderSuccess();
          }}
        />
      )}
    </div>
  );
};

// ✅ Stock Row — Uses LIVE prices
const StockRow = ({ company, onBuy }) => {
  const change = company.change || 0;
  const isPositive = change >= 0;
  const price = company.price || 0;

  // Calculate day high/low based on price
  const high = (price * 1.02).toFixed(2);
  const low = (price * 0.98).toFixed(2);
  const volume = (Math.random() * 10 + 1).toFixed(1) + "M";

  const displayName = company.name || company.companyName || "Unknown";
  const displaySymbol =
    company.symbol || company.companyCode || `STK${company.id}`;

  const initials = displayName
    .split(" ")
    .map((w) => w[0])
    .join("")
    .substring(0, 2)
    .toUpperCase();

  return (
    <div
      className={`stock-row ${isPositive ? "row-positive" : "row-negative"}`}
    >
      {/* Company */}
      <div className="col-company">
        <div className={`stock-avatar-sm ${isPositive ? "" : "negative"}`}>
          {initials}
        </div>
        <div className="company-info">
          <span className="company-name">{displayName}</span>
          <span className="company-symbol">{displaySymbol}</span>
        </div>
      </div>

      {/* Live Price */}
      <div className="col-price">
        <span className={`price-value ${isPositive ? "price-up" : "price-down"}`}>
          ₹
          {price.toLocaleString("en-IN", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </span>
      </div>

      {/* Change */}
      <div className={`col-change ${isPositive ? "positive" : "negative"}`}>
        <div className="change-badge">
          {isPositive ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
          <span>
            {isPositive ? "+" : ""}
            {change.toFixed(4)}%
          </span>
        </div>
      </div>

      {/* High */}
      <div className="col-high">
        <span className="stat-value green">₹{high}</span>
      </div>

      {/* Low */}
      <div className="col-low">
        <span className="stat-value red">₹{low}</span>
      </div>

      {/* Volume */}
      <div className="col-volume">
        <span className="stat-value">{volume}</span>
      </div>

      {/* Buy */}
      <div className="col-action">
        <button className="btn-buy-row" onClick={onBuy}>
          <ShoppingCart size={14} />
          <span className="btn-buy-text">Buy</span>
        </button>
      </div>
    </div>
  );
};

export default ExplorePage;