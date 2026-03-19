// // // // import React from "react";
// // // // import { TrendingUp, TrendingDown, Briefcase } from "lucide-react";
// // // // import "../styles/HoldingsCard.css";

// // // // const HoldingsCard = ({ holdings = [], loading = false }) => {
// // // //   if (loading) {
// // // //     return (
// // // //       <div className="holdings-card">
// // // //         <h3>Portfolio Holdings</h3>
// // // //         <div className="loading">Loading holdings...</div>
// // // //       </div>
// // // //     );
// // // //   }

// // // //   if (!holdings || holdings.length === 0) {
// // // //     return (
// // // //       <div className="holdings-card">
// // // //         <h3>Portfolio Holdings</h3>
// // // //         <div className="empty-state">
// // // //           <Briefcase size={48} />
// // // //           <p>No holdings yet. Start trading to build your portfolio!</p>
// // // //         </div>
// // // //       </div>
// // // //     );
// // // //   }

// // // //   const totalInvested = holdings.reduce(
// // // //     (sum, h) => sum + h.quantity * h.avgBuyPrice, 0
// // // //   );
// // // //   const totalCurrent = holdings.reduce(
// // // //     (sum, h) => sum + h.quantity * h.currentPrice, 0
// // // //   );
// // // //   const totalPL = totalCurrent - totalInvested;
// // // //   const totalPLPercent =
// // // //     totalInvested > 0 ? ((totalPL / totalInvested) * 100).toFixed(2) : 0;

// // // //   return (
// // // //     <div className="holdings-card">
// // // //       <div className="holdings-header">
// // // //         <h3>Portfolio Holdings</h3>
// // // //         <div className="portfolio-summary">
// // // //           <div className="summary-item">
// // // //             <span className="label">Total Invested:</span>
// // // //             <span className="value">₹{totalInvested.toFixed(2)}</span>
// // // //           </div>
// // // //           <div className="summary-item">
// // // //             <span className="label">Current Value:</span>
// // // //             <span className="value">₹{totalCurrent.toFixed(2)}</span>
// // // //           </div>
// // // //           <div className={`summary-item ${totalPL >= 0 ? "gain" : "loss"}`}>
// // // //             <span className="label">Total P/L:</span>
// // // //             <span className="value">
// // // //               {totalPL >= 0 ? "+" : ""}
// // // //               {totalPL.toFixed(2)} ({totalPLPercent}%)
// // // //             </span>
// // // //           </div>
// // // //         </div>
// // // //       </div>

// // // //       <div className="holdings-table">
// // // //         <div className="table-header">
// // // //           <div className="col col-company">Company</div>
// // // //           <div className="col col-qty">Qty</div>
// // // //           <div className="col col-avg">Avg Buy Price</div>
// // // //           <div className="col col-current">Current Price</div>
// // // //           <div className="col col-pl">Gain/Loss</div>
// // // //           <div className="col col-pl-percent">P/L %</div>
// // // //         </div>

// // // //         {holdings.map((holding) => {
// // // //           const pl = holding.profitLoss || 0;
// // // //           const plPercent = holding.profitLossPercent || 0;
// // // //           const isGain = pl >= 0;

// // // //           return (
// // // //             <div key={holding.companyId} className="table-row">

// // // //               {/* ✅ FIXED: Shows stock name instead of ID */}
// // // //               <div className="col col-company">
// // // //                 <span className="company-code">
// // // //                   {holding.companyCode || `Company #${holding.companyId}`}
// // // //                 </span>
// // // //                 <span className="company-name">
// // // //                   {holding.companyName || ""}
// // // //                 </span>
// // // //               </div>

// // // //               <div className="col col-qty">
// // // //                 <span className="quantity">{holding.quantity}</span>
// // // //               </div>
// // // //               <div className="col col-avg">
// // // //                 <span>₹{holding.avgBuyPrice.toFixed(2)}</span>
// // // //               </div>
// // // //               <div className="col col-current">
// // // //                 <span className="current-price">
// // // //                   ₹{holding.currentPrice.toFixed(2)}
// // // //                 </span>
// // // //               </div>
// // // //               <div className={`col col-pl ${isGain ? "gain" : "loss"}`}>
// // // //                 <span className="pl-value">
// // // //                   {isGain ? "+" : ""}
// // // //                   {pl.toFixed(2)}
// // // //                 </span>
// // // //               </div>
// // // //               <div className={`col col-pl-percent ${isGain ? "gain" : "loss"}`}>
// // // //                 {isGain ? (
// // // //                   <TrendingUp size={16} className="icon" />
// // // //                 ) : (
// // // //                   <TrendingDown size={16} className="icon" />
// // // //                 )}
// // // //                 <span>
// // // //                   {isGain ? "+" : ""}
// // // //                   {plPercent.toFixed(2)}%
// // // //                 </span>
// // // //               </div>
// // // //             </div>
// // // //           );
// // // //         })}
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // };

// // // // export default HoldingsCard;


// // // import React, { useState } from "react";
// // // import { TrendingUp, TrendingDown, Briefcase } from "lucide-react";
// // // import SellStockModal from "./SellStockModal";
// // // import "../styles/HoldingsCard.css";

// // // const HoldingsCard = ({ holdings = [], loading = false, portfolioId, onUpdate }) => {
// // //   const [showSellModal, setShowSellModal] = useState(false);
// // //   const [selectedHolding, setSelectedHolding] = useState(null);

// // //   const handleSellClick = (holding) => {
// // //     setSelectedHolding(holding);
// // //     setShowSellModal(true);
// // //   };

// // //   if (loading) {
// // //     return (
// // //       <div className="holdings-card">
// // //         <h3>Portfolio Holdings</h3>
// // //         <div className="loading">Loading holdings...</div>
// // //       </div>
// // //     );
// // //   }

// // //   if (!holdings || holdings.length === 0) {
// // //     return (
// // //       <div className="holdings-card">
// // //         <h3>Portfolio Holdings</h3>
// // //         <div className="empty-state">
// // //           <Briefcase size={48} />
// // //           <p>No holdings yet. Start trading to build your portfolio!</p>
// // //         </div>
// // //       </div>
// // //     );
// // //   }

// // //   const totalInvested = holdings.reduce(
// // //     (sum, h) => sum + h.quantity * h.avgBuyPrice, 0
// // //   );
// // //   const totalCurrent = holdings.reduce(
// // //     (sum, h) => sum + h.quantity * h.currentPrice, 0
// // //   );
// // //   const totalPL = totalCurrent - totalInvested;
// // //   const totalPLPercent =
// // //     totalInvested > 0 ? ((totalPL / totalInvested) * 100).toFixed(2) : 0;

// // //   return (
// // //     <div className="holdings-card">
// // //       <div className="holdings-header">
// // //         <h3>Portfolio Holdings</h3>
// // //         <div className="portfolio-summary">
// // //           <div className="summary-item">
// // //             <span className="label">Total Invested:</span>
// // //             <span className="value">₹{totalInvested.toFixed(2)}</span>
// // //           </div>
// // //           <div className="summary-item">
// // //             <span className="label">Current Value:</span>
// // //             <span className="value">₹{totalCurrent.toFixed(2)}</span>
// // //           </div>
// // //           <div className={`summary-item ${totalPL >= 0 ? "gain" : "loss"}`}>
// // //             <span className="label">Total P/L:</span>
// // //             <span className="value">
// // //               {totalPL >= 0 ? "+" : ""}{totalPL.toFixed(2)} ({totalPLPercent}%)
// // //             </span>
// // //           </div>
// // //         </div>
// // //       </div>

// // //       <div className="holdings-table">
// // //         <div className="table-header">
// // //           <div className="col col-company">Company</div>
// // //           <div className="col col-qty">Qty</div>
// // //           <div className="col col-avg">Avg Buy Price</div>
// // //           <div className="col col-current">Current Price</div>
// // //           <div className="col col-pl">Gain/Loss</div>
// // //           <div className="col col-pl-percent">P/L %</div>
// // //           <div className="col col-action">Action</div>
// // //         </div>

// // //         {holdings.map((holding) => {
// // //           const pl = holding.profitLoss || 0;
// // //           const plPercent = holding.profitLossPercent || 0;
// // //           const isGain = pl >= 0;

// // //           return (
// // //             <div key={holding.companyId} className="table-row">
// // //               <div className="col col-company">
// // //                 <span className="company-code">
// // //                   {holding.companyCode || `Company #${holding.companyId}`}
// // //                 </span>
// // //                 <span className="company-name">
// // //                   {holding.companyName || ""}
// // //                 </span>
// // //               </div>
// // //               <div className="col col-qty">
// // //                 <span className="quantity">{holding.quantity}</span>
// // //               </div>
// // //               <div className="col col-avg">
// // //                 <span>₹{holding.avgBuyPrice.toFixed(2)}</span>
// // //               </div>
// // //               <div className="col col-current">
// // //                 <span className="current-price">
// // //                   ₹{holding.currentPrice.toFixed(2)}
// // //                 </span>
// // //               </div>
// // //               <div className={`col col-pl ${isGain ? "gain" : "loss"}`}>
// // //                 <span className="pl-value">
// // //                   {isGain ? "+" : ""}{pl.toFixed(2)}
// // //                 </span>
// // //               </div>
// // //               <div className={`col col-pl-percent ${isGain ? "gain" : "loss"}`}>
// // //                 {isGain ? (
// // //                   <TrendingUp size={16} className="icon" />
// // //                 ) : (
// // //                   <TrendingDown size={16} className="icon" />
// // //                 )}
// // //                 <span>{isGain ? "+" : ""}{plPercent.toFixed(2)}%</span>
// // //               </div>

// // //               {/* ✅ SELL BUTTON */}
// // //               <div className="col col-action">
// // //                 <button
// // //                   className="sell-btn"
// // //                   onClick={() => handleSellClick(holding)}
// // //                 >
// // //                   Sell
// // //                 </button>
// // //               </div>
// // //             </div>
// // //           );
// // //         })}
// // //       </div>

// // //       {/* ✅ SELL MODAL */}
// // //       {showSellModal && selectedHolding && (
// // //         <SellStockModal
// // //           holding={selectedHolding}
// // //           portfolioId={portfolioId}
// // //           onClose={() => setShowSellModal(false)}
// // //           onSuccess={() => {
// // //             setShowSellModal(false);
// // //             onUpdate && onUpdate();
// // //           }}
// // //         />
// // //       )}
// // //     </div>
// // //   );
// // // };

// // // export default HoldingsCard;



// // import React, { useState, useEffect, useRef } from "react";
// // import { TrendingUp, TrendingDown, Briefcase, Wifi, WifiOff } from "lucide-react";
// // import SellStockModal from "./SellStockModal";
// // import { connectWebSocket, disconnectWebSocket } from "../services/WebSocketService";
// // import "../styles/HoldingsCard.css";

// // const HoldingsCard = ({ holdings = [], loading = false, portfolioId, onUpdate }) => {
// //   const [showSellModal, setShowSellModal] = useState(false);
// //   const [selectedHolding, setSelectedHolding] = useState(null);
// //   const [livePrices, setLivePrices] = useState({});
// //   const [wsConnected, setWsConnected] = useState(false);
// //   const wsRef = useRef(false);

// //   // ✅ Connect to WebSocket for live prices
// //   useEffect(() => {
// //     if (wsRef.current) return; // prevent double connect
// //     wsRef.current = true;

// //     connectWebSocket((prices) => {
// //       // prices = { "TCS": 3505.18, "INFY": 1476.96 }
// //       setLivePrices(prices);
// //       setWsConnected(true);
// //     });

// //     return () => {
// //       disconnectWebSocket();
// //       wsRef.current = false;
// //     };
// //   }, []);

// //   const handleSellClick = (holding) => {
// //     setSelectedHolding(holding);
// //     setShowSellModal(true);
// //   };

// //   if (loading) {
// //     return (
// //       <div className="holdings-card">
// //         <h3>Portfolio Holdings</h3>
// //         <div className="loading">Loading holdings...</div>
// //       </div>
// //     );
// //   }

// //   if (!holdings || holdings.length === 0) {
// //     return (
// //       <div className="holdings-card">
// //         <h3>Portfolio Holdings</h3>
// //         <div className="empty-state">
// //           <Briefcase size={48} />
// //           <p>No holdings yet. Start trading to build your portfolio!</p>
// //         </div>
// //       </div>
// //     );
// //   }

// //   // ✅ Merge live prices with holdings
// //  // ✅ Merge live prices with holdings — try multiple keys
// // const holdingsWithLivePrices = holdings.map((h) => {
// //   // Try matching by companyCode, companyName, or symbol
// //   const code = h.companyCode || "";
// //   const name = h.companyName || "";

// //   // ✅ Try multiple ways to find the live price
// //   let livePrice = livePrices[code];
  
// //   if (!livePrice) {
// //     // Try finding by iterating through live prices
// //     const keys = Object.keys(livePrices);
// //     const matchKey = keys.find(
// //       (key) =>
// //         key === code ||
// //         key.toUpperCase() === code.toUpperCase() ||
// //         name.toLowerCase().includes(key.toLowerCase()) ||
// //         key.toLowerCase().includes(code.toLowerCase())
// //     );
// //     if (matchKey) {
// //       livePrice = livePrices[matchKey];
// //     }
// //   }

// //   const currentPrice = livePrice ? parseFloat(livePrice) : h.currentPrice;
// //   const pl = (currentPrice - h.avgBuyPrice) * h.quantity;
// //   const plPercent =
// //     h.avgBuyPrice > 0
// //       ? ((currentPrice - h.avgBuyPrice) / h.avgBuyPrice) * 100
// //       : 0;

// //   // ✅ DEBUG — remove after fixing
// //   console.log(
// //     `Holding: ${code || name} → LivePrice: ${livePrice}, CurrentPrice: ${currentPrice}`
// //   );
// // console.log("Live prices:", livePrices);
// // console.log("Holdings:", holdings.map(h => ({
// //   companyCode: h.companyCode,
// //   companyName: h.companyName,
// //   companyId: h.companyId
// // })));
// //   return {
// //     ...h,
// //     currentPrice: currentPrice,
// //     profitLoss: pl,
// //     profitLossPercent: plPercent,
// //     isLive: !!livePrice,
// //   };
// // });

// //   const totalInvested = holdingsWithLivePrices.reduce(
// //     (sum, h) => sum + h.quantity * h.avgBuyPrice,
// //     0
// //   );
// //   const totalCurrent = holdingsWithLivePrices.reduce(
// //     (sum, h) => sum + h.quantity * h.currentPrice,
// //     0
// //   );
// //   const totalPL = totalCurrent - totalInvested;
// //   const totalPLPercent =
// //     totalInvested > 0 ? ((totalPL / totalInvested) * 100).toFixed(2) : 0;

// //   return (
// //     <div className="holdings-card">
// //       {/* Header */}
// //       <div className="holdings-header">
// //         <div className="holdings-title-row">
// //           <h3>Portfolio Holdings</h3>
// //           {wsConnected ? (
// //             <span className="holdings-live-badge">
// //               <Wifi size={12} />
// //               LIVE
// //             </span>
// //           ) : (
// //             <span className="holdings-offline-badge">
// //               <WifiOff size={12} />
// //               Offline
// //             </span>
// //           )}
// //         </div>

// //         <div className="portfolio-summary">
// //           <div className="summary-item">
// //             <span className="label">Total Invested</span>
// //             <span className="value">
// //               ₹
// //               {totalInvested.toLocaleString("en-IN", {
// //                 minimumFractionDigits: 2,
// //                 maximumFractionDigits: 2,
// //               })}
// //             </span>
// //           </div>
// //           <div className="summary-item">
// //             <span className="label">Current Value</span>
// //             <span className="value">
// //               ₹
// //               {totalCurrent.toLocaleString("en-IN", {
// //                 minimumFractionDigits: 2,
// //                 maximumFractionDigits: 2,
// //               })}
// //             </span>
// //           </div>
// //           <div className={`summary-item ${totalPL >= 0 ? "gain" : "loss"}`}>
// //             <span className="label">Total P/L</span>
// //             <span className="value">
// //               {totalPL >= 0 ? "+" : ""}₹
// //               {Math.abs(totalPL).toLocaleString("en-IN", {
// //                 minimumFractionDigits: 2,
// //                 maximumFractionDigits: 2,
// //               })}{" "}
// //               ({totalPLPercent}%)
// //             </span>
// //           </div>
// //         </div>
// //       </div>

// //       {/* Table */}
// //       <div className="holdings-table">
// //         <div className="table-header">
// //           <div className="col col-company">Company</div>
// //           <div className="col col-qty">Qty</div>
// //           <div className="col col-avg">Avg Buy</div>
// //           <div className="col col-current">Current</div>
// //           <div className="col col-pl">P/L</div>
// //           <div className="col col-pl-percent">P/L %</div>
// //           <div className="col col-action">Action</div>
// //         </div>

// //         {holdingsWithLivePrices.map((holding) => {
// //           const pl = holding.profitLoss || 0;
// //           const plPercent = holding.profitLossPercent || 0;
// //           const isGain = pl >= 0;

// //           return (
// //             <div
// //               key={holding.companyId}
// //               className={`table-row ${isGain ? "row-gain" : "row-loss"}`}
// //             >
// //               {/* Company */}
// //               <div className="col col-company">
// //                 <div className="company-col-info">
// //                   <span className="company-code">
// //                     {holding.companyCode || `#${holding.companyId}`}
// //                   </span>
// //                   <span className="company-name">
// //                     {holding.companyName || ""}
// //                   </span>
// //                 </div>
// //                 {holding.isLive && <span className="live-dot-sm"></span>}
// //               </div>

// //               {/* Qty */}
// //               <div className="col col-qty">
// //                 <span className="quantity">{holding.quantity}</span>
// //               </div>

// //               {/* Avg Buy Price */}
// //               <div className="col col-avg">
// //                 <span>
// //                   ₹
// //                   {holding.avgBuyPrice.toLocaleString("en-IN", {
// //                     minimumFractionDigits: 2,
// //                     maximumFractionDigits: 2,
// //                   })}
// //                 </span>
// //               </div>

// //               {/* ✅ LIVE Current Price */}
// //               <div className="col col-current">
// //                 <span className={`current-price ${isGain ? "price-up" : "price-down"}`}>
// //                   ₹
// //                   {holding.currentPrice.toLocaleString("en-IN", {
// //                     minimumFractionDigits: 2,
// //                     maximumFractionDigits: 2,
// //                   })}
// //                 </span>
// //               </div>

// //               {/* P/L */}
// //               <div className={`col col-pl ${isGain ? "gain" : "loss"}`}>
// //                 <span className="pl-value">
// //                   {isGain ? "+" : ""}₹
// //                   {Math.abs(pl).toLocaleString("en-IN", {
// //                     minimumFractionDigits: 2,
// //                     maximumFractionDigits: 2,
// //                   })}
// //                 </span>
// //               </div>

// //               {/* P/L % */}
// //               <div className={`col col-pl-percent ${isGain ? "gain" : "loss"}`}>
// //                 {isGain ? (
// //                   <TrendingUp size={14} className="icon" />
// //                 ) : (
// //                   <TrendingDown size={14} className="icon" />
// //                 )}
// //                 <span>
// //                   {isGain ? "+" : ""}
// //                   {plPercent.toFixed(2)}%
// //                 </span>
// //               </div>

// //               {/* Sell Button */}
// //               <div className="col col-action">
// //                 <button
// //                   className="sell-btn"
// //                   onClick={() => handleSellClick(holding)}
// //                 >
// //                   Sell
// //                 </button>
// //               </div>
// //             </div>
// //           );
// //         })}
// //       </div>

// //       {/* Sell Modal — pass LIVE price */}
// //       {showSellModal && selectedHolding && (
// //         <SellStockModal
// //           holding={{
// //             ...selectedHolding,
// //             currentPrice:
// //               parseFloat(livePrices[selectedHolding.companyCode]) ||
// //               selectedHolding.currentPrice,
// //           }}
// //           portfolioId={portfolioId}
// //           onClose={() => setShowSellModal(false)}
// //           onSuccess={() => {
// //             setShowSellModal(false);
// //             window.dispatchEvent(new Event("wallet-refresh"));
// //             onUpdate && onUpdate();
// //           }}
// //         />
// //       )}
// //     </div>
// //   );
// // };

// // export default HoldingsCard;


// import React, { useState, useEffect, useRef } from "react";
// import {
//   TrendingUp,
//   TrendingDown,
//   Briefcase,
//   Wifi,
//   WifiOff,
// } from "lucide-react";
// import SellStockModal from "./SellStockModal";
// import {
//   connectWebSocket,
//   disconnectWebSocket,
// } from "../services/WebSocketService";
// import "../styles/HoldingsCard.css";

// const HoldingsCard = ({
//   holdings = [],
//   loading = false,
//   portfolioId,
//   onUpdate,
//   onStatsUpdate,
// }) => {
//   const [showSellModal, setShowSellModal] = useState(false);
//   const [selectedHolding, setSelectedHolding] = useState(null);
//   const [livePrices, setLivePrices] = useState({});
//   const [wsConnected, setWsConnected] = useState(false);
//   const callbackRef = useRef(null);

//   // ✅ Connect WebSocket
//   useEffect(() => {
//     const handlePrices = (prices) => {
//       setLivePrices(prices);
//       setWsConnected(true);
//     };

//     callbackRef.current = handlePrices;
//     connectWebSocket(handlePrices);

//     return () => {
//       disconnectWebSocket(callbackRef.current);
//     };
//   }, []);

//   const handleSellClick = (holding) => {
//     setSelectedHolding(holding);
//     setShowSellModal(true);
//   };

//   // ✅ Loading state
//   if (loading) {
//     return (
//       <div className="holdings-card">
//         <h3>Portfolio Holdings</h3>
//         <div className="loading">Loading holdings...</div>
//       </div>
//     );
//   }

//   // ✅ Empty state
//   if (!holdings || holdings.length === 0) {
//     return (
//       <div className="holdings-card">
//         <h3>Portfolio Holdings</h3>
//         <div className="empty-state">
//           <Briefcase size={48} />
//           <p>No holdings yet. Start trading to build your portfolio!</p>
//         </div>
//       </div>
//     );
//   }

//   // ✅ Merge live prices with holdings
//   const holdingsWithLivePrices = holdings.map((h) => {
//     const code = h.companyCode || "";

//     // Try exact match first, then case-insensitive
//     let livePrice = livePrices[code];
//     if (!livePrice) {
//       const matchKey = Object.keys(livePrices).find(
//         (key) => key.toUpperCase() === code.toUpperCase()
//       );
//       if (matchKey) livePrice = livePrices[matchKey];
//     }

//     const currentPrice = livePrice ? parseFloat(livePrice) : h.currentPrice;
//     const pl = (currentPrice - h.avgBuyPrice) * h.quantity;
//     const plPercent =
//       h.avgBuyPrice > 0
//         ? ((currentPrice - h.avgBuyPrice) / h.avgBuyPrice) * 100
//         : 0;

//     return {
//       ...h,
//       currentPrice,
//       profitLoss: pl,
//       profitLossPercent: plPercent,
//       isLive: !!livePrice,
//     };
//   });

//   // ✅ Calculate stats
//   const totalInvested = holdingsWithLivePrices.reduce(
//     (sum, h) => sum + h.quantity * h.avgBuyPrice,
//     0
//   );
//   const totalCurrent = holdingsWithLivePrices.reduce(
//     (sum, h) => sum + h.quantity * h.currentPrice,
//     0
//   );
//   const totalPL = totalCurrent - totalInvested;
//   const totalPLPercent =
//     totalInvested > 0 ? ((totalPL / totalInvested) * 100).toFixed(2) : 0;

//   // ✅ Report live stats to parent (PortfolioPage)
//   useEffect(() => {
//     if (!onStatsUpdate) return;
//     if (!holdings || holdings.length === 0) return;

//     onStatsUpdate({
//       totalInvested,
//       totalValue: totalCurrent,
//       totalGain: totalPL,
//     });
//   }, [livePrices, holdings]);

//   return (
//     <div className="holdings-card">
//       {/* Header */}
//       <div className="holdings-header">
//         <div className="holdings-title-row">
//           <h3>Portfolio Holdings</h3>
//           {wsConnected ? (
//             <span className="holdings-live-badge">
//               <Wifi size={12} />
//               LIVE
//             </span>
//           ) : (
//             <span className="holdings-offline-badge">
//               <WifiOff size={12} />
//               Offline
//             </span>
//           )}
//         </div>

//         <div className="portfolio-summary">
//           <div className="summary-item">
//             <span className="label">Total Invested</span>
//             <span className="value">
//               ₹
//               {totalInvested.toLocaleString("en-IN", {
//                 minimumFractionDigits: 2,
//                 maximumFractionDigits: 2,
//               })}
//             </span>
//           </div>
//           <div className="summary-item">
//             <span className="label">Current Value</span>
//             <span className="value">
//               ₹
//               {totalCurrent.toLocaleString("en-IN", {
//                 minimumFractionDigits: 2,
//                 maximumFractionDigits: 2,
//               })}
//             </span>
//           </div>
//           <div className={`summary-item ${totalPL >= 0 ? "gain" : "loss"}`}>
//             <span className="label">Total P/L</span>
//             <span className="value">
//               {totalPL >= 0 ? "+" : ""}₹
//               {Math.abs(totalPL).toLocaleString("en-IN", {
//                 minimumFractionDigits: 2,
//                 maximumFractionDigits: 2,
//               })}{" "}
//               ({totalPLPercent}%)
//             </span>
//           </div>
//         </div>
//       </div>

//       {/* Table */}
//       <div className="holdings-table">
//         <div className="table-header">
//           <div className="col col-company">Company</div>
//           <div className="col col-qty">Qty</div>
//           <div className="col col-avg">Avg Buy</div>
//           <div className="col col-current">Current</div>
//           <div className="col col-pl">P/L</div>
//           <div className="col col-pl-percent">P/L %</div>
//           <div className="col col-action">Action</div>
//         </div>

//         {holdingsWithLivePrices.map((holding) => {
//           const pl = holding.profitLoss || 0;
//           const plPercent = holding.profitLossPercent || 0;
//           const isGain = pl >= 0;

//           return (
//             <div
//               key={holding.companyId}
//               className={`table-row ${isGain ? "row-gain" : "row-loss"}`}
//             >
//               {/* Company */}
//               <div className="col col-company">
//                 <div className="company-col-info">
//                   <span className="company-code">
//                     {holding.companyCode || `#${holding.companyId}`}
//                   </span>
//                   <span className="company-name">
//                     {holding.companyName || ""}
//                   </span>
//                 </div>
//                 {holding.isLive && <span className="live-dot-sm"></span>}
//               </div>

//               {/* Qty */}
//               <div className="col col-qty">
//                 <span className="quantity">{holding.quantity}</span>
//               </div>

//               {/* Avg Buy */}
//               <div className="col col-avg">
//                 <span>
//                   ₹
//                   {holding.avgBuyPrice.toLocaleString("en-IN", {
//                     minimumFractionDigits: 2,
//                     maximumFractionDigits: 2,
//                   })}
//                 </span>
//               </div>

//               {/* Live Current Price */}
//               <div className="col col-current">
//                 <span
//                   className={`current-price ${
//                     isGain ? "price-up" : "price-down"
//                   }`}
//                 >
//                   ₹
//                   {holding.currentPrice.toLocaleString("en-IN", {
//                     minimumFractionDigits: 2,
//                     maximumFractionDigits: 2,
//                   })}
//                 </span>
//               </div>

//               {/* P/L */}
//               <div className={`col col-pl ${isGain ? "gain" : "loss"}`}>
//                 <span className="pl-value">
//                   {isGain ? "+" : ""}₹
//                   {Math.abs(pl).toLocaleString("en-IN", {
//                     minimumFractionDigits: 2,
//                     maximumFractionDigits: 2,
//                   })}
//                 </span>
//               </div>

//               {/* P/L % */}
//               <div
//                 className={`col col-pl-percent ${isGain ? "gain" : "loss"}`}
//               >
//                 {isGain ? (
//                   <TrendingUp size={14} className="icon" />
//                 ) : (
//                   <TrendingDown size={14} className="icon" />
//                 )}
//                 <span>
//                   {isGain ? "+" : ""}
//                   {plPercent.toFixed(2)}%
//                 </span>
//               </div>

//               {/* Sell */}
//               <div className="col col-action">
//                 <button
//                   className="sell-btn"
//                   onClick={() => handleSellClick(holding)}
//                 >
//                   Sell
//                 </button>
//               </div>
//             </div>
//           );
//         })}
//       </div>

//       {/* Sell Modal */}
//       {showSellModal && selectedHolding && (
//         <SellStockModal
//           holding={{
//             ...selectedHolding,
//             currentPrice:
//               parseFloat(livePrices[selectedHolding.companyCode]) ||
//               selectedHolding.currentPrice,
//           }}
//           portfolioId={portfolioId}
//           onClose={() => setShowSellModal(false)}
//           onSuccess={() => {
//             setShowSellModal(false);
//             window.dispatchEvent(new Event("wallet-refresh"));
//             onUpdate && onUpdate();
//           }}
//         />
//       )}
//     </div>
//   );
// };

// export default HoldingsCard;


import React, { useState, useEffect, useRef, useMemo } from "react";
import {
  TrendingUp,
  TrendingDown,
  Briefcase,
  Wifi,
  WifiOff,
} from "lucide-react";
import SellStockModal from "./SellStockModal";
import {
  connectWebSocket,
  disconnectWebSocket,
} from "../services/WebSocketService";
import "../styles/HoldingsCard.css";

const HoldingsCard = ({
  holdings = [],
  loading = false,
  portfolioId,
  onUpdate,
  onStatsUpdate,
}) => {
  const [showSellModal, setShowSellModal] = useState(false);
  const [selectedHolding, setSelectedHolding] = useState(null);
  const [livePrices, setLivePrices] = useState({});
  const [wsConnected, setWsConnected] = useState(false);
  const callbackRef = useRef(null);

  // ✅ Hook 1: WebSocket
  useEffect(() => {
    const handlePrices = (prices) => {
      setLivePrices(prices);
      setWsConnected(true);
    };
    callbackRef.current = handlePrices;
    connectWebSocket(handlePrices);

    return () => {
      disconnectWebSocket(callbackRef.current);
    };
  }, []);

  // ✅ Hook 2: Calculate live holdings
  const holdingsWithLivePrices = useMemo(() => {
    if (!holdings || holdings.length === 0) return [];

    return holdings.map((h) => {
      const code = h.companyCode || "";
      let livePrice = livePrices[code];
      if (!livePrice) {
        const matchKey = Object.keys(livePrices).find(
          (key) => key.toUpperCase() === code.toUpperCase()
        );
        if (matchKey) livePrice = livePrices[matchKey];
      }

      const currentPrice = livePrice ? parseFloat(livePrice) : h.currentPrice;
      const pl = (currentPrice - h.avgBuyPrice) * h.quantity;
      const plPercent =
        h.avgBuyPrice > 0
          ? ((currentPrice - h.avgBuyPrice) / h.avgBuyPrice) * 100
          : 0;

      return {
        ...h,
        currentPrice,
        profitLoss: pl,
        profitLossPercent: plPercent,
        isLive: !!livePrice,
      };
    });
  }, [holdings, livePrices]);

  // ✅ Hook 3: Calculate stats
  const { totalInvested, totalCurrent, totalPL, totalPLPercent } =
    useMemo(() => {
      const invested = holdingsWithLivePrices.reduce(
        (sum, h) => sum + h.quantity * h.avgBuyPrice,
        0
      );
      const current = holdingsWithLivePrices.reduce(
        (sum, h) => sum + h.quantity * h.currentPrice,
        0
      );
      const pl = current - invested;
      const plPercent =
        invested > 0 ? ((pl / invested) * 100).toFixed(2) : "0.00";

      return {
        totalInvested: invested,
        totalCurrent: current,
        totalPL: pl,
        totalPLPercent: plPercent,
      };
    }, [holdingsWithLivePrices]);

  // ✅ Hook 4: Report stats to parent
  useEffect(() => {
    if (!onStatsUpdate) return;
    if (holdingsWithLivePrices.length === 0) return;

    onStatsUpdate({
      totalInvested,
      totalValue: totalCurrent,
      totalGain: totalPL,
    });
  }, [totalInvested, totalCurrent, totalPL]);

  // ✅ All hooks above — conditional renders below

  const handleSellClick = (holding) => {
    setSelectedHolding(holding);
    setShowSellModal(true);
  };

  // ✅ Loading
  if (loading) {
    return (
      <div className="holdings-card">
        <h3>Portfolio Holdings</h3>
        <div className="loading">Loading holdings...</div>
      </div>
    );
  }

  // ✅ Empty
  if (!holdings || holdings.length === 0) {
    return (
      <div className="holdings-card">
        <h3>Portfolio Holdings</h3>
        <div className="empty-state">
          <Briefcase size={48} />
          <p>No holdings yet. Start trading to build your portfolio!</p>
        </div>
      </div>
    );
  }

  // ✅ Main render
  return (
    <div className="holdings-card">
      {/* Header */}
      <div className="holdings-header">
        <div className="holdings-title-row">
          <h3>Portfolio Holdings</h3>
          {wsConnected ? (
            <span className="holdings-live-badge">
              <Wifi size={12} />
              LIVE
            </span>
          ) : (
            <span className="holdings-offline-badge">
              <WifiOff size={12} />
              Offline
            </span>
          )}
        </div>

        <div className="portfolio-summary">
          <div className="summary-item">
            <span className="label">Total Invested</span>
            <span className="value">
              ₹
              {totalInvested.toLocaleString("en-IN", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </span>
          </div>
          <div className="summary-item">
            <span className="label">Current Value</span>
            <span className="value">
              ₹
              {totalCurrent.toLocaleString("en-IN", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </span>
          </div>
          <div className={`summary-item ${totalPL >= 0 ? "gain" : "loss"}`}>
            <span className="label">Total P/L</span>
            <span className="value">
              {totalPL >= 0 ? "+" : ""}₹
              {Math.abs(totalPL).toLocaleString("en-IN", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}{" "}
              ({totalPLPercent}%)
            </span>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="holdings-table">
        <div className="table-header">
          <div className="col col-company">Company</div>
          <div className="col col-qty">Qty</div>
          <div className="col col-avg">Avg Buy</div>
          <div className="col col-current">Current</div>
          <div className="col col-pl">P/L</div>
          <div className="col col-pl-percent">P/L %</div>
          <div className="col col-action">Action</div>
        </div>

        {holdingsWithLivePrices.map((holding) => {
          const pl = holding.profitLoss || 0;
          const plPercent = holding.profitLossPercent || 0;
          const isGain = pl >= 0;

          return (
            <div
              key={holding.companyId}
              className={`table-row ${isGain ? "row-gain" : "row-loss"}`}
            >
              <div className="col col-company">
                <div className="company-col-info">
                  <span className="company-code">
                    {holding.companyCode || `#${holding.companyId}`}
                  </span>
                  <span className="company-name">
                    {holding.companyName || ""}
                  </span>
                </div>
                {holding.isLive && <span className="live-dot-sm"></span>}
              </div>

              <div className="col col-qty">
                <span className="quantity">{holding.quantity}</span>
              </div>

              <div className="col col-avg">
                <span>
                  ₹
                  {holding.avgBuyPrice.toLocaleString("en-IN", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </span>
              </div>

              <div className="col col-current">
                <span
                  className={`current-price ${
                    isGain ? "price-up" : "price-down"
                  }`}
                >
                  ₹
                  {holding.currentPrice.toLocaleString("en-IN", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </span>
              </div>

              <div className={`col col-pl ${isGain ? "gain" : "loss"}`}>
                <span className="pl-value">
                  {isGain ? "+" : ""}₹
                  {Math.abs(pl).toLocaleString("en-IN", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </span>
              </div>

              <div
                className={`col col-pl-percent ${isGain ? "gain" : "loss"}`}
              >
                {isGain ? (
                  <TrendingUp size={14} className="icon" />
                ) : (
                  <TrendingDown size={14} className="icon" />
                )}
                <span>
                  {isGain ? "+" : ""}
                  {plPercent.toFixed(2)}%
                </span>
              </div>

              <div className="col col-action">
                <button
                  className="sell-btn"
                  onClick={() => handleSellClick(holding)}
                >
                  Sell
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Sell Modal */}
      {showSellModal && selectedHolding && (
        <SellStockModal
          holding={{
            ...selectedHolding,
            currentPrice:
              parseFloat(livePrices[selectedHolding.companyCode]) ||
              selectedHolding.currentPrice,
          }}
          portfolioId={portfolioId}
          onClose={() => setShowSellModal(false)}
          onSuccess={() => {
            setShowSellModal(false);
            window.dispatchEvent(new Event("wallet-refresh"));
            onUpdate && onUpdate();
          }}
        />
      )}
    </div>
  );
};

export default HoldingsCard;