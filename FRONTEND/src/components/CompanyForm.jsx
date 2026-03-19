// src/components/CompanyForm.jsx

import React, { useState } from "react";
import "./CompanyForm.css";

const CompanyForm = ({ onCompanyAdded }) => {
  const [formData, setFormData] = useState({
    companyName: "",
    companyCode: "",
    numberOfStocks: "",
    stockPrice: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Prevent negative values
    if ((name === "numberOfStocks" || name === "stockPrice") && value < 0) {
      return;
    }

    setFormData({ ...formData, [name]: value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!formData.companyName.trim()) {
      setError("Company name is required");
      return;
    }

    if (!formData.companyCode.trim()) {
      setError("Company code is required");
      return;
    }

    // ✅ UPDATED: must not be more than 1000
    if (!formData.numberOfStocks || formData.numberOfStocks <= 0) {
      setError("Number of stocks must be greater than 0");
      return;
    }

    if (formData.numberOfStocks > 1000) {
      setError("Number of stocks cannot be more than 1000");
      return;
    }

    if (!formData.stockPrice || formData.stockPrice <= 0) {
      setError("Stock price must be greater than 0");
      return;
    }

    setLoading(true);

    try {
      const payload = {
        companyName: formData.companyName.trim(),
        companyCode: formData.companyCode.trim().toUpperCase(),
        numberOfStocks: parseInt(formData.numberOfStocks),
        stockPrice: parseFloat(formData.stockPrice),
      };

      await onCompanyAdded(payload);

      // Reset form
      setFormData({
        companyName: "",
        companyCode: "",
        numberOfStocks: "",
        stockPrice: "",
      });

      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);

    } catch (err) {
      if (
        err.response?.status === 409 ||
        err.response?.data?.includes("unique")
      ) {
        setError("Company code already exists!");
      } else {
        setError("Failed to add company. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="cf-card">
      <h2 className="cf-title">Add New Company</h2>
      <p className="cf-subtitle">
        Fill in the details to list a new company on ShareBazar
      </p>

      {success && (
        <div className="cf-alert cf-alert-success">
          ✅ Company added successfully!
        </div>
      )}

      {error && (
        <div className="cf-alert cf-alert-error">⚠️ {error}</div>
      )}

      <form onSubmit={handleSubmit}>
        {/* Company Name */}
        <div className="cf-field">
          <label>Company Name *</label>
          <input
            type="text"
            name="companyName"
            placeholder="e.g. Reliance Industries"
            value={formData.companyName}
            onChange={handleChange}
            required
          />
        </div>

        {/* Row */}
        <div className="cf-row">
          {/* Company Code */}
          <div className="cf-field">
            <label>Company Code *</label>
            <input
              type="text"
              name="companyCode"
              placeholder="e.g. RELIANCE"
              value={formData.companyCode}
              onChange={handleChange}
              required
              style={{ textTransform: "uppercase" }}
            />
            <span className="cf-hint">Unique stock ticker symbol</span>
          </div>

          {/* Number of Stocks */}
          <div className="cf-field">
            <label>Number of Stocks *</label>
            <input
              type="number"
              name="numberOfStocks"
              placeholder="e.g. 500"
              value={formData.numberOfStocks}
              onChange={handleChange}
              min="1"
              max="1000" // ✅ UPDATED
              required
            />
            <span className="cf-hint">Maximum 1000 shares allowed</span> {/* ✅ UPDATED */}
          </div>

          {/* Stock Price */}
          <div className="cf-field">
            <label>Stock Price (₹) *</label>
            <input
              type="number"
              name="stockPrice"
              placeholder="e.g. 2500"
              value={formData.stockPrice}
              onChange={handleChange}
              min="1"
              step="0.01"
              required
            />
            <span className="cf-hint">Price per share</span>
          </div>
        </div>

        {/* Optional Live Preview */}
        {formData.stockPrice && (
          <p className="cf-preview">
            💰 Price Preview: ₹
            {Number(formData.stockPrice).toLocaleString("en-IN", {
              minimumFractionDigits: 2,
            })}
          </p>
        )}

        {/* Submit */}
        <button type="submit" className="cf-submit" disabled={loading}>
          {loading ? "Adding Company..." : "Add Company"}
        </button>
      </form>
    </div>
  );
};

export default CompanyForm;