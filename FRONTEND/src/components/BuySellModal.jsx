// // src/components/BuySellModal.jsx
// import React, { useEffect, useState } from "react";
// import { X, AlertCircle, CheckCircle, Wallet } from "lucide-react";
// import { getWallet } from "../services/WalletService";
// import axios from "axios";

// // ✅ CHANGE 1: Added onSuccess to props
// const BuySellModal = ({ type, company, userId, onClose, onSuccess }) => {
//   const [portfolios, setPortfolios] = useState([]);
//   const [selectedPortfolioId, setSelectedPortfolioId] = useState("");
//   const [quantity, setQuantity] = useState(1);
//   const [loading, setLoading] = useState(false);
//   const [status, setStatus] = useState(null);
//   const [message, setMessage] = useState("");
//   const [walletBalance, setWalletBalance] = useState(null);

//   const isBuy = type === "BUY";
//   const price = company?.price || 0;
//   const totalAmount = (quantity * price).toFixed(2);

//   useEffect(() => {
//     if (!userId) return;

//     // Fetch portfolios
//     axios
//       .get(`http://localhost:8085/portfolio/user/${userId}`)
//       .then((res) => {
//         setPortfolios(res.data);
//         if (res.data.length > 0) {
//           setSelectedPortfolioId(res.data[0].id);
//         }
//       })
//       .catch(() => setMessage("Failed to load portfolios"));

//     // Fetch wallet balance
//     getWallet(userId)
//       .then((data) => setWalletBalance(data.balance))
//       .catch(() => console.log("Wallet not found"));
//   }, [userId]);

//   const handleSubmit = async () => {
//     if (!selectedPortfolioId) {
//       setStatus("error");
//       setMessage("Please select a portfolio");
//       return;
//     }
//     if (quantity <= 0) {
//       setStatus("error");
//       setMessage("Quantity must be at least 1");
//       return;
//     }
//     // Check wallet balance for buy
//     if (isBuy && walletBalance !== null && Number(totalAmount) > walletBalance) {
//       setStatus("error");
//       setMessage(`Insufficient balance. You have ₹${walletBalance.toFixed(2)}`);
//       return;
//     }

//     setLoading(true);
//     setStatus(null);
//     setMessage("");

//     try {
//       const endpoint = isBuy
//         ? "http://localhost:8086/orders/buy"
//         : "http://localhost:8086/orders/sell";

//       await axios.post(endpoint, {
//         userId: String(userId),
//         portfolioId: Number(selectedPortfolioId),
//         companyId: company.id,
//         quantity: Number(quantity),
//         price: Number(price),
//       });

//       setStatus("success");
//       setMessage(
//         `${isBuy ? "Bought" : "Sold"} ${quantity} share(s) of ${company.name} successfully!`
//       );

//       // ✅ CHANGE 2: Call onSuccess with the portfolioId after success
//       if (onSuccess) {
//         onSuccess(Number(selectedPortfolioId));
//       }

//       // Refresh wallet balance
//       getWallet(userId)
//         .then((data) => setWalletBalance(data.balance))
//         .catch(() => {});

//     } catch (err) {
//       setStatus("error");
//       setMessage(
//         err?.response?.data?.message ||
//         err?.response?.data ||
//         `${isBuy ? "Buy" : "Sell"} order failed`
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
//       <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden">

//         {/* Header */}
//         <div
//           className={`px-6 py-4 flex justify-between items-center
//                       ${isBuy ? "bg-emerald-500" : "bg-red-500"}`}
//         >
//           <button
//             onClick={onClose}
//             className="text-white/80 hover:text-white transition"
//           >
//             <X className="w-5 h-5" />
//           </button>
//         </div>

//         {/* Body */}
//         <div className="p-6 space-y-5">

//           {/* Wallet Balance */}
//           {walletBalance !== null && (
//             <div className="flex items-center justify-between bg-blue-50 
//                             border border-blue-200 rounded-xl px-4 py-3">
//               <div className="flex items-center space-x-2">
//                 <Wallet className="w-4 h-4 text-blue-500" />
//                 <span className="text-sm font-medium text-blue-700">
//                   Wallet Balance
//                 </span>
//               </div>
//               <span className="text-lg font-bold text-blue-700">
//                 ₹{walletBalance.toLocaleString("en-IN", {
//                   minimumFractionDigits: 2,
//                 })}
//               </span>
//             </div>
//           )}

//           {/* Portfolio Select */}
//           <div>
//             <label className="text-sm font-semibold text-gray-600 mb-1.5 block">
//               Select Portfolio
//             </label>
//             <select
//               value={selectedPortfolioId}
//               onChange={(e) => setSelectedPortfolioId(e.target.value)}
//               className="w-full border border-gray-200 rounded-lg px-4 py-2.5 
//                          focus:outline-none focus:ring-2 focus:ring-emerald-300
//                          bg-gray-50 text-gray-800"
//             >
//               {portfolios.length === 0 && (
//                 <option value="">No portfolios found</option>
//               )}
//               {portfolios.map((p) => (
//                 <option key={p.id} value={p.id}>
//                   {p.name}
//                 </option>
//               ))}
//             </select>
//           </div>

//           {/* Quantity */}
//           <div>
//             <label className="text-sm font-semibold text-gray-600 mb-1.5 block">
//               Quantity
//             </label>
//             <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
//               <button
//                 onClick={() => setQuantity((q) => Math.max(1, q - 1))}
//                 className="px-4 py-2.5 bg-gray-100 text-gray-600 
//                            hover:bg-gray-200 transition font-bold text-lg"
//               >
//                 −
//               </button>
//               <input
//                 type="number"
//                 min={1}
//                 value={quantity}
//                 onChange={(e) =>
//                   setQuantity(Math.max(1, parseInt(e.target.value) || 1))
//                 }
//                 className="flex-1 text-center py-2.5 focus:outline-none 
//                            text-gray-800 font-semibold"
//               />
//               <button
//                 onClick={() => setQuantity((q) => q + 1)}
//                 className="px-4 py-2.5 bg-gray-100 text-gray-600 
//                            hover:bg-gray-200 transition font-bold text-lg"
//               >
//                 +
//               </button>
//             </div>
//           </div>

//           {/* Total */}
//           <div
//             className={`rounded-lg p-4 flex justify-between items-center
//                         ${isBuy ? "bg-emerald-50" : "bg-red-50"}`}
//           >
//             <span className="text-gray-600 font-medium">Total Amount</span>
//             <span
//               className={`text-xl font-bold
//                           ${isBuy ? "text-emerald-600" : "text-red-600"}`}
//             >
//               ₹{totalAmount}
//             </span>
//           </div>

//           {/* Remaining Balance (for Buy) */}
//           {isBuy && walletBalance !== null && (
//             <div className="flex justify-between text-sm px-1">
//               <span className="text-gray-500">Remaining after purchase</span>
//               <span
//                 className={`font-semibold ${
//                   walletBalance - Number(totalAmount) >= 0
//                     ? "text-emerald-600"
//                     : "text-red-600"
//                 }`}
//               >
//                 ₹{(walletBalance - Number(totalAmount)).toFixed(2)}
//               </span>
//             </div>
//           )}

//           {/* Status Message */}
//           {status && (
//             <div
//               className={`flex items-start space-x-2 p-3 rounded-lg text-sm
//                           ${
//                             status === "success"
//                               ? "bg-emerald-50 text-emerald-700"
//                               : "bg-red-50 text-red-700"
//                           }`}
//             >
//               {status === "success" ? (
//                 <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
//               ) : (
//                 <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
//               )}
//               <span>{message}</span>
//             </div>
//           )}

//           {/* Submit */}
//           {status !== "success" && (
//             <button
//               onClick={handleSubmit}
//               disabled={loading}
//               className={`w-full py-3 rounded-xl font-bold text-white transition
//                           ${
//                             isBuy
//                               ? "bg-emerald-500 hover:bg-emerald-600"
//                               : "bg-red-500 hover:bg-red-600"
//                           }
//                           disabled:opacity-50 disabled:cursor-not-allowed`}
//             >
//               {loading
//                 ? "Processing..."
//                 : `Confirm ${isBuy ? "Buy" : "Sell"} — ₹${totalAmount}`}
//             </button>
//           )}

//           {status === "success" && (
//             <button
//               onClick={onClose}
//               className="w-full py-3 rounded-xl font-bold text-white 
//                          bg-gray-500 hover:bg-gray-600 transition"
//             >
//               Close
//             </button>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BuySellModal;

// src/components/BuySellModal.jsx
import React, { useEffect, useState } from "react";
import { X, AlertCircle, CheckCircle, Wallet } from "lucide-react";
import { getWallet } from "../services/WalletService";
import axios from "axios";

const BuySellModal = ({ type, company, userId, onClose, onSuccess }) => {
  const [portfolios, setPortfolios] = useState([]);
  const [selectedPortfolioId, setSelectedPortfolioId] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);
  const [message, setMessage] = useState("");
  const [walletBalance, setWalletBalance] = useState(null);

  const isBuy = type === "BUY";
  const price = company?.price || 0;
  const totalAmount = (quantity * price).toFixed(2);

  useEffect(() => {
    if (!userId) return;

    axios
      .get(`http://localhost:8085/portfolio/user/${userId}`)
      .then((res) => {
        setPortfolios(res.data);
        if (res.data.length > 0) {
          // ✅ FIX: Convert to STRING - select values are always strings
          setSelectedPortfolioId(String(res.data[0].id));
        }
      })
      .catch(() => setMessage("Failed to load portfolios"));

    getWallet(userId)
      .then((data) => setWalletBalance(data.balance))
      .catch(() => console.log("Wallet not found"));
  }, [userId]);

  const handleSubmit = async () => {
    if (!selectedPortfolioId) {
      setStatus("error");
      setMessage("Please select a portfolio");
      return;
    }
    if (quantity <= 0) {
      setStatus("error");
      setMessage("Quantity must be at least 1");
      return;
    }
    if (isBuy && walletBalance !== null && Number(totalAmount) > walletBalance) {
      setStatus("error");
      setMessage(`Insufficient balance. You have ₹${walletBalance.toFixed(2)}`);
      return;
    }

    setLoading(true);
    setStatus(null);
    setMessage("");

    try {
      const endpoint = isBuy
        ? "http://localhost:8086/orders/buy"
        : "http://localhost:8086/orders/sell";

      const requestData = {
        userId: String(userId),
        portfolioId: Number(selectedPortfolioId),
        companyId: company.id,
        quantity: Number(quantity),
        price: Number(price),
      };

      // ✅ DEBUG - remove after testing
      console.log("🚀 Sending order:", requestData);
      console.log("🚀 Portfolio:", portfolios.find(
        (p) => String(p.id) === selectedPortfolioId
      )?.name);

      await axios.post(endpoint, requestData);

      setStatus("success");
      setMessage(
        `${isBuy ? "Bought" : "Sold"} ${quantity} share(s) of ${
          company.name
        } successfully!`
      );

      // ✅ Notify parent
      if (onSuccess) {
        onSuccess(Number(selectedPortfolioId));
      }

      getWallet(userId)
        .then((data) => setWalletBalance(data.balance))
        .catch(() => {});
    } catch (err) {
      setStatus("error");
      setMessage(
        err?.response?.data?.message ||
          err?.response?.data ||
          `${isBuy ? "Buy" : "Sell"} order failed`
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden">
        {/* Header */}
        <div
          className={`px-6 py-4 flex justify-between items-center
                      ${isBuy ? "bg-emerald-500" : "bg-red-500"}`}
        >
          <div>
            <h2 className="text-white font-bold text-xl">
              {isBuy ? "Buy" : "Sell"} {company?.name}
            </h2>
            <p className="text-white/80 text-sm">
              Current Price: ₹{price?.toFixed(2)}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-5">
          {/* Wallet Balance */}
          {walletBalance !== null && (
            <div
              className="flex items-center justify-between bg-blue-50 
                            border border-blue-200 rounded-xl px-4 py-3"
            >
              <div className="flex items-center space-x-2">
                <Wallet className="w-4 h-4 text-blue-500" />
                <span className="text-sm font-medium text-blue-700">
                  Wallet Balance
                </span>
              </div>
              <span className="text-lg font-bold text-blue-700">
                ₹
                {walletBalance.toLocaleString("en-IN", {
                  minimumFractionDigits: 2,
                })}
              </span>
            </div>
          )}

          {/* ✅ FIX: Portfolio Select - all values as STRING */}
          <div>
            <label className="text-sm font-semibold text-gray-600 mb-1.5 block">
              Select Portfolio
            </label>
            <select
              value={selectedPortfolioId}
              onChange={(e) => {
                console.log("📁 Selected portfolio id:", e.target.value); // debug
                setSelectedPortfolioId(e.target.value);
              }}
              className="w-full border border-gray-200 rounded-lg px-4 py-2.5 
                         focus:outline-none focus:ring-2 focus:ring-emerald-300
                         bg-gray-50 text-gray-800"
            >
              {portfolios.length === 0 && (
                <option value="">No portfolios found</option>
              )}
              {portfolios.map((p) => (
                // ✅ FIX: value as STRING
                <option key={p.id} value={String(p.id)}>
                  {p.name}
                </option>
              ))}
            </select>
          </div>

          {/* Quantity */}
          <div>
            <label className="text-sm font-semibold text-gray-600 mb-1.5 block">
              Quantity
            </label>
            <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="px-4 py-2.5 bg-gray-100 text-gray-600 
                           hover:bg-gray-200 transition font-bold text-lg"
              >
                −
              </button>
              <input
                type="number"
                min={1}
                value={quantity}
                onChange={(e) =>
                  setQuantity(Math.max(1, parseInt(e.target.value) || 1))
                }
                className="flex-1 text-center py-2.5 focus:outline-none 
                           text-gray-800 font-semibold"
              />
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="px-4 py-2.5 bg-gray-100 text-gray-600 
                           hover:bg-gray-200 transition font-bold text-lg"
              >
                +
              </button>
            </div>
          </div>

          {/* Total */}
          <div
            className={`rounded-lg p-4 flex justify-between items-center
                        ${isBuy ? "bg-emerald-50" : "bg-red-50"}`}
          >
            <span className="text-gray-600 font-medium">Total Amount</span>
            <span
              className={`text-xl font-bold
                          ${isBuy ? "text-emerald-600" : "text-red-600"}`}
            >
              ₹{totalAmount}
            </span>
          </div>

          {/* Remaining Balance */}
          {isBuy && walletBalance !== null && (
            <div className="flex justify-between text-sm px-1">
              <span className="text-gray-500">Remaining after purchase</span>
              <span
                className={`font-semibold ${
                  walletBalance - Number(totalAmount) >= 0
                    ? "text-emerald-600"
                    : "text-red-600"
                }`}
              >
                ₹{(walletBalance - Number(totalAmount)).toFixed(2)}
              </span>
            </div>
          )}

          {/* Status Message */}
          {status && (
            <div
              className={`flex items-start space-x-2 p-3 rounded-lg text-sm
                          ${
                            status === "success"
                              ? "bg-emerald-50 text-emerald-700"
                              : "bg-red-50 text-red-700"
                          }`}
            >
              {status === "success" ? (
                <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
              ) : (
                <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
              )}
              <span>{message}</span>
            </div>
          )}

          {/* Submit */}
          {status !== "success" && (
            <button
              onClick={handleSubmit}
              disabled={loading}
              className={`w-full py-3 rounded-xl font-bold text-white transition
                          ${
                            isBuy
                              ? "bg-emerald-500 hover:bg-emerald-600"
                              : "bg-red-500 hover:bg-red-600"
                          }
                          disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              {loading
                ? "Processing..."
                : `Confirm ${isBuy ? "Buy" : "Sell"} — ₹${totalAmount}`}
            </button>
          )}

          {status === "success" && (
            <button
              onClick={onClose}
              className="w-full py-3 rounded-xl font-bold text-white 
                         bg-gray-500 hover:bg-gray-600 transition"
            >
              Close
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default BuySellModal;