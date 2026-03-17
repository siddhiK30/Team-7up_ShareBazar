// src/components/AdminDashboard.jsx

import React, { useState, useEffect } from "react";
import CompanyForm from "./CompanyForm";
import CompanyList from "./CompanyList";
import ConfirmModal from "./ConfirmModal";
import Toast from "./Toast";
import companyService from "../services/companyService";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("list");

  // ✅ Modal state
  const [confirmModal, setConfirmModal] = useState({
    show: false,
    companyId: null,
    companyName: "",
  });

  // ✅ Toast state
  const [toast, setToast] = useState({ show: false, message: "", type: "" });

  const showToast = (message, type = "success") => {
    setToast({ show: true, message, type });
  };

  const fetchCompanies = async () => {
    setLoading(true);
    try {
      const data = await companyService.getAllCompanies();
      setCompanies(data);
    } catch (error) {
      console.error("Error fetching companies:", error);
      showToast("Failed to fetch companies", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  const handleAddCompany = async (companyData) => {
    try {
      const newCompany = await companyService.addCompany(companyData);
      setCompanies((prev) => [...prev, newCompany]);
      setActiveTab("list");
      showToast(`${companyData.companyName} added successfully!`, "success");
    } catch (error) {
      console.error("Error adding company:", error);
      showToast("Failed to add company", "error");
    }
  };

  // ✅ Opens modal instead of window.confirm
  const handleDeleteRequest = (id) => {
    const company = companies.find((c) => c.id === id);
    setConfirmModal({
      show: true,
      companyId: id,
      companyName: company?.companyName || "this company",
    });
  };

  // ✅ Actual delete after modal confirm
  const handleDeleteConfirm = async () => {
    const { companyId, companyName } = confirmModal;
    setConfirmModal({ show: false, companyId: null, companyName: "" });
    try {
      await companyService.deleteCompany(companyId);
      setCompanies((prev) => prev.filter((c) => c.id !== companyId));
      showToast(`${companyName} deleted successfully!`, "success");
    } catch (error) {
      console.error("Error deleting company:", error);
      showToast("Failed to delete company", "error");
    }
  };

  const handleDeleteCancel = () => {
    setConfirmModal({ show: false, companyId: null, companyName: "" });
  };

  // ✅ Update with toast
  const handleUpdateCompany = async (id, updateData) => {
    try {
      const updated = await companyService.updateCompany(id, updateData);
      setCompanies((prev) =>
        prev.map((c) => (c.id === id ? updated : c))
      );
      showToast("Company updated successfully!", "success");
    } catch (error) {
      console.error("Error updating company:", error);
      showToast("Failed to update company", "error");
    }
  };

  const totalStocks = companies.reduce(
    (sum, c) => sum + (c.numberOfStocks || 0),
    0
  );

  return (
    <div className="admin-page">
      {/* ✅ Toast Notification */}
      {toast.show && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast({ show: false, message: "", type: "" })}
        />
      )}

      {/* ✅ Confirm Modal */}
      {confirmModal.show && (
        <ConfirmModal
          title="Delete Company"
          message={`Are you sure you want to delete "${confirmModal.companyName}"? This action cannot be undone.`}
          type="danger"
          onConfirm={handleDeleteConfirm}
          onCancel={handleDeleteCancel}
        />
      )}

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
              <span className="stat-number">
                {totalStocks.toLocaleString()}
              </span>
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
            <CompanyList
              companies={companies}
              loading={loading}
              onDelete={handleDeleteRequest}
              onUpdate={handleUpdateCompany}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;