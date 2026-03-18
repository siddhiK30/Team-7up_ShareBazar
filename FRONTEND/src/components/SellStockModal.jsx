// src/components/SellStockModal.jsx
import React, { useState } from "react";
import { X, DollarSign } from "lucide-react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import "../styles/SellStockModal.css";

const SellStockModal = ({ holding, portfolioId, onClose, onSuccess }) => {
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSell = async () => {
    if (quantity <= 0) {
      setError("Quantity must be at least 1");
      return;
    }
    if (quantity > holding.quantity) {
      setError(`You only have ${holding.quantity} shares`);
      return;
    }

    try {
      setLoading(true);
      setError("");
      const token = localStorage.getItem("token");
      const decoded = jwtDecode(token);
      const userId = decoded.userId || decoded.sub;

      // ✅ Step 1: Place sell order — PORT 8086
      await axios.post(
        "http://localhost:8086/orders/sell",
        {
          userId: Number(userId),
          portfolioId: Number(portfolioId),
          companyId: holding.companyId,
          quantity: quantity,
          price: holding.currentPrice,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // ✅ Step 2: Remove from portfolio holdings — PORT 8085
      await axios.post(
        "http://localhost:8085/portfolio/internal/sellStock",
        {
          portfolioId: Number(portfolioId),
          companyId: holding.companyId,
          qty: quantity,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

    onSuccess && onSuccess();
setTimeout(() => window.location.reload(), 500);  // ✅ ADD THIS
    } catch (err) {
      console.error("Sell error:", JSON.stringify(err.response?.data));
      setError(
        err.response?.data?.message ||
        err.response?.data?.error ||
        "Failed to sell stock"
      );
    } finally {
      setLoading(false);
    }
  };

  const totalValue = (quantity * holding.currentPrice).toFixed(2);
  const profitPerShare = holding.currentPrice - holding.avgBuyPrice;
  const totalProfit = (profitPerShare * quantity).toFixed(2);
  const isProfit = profitPerShare >= 0;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content sell-modal"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="modal-header">
          <div className="modal-title">
            <DollarSign size={20} />
            <h2>Sell Stock</h2>
          </div>
          <button className="close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {/* Stock Info */}
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

        {error && <div className="error-msg">{error}</div>}

        {/* Holdings Info */}
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

        {/* Quantity Input */}
        <div className="form-group">
          <label>Sell Quantity</label>
          <div className="qty-input-group">
            <input
              type="number"
              min="1"
              max={holding.quantity}
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
            />
            <button
              className="sell-all-btn"
              onClick={() => setQuantity(holding.quantity)}
            >
              Sell All
            </button>
          </div>
        </div>

        {/* Order Summary */}
        <div className="order-summary">
          <div className="summary-row">
            <span>Sell Price</span>
            <span>₹{holding.currentPrice.toFixed(2)}</span>
          </div>
          <div className="summary-row">
            <span>Quantity</span>
            <span>{quantity}</span>
          </div>
          <div className={`summary-row ${isProfit ? "profit" : "loss"}`}>
            <span>Profit/Loss</span>
            <span>
              {isProfit ? "+" : ""}₹{totalProfit}
            </span>
          </div>
          <div className="summary-row total">
            <span>Total Value</span>
            <span>₹{totalValue}</span>
          </div>
        </div>

        {/* Sell Button */}
        <button
          className="sell-confirm-btn"
          onClick={handleSell}
          disabled={loading}
        >
          {loading
            ? "Processing..."
            : `Sell ${quantity} shares for ₹${totalValue}`}
        </button>
      </div>
    </div>
  );
};

export default SellStockModal;