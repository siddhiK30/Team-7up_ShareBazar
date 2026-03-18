// src/pages/Market.jsx
import React, { useEffect, useState, useRef, useMemo } from "react";
import {
  TrendingUp,
  TrendingDown,
  Activity,
  Search,
  Wifi,
  BarChart3,
  ArrowUpRight,
  ArrowDownRight,
  Minus,
} from "lucide-react";
import { connectSocket, disconnectSocket } from "../services/socketService";

import "../styles/Market.css";

// ✅ Simple SVG Sparkline Chart Component (no library needed)
const SparklineChart = ({ data = [], color = "#10b981", height = 80 }) => {
  if (data.length < 2) return null;

  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const width = 100;

  const points = data.map((val, i) => {
    const x = (i / (data.length - 1)) * width;
    const y = height - ((val - min) / range) * (height - 10) - 5;
    return `${x},${y}`;
  });

  const linePath = `M ${points.join(" L ")}`;
  const areaPath = `${linePath} L ${width},${height} L 0,${height} Z`;

  const gradientId = `grad-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="none"
      style={{ width: "100%", height: `${height}px` }}
    >
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.3" />
          <stop offset="100%" stopColor={color} stopOpacity="0.02" />
        </linearGradient>
      </defs>
      {/* Area fill */}
      <path d={areaPath} fill={`url(#${gradientId})`} />
      {/* Line */}
      <path
        d={linePath}
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Current price dot */}
      <circle
        cx={(data.length - 1) / (data.length - 1) * width}
        cy={height - ((data[data.length - 1] - min) / range) * (height - 10) - 5}
        r="3"
        fill={color}
      />
    </svg>
  );
};

const Market = () => {
  const [prices, setPrices] = useState({});
  const [prevPrices, setPrevPrices] = useState({});
  const [priceHistory, setPriceHistory] = useState({});
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("ALL");
  const [flashMap, setFlashMap] = useState({});
  const prevPricesRef = useRef({});

  useEffect(() => {
    connectSocket((data) => {
      setPrevPrices(prevPricesRef.current);
      prevPricesRef.current = data;
      setPrices(data);

      // ✅ Build price history for charts
      setPriceHistory((prev) => {
        const updated = { ...prev };
        Object.entries(data).forEach(([company, price]) => {
          if (!updated[company]) {
            updated[company] = [];
          }
          updated[company] = [...updated[company].slice(-30), Number(price)];
        });
        return updated;
      });

      // ✅ Flash animation on price change
      const flashes = {};
      Object.entries(data).forEach(([company, price]) => {
        const prev = prevPricesRef.current[company];
        if (prev && price !== prev) {
          flashes[company] = price > prev ? "green" : "red";
        }
      });
      setFlashMap(flashes);
      setTimeout(() => setFlashMap({}), 600);
    });

    return () => disconnectSocket();
  }, []);

  // ✅ Calculate stats
  const entries = useMemo(() => Object.entries(prices), [prices]);

  const gainersCount = entries.filter(
    ([company, price]) => price > (prevPrices[company] || price)
  ).length;

  const losersCount = entries.filter(
    ([company, price]) => price < (prevPrices[company] || price)
  ).length;

  // ✅ Filter + Search
  const filteredEntries = useMemo(() => {
    let result = entries;

    if (search) {
      result = result.filter(([company]) =>
        company.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (filter === "GAINERS") {
      result = result.filter(
        ([company, price]) => price > (prevPrices[company] || price)
      );
    } else if (filter === "LOSERS") {
      result = result.filter(
        ([company, price]) => price < (prevPrices[company] || price)
      );
    }

    return result;
  }, [entries, search, filter, prevPrices]);

  // ✅ Loading State
  if (!prices || Object.keys(prices).length === 0) {
    return (
      <div className="market-page">
      
        <div className="market-loading">
          <div className="loading-icon">
            <Wifi size={28} />
          </div>
          <h2>Connecting to Live Market...</h2>
          <p>Real-time prices will appear shortly</p>
        </div>
      </div>
    );
  }

  return (
    <div className="market-page">
    

      {/* ✅ Market Banner */}
      <div className="market-banner">
        <div className="market-banner-content">
          <div className="market-banner-left">
            <h1>
              Live Market
              <span className="live-badge">
                <span className="live-dot" />
                LIVE
              </span>
            </h1>
            <p>Real-time stock prices updated every second</p>
          </div>

          <div className="market-banner-stats">
            <div className="market-mini-stat">
              <div className="stat-num">{entries.length}</div>
              <div className="stat-lbl">Stocks</div>
            </div>
            <div className="market-mini-stat">
              <div className="stat-num" style={{ color: "#4ade80" }}>
                {gainersCount}
              </div>
              <div className="stat-lbl">Gainers</div>
            </div>
            <div className="market-mini-stat">
              <div className="stat-num" style={{ color: "#f87171" }}>
                {losersCount}
              </div>
              <div className="stat-lbl">Losers</div>
            </div>
          </div>
        </div>
      </div>

      {/* ✅ Ticker Strip */}
      <div className="market-ticker-strip">
        <div className="ticker-scroll">
          {[...entries, ...entries].map(([company, price], i) => {
            const prev = prevPrices[company] || price;
            const isUp = price > prev;
            const isDown = price < prev;
            const changePercent = prev
              ? (((price - prev) / prev) * 100).toFixed(2)
              : "0.00";

            return (
              <div className="ticker-chip" key={`${company}-${i}`}>
                <span className="ticker-chip-name">{company}</span>
                <span className="ticker-chip-price">
                  ₹{Number(price).toFixed(2)}
                </span>
                <span
                  className={`ticker-chip-change ${
                    isUp ? "up" : isDown ? "down" : ""
                  }`}
                >
                  {isUp ? "▲" : isDown ? "▼" : "–"} {Math.abs(changePercent)}%
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="market-container">
        {/* ✅ Filter Bar */}
        <div className="market-filter-bar">
          <div className="market-search">
            <Search size={18} className="search-icon" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search stocks..."
            />
          </div>

          <div className="market-filter-tabs">
            <button
              className={`market-filter-tab ${filter === "ALL" ? "active" : ""}`}
              onClick={() => setFilter("ALL")}
            >
              All ({entries.length})
            </button>
            <button
              className={`market-filter-tab ${
                filter === "GAINERS" ? "active" : ""
              }`}
              onClick={() => setFilter("GAINERS")}
            >
              🟢 Gainers ({gainersCount})
            </button>
            <button
              className={`market-filter-tab ${
                filter === "LOSERS" ? "active" : ""
              }`}
              onClick={() => setFilter("LOSERS")}
            >
              🔴 Losers ({losersCount})
            </button>
          </div>
        </div>

        {/* ✅ Stock Cards with Charts */}
        <div className="market-grid">
          {filteredEntries.map(([company, price]) => {
            const prev = prevPrices[company] || price;
            const isUp = price > prev;
            const isDown = price < prev;
            const change = price - prev;
            const changePercent = prev
              ? (((price - prev) / prev) * 100).toFixed(2)
              : "0.00";

            const history = priceHistory[company] || [];
            const high = history.length > 0 ? Math.max(...history) : price;
            const low = history.length > 0 ? Math.min(...history) : price;

            const initials = company
              .split(" ")
              .map((w) => w[0])
              .join("")
              .substring(0, 2)
              .toUpperCase();

            const direction = isUp ? "up" : isDown ? "down" : "neutral";
            const chartColor = isUp ? "#10b981" : isDown ? "#ef4444" : "#6b7280";
            const flashClass = flashMap[company]
              ? flashMap[company] === "green"
                ? "flash-green"
                : "flash-red"
              : "";

            return (
              <div
                key={company}
                className={`market-card ${direction} ${flashClass}`}
              >
                {/* Card Header */}
                <div className="market-card-header">
                  <div className="market-card-info">
                    <div className={`market-card-avatar ${direction}`}>
                      {initials}
                    </div>
                    <div>
                      <h3 className="market-card-name">{company}</h3>
                      <span className="market-card-symbol">NSE</span>
                    </div>
                  </div>

                  <div className="market-card-price-section">
                    <p className="market-card-price">
                      ₹{Number(price).toFixed(2)}
                    </p>
                    <div className={`market-card-change ${direction}`}>
                      {isUp ? (
                        <ArrowUpRight size={14} />
                      ) : isDown ? (
                        <ArrowDownRight size={14} />
                      ) : (
                        <Minus size={14} />
                      )}
                      <span>
                        {isUp ? "+" : ""}
                        {change.toFixed(2)} ({isUp ? "+" : ""}
                        {changePercent}%)
                      </span>
                    </div>
                  </div>
                </div>

                {/* ✅ Sparkline Chart */}
                <div className="market-card-chart">
                  <SparklineChart
                    data={history}
                    color={chartColor}
                    height={80}
                  />
                </div>

                {/* Card Footer Stats */}
                <div className="market-card-stats">
                  <div className="market-card-stat">
                    <div className="market-card-stat-label">High</div>
                    <div className="market-card-stat-value">
                      ₹{high.toFixed(2)}
                    </div>
                  </div>
                  <div className="market-card-stat">
                    <div className="market-card-stat-label">Low</div>
                    <div className="market-card-stat-value">
                      ₹{low.toFixed(2)}
                    </div>
                  </div>
                  <div className="market-card-stat">
                    <div className="market-card-stat-label">Points</div>
                    <div className="market-card-stat-value">
                      {history.length}
                    </div>
                  </div>
                  <div className="market-card-stat">
                    <div className="market-card-stat-label">Trend</div>
                    <div
                      className="market-card-stat-value"
                      style={{
                        color: isUp ? "#059669" : isDown ? "#dc2626" : "#6b7280",
                      }}
                    >
                      {isUp ? "Bullish" : isDown ? "Bearish" : "Stable"}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty State */}
        {filteredEntries.length === 0 && (
          <div
            style={{
              textAlign: "center",
              padding: "60px 20px",
              color: "#9ca3af",
            }}
          >
            <Search size={48} style={{ margin: "0 auto 16px", opacity: 0.3 }} />
            <h3 style={{ color: "#6b7280", margin: "0 0 4px" }}>
              No stocks found
            </h3>
            <p style={{ fontSize: "14px" }}>
              Try a different search or filter
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Market;