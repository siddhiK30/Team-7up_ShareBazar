// import React from "react";
// import { TrendingUp, TrendingDown, Briefcase } from "lucide-react";
// import "../styles/HoldingsCard.css";

// const HoldingsCard = ({ holdings = [], loading = false }) => {
//   if (loading) {
//     return (
//       <div className="holdings-card">
//         <h3>Portfolio Holdings</h3>
//         <div className="loading">Loading holdings...</div>
//       </div>
//     );
//   }

//   if (!holdings || holdings.length === 0) {
//     return (
//       <div className="holdings-card">
//         <h3>Portfolio Holdings</h3>
//         <div className="empty-state">
//           <Briefcase size={48} />
//           <p>No holdings yet. Start trading to build your portfolio!</p>
//         </div>
//       </div>
//     );
//   }

//   const totalInvested = holdings.reduce(
//     (sum, h) => sum + h.quantity * h.avgBuyPrice, 0
//   );
//   const totalCurrent = holdings.reduce(
//     (sum, h) => sum + h.quantity * h.currentPrice, 0
//   );
//   const totalPL = totalCurrent - totalInvested;
//   const totalPLPercent =
//     totalInvested > 0 ? ((totalPL / totalInvested) * 100).toFixed(2) : 0;

//   return (
//     <div className="holdings-card">
//       <div className="holdings-header">
//         <h3>Portfolio Holdings</h3>
//         <div className="portfolio-summary">
//           <div className="summary-item">
//             <span className="label">Total Invested:</span>
//             <span className="value">₹{totalInvested.toFixed(2)}</span>
//           </div>
//           <div className="summary-item">
//             <span className="label">Current Value:</span>
//             <span className="value">₹{totalCurrent.toFixed(2)}</span>
//           </div>
//           <div className={`summary-item ${totalPL >= 0 ? "gain" : "loss"}`}>
//             <span className="label">Total P/L:</span>
//             <span className="value">
//               {totalPL >= 0 ? "+" : ""}
//               {totalPL.toFixed(2)} ({totalPLPercent}%)
//             </span>
//           </div>
//         </div>
//       </div>

//       <div className="holdings-table">
//         <div className="table-header">
//           <div className="col col-company">Company</div>
//           <div className="col col-qty">Qty</div>
//           <div className="col col-avg">Avg Buy Price</div>
//           <div className="col col-current">Current Price</div>
//           <div className="col col-pl">Gain/Loss</div>
//           <div className="col col-pl-percent">P/L %</div>
//         </div>

//         {holdings.map((holding) => {
//           const pl = holding.profitLoss || 0;
//           const plPercent = holding.profitLossPercent || 0;
//           const isGain = pl >= 0;

//           return (
//             <div key={holding.companyId} className="table-row">

//               {/* ✅ FIXED: Shows stock name instead of ID */}
//               <div className="col col-company">
//                 <span className="company-code">
//                   {holding.companyCode || `Company #${holding.companyId}`}
//                 </span>
//                 <span className="company-name">
//                   {holding.companyName || ""}
//                 </span>
//               </div>

//               <div className="col col-qty">
//                 <span className="quantity">{holding.quantity}</span>
//               </div>
//               <div className="col col-avg">
//                 <span>₹{holding.avgBuyPrice.toFixed(2)}</span>
//               </div>
//               <div className="col col-current">
//                 <span className="current-price">
//                   ₹{holding.currentPrice.toFixed(2)}
//                 </span>
//               </div>
//               <div className={`col col-pl ${isGain ? "gain" : "loss"}`}>
//                 <span className="pl-value">
//                   {isGain ? "+" : ""}
//                   {pl.toFixed(2)}
//                 </span>
//               </div>
//               <div className={`col col-pl-percent ${isGain ? "gain" : "loss"}`}>
//                 {isGain ? (
//                   <TrendingUp size={16} className="icon" />
//                 ) : (
//                   <TrendingDown size={16} className="icon" />
//                 )}
//                 <span>
//                   {isGain ? "+" : ""}
//                   {plPercent.toFixed(2)}%
//                 </span>
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// export default HoldingsCard;


import React, { useState } from "react";
import { TrendingUp, TrendingDown, Briefcase } from "lucide-react";
import SellStockModal from "./SellStockModal";
import "../styles/HoldingsCard.css";

const HoldingsCard = ({ holdings = [], loading = false, portfolioId, onUpdate }) => {
  const [showSellModal, setShowSellModal] = useState(false);
  const [selectedHolding, setSelectedHolding] = useState(null);

  const handleSellClick = (holding) => {
    setSelectedHolding(holding);
    setShowSellModal(true);
  };

  if (loading) {
    return (
      <div className="holdings-card">
        <h3>Portfolio Holdings</h3>
        <div className="loading">Loading holdings...</div>
      </div>
    );
  }

  if (!holdings || holdings.length === 0) {
    return (
      <div className="holdings-card">
        <h3>Portfolio Holdings</h3>
        <div className="empty-state">
          <Briefcase size={48} />
          <p>No holdings yet. Start trading to build your portfolio!</p>
        </div>
      </div>
    );
  }

  const totalInvested = holdings.reduce(
    (sum, h) => sum + h.quantity * h.avgBuyPrice, 0
  );
  const totalCurrent = holdings.reduce(
    (sum, h) => sum + h.quantity * h.currentPrice, 0
  );
  const totalPL = totalCurrent - totalInvested;
  const totalPLPercent =
    totalInvested > 0 ? ((totalPL / totalInvested) * 100).toFixed(2) : 0;

  return (
    <div className="holdings-card">
      <div className="holdings-header">
        <h3>Portfolio Holdings</h3>
        <div className="portfolio-summary">
          <div className="summary-item">
            <span className="label">Total Invested:</span>
            <span className="value">₹{totalInvested.toFixed(2)}</span>
          </div>
          <div className="summary-item">
            <span className="label">Current Value:</span>
            <span className="value">₹{totalCurrent.toFixed(2)}</span>
          </div>
          <div className={`summary-item ${totalPL >= 0 ? "gain" : "loss"}`}>
            <span className="label">Total P/L:</span>
            <span className="value">
              {totalPL >= 0 ? "+" : ""}{totalPL.toFixed(2)} ({totalPLPercent}%)
            </span>
          </div>
        </div>
      </div>

      <div className="holdings-table">
        <div className="table-header">
          <div className="col col-company">Company</div>
          <div className="col col-qty">Qty</div>
          <div className="col col-avg">Avg Buy Price</div>
          <div className="col col-current">Current Price</div>
          <div className="col col-pl">Gain/Loss</div>
          <div className="col col-pl-percent">P/L %</div>
          <div className="col col-action">Action</div>
        </div>

        {holdings.map((holding) => {
          const pl = holding.profitLoss || 0;
          const plPercent = holding.profitLossPercent || 0;
          const isGain = pl >= 0;

          return (
            <div key={holding.companyId} className="table-row">
              <div className="col col-company">
                <span className="company-code">
                  {holding.companyCode || `Company #${holding.companyId}`}
                </span>
                <span className="company-name">
                  {holding.companyName || ""}
                </span>
              </div>
              <div className="col col-qty">
                <span className="quantity">{holding.quantity}</span>
              </div>
              <div className="col col-avg">
                <span>₹{holding.avgBuyPrice.toFixed(2)}</span>
              </div>
              <div className="col col-current">
                <span className="current-price">
                  ₹{holding.currentPrice.toFixed(2)}
                </span>
              </div>
              <div className={`col col-pl ${isGain ? "gain" : "loss"}`}>
                <span className="pl-value">
                  {isGain ? "+" : ""}{pl.toFixed(2)}
                </span>
              </div>
              <div className={`col col-pl-percent ${isGain ? "gain" : "loss"}`}>
                {isGain ? (
                  <TrendingUp size={16} className="icon" />
                ) : (
                  <TrendingDown size={16} className="icon" />
                )}
                <span>{isGain ? "+" : ""}{plPercent.toFixed(2)}%</span>
              </div>

              {/* ✅ SELL BUTTON */}
              <div className="col col-action">
                <button
                  className="sell-btn"
                  onClick={() => handleSellClick(holding)}
                >
                  Sell
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* ✅ SELL MODAL */}
      {showSellModal && selectedHolding && (
        <SellStockModal
          holding={selectedHolding}
          portfolioId={portfolioId}
          onClose={() => setShowSellModal(false)}
          onSuccess={() => {
            setShowSellModal(false);
            onUpdate && onUpdate();
          }}
        />
      )}
    </div>
  );
};

export default HoldingsCard;