// components/BuySellModal.jsx
import React, { useEffect, useState } from "react";
import { X, AlertCircle, CheckCircle, Wallet, Clock } from "lucide-react";
import { getWallet } from "../services/WalletService";
import { placeLimitOrder } from "../services/LimitOrderService";
import axios from "axios";

const BuySellModal = ({ type, company, userId, onClose, onSuccess }) => {
  const [mode, setMode] = useState("MARKET"); // "MARKET" | "LIMIT"
  const [portfolios, setPortfolios] = useState([]);
  const [selectedPortfolioId, setSelectedPortfolioId] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [targetPrice, setTargetPrice] = useState("");
  const [expiryHours, setExpiryHours] = useState(24);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);
  const [message, setMessage] = useState("");
  const [walletBalance, setWalletBalance] = useState(null);

  const isBuy = type === "BUY";
  const price = company?.price || 0;
  const executionPrice = mode === "LIMIT" ? Number(targetPrice) || 0 : price;
  const totalAmount = (quantity * executionPrice).toFixed(2);

  useEffect(() => {
    if (!userId) return;
    axios
      .get(`http://localhost:8085/portfolio/user/${userId}`)
      .then((res) => {
        setPortfolios(res.data);
        if (res.data.length > 0) {
          setSelectedPortfolioId(String(res.data[0].id));
        }
      })
      .catch(() => setMessage("Failed to load portfolios"));
    refreshWallet();
  }, [userId]);

  const refreshWallet = () => {
    if (!userId) return;
    getWallet(userId)
      .then((data) => setWalletBalance(data.balance))
      .catch(() => {});
  };

  // ─── Validation ───
  const validate = () => {
    if (!selectedPortfolioId) {
      setStatus("error");
      setMessage("Please select a portfolio");
      return false;
    }
    if (quantity <= 0) {
      setStatus("error");
      setMessage("Quantity must be at least 1");
      return false;
    }
    if (mode === "LIMIT") {
      const tp = Number(targetPrice);
      if (!tp || tp <= 0) {
        setStatus("error");
        setMessage("Please enter a valid target price");
        return false;
      }
      if (isBuy && tp >= price) {
        setStatus("error");
        setMessage(
          `Buy limit price (₹${tp}) must be BELOW current price (₹${price.toFixed(2)})`
        );
        return false;
      }
      if (!isBuy && tp <= price) {
        setStatus("error");
        setMessage(
          `Sell limit price (₹${tp}) must be ABOVE current price (₹${price.toFixed(2)})`
        );
        return false;
      }
    }
    if (
      isBuy &&
      mode === "MARKET" &&
      walletBalance !== null &&
      Number(totalAmount) > walletBalance
    ) {
      setStatus("error");
      setMessage(`Insufficient balance. You have ₹${Number(walletBalance).toFixed(2)}`);
      return false;
    }
    return true;
  };

  // ─── Submit ───
  const handleSubmit = async () => {
    if (!validate()) return;

    setLoading(true);
    setStatus(null);
    setMessage("");

    try {
      if (mode === "MARKET") {
        // ── Existing market order logic ──
        const endpoint = isBuy
          ? "http://localhost:8086/orders/buy"
          : "http://localhost:8086/orders/sell";

        await axios.post(endpoint, {
          userId: Number(userId),
          portfolioId: Number(selectedPortfolioId),
          companyId: Number(company.id),
          quantity: Number(quantity),
          price: Number(price),
        });

        await refreshWallet();
        setStatus("success");
        setMessage(
          `Successfully ${isBuy ? "bought" : "sold"} ${quantity} share(s) 
           of ${company.name} for ₹${totalAmount}!`
        );
        if (onSuccess) onSuccess(Number(selectedPortfolioId));

      } else {
        // ── Limit order ──
      // In handleSubmit → limit order section
await placeLimitOrder({
  userId:       Number(userId),
  portfolioId:  Number(selectedPortfolioId),
  companyId:    Number(company.id),
  companyName:  company.name,    // ← ADD THIS (socket key)
  quantity:     Number(quantity),
  targetPrice:  Number(targetPrice),
  currentPrice: Number(price),
  orderType:    type,
  expiryHours:  expiryHours || null,
});

        setStatus("success");
        setMessage(
          `Limit ${type} order placed! Will execute when price 
           ${isBuy ? "drops to" : "rises to"} ₹${targetPrice}. 
           Expires in ${expiryHours}h.`
        );
      }
    } catch (err) {
      setStatus("error");
      const errorData = err?.response?.data;
      let errorMsg = "Order failed";
      if (typeof errorData === "string") errorMsg = errorData;
      else if (errorData?.message) errorMsg = errorData.message;
      setMessage(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto">

        {/* ── Header ── */}
        <div className={`px-6 py-4 flex justify-between items-center sticky top-0 z-10
                        ${isBuy ? "bg-emerald-500" : "bg-red-500"}`}>
          <div>
            <h2 className="text-white font-bold text-lg sm:text-xl">
              {isBuy ? "Buy" : "Sell"} {company?.name}
            </h2>
            <p className="text-white/80 text-sm">
              Market Price: ₹{price?.toFixed(2)}
            </p>
          </div>
          <button onClick={onClose} className="text-white/80 hover:text-white transition">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* ── Mode Toggle ── */}
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => { setMode("MARKET"); setStatus(null); }}
            className={`flex-1 py-3 font-semibold text-sm transition
              ${mode === "MARKET"
                ? isBuy
                  ? "border-b-2 border-emerald-500 text-emerald-600"
                  : "border-b-2 border-red-500 text-red-600"
                : "text-gray-400 hover:text-gray-600"
              }`}
          >
            Market Order
          </button>
          <button
            onClick={() => { setMode("LIMIT"); setStatus(null); }}
            className={`flex-1 py-3 font-semibold text-sm transition
              flex items-center justify-center gap-1.5
              ${mode === "LIMIT"
                ? isBuy
                  ? "border-b-2 border-emerald-500 text-emerald-600"
                  : "border-b-2 border-red-500 text-red-600"
                : "text-gray-400 hover:text-gray-600"
              }`}
          >
            <Clock className="w-4 h-4" />
            Limit Order
          </button>
        </div>

        <div className="p-5 sm:p-6 space-y-4">

          {/* ── Limit Order Info Banner ── */}
          {mode === "LIMIT" && (
            <div className={`text-xs p-3 rounded-lg border
              ${isBuy
                ? "bg-blue-50 border-blue-200 text-blue-700"
                : "bg-orange-50 border-orange-200 text-orange-700"
              }`}>
              <p className="font-semibold mb-0.5">
                {isBuy ? "📉 Buy Limit Order" : "📈 Sell Limit Order"}
              </p>
              <p>
                {isBuy
                  ? "Set a price BELOW market. Order executes automatically when price drops to your target."
                  : "Set a price ABOVE market. Order executes automatically when price rises to your target."}
              </p>
            </div>
          )}

          {/* ── Wallet Balance ── */}
          {walletBalance !== null && (
            <div className="flex items-center justify-between bg-blue-50
                            border border-blue-200 rounded-xl px-4 py-3">
              <div className="flex items-center space-x-2">
                <Wallet className="w-4 h-4 text-blue-500" />
                <span className="text-sm font-medium text-blue-700">Balance</span>
              </div>
              <span className="text-base sm:text-lg font-bold text-blue-700">
                ₹{Number(walletBalance).toLocaleString("en-IN", {
                  minimumFractionDigits: 2
                })}
              </span>
            </div>
          )}

          {/* ── Portfolio Select ── */}
          <div>
            <label className="text-sm font-semibold text-gray-600 mb-1.5 block">
              Select Portfolio
            </label>
            <select
              value={selectedPortfolioId}
              onChange={(e) => setSelectedPortfolioId(e.target.value)}
              disabled={status === "success"}
              className="w-full border border-gray-200 rounded-lg px-4 py-2.5
                         focus:outline-none focus:ring-2 focus:ring-emerald-300
                         bg-gray-50 text-gray-800 disabled:opacity-50 text-sm"
            >
              {portfolios.length === 0 && (
                <option value="">No portfolios found</option>
              )}
              {portfolios.map((p) => (
                <option key={p.id} value={String(p.id)}>{p.name}</option>
              ))}
            </select>
          </div>

          {/* ── Limit Price Input ── */}
          {mode === "LIMIT" && (
            <div>
              <label className="text-sm font-semibold text-gray-600 mb-1.5 block">
                Target Price (₹)
                <span className="ml-2 font-normal text-gray-400">
                  Current: ₹{price.toFixed(2)}
                </span>
              </label>
              <input
                type="number"
                step="0.01"
                min="0.01"
                value={targetPrice}
                onChange={(e) => setTargetPrice(e.target.value)}
                disabled={status === "success"}
                placeholder={
                  isBuy
                    ? `Below ₹${price.toFixed(2)}`
                    : `Above ₹${price.toFixed(2)}`
                }
                className="w-full border border-gray-200 rounded-lg px-4 py-2.5
                           focus:outline-none focus:ring-2 focus:ring-blue-300
                           bg-gray-50 text-gray-800 disabled:opacity-50 text-sm"
              />
            </div>
          )}

          {/* ── Expiry (Limit only) ── */}
          {mode === "LIMIT" && (
            <div>
              <label className="text-sm font-semibold text-gray-600 mb-1.5 block">
                Expires After
              </label>
              <select
                value={expiryHours}
                onChange={(e) => setExpiryHours(Number(e.target.value))}
                disabled={status === "success"}
                className="w-full border border-gray-200 rounded-lg px-4 py-2.5
                           focus:outline-none focus:ring-2 focus:ring-blue-300
                           bg-gray-50 text-gray-800 disabled:opacity-50 text-sm"
              >
                <option value={1}>1 Hour</option>
                <option value={6}>6 Hours</option>
                <option value={24}>24 Hours (1 Day)</option>
                <option value={72}>3 Days</option>
                <option value={168}>1 Week</option>
                <option value={0}>Never</option>
              </select>
            </div>
          )}

          {/* ── Quantity ── */}
          <div>
            <label className="text-sm font-semibold text-gray-600 mb-1.5 block">
              Quantity
            </label>
            <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                disabled={status === "success"}
                className="px-4 py-2.5 bg-gray-100 text-gray-600
                           hover:bg-gray-200 transition font-bold text-lg
                           disabled:opacity-50"
              >−</button>
              <input
                type="number"
                min={1}
                value={quantity}
                disabled={status === "success"}
                onChange={(e) =>
                  setQuantity(Math.max(1, parseInt(e.target.value) || 1))
                }
                className="flex-1 text-center py-2.5 focus:outline-none
                           text-gray-800 font-semibold disabled:opacity-50"
              />
              <button
                onClick={() => setQuantity((q) => q + 1)}
                disabled={status === "success"}
                className="px-4 py-2.5 bg-gray-100 text-gray-600
                           hover:bg-gray-200 transition font-bold text-lg
                           disabled:opacity-50"
              >+</button>
            </div>
          </div>

          {/* ── Total ── */}
          <div className={`rounded-lg p-4 flex justify-between items-center
                          ${isBuy ? "bg-emerald-50" : "bg-red-50"}`}>
            <span className="text-gray-600 font-medium text-sm">
              {mode === "LIMIT" ? "Est. Total (at target)" : "Total Amount"}
            </span>
            <span className={`text-lg sm:text-xl font-bold
                              ${isBuy ? "text-emerald-600" : "text-red-600"}`}>
              {executionPrice > 0 ? `₹${totalAmount}` : "—"}
            </span>
          </div>

          {/* ── Status Message ── */}
          {status && (
            <div className={`flex items-start space-x-3 p-4 rounded-xl text-sm font-medium
                            ${status === "success"
                              ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                              : "bg-red-50 text-red-700 border border-red-200"
                            }`}>
              {status === "success"
                ? <CheckCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
                : <AlertCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
              }
              <div>
                <p className="font-bold">
                  {status === "success"
                    ? mode === "LIMIT"
                      ? "Limit Order Placed! ⏳"
                      : "Order Successful! 🎉"
                    : "Order Failed"
                  }
                </p>
                <p className="mt-1 opacity-80">{message}</p>
              </div>
            </div>
          )}

          {/* ── Submit / Close Button ── */}
          {status !== "success" ? (
            <button
              onClick={handleSubmit}
              disabled={loading}
              className={`w-full py-3 rounded-xl font-bold text-white transition text-sm sm:text-base
                          ${isBuy
                            ? "bg-emerald-500 hover:bg-emerald-600"
                            : "bg-red-500 hover:bg-red-600"
                          }
                          disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              {loading
                ? "Processing..."
                : mode === "LIMIT"
                  ? `Place Limit ${type} @ ₹${targetPrice || "—"}`
                  : `Confirm ${isBuy ? "Buy" : "Sell"} — ₹${totalAmount}`
              }
            </button>
          ) : (
            <button
              onClick={onClose}
              className="w-full py-3 rounded-xl font-bold text-white
                         bg-gray-700 hover:bg-gray-800 transition text-sm sm:text-base"
            >
              Done ✓
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default BuySellModal;