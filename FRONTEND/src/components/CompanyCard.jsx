// src/components/CompanyCard.jsx

import React, { useState } from "react";
import "./CompanyCard.css";

const CompanyCard = ({ company, index, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    numberOfStocks: company.numberOfStocks || 0,
    stockPrice: company.stockPrice || 0,
  });

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({
      ...prev,
      [name]: Number(value),
    }));
  };

  const handleSave = () => {
    onUpdate(company.id, editData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData({
      numberOfStocks: company.numberOfStocks || 0,
      stockPrice: company.stockPrice || 0,
    });
    setIsEditing(false);
  };

  return (
    <div className={`cc-row ${index % 2 === 0 ? "cc-row-even" : "cc-row-odd"}`}>
      {/* Company Name */}
      <div className="cc-col cc-col-name">{company.companyName}</div>

      {/* Code */}
      <div className="cc-col cc-col-code">{company.companyCode}</div>

      {/* Stocks */}
      <div className="cc-col cc-col-stocks">
        {isEditing ? (
          <input
            type="number"
            name="numberOfStocks"
            className="cc-edit-input"
            value={editData.numberOfStocks}
            onChange={handleEditChange}
          />
        ) : (
          company.numberOfStocks?.toLocaleString()
        )}
      </div>

      {/* Price */}
      <div className="cc-col cc-col-price">
        {isEditing ? (
          <input
            type="number"
            step="0.01"
            name="stockPrice"
            className="cc-edit-input"
            value={editData.stockPrice}
            onChange={handleEditChange}
          />
        ) : (
          `₹${company.stockPrice?.toLocaleString()}`
        )}
      </div>

      {/* Actions */}
      <div className="cc-col cc-col-actions">
        {isEditing ? (
          <div className="cc-action-group">
            <button className="cc-btn cc-btn-save" onClick={handleSave}>
              ✅ Save
            </button>
            <button className="cc-btn cc-btn-cancel" onClick={handleCancel}>
              ❌ Cancel
            </button>
          </div>
        ) : (
          <div className="cc-action-group">
            <button
              className="cc-btn cc-btn-edit"
              onClick={() => setIsEditing(true)}
            >
              ✏️ Edit
            </button>
            <button
              className="cc-btn cc-btn-delete"
              onClick={() => onDelete(company.id)}
            >
              🗑️ Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CompanyCard;