import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { Wallet, CreditCard, ArrowUpRight, ArrowDownLeft } from "lucide-react";
import ExploreNavbar from "../components/ExploreNavbar";
import WalletCard from "../components/WalletCard";
import TransactionHistory from "../components/TransactionHistory";
import "../styles/WalletPage.css";

const WalletPage = () => {
  const [userId, setUserId] = useState(null);
  const [walletData, setWalletData] = useState({
    balance: 50000,
    minBalance: 100,
    transactions: [],
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [stats, setStats] = useState({
    totalCredit: 0,
    totalDebit: 0,
    successfulTransactions: 0,
  });

  // Get userId from token
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUserId(decoded.userId || decoded.sub);
      } catch {
        setError("Invalid token");
      }
    }
  }, []);

  // Fetch wallet data
  useEffect(() => {
    if (!userId) return;
    fetchWalletData();
  }, [userId]);

  const fetchWalletData = async () => {
    try {
      setLoading(true);
      // TODO: Replace with actual API call
      // const data = await getWallet(userId);
      // Simulating data for now
      const mockData = {
        balance: 45250.5,
        minBalance: 100,
        transactions: [
          {
            id: "TXN001",
            amount: 5000,
            type: "CREDIT",
            status: "SUCCESS",
            createdAt: new Date(Date.now() - 3600000),
            description: "Added funds",
          },
          {
            id: "TXN002",
            amount: 2500.5,
            type: "DEBIT",
            status: "SUCCESS",
            createdAt: new Date(Date.now() - 7200000),
            description: "Stock purchase",
          },
          {
            id: "TXN003",
            amount: 1500,
            type: "CREDIT",
            status: "SUCCESS",
            createdAt: new Date(Date.now() - 86400000),
            description: "Stock sale proceedings",
          },
          {
            id: "TXN004",
            amount: 100,
            type: "DEBIT",
            status: "FAILED",
            createdAt: new Date(Date.now() - 172800000),
            description: "Insufficient balance",
          },
        ],
      };
      setWalletData(mockData);
      calculateStats(mockData.transactions);
    } catch (err) {
      setError("Failed to load wallet data");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = (transactions) => {
    const stats = {
      totalCredit: 0,
      totalDebit: 0,
      successfulTransactions: 0,
    };

    transactions.forEach((txn) => {
      if (txn.type === "CREDIT") {
        stats.totalCredit += txn.amount;
      } else if (txn.type === "DEBIT") {
        stats.totalDebit += txn.amount;
      }
      if (txn.status === "SUCCESS") {
        stats.successfulTransactions += 1;
      }
    });

    setStats(stats);
  };

  const handleAddFunds = async (amount) => {
    try {
      // TODO: Replace with actual API call
      // await creditWallet(userId, amount);
      setWalletData({
        ...walletData,
        balance: walletData.balance + amount,
        transactions: [
          {
            id: `TXN${Date.now()}`,
            amount,
            type: "CREDIT",
            status: "SUCCESS",
            createdAt: new Date(),
            description: "Added funds",
          },
          ...walletData.transactions,
        ],
      });
      alert("Funds added successfully!");
    } catch (err) {
      alert("Failed to add funds: " + err);
    }
  };

  return (
    <div className="wallet-page">
      <ExploreNavbar />

      <div className="page-content">
        <div className="page-header">
          <div className="header-content">
            <div className="header-icon">
              <Wallet size={40} />
            </div>
            <div>
              <h1>Wallet Management</h1>
              <p>Manage your funds and track transactions</p>
            </div>
          </div>
        </div>

        {error && <div className="error-banner">{error}</div>}

        <div className="wallet-layout">
          {/* Main Wallet Card */}
          <div className="wallet-section">
            {!loading ? (
              <WalletCard
                userId={userId}
                walletBalance={walletData.balance}
                onAddFunds={handleAddFunds}
              />
            ) : (
              <div className="loading-state">Loading wallet...</div>
            )}
          </div>

          {/* Stats Cards */}
          <div className="stats-section">
            <div className="stat-card inflow">
              <div className="stat-icon">
                <ArrowDownLeft size={28} />
              </div>
              <div className="stat-content">
                <p className="stat-label">Total Credits</p>
                <p className="stat-value">
                  ₹{stats.totalCredit.toLocaleString("en-IN", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </p>
              </div>
            </div>

            <div className="stat-card outflow">
              <div className="stat-icon">
                <ArrowUpRight size={28} />
              </div>
              <div className="stat-content">
                <p className="stat-label">Total Debits</p>
                <p className="stat-value">
                  ₹{stats.totalDebit.toLocaleString("en-IN", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </p>
              </div>
            </div>

            <div className="stat-card transactions">
              <div className="stat-icon">
                <CreditCard size={28} />
              </div>
              <div className="stat-content">
                <p className="stat-label">Successful Transactions</p>
                <p className="stat-value">{stats.successfulTransactions}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Transaction History */}
        <div className="transactions-section">
          <TransactionHistory
            transactions={walletData.transactions}
            loading={loading}
          />
        </div>

        {/* Wallet Info */}
        <div className="wallet-info-section">
          <h3>Wallet Information</h3>
          <div className="info-grid">
            <div className="info-card">
              <span className="info-label">Current Balance</span>
              <span className="info-value">
                ₹
                {walletData.balance.toLocaleString("en-IN", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </span>
            </div>
            <div className="info-card">
              <span className="info-label">Minimum Balance</span>
              <span className="info-value">
                ₹
                {walletData.minBalance.toLocaleString("en-IN", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </span>
            </div>
            <div className="info-card">
              <span className="info-label">Available to Trade</span>
              <span className="info-value">
                ₹
                {(walletData.balance - walletData.minBalance).toLocaleString(
                  "en-IN",
                  {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  }
                )}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WalletPage;
