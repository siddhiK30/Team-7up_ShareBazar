// src/components/AdminDashboard.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import {
  TrendingUp,
  LogOut,
  LayoutGrid,
  PlusCircle,
  Building2,
  BarChart3,
  Users,
  Shield,
  ListFilter,
} from "lucide-react";
import CompanyForm from "./CompanyForm";
import CompanyList from "./CompanyList";
import ConfirmModal from "./ConfirmModal";
import Toast from "./Toast";
import companyService from "../services/companyService";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("list");
  const [adminEmail, setAdminEmail] = useState("");

  // Modal state
  const [confirmModal, setConfirmModal] = useState({
    show: false,
    companyId: null,
    companyName: "",
  });

  // Toast state
  const [toast, setToast] = useState({ show: false, message: "", type: "" });

  const showToast = (message, type = "success") => {
    setToast({ show: true, message, type });
  };

  // ✅ Get admin info from token
  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setAdminEmail(decoded.sub || decoded.email || "Admin");
      } catch {
        setAdminEmail("Admin");
      }
    }
  }, []);

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

  // ✅ Logout with adminToken
  const handleLogout = () => {
  
    localStorage.removeItem("adminToken");
localStorage.removeItem("role");
window.location.href = "/admin";
  
  };

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

  const handleDeleteRequest = (id) => {
    const company = companies.find((c) => c.id === id);
    setConfirmModal({
      show: true,
      companyId: id,
      companyName: company?.companyName || "this company",
    });
  };

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

  // Admin initials for avatar
  const adminInitials = adminEmail
    ? adminEmail.substring(0, 2).toUpperCase()
    : "AD";

  return (
    <div className="admin-page">
      {/* ✅ ADMIN NAVBAR */}
      <nav className="admin-navbar">
        <div className="admin-nav-left">
          {/* Logo */}
          <div className="admin-logo">
            <div className="logo-icon">
              <TrendingUp size={18} />
            </div>
            ShareBazar
            <span className="admin-badge">ADMIN</span>
          </div>

          {/* Nav Links */}
          <div className="admin-nav-links">
            <button
              className={`admin-nav-link ${
                activeTab === "list" ? "active" : ""
              }`}
              onClick={() => setActiveTab("list")}
            >
              <LayoutGrid size={16} />
              Companies
            </button>
            <button
              className={`admin-nav-link ${
                activeTab === "add" ? "active" : ""
              }`}
              onClick={() => setActiveTab("add")}
            >
              <PlusCircle size={16} />
              Add New
            </button>
          </div>
        </div>

        <div className="admin-nav-right">
          {/* Admin Info */}
          <div className="admin-user-info">
            <div className="admin-avatar">{adminInitials}</div>
            <div className="admin-user-text">
              <span className="admin-user-name">
                {adminEmail.split("@")[0] || "Admin"}
              </span>
              <span className="admin-user-role">Administrator</span>
            </div>
          </div>

          {/* Logout */}
          <button className="admin-logout-btn" onClick={handleLogout}>
            <LogOut size={16} />
            Logout
          </button>
        </div>
      </nav>

      {/* ✅ ADMIN BANNER */}
      <div className="admin-banner">
        <div className="banner-inner">
          <div className="banner-text">
            <h1>Admin Dashboard</h1>
            <p>Manage companies, stocks and market data</p>
          </div>

          <div className="banner-stats">
            <div className="banner-stat-card">
              <div className="banner-stat-number">{companies.length}</div>
              <div className="banner-stat-label">Companies</div>
            </div>
            <div className="banner-stat-card">
              <div className="banner-stat-number">
                {companies.filter((c) => c.listed !== false).length}
              </div>
              <div className="banner-stat-label">Listed</div>
            </div>
            <div className="banner-stat-card">
              <div className="banner-stat-number">
                {companies.length > 0
                  ? `₹${(
                      companies.reduce(
                        (sum, c) => sum + (c.price || c.currentPrice || 0),
                        0
                      ) / companies.length
                    ).toFixed(0)}`
                  : "₹0"}
              </div>
              <div className="banner-stat-label">Avg Price</div>
            </div>
          </div>
        </div>
      </div>

      {/* ✅ Toast */}
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

      {/* ✅ MAIN CONTENT */}
      <div className="admin-container">
        {/* Tab Nav */}
        <div className="tab-nav">
          <button
            className={`tab-btn ${activeTab === "list" ? "active" : ""}`}
            onClick={() => setActiveTab("list")}
          >
            <ListFilter size={16} />
            All Companies
          </button>
          <button
            className={`tab-btn ${activeTab === "add" ? "active" : ""}`}
            onClick={() => setActiveTab("add")}
          >
            <PlusCircle size={16} />
            Add Company
          </button>
        </div>

        {/* Tab Content */}
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