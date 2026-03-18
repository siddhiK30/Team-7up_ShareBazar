import React, { useEffect, useState } from "react";
import { Plus, Briefcase, Trash2, Edit2 } from "lucide-react";
import "../styles/PortfolioManagement.css";

const PortfolioManagement = ({
  portfolios = [],
  onSelectPortfolio,
  onCreatePortfolio,
  loading = false,
}) => {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [portfolioName, setPortfolioName] = useState("");
  const [creatingPortfolio, setCreatingPortfolio] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

 // PortfolioManagement.jsx
// ✅ Fix the useEffect - add selectedId to prevent re-triggering

useEffect(() => {
  if (portfolios && portfolios.length > 0 && !selectedId) {
    const first = portfolios[0];
    setSelectedId(first.id);
    if (onSelectPortfolio) {
      onSelectPortfolio(first); // This triggers handleSelectPortfolio in parent
    }
  }
}, [portfolios]); // keep as is - only runs when portfolios first loads

  const handleCreatePortfolio = async () => {
    if (!portfolioName.trim()) {
      alert("Portfolio name is required");
      return;
    }

    setCreatingPortfolio(true);
    try {
      await onCreatePortfolio(portfolioName);
      setPortfolioName("");
      setShowCreateForm(false);
    } catch (error) {
      alert("Failed to create portfolio: " + error);
    } finally {
      setCreatingPortfolio(false);
    }
  };

  const handleSelectPortfolio = (portfolio) => {
    setSelectedId(portfolio.id);
    if (onSelectPortfolio) {
      onSelectPortfolio(portfolio);
    }
  };

  if (loading) {
    return (
      <div className="portfolio-management">
        <div className="loading">Loading portfolios...</div>
      </div>
    );
  }

  return (
    <div className="portfolio-management">
      <div className="management-header">
        <h3>
          <Briefcase size={20} />
          My Portfolios
        </h3>
        <button
          className="btn-add-portfolio"
          onClick={() => setShowCreateForm(!showCreateForm)}
        >
          <Plus size={18} />
          New Portfolio
        </button>
      </div>

      {showCreateForm && (
        <div className="create-portfolio-form">
          <input
            type="text"
            placeholder="Portfolio Name (e.g., Growth Portfolio)"
            value={portfolioName}
            onChange={(e) => setPortfolioName(e.target.value)}
            maxLength={50}
          />
          <div className="form-actions">
            <button
              className="btn btn-primary"
              onClick={handleCreatePortfolio}
              disabled={creatingPortfolio}
            >
              {creatingPortfolio ? "Creating..." : "Create"}
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => {
                setShowCreateForm(false);
                setPortfolioName("");
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {portfolios && portfolios.length > 0 ? (
        <div className="portfolios-list">
          {portfolios.map((portfolio) => (
            <div
              key={portfolio.id}
              className={`portfolio-item ${
                selectedId === portfolio.id ? "selected" : ""
              }`}
              onClick={() => handleSelectPortfolio(portfolio)}
            >
              <div className="portfolio-info">
                <h4>{portfolio.name}</h4>
                <p className="portfolio-date">
                  Created: {new Date(portfolio.createdAt).toLocaleDateString("en-IN")}
                </p>
              </div>
              <div className="portfolio-actions">
                <button className="action-btn edit" title="Edit">
                  <Edit2 size={16} />
                </button>
                <button className="action-btn delete" title="Delete">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="empty-portfolios">
          <Briefcase size={40} />
          <p>No portfolios yet. Create one to get started!</p>
        </div>
      )}
    </div>
  );
};

export default PortfolioManagement;
