import React, { useState } from "react";
import { X, Wallet, IndianRupee, Plus } from "lucide-react";
import "../styles/AddMoneyModal.css";

const QUICK_AMOUNTS = [1000, 5000, 10000, 25000, 50000, 100000];

const AddMoneyModal = ({ isOpen, onClose, onConfirm, loading }) => {
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleSubmit = () => {
    const value = parseFloat(amount);
    if (!value || value <= 0) {
      setError("Please enter a valid amount");
      return;
    }
    if (value > 1000000) {
      setError("Maximum ₹10,00,000 per transaction");
      return;
    }
    setError("");
    onConfirm(value);
  };

  const handleQuickAmount = (val) => {
    setAmount(val.toString());
    setError("");
  };

  const handleClose = () => {
    setAmount("");
    setError("");
    onClose();
  };

  return (
    <div className="add-money-overlay" onClick={handleClose}>
      <div
        className="add-money-container"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="add-money-header">
          <div className="add-money-header-left">
            <div className="add-money-icon">
              <Wallet size={20} />
            </div>
            <h2>Add Money to Wallet</h2>
          </div>
          <button className="add-money-close-btn" onClick={handleClose}>
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="add-money-body">
          {/* Amount Input */}
          <div className="add-money-input-wrapper">
            <label>Enter Amount</label>
            <div className="add-money-input-box">
              <IndianRupee size={18} className="add-money-rupee-icon" />
              <input
                type="number"
                value={amount}
                onChange={(e) => {
                  setAmount(e.target.value);
                  setError("");
                }}
                placeholder="0.00"
                min="1"
                max="1000000"
                autoFocus
              />
            </div>
            {error && <span className="add-money-error">{error}</span>}
          </div>

          {/* Quick Amount Buttons */}
          <div className="add-money-quick">
            <label>Quick Select</label>
            <div className="add-money-quick-grid">
              {QUICK_AMOUNTS.map((val) => (
                <button
                  key={val}
                  className={`add-money-quick-btn ${
                    amount === val.toString() ? "active" : ""
                  }`}
                  onClick={() => handleQuickAmount(val)}
                >
                  ₹{val.toLocaleString("en-IN")}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="add-money-footer">
          <button className="add-money-cancel-btn" onClick={handleClose}>
            Cancel
          </button>
          <button
            className="add-money-confirm-btn"
            onClick={handleSubmit}
            disabled={loading || !amount}
          >
            {loading ? (
              <span>Processing...</span>
            ) : (
              <>
                <Plus size={16} />
                Add ₹
                {amount
                  ? parseFloat(amount).toLocaleString("en-IN")
                  : "0"}
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddMoneyModal;