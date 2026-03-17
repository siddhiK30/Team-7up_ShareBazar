// src/components/CompanyList.jsx

import React from "react";
import CompanyCard from "./CompanyCard";
import "./CompanyList.css";

const CompanyList = ({ companies, loading, onDelete, onUpdate }) => {
  if (loading) {
    return (
      <div className="cl-loading">
        <div className="cl-spinner"></div>
        <p>Loading companies...</p>
      </div>
    );
  }

  if (companies.length === 0) {
    return (
      <div className="cl-empty">
        <div className="cl-empty-icon">🏢</div>
        <h3>No Companies Listed</h3>
        <p>Click "Add Company" to list your first company</p>
      </div>
    );
  }

  return (
    <div className="cl-wrapper">
      {/* Table Header */}
      <div className="cl-table-header">
        <span className="cl-col cl-col-name">Company</span>
        <span className="cl-col cl-col-code">Code</span>
        <span className="cl-col cl-col-stocks">No. of Stocks</span>
        <span className="cl-col cl-col-price">Price Per Stock</span>
        <span className="cl-col cl-col-actions">Actions</span>
      </div>

      {/* Company Rows */}
      <div className="cl-list">
        {companies.map((company, index) => (
          <CompanyCard
            key={company.id || index}
            company={company}
            index={index}
            onDelete={onDelete}
            onUpdate={onUpdate}
          />
        ))}
      </div>
    </div>
  );
};

export default CompanyList;