// src/components/AdminDashboard.jsx
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { TrendingUp, User } from "lucide-react"; // ✅ NEW
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

  const [confirmModal, setConfirmModal] = useState({
    show: false,
    companyId: null,
    companyName: "",
  });

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

  return (
    <div className="admin-page">

      {/* 🔥 UPDATED NAVBAR */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center h-20">

          {/* LEFT */}
          <div className="flex items-center space-x-10">

            {/* Logo */}
            <div className="flex items-center space-x-2 cursor-pointer">
              <div className="bg-emerald-500 p-1.5 rounded-md">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-gray-900">
                Share<span className="text-emerald-500">Bazar</span>
              </span>
            </div>

            {/* Links */}
            <div className="flex items-center space-x-6 text-gray-700 font-medium">
              <div className="flex items-center space-x-6 text-gray-700 font-medium">

  <Link
    to="/explore"
    className="hover:text-emerald-500 cursor-pointer"
  >
    Stocks
  </Link>

  <Link
    to="/explore"
    className="hover:text-emerald-500 cursor-pointer"
  >
    Mutual Funds
  </Link>

</div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="flex items-center space-x-4">

            {/* User */}
            <div className="flex items-center space-x-2 bg-gray-100 px-3 py-1.5 rounded-full">
              <User className="w-4 h-4 text-emerald-600" />
              <span className="text-sm font-semibold text-gray-800">
                Admin
              </span>
            </div>

            {/* Logout */}
            <button
              onClick={() => {
                localStorage.removeItem("isAdmin");
                window.location.href = "/";
              }}
              className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
            >
              Logout
            </button>

          </div>
        </div>
      </div>

      {/* Toast */}
      {toast.show && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast({ show: false, message: "", type: "" })}
        />
      )}

      {/* Confirm Modal */}
      {confirmModal.show && (
        <ConfirmModal
          title="Delete Company"
          message={`Are you sure you want to delete "${confirmModal.companyName}"?`}
          type="danger"
          onConfirm={handleDeleteConfirm}
          onCancel={handleDeleteCancel}
        />
      )}

      {/* MAIN CONTENT */}
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