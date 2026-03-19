// // import React, { useState } from "react";
// // import { X, DollarSign } from "lucide-react";
// // import axios from "axios";
// // import { jwtDecode } from "jwt-decode";
// // import "../styles/SellStockModal.css";

// // const SellStockModal = ({ holding, portfolioId, onClose, onSuccess }) => {
// //   const [quantity, setQuantity] = useState(1);
// //   const [loading, setLoading] = useState(false);
// //   const [error, setError] = useState("");

// //   const handleSell = async () => {
// //     if (quantity <= 0) {
// //       setError("Quantity must be at least 1");
// //       return;
// //     }
// //     if (quantity > holding.quantity) {
// //       setError(`You only have ${holding.quantity} shares`);
// //       return;
// //     }

// //     try {
// //       setLoading(true);
// //       setError("");
// //       const token = localStorage.getItem("token");
// //       const decoded = jwtDecode(token);
// //       const userId = decoded.userId || decoded.sub;

// //       // ✅ ONLY call Order Service — it handles portfolio + wallet internally
// //       await axios.post(
// //         "http://localhost:8086/orders/sell",
// //         {
// //           userId: Number(userId),
// //           portfolioId: Number(portfolioId),
// //           companyId: holding.companyId,
// //           quantity: quantity,
// //           price: holding.currentPrice,
// //         },
// //         {
// //           headers: { Authorization: `Bearer ${token}` },
// //         }
// //       );

// //       // ✅ REMOVED: The direct call to /portfolio/internal/sellStock
// //       // Order Service already does this internally!

// //       onSuccess && onSuccess();
// //       setTimeout(() => onClose(), 500);
// //     } catch (err) {
// //       console.error("Sell error:", err.response?.data);
// //       setError(
// //         err.response?.data?.message ||
// //           err.response?.data ||
// //           err.response?.data?.error ||
// //           "Failed to sell stock"
// //       );
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const totalValue = (quantity * holding.currentPrice).toFixed(2);
// //   const profitPerShare = holding.currentPrice - holding.avgBuyPrice;
// //   const totalProfit = (profitPerShare * quantity).toFixed(2);
// //   const isProfit = profitPerShare >= 0;

// //   return (
// //     <div className="modal-overlay" onClick={onClose}>
// //       <div
// //         className="modal-content sell-modal"
// //         onClick={(e) => e.stopPropagation()}
// //       >
// //         {/* Header */}
// //         <div className="modal-header">
// //           <div className="modal-title">
// //             <DollarSign size={20} />
// //             <h2>Sell Stock</h2>
// //           </div>
// //           <button className="close-btn" onClick={onClose}>
// //             <X size={20} />
// //           </button>
// //         </div>

// //         {/* Stock Info */}
// //         <div className="stock-info sell-info">
// //           <div className="stock-name">
// //             <span className="code">
// //               {holding.companyCode || `Company #${holding.companyId}`}
// //             </span>
// //             <span className="name">{holding.companyName || ""}</span>
// //           </div>
// //           <div className="stock-details">
// //             <span className="current-price">
// //               ₹{holding.currentPrice.toFixed(2)}
// //             </span>
// //             <span className={`price-change ${isProfit ? "profit" : "loss"}`}>
// //               {isProfit ? "+" : ""}₹{profitPerShare.toFixed(2)} per share
// //             </span>
// //           </div>
// //         </div>

// //         {error && <div className="error-msg">{error}</div>}

// //         {/* Holdings Info */}
// //         <div className="holdings-info">
// //           <div className="info-row">
// //             <span>Available Quantity</span>
// //             <span className="bold">{holding.quantity} shares</span>
// //           </div>
// //           <div className="info-row">
// //             <span>Avg Buy Price</span>
// //             <span>₹{holding.avgBuyPrice.toFixed(2)}</span>
// //           </div>
// //           <div className="info-row">
// //             <span>Current Price</span>
// //             <span>₹{holding.currentPrice.toFixed(2)}</span>
// //           </div>
// //         </div>

// //         {/* Quantity Input */}
// //         <div className="form-group">
// //           <label>Sell Quantity</label>
// //           <div className="qty-input-group">
// //             <input
// //               type="number"
// //               min="1"
// //               max={holding.quantity}
// //               value={quantity}
// //               onChange={(e) => setQuantity(Number(e.target.value))}
// //             />
// //             <button
// //               className="sell-all-btn"
// //               onClick={() => setQuantity(holding.quantity)}
// //             >
// //               Sell All
// //             </button>
// //           </div>
// //         </div>

// //         {/* Order Summary */}
// //         <div className="order-summary">
// //           <div className="summary-row">
// //             <span>Sell Price</span>
// //             <span>₹{holding.currentPrice.toFixed(2)}</span>
// //           </div>
// //           <div className="summary-row">
// //             <span>Quantity</span>
// //             <span>{quantity}</span>
// //           </div>
// //           <div className={`summary-row ${isProfit ? "profit" : "loss"}`}>
// //             <span>Profit/Loss</span>
// //             <span>
// //               {isProfit ? "+" : ""}₹{totalProfit}
// //             </span>
// //           </div>
// //           <div className="summary-row total">
// //             <span>Total Value</span>
// //             <span>₹{totalValue}</span>
// //           </div>
// //         </div>

// //         {/* Sell Button */}
// //         <button
// //           className="sell-confirm-btn"
// //           onClick={handleSell}
// //           disabled={loading}
// //         >
// //           {loading
// //             ? "Processing..."
// //             : `Sell ${quantity} shares for ₹${totalValue}`}
// //         </button>
// //       </div>
// //     </div>
// //   );
// // };

// // export default SellStockModal;


// import React, { useState } from "react";
// import { X, DollarSign, Clock, CheckCircle, AlertCircle } from "lucide-react";
// import axios from "axios";
// import { jwtDecode } from "jwt-decode";
// import { placeLimitOrder } from "../services/LimitOrderService";
// import "../styles/SellStockModal.css";

// const SellStockModal = ({ holding, portfolioId, onClose, onSuccess }) => {
//   const [mode, setMode]         = useState("MARKET"); // "MARKET" | "LIMIT"
//   const [quantity, setQuantity] = useState(1);
//   const [targetPrice, setTargetPrice] = useState("");
//   const [expiryHours, setExpiryHours] = useState(24);
//   const [loading, setLoading]   = useState(false);
//   const [error, setError]       = useState("");
//   const [status, setStatus]     = useState(null);  // "success" | "error"
//   const [message, setMessage]   = useState("");

//   const totalValue    = (quantity * holding.currentPrice).toFixed(2);
//   const profitPerShare = holding.currentPrice - holding.avgBuyPrice;
//   const totalProfit   = (profitPerShare * quantity).toFixed(2);
//   const isProfit      = profitPerShare >= 0;
//   const limitTotal    = (quantity * Number(targetPrice || 0)).toFixed(2);

//   // ── Validation ──
//   const validate = () => {
//     if (quantity <= 0) {
//       setError("Quantity must be at least 1");
//       return false;
//     }
//     if (quantity > holding.quantity) {
//       setError(`You only have ${holding.quantity} shares`);
//       return false;
//     }
//     if (mode === "LIMIT") {
//       const tp = Number(targetPrice);
//       if (!tp || tp <= 0) {
//         setError("Please enter a valid target price");
//         return false;
//       }
//       if (tp <= holding.currentPrice) {
//         setError(
//           `Sell limit price (₹${tp}) must be ABOVE current price (₹${holding.currentPrice.toFixed(2)})`
//         );
//         return false;
//       }
//     }
//     return true;
//   };

//   // ── Market Sell ──
//   const handleMarketSell = async () => {
//     try {
//       setLoading(true);
//       setError("");

//       const token   = localStorage.getItem("token");
//       const decoded = jwtDecode(token);
//       const userId  = decoded.userId || decoded.sub;

//       await axios.post(
//         "http://localhost:8086/orders/sell",
//         {
//           userId:      Number(userId),
//           portfolioId: Number(portfolioId),
//           companyId:   holding.companyId,
//           quantity:    quantity,
//           price:       holding.currentPrice,
//         },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       setStatus("success");
//       setMessage(
//         `Successfully sold ${quantity} share(s) of ${
//           holding.companyName || `Company #${holding.companyId}`
//         } for ₹${totalValue}`
//       );
//       onSuccess && onSuccess();
//     } catch (err) {
//       console.error("Sell error:", err.response?.data);
//       setError(
//         err.response?.data?.message ||
//           err.response?.data ||
//           err.response?.data?.error ||
//           "Failed to sell stock"
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ── Limit Sell ──
//   const handleLimitSell = async () => {
//     try {
//       setLoading(true);
//       setError("");

//       const token   = localStorage.getItem("token");
//       const decoded = jwtDecode(token);
//       const userId  = decoded.userId || decoded.sub;

//     await placeLimitOrder({
//   userId:       Number(userId),
//   portfolioId:  Number(portfolioId),
//   companyId:    holding.companyId,
//   companyName:  holding.companyName || holding.companyCode, // ← ADD THIS
//   quantity:     Number(quantity),
//   targetPrice:  Number(targetPrice),
//   currentPrice: holding.currentPrice,
//   orderType:    "SELL",
//   expiryHours:  expiryHours || null,
// });

//       setStatus("success");
//       setMessage(
//         `Limit SELL order placed! Will execute when price rises to ₹${targetPrice}. 
//          Expires in ${expiryHours}h.`
//       );
//     } catch (err) {
//       setError(
//         err.response?.data?.message ||
//           err.response?.data ||
//           "Failed to place limit order"
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSubmit = () => {
//     if (!validate()) return;
//     if (mode === "MARKET") handleMarketSell();
//     else handleLimitSell();
//   };

//   return (
//     <div className="modal-overlay" onClick={onClose}>
//       <div
//         className="modal-content sell-modal"
//         onClick={(e) => e.stopPropagation()}
//         style={{ maxHeight: "90vh", overflowY: "auto" }}
//       >
//         {/* ── Header ── */}
//         <div className="modal-header">
//           <div className="modal-title">
//             <DollarSign size={20} />
//             <h2>Sell Stock</h2>
//           </div>
//           <button className="close-btn" onClick={onClose}>
//             <X size={20} />
//           </button>
//         </div>

//         {/* ── Mode Toggle ── */}
//         <div
//           style={{
//             display: "flex",
//             borderBottom: "1px solid #f0f0f0",
//             background: "#f8fafc",
//           }}
//         >
//           {[
//             { key: "MARKET", label: "Market Sell" },
//             { key: "LIMIT",  label: "Limit Sell"  },
//           ].map((tab) => (
//             <button
//               key={tab.key}
//               onClick={() => {
//                 setMode(tab.key);
//                 setError("");
//                 setStatus(null);
//               }}
//               style={{
//                 flex: 1,
//                 padding: "12px 0",
//                 border: "none",
//                 borderBottom:
//                   mode === tab.key
//                     ? "2.5px solid #ef4444"
//                     : "2.5px solid transparent",
//                 background: mode === tab.key ? "#fff" : "transparent",
//                 cursor: "pointer",
//                 fontSize: "0.85rem",
//                 fontWeight: mode === tab.key ? 700 : 500,
//                 color: mode === tab.key ? "#ef4444" : "#94a3b8",
//                 transition: "all 0.2s",
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 gap: 6,
//               }}
//             >
//               {tab.key === "LIMIT" && <Clock size={14} />}
//               {tab.label}
//             </button>
//           ))}
//         </div>

//         {/* ── Limit Order Info Banner ── */}
//         {mode === "LIMIT" && (
//           <div
//             style={{
//               margin: "1rem 1rem 0",
//               padding: "10px 14px",
//               background: "#fff7ed",
//               border: "1px solid #fed7aa",
//               borderRadius: "0.75rem",
//               fontSize: "0.78rem",
//               color: "#c2410c",
//               lineHeight: 1.6,
//             }}
//           >
//             <span style={{ fontWeight: 700 }}>📈 Sell Limit Order — </span>
//             Set a price <strong>above</strong> the current market price. 
//             Your shares will be sold automatically when the price reaches 
//             your target.
//           </div>
//         )}

//         {/* ── Stock Info ── */}
//         <div className="stock-info sell-info">
//           <div className="stock-name">
//             <span className="code">
//               {holding.companyCode || `Company #${holding.companyId}`}
//             </span>
//             <span className="name">{holding.companyName || ""}</span>
//           </div>
//           <div className="stock-details">
//             <span className="current-price">
//               ₹{holding.currentPrice.toFixed(2)}
//             </span>
//             <span className={`price-change ${isProfit ? "profit" : "loss"}`}>
//               {isProfit ? "+" : ""}₹{profitPerShare.toFixed(2)} per share
//             </span>
//           </div>
//         </div>

//         {/* ── Error ── */}
//         {error && (
//           <div
//             style={{
//               margin: "0 1rem",
//               padding: "10px 14px",
//               background: "#fff1f2",
//               border: "1px solid #fecdd3",
//               borderRadius: "0.75rem",
//               fontSize: "0.82rem",
//               color: "#be123c",
//               display: "flex",
//               alignItems: "center",
//               gap: 8,
//             }}
//           >
//             <AlertCircle size={16} />
//             {error}
//           </div>
//         )}

//         {/* ── Holdings Info ── */}
//         <div className="holdings-info">
//           <div className="info-row">
//             <span>Available Quantity</span>
//             <span className="bold">{holding.quantity} shares</span>
//           </div>
//           <div className="info-row">
//             <span>Avg Buy Price</span>
//             <span>₹{holding.avgBuyPrice.toFixed(2)}</span>
//           </div>
//           <div className="info-row">
//             <span>Current Price</span>
//             <span>₹{holding.currentPrice.toFixed(2)}</span>
//           </div>
//         </div>

//         {/* ── Quantity Input ── */}
//         <div className="form-group">
//           <label>Sell Quantity</label>
//           <div className="qty-input-group">
//             <input
//               type="number"
//               min="1"
//               max={holding.quantity}
//               value={quantity}
//               disabled={status === "success"}
//               onChange={(e) => setQuantity(Number(e.target.value))}
//             />
//             <button
//               className="sell-all-btn"
//               disabled={status === "success"}
//               onClick={() => setQuantity(holding.quantity)}
//             >
//               Sell All
//             </button>
//           </div>
//         </div>

//         {/* ── Limit Price Input (only in LIMIT mode) ── */}
//         {mode === "LIMIT" && (
//           <>
//             {/* Target Price */}
//             <div className="form-group">
//               <label style={{ display: "flex", justifyContent: "space-between" }}>
//                 <span>Target Sell Price (₹)</span>
//                 <span style={{ fontSize: "0.75rem", color: "#94a3b8", fontWeight: 400 }}>
//                   Must be above ₹{holding.currentPrice.toFixed(2)}
//                 </span>
//               </label>
//               <input
//                 type="number"
//                 step="0.01"
//                 min={holding.currentPrice + 0.01}
//                 value={targetPrice}
//                 disabled={status === "success"}
//                 onChange={(e) => setTargetPrice(e.target.value)}
//                 placeholder={`e.g. ₹${(holding.currentPrice * 1.05).toFixed(2)}`}
//                 style={{
//                   width: "100%",
//                   padding: "10px 14px",
//                   border: "1.5px solid #e2e8f0",
//                   borderRadius: "0.625rem",
//                   fontSize: "0.9rem",
//                   outline: "none",
//                   background: "#f8fafc",
//                 }}
//               />
//             </div>

//             {/* Expiry */}
//             <div className="form-group">
//               <label>Order Expires After</label>
//               <select
//                 value={expiryHours}
//                 disabled={status === "success"}
//                 onChange={(e) => setExpiryHours(Number(e.target.value))}
//                 style={{
//                   width: "100%",
//                   padding: "10px 14px",
//                   border: "1.5px solid #e2e8f0",
//                   borderRadius: "0.625rem",
//                   fontSize: "0.9rem",
//                   background: "#f8fafc",
//                   cursor: "pointer",
//                 }}
//               >
//                 <option value={1}>1 Hour</option>
//                 <option value={6}>6 Hours</option>
//                 <option value={24}>24 Hours (1 Day)</option>
//                 <option value={72}>3 Days</option>
//                 <option value={168}>1 Week</option>
//                 <option value={0}>Never Expire</option>
//               </select>
//             </div>
//           </>
//         )}

//         {/* ── Order Summary ── */}
//         <div className="order-summary">
//           {mode === "MARKET" ? (
//             <>
//               <div className="summary-row">
//                 <span>Sell Price</span>
//                 <span>₹{holding.currentPrice.toFixed(2)}</span>
//               </div>
//               <div className="summary-row">
//                 <span>Quantity</span>
//                 <span>{quantity}</span>
//               </div>
//               <div className={`summary-row ${isProfit ? "profit" : "loss"}`}>
//                 <span>Profit / Loss</span>
//                 <span>
//                   {isProfit ? "+" : ""}₹{totalProfit}
//                 </span>
//               </div>
//               <div className="summary-row total">
//                 <span>Total Value</span>
//                 <span>₹{totalValue}</span>
//               </div>
//             </>
//           ) : (
//             <>
//               <div className="summary-row">
//                 <span>Current Price</span>
//                 <span>₹{holding.currentPrice.toFixed(2)}</span>
//               </div>
//               <div className="summary-row">
//                 <span>Target Price</span>
//                 <span style={{ fontWeight: 700, color: "#ef4444" }}>
//                   {targetPrice ? `₹${Number(targetPrice).toFixed(2)}` : "—"}
//                 </span>
//               </div>
//               <div className="summary-row">
//                 <span>Quantity</span>
//                 <span>{quantity}</span>
//               </div>
//               <div className="summary-row">
//                 <span>Expires In</span>
//                 <span>
//                   {expiryHours === 0
//                     ? "Never"
//                     : expiryHours >= 168
//                     ? "1 Week"
//                     : expiryHours >= 72
//                     ? "3 Days"
//                     : expiryHours >= 24
//                     ? "1 Day"
//                     : `${expiryHours}h`}
//                 </span>
//               </div>
//               <div className="summary-row total">
//                 <span>Est. Total at Target</span>
//                 <span>
//                   {targetPrice ? `₹${limitTotal}` : "—"}
//                 </span>
//               </div>
//             </>
//           )}
//         </div>

//         {/* ── Success Message ── */}
//         {status === "success" && (
//           <div
//             style={{
//               margin: "0 0 0.5rem",
//               padding: "12px 16px",
//               background: "#f0fdf4",
//               border: "1px solid #bbf7d0",
//               borderRadius: "0.875rem",
//               display: "flex",
//               alignItems: "flex-start",
//               gap: 10,
//             }}
//           >
//             <CheckCircle size={18} color="#16a34a" style={{ marginTop: 2, flexShrink: 0 }} />
//             <div>
//               <p style={{ fontWeight: 700, color: "#15803d", margin: 0, fontSize: "0.875rem" }}>
//                 {mode === "LIMIT" ? "Limit Order Placed! ⏳" : "Sold Successfully! 🎉"}
//               </p>
//               <p style={{ color: "#166534", margin: "4px 0 0", fontSize: "0.8rem", opacity: 0.85 }}>
//                 {message}
//               </p>
//             </div>
//           </div>
//         )}

//         {/* ── Action Button ── */}
//         {status !== "success" ? (
//           <button
//             className="sell-confirm-btn"
//             onClick={handleSubmit}
//             disabled={loading}
//           >
//             {loading
//               ? "Processing..."
//               : mode === "MARKET"
//               ? `Sell ${quantity} shares for ₹${totalValue}`
//               : `Place Limit Sell @ ₹${targetPrice || "—"}`}
//           </button>
//         ) : (
//           <button
//             onClick={onClose}
//             style={{
//               width: "100%",
//               padding: "13px",
//               borderRadius: "0.875rem",
//               border: "none",
//               background: "#334155",
//               color: "#fff",
//               fontWeight: 700,
//               fontSize: "0.95rem",
//               cursor: "pointer",
//             }}
//           >
//             Done ✓
//           </button>
//         )}
//       </div>
//     </div>
//   );
// };

// export default SellStockModal;

import React, { useState } from "react";
import { X, DollarSign, Clock, CheckCircle, AlertCircle } from "lucide-react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { placeLimitOrder } from "../services/LimitOrderService";
import "../styles/SellStockModal.css";

// ✅ Safe error extractor — NEVER returns an object
const extractErrorMessage = (err) => {
  const data = err?.response?.data;

  // If server returned a plain string
  if (typeof data === "string" && data.length > 0) return data;

  // If server returned an object with message/error field
  if (data && typeof data === "object") {
    if (typeof data.message === "string") return data.message;
    if (typeof data.error === "string") return data.error;
    if (typeof data.detail === "string") return data.detail;
    // Last resort: stringify it
    return JSON.stringify(data);
  }

  // Fallback to axios error message
  if (typeof err?.message === "string") return err.message;

  return "Something went wrong. Please try again.";
};

const SellStockModal = ({ holding, portfolioId, onClose, onSuccess }) => {
  const [mode, setMode] = useState("MARKET");
  const [quantity, setQuantity] = useState(1);
  const [targetPrice, setTargetPrice] = useState("");
  const [expiryHours, setExpiryHours] = useState(24);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [status, setStatus] = useState(null);
  const [message, setMessage] = useState("");

  const totalValue = (quantity * holding.currentPrice).toFixed(2);
  const profitPerShare = holding.currentPrice - holding.avgBuyPrice;
  const totalProfit = (profitPerShare * quantity).toFixed(2);
  const isProfit = profitPerShare >= 0;
  const limitTotal = (quantity * Number(targetPrice || 0)).toFixed(2);

  // ── Validation ──
  const validate = () => {
    if (quantity <= 0) {
      setError("Quantity must be at least 1");
      return false;
    }
    if (quantity > holding.quantity) {
      setError(`You only have ${holding.quantity} shares`);
      return false;
    }
    if (mode === "LIMIT") {
      const tp = Number(targetPrice);
      if (!tp || tp <= 0) {
        setError("Please enter a valid target price");
        return false;
      }
      if (tp <= holding.currentPrice) {
        setError(
          `Sell limit price (₹${tp}) must be ABOVE current price (₹${holding.currentPrice.toFixed(2)})`
        );
        return false;
      }
    }
    return true;
  };

  // ── Market Sell ──
  const handleMarketSell = async () => {
    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("token");
      const decoded = jwtDecode(token);
      const userId = decoded.userId || decoded.sub;

      const res = await axios.post(
        "http://localhost:8086/orders/sell",
        {
          userId: Number(userId),
          portfolioId: Number(portfolioId),
          companyId: holding.companyId,
          quantity: quantity,
          price: holding.currentPrice,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // ✅ Safely extract success message
      const data = res.data;
      let successMsg = `Successfully sold ${quantity} share(s) of ${
        holding.companyName || holding.companyCode || `Company #${holding.companyId}`
      } for ₹${totalValue}`;

      if (typeof data === "string" && data.length > 0) {
        successMsg = data;
      } else if (data && typeof data.message === "string") {
        successMsg = data.message;
      }

      setStatus("success");
      setMessage(successMsg);
      onSuccess && onSuccess();
    } catch (err) {
      console.error("Sell error:", err?.response?.data);
      // ✅ FIXED: Always extract a string
      setError(extractErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  // ── Limit Sell ──
  const handleLimitSell = async () => {
    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("token");
      const decoded = jwtDecode(token);
      const userId = decoded.userId || decoded.sub;

      await placeLimitOrder({
        userId: Number(userId),
        portfolioId: Number(portfolioId),
        companyId: holding.companyId,
        companyName: holding.companyName || holding.companyCode,
        quantity: Number(quantity),
        targetPrice: Number(targetPrice),
        currentPrice: holding.currentPrice,
        orderType: "SELL",
        expiryHours: expiryHours || null,
      });

      setStatus("success");
      setMessage(
        `Limit SELL order placed! Will execute when price rises to ₹${targetPrice}. Expires in ${expiryHours}h.`
      );
    } catch (err) {
      // ✅ FIXED: Always extract a string
      setError(extractErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = () => {
    if (!validate()) return;
    if (mode === "MARKET") handleMarketSell();
    else handleLimitSell();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content sell-modal"
        onClick={(e) => e.stopPropagation()}
        style={{ maxHeight: "90vh", overflowY: "auto" }}
      >
        {/* ── Header ── */}
        <div className="modal-header">
          <div className="modal-title">
            <DollarSign size={20} />
            <h2>Sell Stock</h2>
          </div>
          <button className="close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {/* ── Mode Toggle ── */}
        <div
          style={{
            display: "flex",
            borderBottom: "1px solid #f0f0f0",
            background: "#f8fafc",
          }}
        >
          {[
            { key: "MARKET", label: "Market Sell" },
            { key: "LIMIT", label: "Limit Sell" },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => {
                setMode(tab.key);
                setError("");
                setStatus(null);
              }}
              style={{
                flex: 1,
                padding: "12px 0",
                border: "none",
                borderBottom:
                  mode === tab.key
                    ? "2.5px solid #ef4444"
                    : "2.5px solid transparent",
                background: mode === tab.key ? "#fff" : "transparent",
                cursor: "pointer",
                fontSize: "0.85rem",
                fontWeight: mode === tab.key ? 700 : 500,
                color: mode === tab.key ? "#ef4444" : "#94a3b8",
                transition: "all 0.2s",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 6,
              }}
            >
              {tab.key === "LIMIT" && <Clock size={14} />}
              {tab.label}
            </button>
          ))}
        </div>

        {/* ── Limit Order Info Banner ── */}
        {mode === "LIMIT" && (
          <div
            style={{
              margin: "1rem 1rem 0",
              padding: "10px 14px",
              background: "#fff7ed",
              border: "1px solid #fed7aa",
              borderRadius: "0.75rem",
              fontSize: "0.78rem",
              color: "#c2410c",
              lineHeight: 1.6,
            }}
          >
            <span style={{ fontWeight: 700 }}>📈 Sell Limit Order — </span>
            Set a price <strong>above</strong> the current market price. Your
            shares will be sold automatically when the price reaches your
            target.
          </div>
        )}

        {/* ── Stock Info ── */}
        <div className="stock-info sell-info">
          <div className="stock-name">
            <span className="code">
              {holding.companyCode || `Company #${holding.companyId}`}
            </span>
            <span className="name">{holding.companyName || ""}</span>
          </div>
          <div className="stock-details">
            <span className="current-price">
              ₹{holding.currentPrice.toFixed(2)}
            </span>
            <span className={`price-change ${isProfit ? "profit" : "loss"}`}>
              {isProfit ? "+" : ""}₹{profitPerShare.toFixed(2)} per share
            </span>
          </div>
        </div>

        {/* ── Error ── ✅ FIXED: Always render string */}
        {error && (
          <div
            style={{
              margin: "0 1rem",
              padding: "10px 14px",
              background: "#fff1f2",
              border: "1px solid #fecdd3",
              borderRadius: "0.75rem",
              fontSize: "0.82rem",
              color: "#be123c",
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <AlertCircle size={16} style={{ flexShrink: 0 }} />
            <span>{String(error)}</span>
          </div>
        )}

        {/* ── Holdings Info ── */}
        <div className="holdings-info">
          <div className="info-row">
            <span>Available Quantity</span>
            <span className="bold">{holding.quantity} shares</span>
          </div>
          <div className="info-row">
            <span>Avg Buy Price</span>
            <span>₹{holding.avgBuyPrice.toFixed(2)}</span>
          </div>
          <div className="info-row">
            <span>Current Price</span>
            <span>₹{holding.currentPrice.toFixed(2)}</span>
          </div>
        </div>

        {/* ── Quantity Input ── */}
        <div className="form-group">
          <label>Sell Quantity</label>
          <div className="qty-input-group">
            <input
              type="number"
              min="1"
              max={holding.quantity}
              value={quantity}
              disabled={status === "success"}
              onChange={(e) => setQuantity(Number(e.target.value))}
            />
            <button
              className="sell-all-btn"
              disabled={status === "success"}
              onClick={() => setQuantity(holding.quantity)}
            >
              Sell All
            </button>
          </div>
        </div>

        {/* ── Limit Price Input ── */}
        {mode === "LIMIT" && (
          <>
            <div className="form-group">
              <label
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <span>Target Sell Price (₹)</span>
                <span
                  style={{
                    fontSize: "0.75rem",
                    color: "#94a3b8",
                    fontWeight: 400,
                  }}
                >
                  Must be above ₹{holding.currentPrice.toFixed(2)}
                </span>
              </label>
              <input
                type="number"
                step="0.01"
                min={holding.currentPrice + 0.01}
                value={targetPrice}
                disabled={status === "success"}
                onChange={(e) => setTargetPrice(e.target.value)}
                placeholder={`e.g. ₹${(holding.currentPrice * 1.05).toFixed(2)}`}
                style={{
                  width: "100%",
                  padding: "10px 14px",
                  border: "1.5px solid #e2e8f0",
                  borderRadius: "0.625rem",
                  fontSize: "0.9rem",
                  outline: "none",
                  background: "#f8fafc",
                }}
              />
            </div>

            <div className="form-group">
              <label>Order Expires After</label>
              <select
                value={expiryHours}
                disabled={status === "success"}
                onChange={(e) => setExpiryHours(Number(e.target.value))}
                style={{
                  width: "100%",
                  padding: "10px 14px",
                  border: "1.5px solid #e2e8f0",
                  borderRadius: "0.625rem",
                  fontSize: "0.9rem",
                  background: "#f8fafc",
                  cursor: "pointer",
                }}
              >
                <option value={1}>1 Hour</option>
                <option value={6}>6 Hours</option>
                <option value={24}>24 Hours (1 Day)</option>
                <option value={72}>3 Days</option>
                <option value={168}>1 Week</option>
                <option value={0}>Never Expire</option>
              </select>
            </div>
          </>
        )}

        {/* ── Order Summary ── */}
        <div className="order-summary">
          {mode === "MARKET" ? (
            <>
              <div className="summary-row">
                <span>Sell Price</span>
                <span>₹{holding.currentPrice.toFixed(2)}</span>
              </div>
              <div className="summary-row">
                <span>Quantity</span>
                <span>{quantity}</span>
              </div>
              <div className={`summary-row ${isProfit ? "profit" : "loss"}`}>
                <span>Profit / Loss</span>
                <span>
                  {isProfit ? "+" : ""}₹{totalProfit}
                </span>
              </div>
              <div className="summary-row total">
                <span>Total Value</span>
                <span>₹{totalValue}</span>
              </div>
            </>
          ) : (
            <>
              <div className="summary-row">
                <span>Current Price</span>
                <span>₹{holding.currentPrice.toFixed(2)}</span>
              </div>
              <div className="summary-row">
                <span>Target Price</span>
                <span style={{ fontWeight: 700, color: "#ef4444" }}>
                  {targetPrice
                    ? `₹${Number(targetPrice).toFixed(2)}`
                    : "—"}
                </span>
              </div>
              <div className="summary-row">
                <span>Quantity</span>
                <span>{quantity}</span>
              </div>
              <div className="summary-row">
                <span>Expires In</span>
                <span>
                  {expiryHours === 0
                    ? "Never"
                    : expiryHours >= 168
                    ? "1 Week"
                    : expiryHours >= 72
                    ? "3 Days"
                    : expiryHours >= 24
                    ? "1 Day"
                    : `${expiryHours}h`}
                </span>
              </div>
              <div className="summary-row total">
                <span>Est. Total at Target</span>
                <span>{targetPrice ? `₹${limitTotal}` : "—"}</span>
              </div>
            </>
          )}
        </div>

        {/* ── Success Message ── */}
        {status === "success" && (
          <div
            style={{
              margin: "0 0 0.5rem",
              padding: "12px 16px",
              background: "#f0fdf4",
              border: "1px solid #bbf7d0",
              borderRadius: "0.875rem",
              display: "flex",
              alignItems: "flex-start",
              gap: 10,
            }}
          >
            <CheckCircle
              size={18}
              color="#16a34a"
              style={{ marginTop: 2, flexShrink: 0 }}
            />
            <div>
              <p
                style={{
                  fontWeight: 700,
                  color: "#15803d",
                  margin: 0,
                  fontSize: "0.875rem",
                }}
              >
                {mode === "LIMIT"
                  ? "Limit Order Placed! ⏳"
                  : "Sold Successfully! 🎉"}
              </p>
              <p
                style={{
                  color: "#166534",
                  margin: "4px 0 0",
                  fontSize: "0.8rem",
                  opacity: 0.85,
                }}
              >
                {String(message)}
              </p>
            </div>
          </div>
        )}

        {/* ── Action Button ── */}
        {status !== "success" ? (
          <button
            className="sell-confirm-btn"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading
              ? "Processing..."
              : mode === "MARKET"
              ? `Sell ${quantity} shares for ₹${totalValue}`
              : `Place Limit Sell @ ₹${targetPrice || "—"}`}
          </button>
        ) : (
          <button
            onClick={onClose}
            style={{
              width: "100%",
              padding: "13px",
              borderRadius: "0.875rem",
              border: "none",
              background: "#334155",
              color: "#fff",
              fontWeight: 700,
              fontSize: "0.95rem",
              cursor: "pointer",
            }}
          >
            Done ✓
          </button>
        )}
      </div>
    </div>
  );
};

export default SellStockModal;