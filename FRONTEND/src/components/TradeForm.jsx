import React, { useEffect, useState } from "react";
import {
  ArrowUpRight,
  ArrowDownLeft,
  TrendingUp,
  TrendingDown,
} from "lucide-react";
import "../styles/TradeForm.css";

const TradeForm = ({ company, userId, portfolios, onTradingComplete }) => {
  const [tradeType, setTradeType] = useState("BUY");
  const [selectedPortfolio, setSelectedPortfolio] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState(company?.price || 0);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (portfolios && portfolios.length > 0) {
      setSelectedPortfolio(portfolios[0].id);
    }
  }, [portfolios]);

  useEffect(() => {
    if (company) {
      setPrice(company.price);
    }
  }, [company]);

  const totalAmount = (quantity * price).toFixed(2);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedPortfolio) {
      setMessage("Please select a portfolio");
      return;
    }

    if (quantity <= 0) {
      setMessage("Quantity must be greater than 0");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const orderData = {
        userId: Number(userId) || parseInt(userId),
        portfolioId: Number(selectedPortfolio) || parseInt(selectedPortfolio),
        companyId: Number(company.id) || parseInt(company.id),
        quantity: Number(quantity) || parseInt(quantity),
        price: Number(price) || parseFloat(price),
      };

      console.log("Order Data:", orderData);

      const response = await fetch(
        `http://localhost:8083/orders/${tradeType.toLowerCase()}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(orderData),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Trade failed");
      }

      const result = await response.json();
      setMessage(`${tradeType} order placed successfully!`);

      // Reset form
      setQuantity(1);
      setPrice(company.price);

      // Notify parent
      if (onTradingComplete) {
        onTradingComplete(result);
      }
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const isBuy = tradeType === "BUY";
  const buttonClass = isBuy ? "btn-buy" : "btn-sell";
  const Icon = isBuy ? ArrowDownLeft : ArrowUpRight;

  return (
    <div className="trade-form-container">
      <div className="trade-header">
        <h3>Trade {company?.name || "Stock"}</h3>
        <p className="current-price">
          Current Price: ₹{price.toFixed(2)}
        </p>
      </div>

      <div className="trade-type-selector">
        <button
          className={`trade-type-btn ${isBuy ? "active buy" : "buy"}`}
          onClick={() => setTradeType("BUY")}
        >
          <TrendingDown size={18} />
          BUY
        </button>
        <button
          className={`trade-type-btn ${!isBuy ? "active sell" : "sell"}`}
          onClick={() => setTradeType("SELL")}
        >
          <TrendingUp size={18} />
          SELL
        </button>
      </div>

      <form onSubmit={handleSubmit} className="trade-form">
        <div className="form-group">
          <label>Portfolio</label>
          <select
            value={selectedPortfolio}
            onChange={(e) => setSelectedPortfolio(e.target.value)}
            required
          >
            <option value="">Select Portfolio</option>
            {portfolios && portfolios.length > 0 ? (
              portfolios.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))
            ) : (
              <option disabled>No portfolios available</option>
            )}
          </select>
        </div>

        <div className="form-group">
          <label>Quantity</label>
          <input
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
            required
          />
        </div>

        <div className="form-group">
          <label>Price per Share</label>
          <input
            type="number"
            step="0.01"
            value={price}
            onChange={(e) => setPrice(parseFloat(e.target.value) || 0)}
            required
          />
        </div>

        <div className="total-amount">
          <span>Total Amount:</span>
          <span className="amount">₹{totalAmount}</span>
        </div>

        <button
          type="submit"
          className={`btn btn-submit ${buttonClass}`}
          disabled={loading}
        >
          <Icon size={20} />
          {loading ? "Processing..." : `${tradeType} Now`}
        </button>

        {message && (
          <div
            className={`message ${
              message.includes("Error") ? "error" : "success"
            }`}
          >
            {message}
          </div>
        )}
      </form>
    </div>
  );
};

export default TradeForm;
