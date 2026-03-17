// src/components/ConfirmModal.jsx

import React from "react";
import "./ConfirmModal.css";

const ConfirmModal = ({ title, message, onConfirm, onCancel, type = "danger" }) => {
  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        {/* Icon */}
        <div className={`modal-icon modal-icon-${type}`}>
          {type === "danger" ? "🗑️" : "⚠️"}
        </div>

        {/* Content */}
        <h3 className="modal-title">{title}</h3>
        <p className="modal-message">{message}</p>

        {/* Buttons */}
        <div className="modal-actions">
          <button className="modal-btn modal-btn-cancel" onClick={onCancel}>
            Cancel
          </button>
          <button
            className={`modal-btn modal-btn-${type}`}
            onClick={onConfirm}
          >
            {type === "danger" ? "Delete" : "Confirm"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;