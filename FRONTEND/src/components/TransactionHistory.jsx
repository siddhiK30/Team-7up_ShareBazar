import React, { useState } from "react";
import {
  ArrowUpRight,
  ArrowDownLeft,
  Calendar,
  DollarSign,
  Check,
  X,
} from "lucide-react";
import "../styles/TransactionHistory.css";

const TransactionHistory = ({ transactions = [], loading = false }) => {
  const [filterType, setFilterType] = useState("ALL");
  const [filterStatus, setFilterStatus] = useState("ALL");

  if (loading) {
    return (
      <div className="transaction-history">
        <h3>Transaction History</h3>
        <div className="loading">Loading transactions...</div>
      </div>
    );
  }

  let filteredTransactions = transactions || [];

  if (filterType !== "ALL") {
    filteredTransactions = filteredTransactions.filter(
      (t) => t.type === filterType
    );
  }

  if (filterStatus !== "ALL") {
    filteredTransactions = filteredTransactions.filter(
      (t) => t.status === filterStatus
    );
  }

  if (!filteredTransactions || filteredTransactions.length === 0) {
    return (
      <div className="transaction-history">
        <h3>Transaction History</h3>
        <div className="empty-state">
          <DollarSign size={40} />
          <p>No transactions yet</p>
        </div>
      </div>
    );
  }

  return (
    <div className="transaction-history">
      <div className="history-header">
        <h3>Transaction History</h3>
        <div className="filters">
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="filter-select"
          >
            <option value="ALL">All Types</option>
            <option value="CREDIT">Credit</option>
            <option value="DEBIT">Debit</option>
            <option value="BUY">Buy</option>
            <option value="SELL">Sell</option>
          </select>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="filter-select"
          >
            <option value="ALL">All Status</option>
            <option value="SUCCESS">Success</option>
            <option value="FAILED">Failed</option>
            <option value="PENDING">Pending</option>
          </select>
        </div>
      </div>

      <div className="transactions-table">
        <div className="table-header">
          <div className="col col-type">Type</div>
          <div className="col col-amount">Amount</div>
          <div className="col col-status">Status</div>
          <div className="col col-date">Date & Time</div>
        </div>

        {filteredTransactions.map((transaction, index) => {
          const isCredit = transaction.type === "CREDIT";
          const isSuccess = transaction.status === "SUCCESS";
          const Icon = isCredit ? ArrowDownLeft : ArrowUpRight;

          return (
            <div key={index} className="table-row">
              <div className="col col-type">
                <div className={`type-badge ${transaction.type.toLowerCase()}`}>
                  <Icon size={18} />
                  {transaction.type}
                </div>
              </div>
              <div className={`col col-amount ${isCredit ? "credit" : "debit"}`}>
                <span>
                  {isCredit ? "+" : "-"}₹{parseFloat(transaction.amount).toFixed(2)}
                </span>
              </div>
              <div className="col col-status">
                <div className={`status-badge ${transaction.status.toLowerCase()}`}>
                  {isSuccess ? (
                    <Check size={16} />
                  ) : (
                    <X size={16} />
                  )}
                  {transaction.status}
                </div>
              </div>
              <div className="col col-date">
                <div className="date-time">
                  <Calendar size={14} />
                  {transaction.createdAt
                    ? new Date(transaction.createdAt).toLocaleString("en-IN")
                    : "N/A"}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TransactionHistory;
