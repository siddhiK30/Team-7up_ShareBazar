// src/components/AdminDashboard.jsx

import React, { useState, useEffect } from "react";
import CompanyForm from "./CompanyForm";
import CompanyList from "./CompanyList";
import companyService from "../services/companyService";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("list");

  const fetchCompanies = async () => {
    setLoading(true);
    try {
      const data = await companyService.getAllCompanies();
      setCompanies(data);
    } catch (error) {
      console.error("Error fetching companies:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  const handleAddCompany = async (companyData) => {
    const newCompany = await companyService.addCompany(companyData);
    setCompanies((prev) => [...prev, newCompany]);
    setActiveTab("list");
  };

  // Calculate total stocks
  const totalStocks = companies.reduce(
    (sum, c) => sum + (c.numberOfStocks || 0), 0
  );

  return (
    <div className="admin-page">
      {/* Admin Header */}
      <div className="admin-header">
        <div className="admin-header-content">
          <div className="admin-title-section">
            <h1>Admin Dashboard</h1>
            <p>Manage companies listed on ShareBazar</p>
          </div>
          <div className="admin-stats">
            <div className="stat-box">
              <span className="stat-number">{companies.length}</span>
              <span className="stat-label">Companies</span>
            </div>
            <div className="stat-box">
              <span className="stat-number">{totalStocks.toLocaleString()}</span>
              <span className="stat-label">Total Stocks</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="admin-container">
        <div className="tab-nav">
          <button
            className={`tab-btn ${activeTab === "list" ? "active" : ""}`}
            onClick={() => setActiveTab("list")}
          >
            📋 All Companies
          </button>
          <button
            className={`tab-btn ${activeTab === "add" ? "active" : ""}`}
            onClick={() => setActiveTab("add")}
          >
            ➕ Add Company
          </button>
        </div>

        <div className="tab-content">
          {activeTab === "add" ? (
            <CompanyForm onCompanyAdded={handleAddCompany} />
          ) : (
            <CompanyList companies={companies} loading={loading} />
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;