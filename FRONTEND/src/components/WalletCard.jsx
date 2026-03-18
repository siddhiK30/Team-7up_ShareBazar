import React, { useEffect, useState } from "react";
import { Wallet, TrendingUp, ArrowDownUp } from "lucide-react";
import "../styles/WalletCard.css";

const WalletCard = ({ userId, walletBalance, onAddFunds }) => {
  const [balance, setBalance] = useState(walletBalance || 0);
  const [showAddFunds, setShowAddFunds] = useState(false);
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setBalance(walletBalance);
  }, [walletBalance]);

  const handleAddFunds = async () => {
    if (!amount || amount <= 0) {
      alert("Please enter a valid amount");
      return;
    }

    setLoading(true);
    try {
      await onAddFunds(parseFloat(amount));
      setAmount("");
      setShowAddFunds(false);
    } catch (error) {
      alert("Failed to add funds: " + error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="wallet-card">
      <div className="wallet-header">
        <div className="wallet-icon-container">
          <Wallet className="wallet-icon" size={28} />
        </div>
        <h2>Wallet Balance</h2>
      </div>

      <div className="balance-display">
        <div className="balance-amount">
          ₹{balance.toLocaleString("en-IN", { maximumFractionDigits: 2 })}
        </div>
        <p className="balance-label">Available Balance</p>
      </div>

      <div className="wallet-actions">
        <button
          className="btn btn-primary btn-add-funds"
          onClick={() => setShowAddFunds(!showAddFunds)}
        >
          <ArrowDownUp size={18} />
          Add Funds
        </button>
        <button className="btn btn-secondary">
          <TrendingUp size={18} />
          Withdraw
        </button>
      </div>

      {showAddFunds && (
        <div className="add-funds-form">
          <input
            type="number"
            placeholder="Enter amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            min="0"
            max="100000"
          />
          <button
            className="btn btn-primary btn-confirm"
            onClick={handleAddFunds}
            disabled={loading}
          >
            {loading ? "Processing..." : "Add Funds"}
          </button>
          <button
            className="btn btn-cancel"
            onClick={() => {
              setShowAddFunds(false);
              setAmount("");
            }}
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
};

export default WalletCard;
