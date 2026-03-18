import React from "react";
import { TrendingDown, TrendingUp, Calendar, DollarSign } from "lucide-react";
import "../styles/OrderHistory.css";

const OrderHistory = ({ orders = [], loading = false }) => {
  if (loading) {
    return (
      <div className="order-history">
        <h3>Order History</h3>
        <div className="loading">Loading orders...</div>
      </div>
    );
  }

  if (!orders || orders.length === 0) {
    return (
      <div className="order-history">
        <h3>Order History</h3>
        <div className="empty-state">
          <DollarSign size={40} />
          <p>No orders yet. Start trading!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="order-history">
      <div className="history-header">
        <h3>Order History</h3>
        <p className="total-orders">Total Orders: {orders.length}</p>
      </div>

      <div className="orders-table">
        <div className="table-header">
          <div className="col col-type">Type</div>
          <div className="col col-company">Company</div>
          <div className="col col-qty">Quantity</div>
          <div className="col col-price">Price</div>
          <div className="col col-total">Total Amount</div>
          <div className="col col-status">Status</div>
          <div className="col col-date">Date</div>
        </div>

        {orders.map((order) => {
          const isBuy = order.orderType === "BUY";
          const Icon = isBuy ? TrendingDown : TrendingUp;
          const totalAmount = (order.quantity * order.price).toFixed(2);
          const isSuccess = order.status === "SUCCESS";

          return (
            <div key={order.id} className="table-row">
              <div className="col col-type">
                <div className={`type-badge ${order.orderType.toLowerCase()}`}>
                  <Icon size={16} />
                  {order.orderType}
                </div>
              </div>
              <div className="col col-company">
                <span className="company-id">Company #{order.companyId}</span>
              </div>
              <div className="col col-qty">
                <span>{order.quantity}</span>
              </div>
              <div className="col col-price">
                <span>₹{order.price.toFixed(2)}</span>
              </div>
              <div className="col col-total">
                <span className="total">₹{totalAmount}</span>
              </div>
              <div className="col col-status">
                <span
                  className={`status-badge ${
                    isSuccess ? "success" : "failed"
                  }`}
                >
                  {order.status}
                </span>
              </div>
              <div className="col col-date">
                <div className="date-time">
                  <Calendar size={14} />
                  {order.createdAt
                    ? new Date(order.createdAt).toLocaleDateString("en-IN")
                    : "N/A"}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OrderHistory;
