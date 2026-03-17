import React from "react";
import "./CompanyCard.css";

const CompanyCard = ({ company, index }) => {
  const colors = ["#00b386", "#0984e3", "#e17055", "#6c5ce7", "#fdcb6e"];
  const color = colors[index % colors.length];

  return (
    <div className="cc-row">
      {/* Company Name */}
      <div className="cc-col cc-col-name">
        <div className="cc-avatar" style={{ backgroundColor: color }}>
          {company.companyName?.charAt(0)?.toUpperCase() || "C"}
        </div>
        <div>
          <h4 className="cc-name">{company.companyName}</h4>
          <span className="cc-id">ID: {company.id}</span>
        </div>
      </div>

      {/* Company Code */}
      <div className="cc-col cc-col-code">
        <span className="cc-code-badge">{company.companyCode}</span>
      </div>

      {/* Number of Stocks */}
      <div className="cc-col cc-col-stocks">
        <span className="cc-stock-number">
          {company.numberOfStocks?.toLocaleString()}
        </span>
        <span className="cc-stock-label">shares</span>
      </div>

      {/* ✅ Stock Price */}
      <div className="cc-col cc-col-stocks">
        <span className="cc-stock-price">
          ₹{company.stockPrice?.toLocaleString()}
        </span>
        <span className="cc-stock-label">per share</span>
      </div>
    </div>
  );
};

export default CompanyCard;