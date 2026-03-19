// // // // import React, { useEffect, useState } from "react";
// // // // import { jwtDecode } from "jwt-decode";
// // // // import {
// // // //   Wallet,
// // // //   Plus,
// // // //   ArrowLeft,
// // // //   TrendingUp,
// // // //   ShieldCheck,
// // // //   IndianRupee,
// // // // } from "lucide-react";
// // // // import { Link } from "react-router-dom";
// // // // import ExploreNavbar from "../components/ExploreNavbar";
// // // // import TransactionHistory from "../components/TransactionHistory";
// // // // import AddMoneyModal from "../components/AddMoneyModal";
// // // // import {
// // // //   getWallet,
// // // //   createWallet,
// // // //   addMoneyToWallet,
// // // //   getTransactions,
// // // // } from "../services/WalletService";
// // // // import "../styles/WalletPage.css";

// // // // const WalletPage = () => {
// // // //   const [userId, setUserId] = useState(null);
// // // //   const [walletData, setWalletData] = useState(null);
// // // //   const [transactions, setTransactions] = useState([]);
// // // //   const [loading, setLoading] = useState(true);
// // // //   const [txnLoading, setTxnLoading] = useState(true);
// // // //   const [showAddMoney, setShowAddMoney] = useState(false);
// // // //   const [addingMoney, setAddingMoney] = useState(false);
// // // //   const [error, setError] = useState("");

// // // //   useEffect(() => {
// // // //     const token = localStorage.getItem("token");
// // // //     if (token) {
// // // //       try {
// // // //         const decoded = jwtDecode(token);
// // // //         const id = decoded.userId || decoded.sub;
// // // //         setUserId(id);
// // // //       } catch {
// // // //         setError("Invalid token");
// // // //       }
// // // //     }
// // // //   }, []);

// // // //   useEffect(() => {
// // // //     if (!userId) return;
// // // //     fetchWallet();
// // // //     fetchTransactions();
// // // //   }, [userId]);

// // // //   const fetchWallet = async () => {
// // // //     try {
// // // //       setLoading(true);
// // // //       const data = await getWallet(userId);
// // // //       setWalletData(data);
// // // //     } catch {
// // // //       try {
// // // //         await createWallet(userId);
// // // //         const data = await getWallet(userId);
// // // //         setWalletData(data);
// // // //       } catch (err) {
// // // //         setError("Failed to load wallet");
// // // //       }
// // // //     } finally {
// // // //       setLoading(false);
// // // //     }
// // // //   };

// // // //   const fetchTransactions = async () => {
// // // //     try {
// // // //       setTxnLoading(true);
// // // //       const data = await getTransactions(userId);
// // // //       setTransactions(data || []);
// // // //     } catch {
// // // //       setTransactions([]);
// // // //     } finally {
// // // //       setTxnLoading(false);
// // // //     }
// // // //   };

// // // //   const handleAddMoney = async (amount) => {
// // // //     if (!userId) return;
// // // //     try {
// // // //       setAddingMoney(true);
// // // //       await addMoneyToWallet(userId, amount);
// // // //       await fetchWallet();
// // // //       await fetchTransactions();
// // // //       setShowAddMoney(false);
// // // //     } catch (err) {
// // // //       alert("Failed: " + (typeof err === "string" ? err : err.message || err));
// // // //     } finally {
// // // //       setAddingMoney(false);
// // // //     }
// // // //   };

// // // //   const balance = walletData?.balance || 0;
// // // //   const minBalance = walletData?.minBalance || 0;
// // // //   const availableBalance = Math.max(0, balance - minBalance);

// // // //   return (
// // // //     <div className="wallet-page">
// // // //       {/* ✅ Correct Navbar */}
// // // //       <ExploreNavbar />

// // // //       {/* Banner */}
// // // //       <div className="wallet-banner">
// // // //         <div className="wallet-banner-content">
// // // //           <Link to="/explore" className="wallet-back-link">
// // // //             <ArrowLeft size={16} />
// // // //             Back to Explore
// // // //           </Link>
// // // //           <h1>
// // // //             <Wallet size={28} />
// // // //             My Wallet
// // // //           </h1>
// // // //           <p>Manage your funds and view transaction history</p>
// // // //         </div>
// // // //       </div>

// // // //       {/* Content */}
// // // //       <div className="wallet-content">
// // // //         {error && <div className="wallet-error">⚠️ {error}</div>}

// // // //         {/* Balance Cards */}
// // // //         <div className="wallet-cards">
// // // //           <div className="wallet-card balance-card">
// // // //             <div className="wallet-card-icon balance-icon">
// // // //               <IndianRupee size={24} />
// // // //             </div>
// // // //             <div className="wallet-card-info">
// // // //               <span className="wallet-card-label">Total Balance</span>
// // // //               <span className="wallet-card-value">
// // // //                 {loading
// // // //                   ? "Loading..."
// // // //                   : `₹${Number(balance).toLocaleString("en-IN", {
// // // //                       minimumFractionDigits: 2,
// // // //                       maximumFractionDigits: 2,
// // // //                     })}`}
// // // //               </span>
// // // //             </div>
// // // //             <button
// // // //               className="wallet-add-btn"
// // // //               onClick={() => setShowAddMoney(true)}
// // // //             >
// // // //               <Plus size={18} />
// // // //               Add Money
// // // //             </button>
// // // //           </div>

// // // //           <div className="wallet-card available-card">
// // // //             <div className="wallet-card-icon available-icon">
// // // //               <TrendingUp size={24} />
// // // //             </div>
// // // //             <div className="wallet-card-info">
// // // //               <span className="wallet-card-label">Available for Trading</span>
// // // //               <span className="wallet-card-value">
// // // //                 {loading
// // // //                   ? "Loading..."
// // // //                   : `₹${Number(availableBalance).toLocaleString("en-IN", {
// // // //                       minimumFractionDigits: 2,
// // // //                       maximumFractionDigits: 2,
// // // //                     })}`}
// // // //               </span>
// // // //             </div>
// // // //           </div>

// // // //           <div className="wallet-card min-card">
// // // //             <div className="wallet-card-icon min-icon">
// // // //               <ShieldCheck size={24} />
// // // //             </div>
// // // //             <div className="wallet-card-info">
// // // //               <span className="wallet-card-label">Minimum Balance</span>
// // // //               <span className="wallet-card-value">
// // // //                 ₹{Number(minBalance).toLocaleString("en-IN", {
// // // //                   minimumFractionDigits: 2,
// // // //                   maximumFractionDigits: 2,
// // // //                 })}
// // // //               </span>
// // // //             </div>
// // // //           </div>
// // // //         </div>

// // // //         {/* Transaction History */}
// // // //         <div className="wallet-transactions">
// // // //           <TransactionHistory
// // // //             transactions={transactions}
// // // //             loading={txnLoading}
// // // //           />
// // // //         </div>
// // // //       </div>

// // // //       <AddMoneyModal
// // // //         isOpen={showAddMoney}
// // // //         onClose={() => setShowAddMoney(false)}
// // // //         onConfirm={handleAddMoney}
// // // //         loading={addingMoney}
// // // //       />
// // // //     </div>
// // // //   );
// // // // };

// // // // export default WalletPage;


// // // import React, { useEffect, useState } from "react";
// // // import { jwtDecode } from "jwt-decode";
// // // import {
// // //   Wallet,
// // //   Plus,
// // //   ArrowLeft,
// // //   TrendingUp,
// // //   ShieldCheck,
// // //   IndianRupee,
// // //   Clock,
// // //   CheckCircle,
// // //   AlertCircle,
// // //   XCircle,
// // //   X,
// // // } from "lucide-react";
// // // import { Link } from "react-router-dom";
// // // import ExploreNavbar from "../components/ExploreNavbar";
// // // import TransactionHistory from "../components/TransactionHistory";
// // // import AddMoneyModal from "../components/AddMoneyModal";
// // // import {
// // //   getWallet,
// // //   createWallet,
// // //   addMoneyToWallet,
// // //   getTransactions,
// // // } from "../services/WalletService";
// // // import { getUserLimitOrders, cancelLimitOrder } from "../services/LimitOrderService";
// // // import "../styles/WalletPage.css";

// // // // ── Status styles for limit orders ──
// // // const STATUS_STYLES = {
// // //   PENDING:   "bg-yellow-50  border-yellow-200  text-yellow-700",
// // //   EXECUTED:  "bg-emerald-50 border-emerald-200 text-emerald-700",
// // //   FAILED:    "bg-red-50     border-red-200     text-red-700",
// // //   CANCELLED: "bg-gray-50    border-gray-200    text-gray-500",
// // //   EXPIRED:   "bg-gray-50    border-gray-200    text-gray-400",
// // // };

// // // const STATUS_ICONS = {
// // //   PENDING:   <Clock className="w-4 h-4" />,
// // //   EXECUTED:  <CheckCircle className="w-4 h-4" />,
// // //   FAILED:    <AlertCircle className="w-4 h-4" />,
// // //   CANCELLED: <XCircle className="w-4 h-4" />,
// // //   EXPIRED:   <XCircle className="w-4 h-4" />,
// // // };

// // // const WalletPage = () => {
// // //   const [userId, setUserId]           = useState(null);
// // //   const [walletData, setWalletData]   = useState(null);
// // //   const [transactions, setTransactions] = useState([]);
// // //   const [loading, setLoading]         = useState(true);
// // //   const [txnLoading, setTxnLoading]   = useState(true);
// // //   const [showAddMoney, setShowAddMoney] = useState(false);
// // //   const [addingMoney, setAddingMoney] = useState(false);
// // //   const [error, setError]             = useState("");

// // //   // ── Limit Orders State ──
// // //   const [limitOrders, setLimitOrders]       = useState([]);
// // //   const [limitLoading, setLimitLoading]     = useState(false);
// // //   const [activeTab, setActiveTab]           = useState("ALL"); // ALL | PENDING | EXECUTED

// // //   useEffect(() => {
// // //     const token = localStorage.getItem("token");
// // //     if (token) {
// // //       try {
// // //         const decoded = jwtDecode(token);
// // //         const id = decoded.userId || decoded.sub;
// // //         setUserId(id);
// // //       } catch {
// // //         setError("Invalid token");
// // //       }
// // //     }
// // //   }, []);

// // //   useEffect(() => {
// // //     if (!userId) return;
// // //     fetchWallet();
// // //     fetchTransactions();
// // //     fetchLimitOrders();

// // //     // ── Poll limit orders every 15s to catch executions ──
// // //     const interval = setInterval(fetchLimitOrders, 15000);
// // //     return () => clearInterval(interval);
// // //   }, [userId]);

// // //   const fetchWallet = async () => {
// // //     try {
// // //       setLoading(true);
// // //       const data = await getWallet(userId);
// // //       setWalletData(data);
// // //     } catch {
// // //       try {
// // //         await createWallet(userId);
// // //         const data = await getWallet(userId);
// // //         setWalletData(data);
// // //       } catch {
// // //         setError("Failed to load wallet");
// // //       }
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   const fetchTransactions = async () => {
// // //     try {
// // //       setTxnLoading(true);
// // //       const data = await getTransactions(userId);
// // //       setTransactions(data || []);
// // //     } catch {
// // //       setTransactions([]);
// // //     } finally {
// // //       setTxnLoading(false);
// // //     }
// // //   };

// // //   // ── Fetch Limit Orders ──
// // //   const fetchLimitOrders = async () => {
// // //     if (!userId) return;
// // //     try {
// // //       setLimitLoading(true);
// // //       const res = await getUserLimitOrders(userId);
// // //       setLimitOrders(res.data || []);
// // //     } catch {
// // //       setLimitOrders([]);
// // //     } finally {
// // //       setLimitLoading(false);
// // //     }
// // //   };

// // //   // ── Cancel a Limit Order ──
// // //   const handleCancelLimitOrder = async (id) => {
// // //     try {
// // //       await cancelLimitOrder(id, userId);
// // //       fetchLimitOrders();
// // //       fetchWallet(); // refresh balance if wallet was reserved
// // //     } catch (err) {
// // //       alert(err?.response?.data || "Failed to cancel order");
// // //     }
// // //   };

// // //   const handleAddMoney = async (amount) => {
// // //     if (!userId) return;
// // //     try {
// // //       setAddingMoney(true);
// // //       await addMoneyToWallet(userId, amount);
// // //       await fetchWallet();
// // //       await fetchTransactions();
// // //       setShowAddMoney(false);
// // //     } catch (err) {
// // //       alert("Failed: " + (typeof err === "string" ? err : err.message || err));
// // //     } finally {
// // //       setAddingMoney(false);
// // //     }
// // //   };

// // //   const balance          = walletData?.balance || 0;
// // //   const minBalance       = walletData?.minBalance || 0;
// // //   const availableBalance = Math.max(0, balance - minBalance);

// // //   // ── Filter limit orders by tab ──
// // //   const filteredOrders = limitOrders.filter((o) => {
// // //     if (activeTab === "ALL")      return true;
// // //     if (activeTab === "PENDING")  return o.status === "PENDING";
// // //     if (activeTab === "EXECUTED") return o.status === "EXECUTED";
// // //     return true;
// // //   });

// // //   const pendingCount = limitOrders.filter((o) => o.status === "PENDING").length;

// // //   return (
// // //     <div className="wallet-page">
// // //       <ExploreNavbar />

// // //       {/* Banner */}
// // //       <div className="wallet-banner">
// // //         <div className="wallet-banner-content">
// // //           <Link to="/explore" className="wallet-back-link">
// // //             <ArrowLeft size={16} />
// // //             Back to Explore
// // //           </Link>
// // //           <h1>
// // //             <Wallet size={28} />
// // //             My Wallet
// // //           </h1>
// // //           <p>Manage your funds and view transaction history</p>
// // //         </div>
// // //       </div>

// // //       {/* Content */}
// // //       <div className="wallet-content">
// // //         {error && <div className="wallet-error">⚠️ {error}</div>}

// // //         {/* Balance Cards */}
// // //         <div className="wallet-cards">
// // //           <div className="wallet-card balance-card">
// // //             <div className="wallet-card-icon balance-icon">
// // //               <IndianRupee size={24} />
// // //             </div>
// // //             <div className="wallet-card-info">
// // //               <span className="wallet-card-label">Total Balance</span>
// // //               <span className="wallet-card-value">
// // //                 {loading
// // //                   ? "Loading..."
// // //                   : `₹${Number(balance).toLocaleString("en-IN", {
// // //                       minimumFractionDigits: 2,
// // //                       maximumFractionDigits: 2,
// // //                     })}`}
// // //               </span>
// // //             </div>
// // //             <button
// // //               className="wallet-add-btn"
// // //               onClick={() => setShowAddMoney(true)}
// // //             >
// // //               <Plus size={18} />
// // //               Add Money
// // //             </button>
// // //           </div>

// // //           <div className="wallet-card available-card">
// // //             <div className="wallet-card-icon available-icon">
// // //               <TrendingUp size={24} />
// // //             </div>
// // //             <div className="wallet-card-info">
// // //               <span className="wallet-card-label">Available for Trading</span>
// // //               <span className="wallet-card-value">
// // //                 {loading
// // //                   ? "Loading..."
// // //                   : `₹${Number(availableBalance).toLocaleString("en-IN", {
// // //                       minimumFractionDigits: 2,
// // //                       maximumFractionDigits: 2,
// // //                     })}`}
// // //               </span>
// // //             </div>
// // //           </div>

// // //           <div className="wallet-card min-card">
// // //             <div className="wallet-card-icon min-icon">
// // //               <ShieldCheck size={24} />
// // //             </div>
// // //             <div className="wallet-card-info">
// // //               <span className="wallet-card-label">Minimum Balance</span>
// // //               <span className="wallet-card-value">
// // //                 ₹{Number(minBalance).toLocaleString("en-IN", {
// // //                   minimumFractionDigits: 2,
// // //                   maximumFractionDigits: 2,
// // //                 })}
// // //               </span>
// // //             </div>
// // //           </div>
// // //         </div>

// // //         {/* ─────────────────────────────────────── */}
// // //         {/*         LIMIT ORDERS SECTION            */}
// // //         {/* ─────────────────────────────────────── */}
// // //         <div className="mt-8 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          
// // //           {/* Header */}
// // //           <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
// // //             <div className="flex items-center gap-2">
// // //               <Clock className="w-5 h-5 text-blue-500" />
// // //               <h2 className="font-bold text-gray-800 text-lg">Limit Orders</h2>
// // //               {/* Pending badge */}
// // //               {pendingCount > 0 && (
// // //                 <span className="bg-yellow-100 text-yellow-700 text-xs 
// // //                                  font-bold px-2 py-0.5 rounded-full border 
// // //                                  border-yellow-200 animate-pulse">
// // //                   {pendingCount} Watching
// // //                 </span>
// // //               )}
// // //             </div>
// // //             <button
// // //               onClick={fetchLimitOrders}
// // //               className="text-xs text-blue-500 hover:underline font-medium"
// // //             >
// // //               Refresh
// // //             </button>
// // //           </div>

// // //           {/* Tabs */}
// // //           <div className="flex border-b border-gray-100">
// // //             {["ALL", "PENDING", "EXECUTED"].map((tab) => (
// // //               <button
// // //                 key={tab}
// // //                 onClick={() => setActiveTab(tab)}
// // //                 className={`flex-1 py-2.5 text-sm font-semibold transition
// // //                   ${activeTab === tab
// // //                     ? "border-b-2 border-blue-500 text-blue-600"
// // //                     : "text-gray-400 hover:text-gray-600"
// // //                   }`}
// // //               >
// // //                 {tab}
// // //                 {/* Count badge */}
// // //                 <span className="ml-1.5 text-xs bg-gray-100 
// // //                                  text-gray-500 px-1.5 py-0.5 rounded-full">
// // //                   {tab === "ALL"
// // //                     ? limitOrders.length
// // //                     : limitOrders.filter((o) => o.status === tab).length}
// // //                 </span>
// // //               </button>
// // //             ))}
// // //           </div>

// // //           {/* Orders List */}
// // //           <div className="p-4 space-y-3 max-h-96 overflow-y-auto">
// // //             {limitLoading ? (
// // //               <div className="text-center py-8 text-gray-400">
// // //                 <Clock className="w-8 h-8 mx-auto mb-2 animate-spin" />
// // //                 <p className="text-sm">Loading orders...</p>
// // //               </div>

// // //             ) : filteredOrders.length === 0 ? (
// // //               <div className="text-center py-10">
// // //                 <Clock className="w-10 h-10 text-gray-200 mx-auto mb-3" />
// // //                 <p className="text-gray-400 font-medium text-sm">
// // //                   No {activeTab !== "ALL" ? activeTab.toLowerCase() : ""} limit orders
// // //                 </p>
// // //                 <p className="text-gray-300 text-xs mt-1">
// // //                   Go to Explore → Buy/Sell → "Limit Order" tab to place one
// // //                 </p>
// // //               </div>

// // //             ) : (
// // //               filteredOrders.map((order) => (
// // //                 <div
// // //                   key={order.id}
// // //                   className={`border rounded-xl p-4 
// // //                               ${STATUS_STYLES[order.status] || ""}`}
// // //                 >
// // //                   <div className="flex items-start justify-between gap-2">
                    
// // //                     {/* Left: Order Info */}
// // //                     <div className="flex items-start gap-2 flex-1 min-w-0">
// // //                       <div className="mt-0.5 flex-shrink-0">
// // //                         {STATUS_ICONS[order.status]}
// // //                       </div>
// // //                       <div className="min-w-0">
                        
// // //                         {/* Order Type Badge + Title */}
// // //                         <div className="flex items-center gap-2 flex-wrap">
// // //                           <span className={`text-xs font-bold px-2 py-0.5 
// // //                                            rounded-full border
// // //                                            ${order.orderType === "BUY"
// // //                                              ? "bg-emerald-100 text-emerald-700 border-emerald-200"
// // //                                              : "bg-red-100 text-red-700 border-red-200"
// // //                                            }`}>
// // //                             {order.orderType}
// // //                           </span>
// // //                           <span className="font-semibold text-sm">
// // //                             {order.quantity} shares
// // //                           </span>
// // //                           <span className={`text-xs font-bold px-2 py-0.5 
// // //                                            rounded-full border
// // //                                            ${STATUS_STYLES[order.status]}`}>
// // //                             {order.status}
// // //                           </span>
// // //                         </div>

// // //                         {/* Price Info */}
// // //                         <div className="flex gap-4 mt-1.5 text-xs">
// // //                           <span>
// // //                             🎯 Target:{" "}
// // //                             <span className="font-bold">
// // //                               ₹{order.targetPrice?.toFixed(2)}
// // //                             </span>
// // //                           </span>
// // //                           <span>
// // //                             📊 At creation:{" "}
// // //                             <span className="font-medium">
// // //                               ₹{order.currentPrice?.toFixed(2)}
// // //                             </span>
// // //                           </span>
// // //                         </div>

// // //                         {/* Est. Total */}
// // //                         <p className="text-xs mt-1 opacity-70">
// // //                           Est. Total: ₹
// // //                           {(order.quantity * order.targetPrice).toLocaleString(
// // //                             "en-IN",
// // //                             { minimumFractionDigits: 2 }
// // //                           )}
// // //                         </p>

// // //                         {/* Dates */}
// // //                         <p className="text-xs opacity-60 mt-1">
// // //                           Placed: {new Date(order.createdAt).toLocaleString()}
// // //                         </p>
// // //                         {order.executedAt && (
// // //                           <p className="text-xs font-semibold mt-0.5">
// // //                             ✅ Executed:{" "}
// // //                             {new Date(order.executedAt).toLocaleString()}
// // //                           </p>
// // //                         )}
// // //                         {order.expiresAt && order.status === "PENDING" && (
// // //                           <p className="text-xs opacity-60 mt-0.5">
// // //                             ⏰ Expires:{" "}
// // //                             {new Date(order.expiresAt).toLocaleString()}
// // //                           </p>
// // //                         )}
// // //                         {order.failureReason && (
// // //                           <p className="text-xs text-red-600 mt-0.5">
// // //                             ❌ {order.failureReason}
// // //                           </p>
// // //                         )}

// // //                         {/* Watching pulse for PENDING */}
// // //                         {order.status === "PENDING" && (
// // //                           <p className="text-xs mt-1.5 animate-pulse font-medium">
// // //                             ● Watching price...
// // //                           </p>
// // //                         )}
// // //                       </div>
// // //                     </div>

// // //                     {/* Right: Cancel Button (PENDING only) */}
// // //                     {order.status === "PENDING" && (
// // //                       <button
// // //                         onClick={() => handleCancelLimitOrder(order.id)}
// // //                         title="Cancel order"
// // //                         className="flex-shrink-0 p-1.5 rounded-lg 
// // //                                    hover:bg-red-100 text-red-400 
// // //                                    hover:text-red-600 transition"
// // //                       >
// // //                         <X className="w-4 h-4" />
// // //                       </button>
// // //                     )}
// // //                   </div>
// // //                 </div>
// // //               ))
// // //             )}
// // //           </div>
// // //         </div>
// // //         {/* ─────────────────────────────────────── */}

// // //         {/* Transaction History */}
// // //         <div className="wallet-transactions">
// // //           <TransactionHistory
// // //             transactions={transactions}
// // //             loading={txnLoading}
// // //           />
// // //         </div>
// // //       </div>

// // //       <AddMoneyModal
// // //         isOpen={showAddMoney}
// // //         onClose={() => setShowAddMoney(false)}
// // //         onConfirm={handleAddMoney}
// // //         loading={addingMoney}
// // //       />
// // //     </div>
// // //   );
// // // };

// // // export default WalletPage;

// // import React, { useEffect, useState } from "react";
// // import { jwtDecode } from "jwt-decode";
// // import {
// //   Wallet,
// //   Plus,
// //   ArrowLeft,
// //   TrendingUp,
// //   ShieldCheck,
// //   IndianRupee,
// //   Clock,
// //   CheckCircle,
// //   AlertCircle,
// //   XCircle,
// //   X,
// // } from "lucide-react";
// // import { Link } from "react-router-dom";
// // import ExploreNavbar from "../components/ExploreNavbar";
// // import TransactionHistory from "../components/TransactionHistory";
// // import AddMoneyModal from "../components/AddMoneyModal";
// // import {
// //   getWallet,
// //   createWallet,
// //   addMoneyToWallet,
// //   getTransactions,
// // } from "../services/WalletService";
// // import {
// //   getUserLimitOrders,
// //   cancelLimitOrder,
// // } from "../services/LimitOrderService";
// // import "../styles/WalletPage.css";

// // const WalletPage = () => {
// //   const [userId, setUserId]               = useState(null);
// //   const [walletData, setWalletData]       = useState(null);
// //   const [transactions, setTransactions]   = useState([]);
// //   const [loading, setLoading]             = useState(true);
// //   const [txnLoading, setTxnLoading]       = useState(true);
// //   const [showAddMoney, setShowAddMoney]   = useState(false);
// //   const [addingMoney, setAddingMoney]     = useState(false);
// //   const [error, setError]                 = useState("");

// //   // ── Limit Orders State ──
// //   const [limitOrders, setLimitOrders]   = useState([]);
// //   const [limitLoading, setLimitLoading] = useState(false);
// //   const [activeTab, setActiveTab]       = useState("ALL");

// //   // ── Get userId from token ──
// //   useEffect(() => {
// //     const token = localStorage.getItem("token");
// //     if (token) {
// //       try {
// //         const decoded = jwtDecode(token);
// //         const id = decoded.userId || decoded.sub;
// //         setUserId(id);
// //       } catch {
// //         setError("Invalid token");
// //       }
// //     }
// //   }, []);

// //   // ── Fetch everything on load ──
// //   useEffect(() => {
// //     if (!userId) return;
// //     fetchWallet();
// //     fetchTransactions();
// //     fetchLimitOrders();

// //     // Poll limit orders every 15s to catch executions
// //     const interval = setInterval(fetchLimitOrders, 15000);
// //     return () => clearInterval(interval);
// //   }, [userId]);

// //   const fetchWallet = async () => {
// //     try {
// //       setLoading(true);
// //       const data = await getWallet(userId);
// //       setWalletData(data);
// //     } catch {
// //       try {
// //         await createWallet(userId);
// //         const data = await getWallet(userId);
// //         setWalletData(data);
// //       } catch {
// //         setError("Failed to load wallet");
// //       }
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const fetchTransactions = async () => {
// //     try {
// //       setTxnLoading(true);
// //       const data = await getTransactions(userId);
// //       setTransactions(data || []);
// //     } catch {
// //       setTransactions([]);
// //     } finally {
// //       setTxnLoading(false);
// //     }
// //   };

// //   const fetchLimitOrders = async () => {
// //     if (!userId) return;
// //     try {
// //       setLimitLoading(true);
// //       const res = await getUserLimitOrders(userId);
// //       setLimitOrders(res.data || []);
// //     } catch {
// //       setLimitOrders([]);
// //     } finally {
// //       setLimitLoading(false);
// //     }
// //   };

// //   const handleCancelLimitOrder = async (id) => {
// //     try {
// //       await cancelLimitOrder(id, userId);
// //       fetchLimitOrders();
// //       fetchWallet();
// //     } catch (err) {
// //       alert(err?.response?.data || "Failed to cancel order");
// //     }
// //   };

// //   const handleAddMoney = async (amount) => {
// //     if (!userId) return;
// //     try {
// //       setAddingMoney(true);
// //       await addMoneyToWallet(userId, amount);
// //       await fetchWallet();
// //       await fetchTransactions();
// //       setShowAddMoney(false);
// //     } catch (err) {
// //       alert("Failed: " + (typeof err === "string" ? err : err.message || err));
// //     } finally {
// //       setAddingMoney(false);
// //     }
// //   };

// //   const balance          = walletData?.balance || 0;
// //   const minBalance       = walletData?.minBalance || 0;
// //   const availableBalance = Math.max(0, balance - minBalance);

// //   // ── Filter limit orders by tab ──
// //   const filteredOrders = limitOrders.filter((o) => {
// //     if (activeTab === "ALL")      return true;
// //     if (activeTab === "PENDING")  return o.status === "PENDING";
// //     if (activeTab === "EXECUTED") return o.status === "EXECUTED";
// //     return true;
// //   });

// //   const pendingCount = limitOrders.filter((o) => o.status === "PENDING").length;

// //   return (
// //     <div className="wallet-page">
// //       {/* Navbar */}
// //       <ExploreNavbar />

// //       {/* Banner */}
// //       <div className="wallet-banner">
// //         <div className="wallet-banner-content">
// //           <Link to="/explore" className="wallet-back-link">
// //             <ArrowLeft size={16} />
// //             Back to Explore
// //           </Link>
// //           <h1>
// //             <Wallet size={28} />
// //             My Wallet
// //           </h1>
// //           <p>Manage your funds and view transaction history</p>
// //         </div>
// //       </div>

// //       {/* Content */}
// //       <div className="wallet-content">
// //         {error && <div className="wallet-error">⚠️ {error}</div>}

// //         {/* ── Balance Cards ── */}
// //         <div className="wallet-cards">

// //           {/* Total Balance */}
// //           <div className="wallet-card balance-card">
// //             <div className="wallet-card-icon balance-icon">
// //               <IndianRupee size={24} />
// //             </div>
// //             <div className="wallet-card-info">
// //               <span className="wallet-card-label">Total Balance</span>
// //               <span className="wallet-card-value">
// //                 {loading
// //                   ? "Loading..."
// //                   : `₹${Number(balance).toLocaleString("en-IN", {
// //                       minimumFractionDigits: 2,
// //                       maximumFractionDigits: 2,
// //                     })}`}
// //               </span>
// //             </div>
// //             <button
// //               className="wallet-add-btn"
// //               onClick={() => setShowAddMoney(true)}
// //             >
// //               <Plus size={18} />
// //               Add Money
// //             </button>
// //           </div>

// //           {/* Available for Trading */}
// //           <div className="wallet-card available-card">
// //             <div className="wallet-card-icon available-icon">
// //               <TrendingUp size={24} />
// //             </div>
// //             <div className="wallet-card-info">
// //               <span className="wallet-card-label">Available for Trading</span>
// //               <span className="wallet-card-value">
// //                 {loading
// //                   ? "Loading..."
// //                   : `₹${Number(availableBalance).toLocaleString("en-IN", {
// //                       minimumFractionDigits: 2,
// //                       maximumFractionDigits: 2,
// //                     })}`}
// //               </span>
// //             </div>
// //           </div>

// //           {/* Minimum Balance */}
// //           <div className="wallet-card min-card">
// //             <div className="wallet-card-icon min-icon">
// //               <ShieldCheck size={24} />
// //             </div>
// //             <div className="wallet-card-info">
// //               <span className="wallet-card-label">Minimum Balance</span>
// //               <span className="wallet-card-value">
// //                 ₹{Number(minBalance).toLocaleString("en-IN", {
// //                   minimumFractionDigits: 2,
// //                   maximumFractionDigits: 2,
// //                 })}
// //               </span>
// //             </div>
// //           </div>
// //         </div>

// //         {/* ───────────────────────────────────────────── */}
// //         {/*              LIMIT ORDERS SECTION             */}
// //         {/* ───────────────────────────────────────────── */}
// //         <div
// //           style={{
// //             marginTop: "2rem",
// //             background: "#fff",
// //             borderRadius: "1.25rem",
// //             boxShadow: "0 2px 16px rgba(0,0,0,0.06)",
// //             border: "1px solid #f0f0f0",
// //             overflow: "hidden",
// //           }}
// //         >
// //           {/* ── Section Header ── */}
// //           <div
// //             style={{
// //               display: "flex",
// //               alignItems: "center",
// //               justifyContent: "space-between",
// //               padding: "1.25rem 1.5rem",
// //               borderBottom: "1px solid #f5f5f5",
// //               background: "linear-gradient(135deg, #f8faff 0%, #fff 100%)",
// //             }}
// //           >
// //             <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
// //               {/* Icon Box */}
// //               <div
// //                 style={{
// //                   width: 44,
// //                   height: 44,
// //                   borderRadius: "0.875rem",
// //                   background: "linear-gradient(135deg, #eff6ff, #dbeafe)",
// //                   display: "flex",
// //                   alignItems: "center",
// //                   justifyContent: "center",
// //                   border: "1px solid #bfdbfe",
// //                 }}
// //               >
// //                 <Clock size={20} color="#3b82f6" />
// //               </div>

// //               {/* Title */}
// //               <div>
// //                 <h2
// //                   style={{
// //                     margin: 0,
// //                     fontSize: "1.1rem",
// //                     fontWeight: 700,
// //                     color: "#1e293b",
// //                     lineHeight: 1.3,
// //                   }}
// //                 >
// //                   Limit Orders
// //                 </h2>
// //                 <p
// //                   style={{
// //                     margin: 0,
// //                     fontSize: "0.75rem",
// //                     color: "#94a3b8",
// //                     marginTop: 2,
// //                   }}
// //                 >
// //                   Auto-executes when price hits your target
// //                 </p>
// //               </div>

// //               {/* Active Badge */}
// //               {pendingCount > 0 && (
// //                 <div
// //                   style={{
// //                     display: "flex",
// //                     alignItems: "center",
// //                     gap: 6,
// //                     background: "#fffbeb",
// //                     border: "1px solid #fde68a",
// //                     borderRadius: 999,
// //                     padding: "4px 10px",
// //                   }}
// //                 >
// //                   <span
// //                     style={{
// //                       width: 8,
// //                       height: 8,
// //                       borderRadius: "50%",
// //                       background: "#f59e0b",
// //                       display: "inline-block",
// //                       animation: "pulse 1.5s infinite",
// //                     }}
// //                   />
// //                   <span
// //                     style={{
// //                       fontSize: "0.75rem",
// //                       fontWeight: 700,
// //                       color: "#b45309",
// //                     }}
// //                   >
// //                     {pendingCount} Active
// //                   </span>
// //                 </div>
// //               )}
// //             </div>

// //             {/* Refresh Button */}
// //             <button
// //               onClick={fetchLimitOrders}
// //               style={{
// //                 background: "none",
// //                 border: "1px solid #e2e8f0",
// //                 borderRadius: "0.625rem",
// //                 padding: "6px 14px",
// //                 fontSize: "0.8rem",
// //                 fontWeight: 600,
// //                 color: "#3b82f6",
// //                 cursor: "pointer",
// //                 display: "flex",
// //                 alignItems: "center",
// //                 gap: 4,
// //                 transition: "all 0.2s",
// //               }}
// //               onMouseEnter={(e) => {
// //                 e.target.style.background = "#eff6ff";
// //               }}
// //               onMouseLeave={(e) => {
// //                 e.target.style.background = "none";
// //               }}
// //             >
// //               ↻ Refresh
// //             </button>
// //           </div>

// //           {/* ── Tabs ── */}
// //           <div
// //             style={{
// //               display: "flex",
// //               background: "#f8fafc",
// //               borderBottom: "1px solid #f0f0f0",
// //             }}
// //           >
// //             {[
// //               { key: "ALL",      label: "All Orders" },
// //               { key: "PENDING",  label: "Watching"   },
// //               { key: "EXECUTED", label: "Executed"   },
// //             ].map((tab) => {
// //               const count =
// //                 tab.key === "ALL"
// //                   ? limitOrders.length
// //                   : limitOrders.filter((o) => o.status === tab.key).length;

// //               const isActive = activeTab === tab.key;

// //               return (
// //                 <button
// //                   key={tab.key}
// //                   onClick={() => setActiveTab(tab.key)}
// //                   style={{
// //                     flex: 1,
// //                     padding: "12px 0",
// //                     border: "none",
// //                     borderBottom: isActive
// //                       ? "2.5px solid #3b82f6"
// //                       : "2.5px solid transparent",
// //                     background: isActive ? "#fff" : "transparent",
// //                     cursor: "pointer",
// //                     fontSize: "0.85rem",
// //                     fontWeight: isActive ? 700 : 500,
// //                     color: isActive ? "#3b82f6" : "#94a3b8",
// //                     transition: "all 0.2s",
// //                     display: "flex",
// //                     alignItems: "center",
// //                     justifyContent: "center",
// //                     gap: 8,
// //                   }}
// //                 >
// //                   {tab.label}
// //                   <span
// //                     style={{
// //                       fontSize: "0.7rem",
// //                       fontWeight: 700,
// //                       padding: "2px 8px",
// //                       borderRadius: 999,
// //                       background: isActive ? "#dbeafe" : "#e2e8f0",
// //                       color: isActive ? "#1d4ed8" : "#64748b",
// //                     }}
// //                   >
// //                     {count}
// //                   </span>
// //                 </button>
// //               );
// //             })}
// //           </div>

// //           {/* ── Orders List ── */}
// //           <div
// //             style={{
// //               padding: "1.25rem",
// //               display: "flex",
// //               flexDirection: "column",
// //               gap: "0.75rem",
// //               maxHeight: 460,
// //               overflowY: "auto",
// //             }}
// //           >
// //             {/* Loading Skeleton */}
// //             {limitLoading ? (
// //               [1, 2].map((i) => (
// //                 <div
// //                   key={i}
// //                   style={{
// //                     display: "flex",
// //                     gap: 16,
// //                     padding: 16,
// //                     background: "#f8fafc",
// //                     borderRadius: "1rem",
// //                     border: "1px solid #f0f0f0",
// //                     animation: "pulse 1.5s infinite",
// //                   }}
// //                 >
// //                   <div
// //                     style={{
// //                       width: 44,
// //                       height: 44,
// //                       borderRadius: "0.875rem",
// //                       background: "#e2e8f0",
// //                     }}
// //                   />
// //                   <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 8 }}>
// //                     <div
// //                       style={{ height: 12, background: "#e2e8f0", borderRadius: 6, width: "40%" }}
// //                     />
// //                     <div
// //                       style={{ height: 12, background: "#e2e8f0", borderRadius: 6, width: "60%" }}
// //                     />
// //                     <div
// //                       style={{ height: 12, background: "#e2e8f0", borderRadius: 6, width: "30%" }}
// //                     />
// //                   </div>
// //                 </div>
// //               ))

// //             ) : filteredOrders.length === 0 ? (
// //               /* Empty State */
// //               <div
// //                 style={{
// //                   textAlign: "center",
// //                   padding: "3.5rem 1rem",
// //                 }}
// //               >
// //                 <div
// //                   style={{
// //                     width: 64,
// //                     height: 64,
// //                     borderRadius: "1.25rem",
// //                     background: "#f8fafc",
// //                     border: "1.5px dashed #e2e8f0",
// //                     display: "flex",
// //                     alignItems: "center",
// //                     justifyContent: "center",
// //                     margin: "0 auto 1rem",
// //                   }}
// //                 >
// //                   <Clock size={28} color="#cbd5e1" />
// //                 </div>
// //                 <p
// //                   style={{
// //                     fontWeight: 600,
// //                     color: "#64748b",
// //                     fontSize: "0.95rem",
// //                     margin: 0,
// //                   }}
// //                 >
// //                   No{" "}
// //                   {activeTab !== "ALL" ? activeTab.toLowerCase() + " " : ""}
// //                   limit orders
// //                 </p>
// //                 <p
// //                   style={{
// //                     color: "#94a3b8",
// //                     fontSize: "0.8rem",
// //                     marginTop: 6,
// //                     lineHeight: 1.6,
// //                   }}
// //                 >
// //                   Go to{" "}
// //                   <span style={{ color: "#3b82f6", fontWeight: 600 }}>
// //                     Explore
// //                   </span>{" "}
// //                   → click Buy/Sell →{" "}
// //                   <span style={{ color: "#3b82f6", fontWeight: 600 }}>
// //                     "Limit Order"
// //                   </span>{" "}
// //                   tab
// //                 </p>
// //               </div>

// //             ) : (
// //               /* Order Cards */
// //               filteredOrders.map((order) => {
// //                 const isBuy     = order.orderType === "BUY";
// //                 const isPending = order.status === "PENDING";

// //                 const cardStyles = {
// //                   PENDING:   { bg: "#fffbeb", border: "#fde68a" },
// //                   EXECUTED:  { bg: "#f0fdf4", border: "#bbf7d0" },
// //                   FAILED:    { bg: "#fff1f2", border: "#fecdd3" },
// //                   CANCELLED: { bg: "#f8fafc", border: "#e2e8f0" },
// //                   EXPIRED:   { bg: "#f8fafc", border: "#e2e8f0" },
// //                 }[order.status] || { bg: "#f8fafc", border: "#e2e8f0" };

// //                 const statusColors = {
// //                   PENDING:   { bg: "#fffbeb", text: "#b45309",  border: "#fde68a" },
// //                   EXECUTED:  { bg: "#f0fdf4", text: "#15803d",  border: "#bbf7d0" },
// //                   FAILED:    { bg: "#fff1f2", text: "#be123c",  border: "#fecdd3" },
// //                   CANCELLED: { bg: "#f8fafc", text: "#64748b",  border: "#e2e8f0" },
// //                   EXPIRED:   { bg: "#f8fafc", text: "#94a3b8",  border: "#e2e8f0" },
// //                 }[order.status] || {};

// //                 const statusEmoji = {
// //                   PENDING:   "⏳",
// //                   EXECUTED:  "✅",
// //                   FAILED:    "❌",
// //                   CANCELLED: "✕",
// //                   EXPIRED:   "⏰",
// //                 }[order.status] || "";

// //                 return (
// //                   <div
// //                     key={order.id}
// //                     style={{
// //                       background: cardStyles.bg,
// //                       border: `1.5px solid ${cardStyles.border}`,
// //                       borderRadius: "1rem",
// //                       padding: "1rem 1.125rem",
// //                       display: "flex",
// //                       alignItems: "flex-start",
// //                       gap: "0.875rem",
// //                       transition: "box-shadow 0.2s",
// //                     }}
// //                   >
// //                     {/* Left Icon */}
// //                     <div
// //                       style={{
// //                         width: 44,
// //                         height: 44,
// //                         borderRadius: "0.875rem",
// //                         background: isBuy ? "#dcfce7" : "#fee2e2",
// //                         display: "flex",
// //                         alignItems: "center",
// //                         justifyContent: "center",
// //                         flexShrink: 0,
// //                         marginTop: 2,
// //                         border: isBuy
// //                           ? "1px solid #bbf7d0"
// //                           : "1px solid #fecaca",
// //                       }}
// //                     >
// //                       <TrendingUp
// //                         size={20}
// //                         color={isBuy ? "#16a34a" : "#dc2626"}
// //                         style={{
// //                           transform: isBuy ? "none" : "rotate(180deg)",
// //                         }}
// //                       />
// //                     </div>

// //                     {/* Center Content */}
// //                     <div style={{ flex: 1, minWidth: 0 }}>

// //                       {/* Row 1: BUY/SELL badge + qty + status */}
// //                       <div
// //                         style={{
// //                           display: "flex",
// //                           alignItems: "center",
// //                           gap: 8,
// //                           flexWrap: "wrap",
// //                           marginBottom: 10,
// //                         }}
// //                       >
// //                         {/* BUY / SELL badge */}
// //                         <span
// //                           style={{
// //                             fontSize: "0.7rem",
// //                             fontWeight: 800,
// //                             padding: "3px 10px",
// //                             borderRadius: 999,
// //                             background: isBuy ? "#dcfce7" : "#fee2e2",
// //                             color: isBuy ? "#15803d" : "#dc2626",
// //                             border: isBuy
// //                               ? "1px solid #bbf7d0"
// //                               : "1px solid #fecaca",
// //                             letterSpacing: "0.05em",
// //                           }}
// //                         >
// //                           {order.orderType}
// //                         </span>

// //                         {/* Quantity */}
// //                         <span
// //                           style={{
// //                             fontSize: "0.9rem",
// //                             fontWeight: 700,
// //                             color: "#1e293b",
// //                           }}
// //                         >
// //                           {order.quantity} share
// //                           {order.quantity > 1 ? "s" : ""}
// //                         </span>

// //                         {/* Status badge */}
// //                         <span
// //                           style={{
// //                             fontSize: "0.7rem",
// //                             fontWeight: 700,
// //                             padding: "3px 10px",
// //                             borderRadius: 999,
// //                             background: statusColors.bg,
// //                             color: statusColors.text,
// //                             border: `1px solid ${statusColors.border}`,
// //                           }}
// //                         >
// //                           {statusEmoji} {order.status}
// //                         </span>
// //                       </div>

// //                       {/* Row 2: Price Pills */}
// //                       <div
// //                         style={{
// //                           display: "flex",
// //                           gap: 8,
// //                           flexWrap: "wrap",
// //                           marginBottom: 10,
// //                         }}
// //                       >
// //                         {/* Target */}
// //                         <div
// //                           style={{
// //                             display: "flex",
// //                             alignItems: "center",
// //                             gap: 6,
// //                             background: "#fff",
// //                             border: "1px solid #e2e8f0",
// //                             borderRadius: "0.625rem",
// //                             padding: "6px 12px",
// //                             boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
// //                           }}
// //                         >
// //                           <span style={{ fontSize: "0.7rem", color: "#94a3b8" }}>
// //                             🎯 Target
// //                           </span>
// //                           <span
// //                             style={{
// //                               fontSize: "0.875rem",
// //                               fontWeight: 800,
// //                               color: "#1e293b",
// //                             }}
// //                           >
// //                             ₹
// //                             {order.targetPrice?.toLocaleString("en-IN", {
// //                               minimumFractionDigits: 2,
// //                             })}
// //                           </span>
// //                         </div>

// //                         {/* Market Price */}
// //                         <div
// //                           style={{
// //                             display: "flex",
// //                             alignItems: "center",
// //                             gap: 6,
// //                             background: "#fff",
// //                             border: "1px solid #e2e8f0",
// //                             borderRadius: "0.625rem",
// //                             padding: "6px 12px",
// //                             boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
// //                           }}
// //                         >
// //                           <span style={{ fontSize: "0.7rem", color: "#94a3b8" }}>
// //                             📊 Market
// //                           </span>
// //                           <span
// //                             style={{
// //                               fontSize: "0.875rem",
// //                               fontWeight: 600,
// //                               color: "#475569",
// //                             }}
// //                           >
// //                             ₹
// //                             {order.currentPrice?.toLocaleString("en-IN", {
// //                               minimumFractionDigits: 2,
// //                             })}
// //                           </span>
// //                         </div>

// //                         {/* Est Total */}
// //                         <div
// //                           style={{
// //                             display: "flex",
// //                             alignItems: "center",
// //                             gap: 6,
// //                             background: "#fff",
// //                             border: "1px solid #e2e8f0",
// //                             borderRadius: "0.625rem",
// //                             padding: "6px 12px",
// //                             boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
// //                           }}
// //                         >
// //                           <span style={{ fontSize: "0.7rem", color: "#94a3b8" }}>
// //                             💰 Total
// //                           </span>
// //                           <span
// //                             style={{
// //                               fontSize: "0.875rem",
// //                               fontWeight: 800,
// //                               color: isBuy ? "#15803d" : "#dc2626",
// //                             }}
// //                           >
// //                             ₹
// //                             {(order.quantity * order.targetPrice).toLocaleString(
// //                               "en-IN",
// //                               { minimumFractionDigits: 2 }
// //                             )}
// //                           </span>
// //                         </div>
// //                       </div>

// //                       {/* Row 3: Dates */}
// //                       <div
// //                         style={{
// //                           display: "flex",
// //                           gap: 16,
// //                           flexWrap: "wrap",
// //                           fontSize: "0.75rem",
// //                           color: "#94a3b8",
// //                         }}
// //                       >
// //                         <span>
// //                           🕐 Placed:{" "}
// //                           {new Date(order.createdAt).toLocaleString("en-IN", {
// //                             day: "numeric",
// //                             month: "short",
// //                             year: "numeric",
// //                             hour: "2-digit",
// //                             minute: "2-digit",
// //                           })}
// //                         </span>
// //                         {order.executedAt && (
// //                           <span style={{ color: "#15803d", fontWeight: 600 }}>
// //                             ✅ Executed:{" "}
// //                             {new Date(order.executedAt).toLocaleString("en-IN", {
// //                               day: "numeric",
// //                               month: "short",
// //                               hour: "2-digit",
// //                               minute: "2-digit",
// //                             })}
// //                           </span>
// //                         )}
// //                         {order.expiresAt && isPending && (
// //                           <span style={{ color: "#d97706" }}>
// //                             ⏰ Expires:{" "}
// //                             {new Date(order.expiresAt).toLocaleString("en-IN", {
// //                               day: "numeric",
// //                               month: "short",
// //                               hour: "2-digit",
// //                               minute: "2-digit",
// //                             })}
// //                           </span>
// //                         )}
// //                       </div>

// //                       {/* Failure Reason */}
// //                       {order.failureReason && (
// //                         <div
// //                           style={{
// //                             marginTop: 8,
// //                             fontSize: "0.75rem",
// //                             color: "#be123c",
// //                             background: "#fff1f2",
// //                             border: "1px solid #fecdd3",
// //                             borderRadius: "0.5rem",
// //                             padding: "6px 12px",
// //                           }}
// //                         >
// //                           ❌ {order.failureReason}
// //                         </div>
// //                       )}

// //                       {/* Watching Pulse */}
// //                       {isPending && (
// //                         <div
// //                           style={{
// //                             display: "flex",
// //                             alignItems: "center",
// //                             gap: 6,
// //                             marginTop: 8,
// //                           }}
// //                         >
// //                           <span
// //                             style={{
// //                               width: 8,
// //                               height: 8,
// //                               borderRadius: "50%",
// //                               background: "#f59e0b",
// //                               display: "inline-block",
// //                               animation: "pulse 1.5s infinite",
// //                             }}
// //                           />
// //                           <span
// //                             style={{
// //                               fontSize: "0.75rem",
// //                               color: "#b45309",
// //                               fontWeight: 600,
// //                             }}
// //                           >
// //                             Watching price every 10 seconds...
// //                           </span>
// //                         </div>
// //                       )}
// //                     </div>

// //                     {/* Right: Cancel Button (PENDING only) */}
// //                     {isPending && (
// //                       <button
// //                         onClick={() => handleCancelLimitOrder(order.id)}
// //                         title="Cancel order"
// //                         style={{
// //                           width: 34,
// //                           height: 34,
// //                           borderRadius: "0.625rem",
// //                           border: "1px solid #e2e8f0",
// //                           background: "#fff",
// //                           cursor: "pointer",
// //                           display: "flex",
// //                           alignItems: "center",
// //                           justifyContent: "center",
// //                           flexShrink: 0,
// //                           color: "#94a3b8",
// //                           transition: "all 0.2s",
// //                         }}
// //                         onMouseEnter={(e) => {
// //                           e.currentTarget.style.background = "#fff1f2";
// //                           e.currentTarget.style.borderColor = "#fecdd3";
// //                           e.currentTarget.style.color = "#dc2626";
// //                         }}
// //                         onMouseLeave={(e) => {
// //                           e.currentTarget.style.background = "#fff";
// //                           e.currentTarget.style.borderColor = "#e2e8f0";
// //                           e.currentTarget.style.color = "#94a3b8";
// //                         }}
// //                       >
// //                         <X size={15} />
// //                       </button>
// //                     )}
// //                   </div>
// //                 );
// //               })
// //             )}
// //           </div>
// //         </div>
// //         {/* ───────────────────────────────────────────── */}

// //         {/* Transaction History */}
// //         <div className="wallet-transactions">
// //           <TransactionHistory
// //             transactions={transactions}
// //             loading={txnLoading}
// //           />
// //         </div>
// //       </div>

// //       {/* Add Money Modal */}
// //       <AddMoneyModal
// //         isOpen={showAddMoney}
// //         onClose={() => setShowAddMoney(false)}
// //         onConfirm={handleAddMoney}
// //         loading={addingMoney}
// //       />
// //     </div>
// //   );
// // };

// // export default WalletPage;



// import React, { useEffect, useState } from "react";
// import { jwtDecode } from "jwt-decode";
// import {
//   Wallet, Plus, ArrowLeft, TrendingUp,
//   ShieldCheck, IndianRupee, Clock,
//   CheckCircle, AlertCircle, XCircle, X,
// } from "lucide-react";
// import { Link } from "react-router-dom";
// import ExploreNavbar from "../components/ExploreNavbar";
// import TransactionHistory from "../components/TransactionHistory";
// import AddMoneyModal from "../components/AddMoneyModal";
// import {
//   getWallet, createWallet,
//   addMoneyToWallet, getTransactions,
// } from "../services/WalletService";
// import { getUserLimitOrders, cancelLimitOrder } from "../services/LimitOrderService";

// // ── Same socket service Market.jsx uses ──
// import { connectSocket, disconnectSocket } from "../services/socketService";

// import "../styles/WalletPage.css";

// const WalletPage = () => {
//   const [userId, setUserId]             = useState(null);
//   const [walletData, setWalletData]     = useState(null);
//   const [transactions, setTransactions] = useState([]);
//   const [loading, setLoading]           = useState(true);
//   const [txnLoading, setTxnLoading]     = useState(true);
//   const [showAddMoney, setShowAddMoney] = useState(false);
//   const [addingMoney, setAddingMoney]   = useState(false);
//   const [error, setError]               = useState("");

//   // ── Limit Orders ──
//   const [limitOrders, setLimitOrders]   = useState([]);
//   const [limitLoading, setLimitLoading] = useState(false);
//   const [activeTab, setActiveTab]       = useState("ALL");

//   // ── Live Prices from Socket (same as Market.jsx) ──
//   const [livePrices, setLivePrices] = useState({});

//   // ── Get userId from token ──
//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       try {
//         const decoded = jwtDecode(token);
//         setUserId(decoded.userId || decoded.sub);
//       } catch {
//         setError("Invalid token");
//       }
//     }
//   }, []);

//   useEffect(() => {
//   connectSocket((data) => {
//     console.log("🔴 Socket keys:", Object.keys(data));
//     console.log("🔴 Sample:", Object.entries(data).slice(0, 3));
//     setLivePrices(data);
//   });
//   return () => disconnectSocket();
// }, []);

//   // ── Connect to live price socket ──
//   useEffect(() => {
//     connectSocket((data) => {
//       setLivePrices(data);
//     });
//     return () => disconnectSocket();
//   }, []);

//   // ── Fetch everything on load ──
//   useEffect(() => {
//     if (!userId) return;
//     fetchWallet();
//     fetchTransactions();
//     fetchLimitOrders();

//     const interval = setInterval(fetchLimitOrders, 15000);
//     return () => clearInterval(interval);
//   }, [userId]);

//   const fetchWallet = async () => {
//     try {
//       setLoading(true);
//       const data = await getWallet(userId);
//       setWalletData(data);
//     } catch {
//       try {
//         await createWallet(userId);
//         const data = await getWallet(userId);
//         setWalletData(data);
//       } catch {
//         setError("Failed to load wallet");
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchTransactions = async () => {
//     try {
//       setTxnLoading(true);
//       const data = await getTransactions(userId);
//       setTransactions(data || []);
//     } catch {
//       setTransactions([]);
//     } finally {
//       setTxnLoading(false);
//     }
//   };

//   const fetchLimitOrders = async () => {
//     if (!userId) return;
//     try {
//       setLimitLoading(true);
//       const res = await getUserLimitOrders(userId);
//       setLimitOrders(res.data || []);
//     } catch {
//       setLimitOrders([]);
//     } finally {
//       setLimitLoading(false);
//     }
//   };

//   const handleCancelLimitOrder = async (id) => {
//     try {
//       await cancelLimitOrder(id, userId);
//       fetchLimitOrders();
//       fetchWallet();
//     } catch (err) {
//       alert(err?.response?.data || "Failed to cancel order");
//     }
//   };

//   const handleAddMoney = async (amount) => {
//     if (!userId) return;
//     try {
//       setAddingMoney(true);
//       await addMoneyToWallet(userId, amount);
//       await fetchWallet();
//       await fetchTransactions();
//       setShowAddMoney(false);
//     } catch (err) {
//       alert("Failed: " + (typeof err === "string" ? err : err.message || err));
//     } finally {
//       setAddingMoney(false);
//     }
//   };

//   const balance          = walletData?.balance || 0;
//   const minBalance       = walletData?.minBalance || 0;
//   const availableBalance = Math.max(0, balance - minBalance);

//   const filteredOrders = limitOrders.filter((o) => {
//     if (activeTab === "ALL")      return true;
//     if (activeTab === "PENDING")  return o.status === "PENDING";
//     if (activeTab === "EXECUTED") return o.status === "EXECUTED";
//     return true;
//   });

//   const pendingCount = limitOrders.filter((o) => o.status === "PENDING").length;

//   // ── Helper: get live price for a limit order ──
//   // Socket sends prices by company NAME or CODE
//   // Match however your socket sends it
//  const getLivePrice = (order) => {
//   if (!livePrices || Object.keys(livePrices).length === 0) return null;

//   // Try all possible key formats
//   return (
//     livePrices[order.companyName]           ||  // "RELIANCE"
//     livePrices[order.companyCode]           ||  // "REL"
//     livePrices[String(order.companyId)]     ||  // "1"
//     livePrices[Number(order.companyId)]     ||  // 1
//     null
//   );
// };

//   // ── Progress bar: how close is live price to target ──
//   const getPriceProgress = (order, livePrice) => {
//     if (!livePrice) return null;

//     const isBuy  = order.orderType === "BUY";
//     const target = order.targetPrice;
//     const start  = order.currentPrice;

//     if (isBuy) {
//       // BUY: price needs to DROP from start → target
//       // progress = how much it has dropped
//       if (start <= target) return 100;
//       const progress = ((start - livePrice) / (start - target)) * 100;
//       return Math.min(100, Math.max(0, progress));
//     } else {
//       // SELL: price needs to RISE from start → target
//       if (start >= target) return 100;
//       const progress = ((livePrice - start) / (target - start)) * 100;
//       return Math.min(100, Math.max(0, progress));
//     }
//   };

//   return (
//     <div className="wallet-page">
//       <ExploreNavbar />

//       {/* Banner */}
//       <div className="wallet-banner">
//         <div className="wallet-banner-content">
//           <Link to="/explore" className="wallet-back-link">
//             <ArrowLeft size={16} />
//             Back to Explore
//           </Link>
//           <h1><Wallet size={28} /> My Wallet</h1>
//           <p>Manage your funds and view transaction history</p>
//         </div>
//       </div>

//       <div className="wallet-content">
//         {error && <div className="wallet-error">⚠️ {error}</div>}

//         {/* ── Balance Cards ── */}
//         <div className="wallet-cards">
//           <div className="wallet-card balance-card">
//             <div className="wallet-card-icon balance-icon">
//               <IndianRupee size={24} />
//             </div>
//             <div className="wallet-card-info">
//               <span className="wallet-card-label">Total Balance</span>
//               <span className="wallet-card-value">
//                 {loading ? "Loading..." : `₹${Number(balance).toLocaleString("en-IN", {
//                   minimumFractionDigits: 2, maximumFractionDigits: 2,
//                 })}`}
//               </span>
//             </div>
//             <button className="wallet-add-btn" onClick={() => setShowAddMoney(true)}>
//               <Plus size={18} /> Add Money
//             </button>
//           </div>

//           <div className="wallet-card available-card">
//             <div className="wallet-card-icon available-icon">
//               <TrendingUp size={24} />
//             </div>
//             <div className="wallet-card-info">
//               <span className="wallet-card-label">Available for Trading</span>
//               <span className="wallet-card-value">
//                 {loading ? "Loading..." : `₹${Number(availableBalance).toLocaleString("en-IN", {
//                   minimumFractionDigits: 2, maximumFractionDigits: 2,
//                 })}`}
//               </span>
//             </div>
//           </div>

//           <div className="wallet-card min-card">
//             <div className="wallet-card-icon min-icon">
//               <ShieldCheck size={24} />
//             </div>
//             <div className="wallet-card-info">
//               <span className="wallet-card-label">Minimum Balance</span>
//               <span className="wallet-card-value">
//                 ₹{Number(minBalance).toLocaleString("en-IN", {
//                   minimumFractionDigits: 2, maximumFractionDigits: 2,
//                 })}
//               </span>
//             </div>
//           </div>
//         </div>

//         {/* ───────────────────────────────────── */}
//         {/*         LIMIT ORDERS SECTION          */}
//         {/* ───────────────────────────────────── */}
//         <div style={{
//           marginTop: "2rem",
//           background: "#fff",
//           borderRadius: "1.25rem",
//           boxShadow: "0 2px 16px rgba(0,0,0,0.06)",
//           border: "1px solid #f0f0f0",
//           overflow: "hidden",
//         }}>

//           {/* Header */}
//           <div style={{
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "space-between",
//             padding: "1.25rem 1.5rem",
//             borderBottom: "1px solid #f5f5f5",
//             background: "linear-gradient(135deg, #f8faff 0%, #fff 100%)",
//           }}>
//             <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
//               {/* Icon */}
//               <div style={{
//                 width: 44, height: 44,
//                 borderRadius: "0.875rem",
//                 background: "linear-gradient(135deg, #eff6ff, #dbeafe)",
//                 display: "flex", alignItems: "center", justifyContent: "center",
//                 border: "1px solid #bfdbfe",
//               }}>
//                 <Clock size={20} color="#3b82f6" />
//               </div>

//               {/* Title */}
//               <div>
//                 <h2 style={{ margin: 0, fontSize: "1.1rem", fontWeight: 700, color: "#1e293b" }}>
//                   Limit Orders
//                 </h2>
//                 <p style={{ margin: 0, fontSize: "0.75rem", color: "#94a3b8", marginTop: 2 }}>
//                   Auto-executes when price hits your target
//                 </p>
//               </div>

//               {/* Live badge */}
//               <div style={{
//                 display: "flex", alignItems: "center", gap: 5,
//                 background: "#f0fdf4", border: "1px solid #bbf7d0",
//                 borderRadius: 999, padding: "3px 10px",
//               }}>
//                 <span style={{
//                   width: 7, height: 7, borderRadius: "50%",
//                   background: "#22c55e", display: "inline-block",
//                   animation: "pulse 1.5s infinite",
//                 }} />
//                 <span style={{ fontSize: "0.7rem", fontWeight: 700, color: "#15803d" }}>
//                   LIVE
//                 </span>
//               </div>

//               {/* Active badge */}
//               {pendingCount > 0 && (
//                 <div style={{
//                   display: "flex", alignItems: "center", gap: 6,
//                   background: "#fffbeb", border: "1px solid #fde68a",
//                   borderRadius: 999, padding: "4px 10px",
//                 }}>
//                   <span style={{
//                     width: 8, height: 8, borderRadius: "50%",
//                     background: "#f59e0b", display: "inline-block",
//                     animation: "pulse 1.5s infinite",
//                   }} />
//                   <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "#b45309" }}>
//                     {pendingCount} Active
//                   </span>
//                 </div>
//               )}
//             </div>

//             {/* Refresh */}
//             <button
//               onClick={fetchLimitOrders}
//               style={{
//                 background: "none", border: "1px solid #e2e8f0",
//                 borderRadius: "0.625rem", padding: "6px 14px",
//                 fontSize: "0.8rem", fontWeight: 600,
//                 color: "#3b82f6", cursor: "pointer",
//               }}
//             >
//               ↻ Refresh
//             </button>
//           </div>

//           {/* Tabs */}
//           <div style={{ display: "flex", background: "#f8fafc", borderBottom: "1px solid #f0f0f0" }}>
//             {[
//               { key: "ALL",      label: "All Orders" },
//               { key: "PENDING",  label: "Watching"   },
//               { key: "EXECUTED", label: "Executed"   },
//             ].map((tab) => {
//               const count = tab.key === "ALL"
//                 ? limitOrders.length
//                 : limitOrders.filter((o) => o.status === tab.key).length;
//               const isActive = activeTab === tab.key;

//               return (
//                 <button
//                   key={tab.key}
//                   onClick={() => setActiveTab(tab.key)}
//                   style={{
//                     flex: 1, padding: "12px 0",
//                     border: "none",
//                     borderBottom: isActive ? "2.5px solid #3b82f6" : "2.5px solid transparent",
//                     background: isActive ? "#fff" : "transparent",
//                     cursor: "pointer",
//                     fontSize: "0.85rem",
//                     fontWeight: isActive ? 700 : 500,
//                     color: isActive ? "#3b82f6" : "#94a3b8",
//                     transition: "all 0.2s",
//                     display: "flex", alignItems: "center",
//                     justifyContent: "center", gap: 8,
//                   }}
//                 >
//                   {tab.label}
//                   <span style={{
//                     fontSize: "0.7rem", fontWeight: 700,
//                     padding: "2px 8px", borderRadius: 999,
//                     background: isActive ? "#dbeafe" : "#e2e8f0",
//                     color: isActive ? "#1d4ed8" : "#64748b",
//                   }}>
//                     {count}
//                   </span>
//                 </button>
//               );
//             })}
//           </div>

//           {/* Orders List */}
//           <div style={{
//             padding: "1.25rem",
//             display: "flex", flexDirection: "column", gap: "0.75rem",
//             maxHeight: 520, overflowY: "auto",
//           }}>

//             {/* Loading Skeleton */}
//             {limitLoading ? (
//               [1, 2].map((i) => (
//                 <div key={i} style={{
//                   display: "flex", gap: 16, padding: 16,
//                   background: "#f8fafc", borderRadius: "1rem",
//                   border: "1px solid #f0f0f0",
//                 }}>
//                   <div style={{ width: 44, height: 44, borderRadius: "0.875rem", background: "#e2e8f0" }} />
//                   <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 8 }}>
//                     <div style={{ height: 12, background: "#e2e8f0", borderRadius: 6, width: "40%" }} />
//                     <div style={{ height: 12, background: "#e2e8f0", borderRadius: 6, width: "60%" }} />
//                     <div style={{ height: 12, background: "#e2e8f0", borderRadius: 6, width: "30%" }} />
//                   </div>
//                 </div>
//               ))

//             ) : filteredOrders.length === 0 ? (
//               /* Empty State */
//               <div style={{ textAlign: "center", padding: "3.5rem 1rem" }}>
//                 <div style={{
//                   width: 64, height: 64, borderRadius: "1.25rem",
//                   background: "#f8fafc", border: "1.5px dashed #e2e8f0",
//                   display: "flex", alignItems: "center", justifyContent: "center",
//                   margin: "0 auto 1rem",
//                 }}>
//                   <Clock size={28} color="#cbd5e1" />
//                 </div>
//                 <p style={{ fontWeight: 600, color: "#64748b", fontSize: "0.95rem", margin: 0 }}>
//                   No {activeTab !== "ALL" ? activeTab.toLowerCase() + " " : ""}limit orders
//                 </p>
//                 <p style={{ color: "#94a3b8", fontSize: "0.8rem", marginTop: 6, lineHeight: 1.6 }}>
//                   Go to{" "}
//                   <span style={{ color: "#3b82f6", fontWeight: 600 }}>Explore</span>
//                   {" "}→ click Buy/Sell →{" "}
//                   <span style={{ color: "#3b82f6", fontWeight: 600 }}>"Limit Order"</span> tab
//                 </p>
//               </div>

//             ) : (
//               filteredOrders.map((order) => {
//                 const isBuy     = order.orderType === "BUY";
//                 const isPending = order.status === "PENDING";

//                 // ── Live price from socket ──
//                 const livePrice = getLivePrice(order);
//                 const progress  = isPending ? getPriceProgress(order, livePrice) : null;

//                 // ── How far from target ──
//                 const gap = livePrice
//                   ? (order.targetPrice - livePrice).toFixed(2)
//                   : null;

//                 const cardStyles = {
//                   PENDING:   { bg: "#fffbeb", border: "#fde68a" },
//                   EXECUTED:  { bg: "#f0fdf4", border: "#bbf7d0" },
//                   FAILED:    { bg: "#fff1f2", border: "#fecdd3" },
//                   CANCELLED: { bg: "#f8fafc", border: "#e2e8f0" },
//                   EXPIRED:   { bg: "#f8fafc", border: "#e2e8f0" },
//                 }[order.status] || { bg: "#f8fafc", border: "#e2e8f0" };

//                 const statusColors = {
//                   PENDING:   { bg: "#fffbeb", text: "#b45309",  border: "#fde68a"  },
//                   EXECUTED:  { bg: "#f0fdf4", text: "#15803d",  border: "#bbf7d0"  },
//                   FAILED:    { bg: "#fff1f2", text: "#be123c",  border: "#fecdd3"  },
//                   CANCELLED: { bg: "#f8fafc", text: "#64748b",  border: "#e2e8f0"  },
//                   EXPIRED:   { bg: "#f8fafc", text: "#94a3b8",  border: "#e2e8f0"  },
//                 }[order.status] || {};

//                 const statusEmoji = {
//                   PENDING:   "⏳", EXECUTED: "✅",
//                   FAILED:    "❌", CANCELLED: "✕", EXPIRED: "⏰",
//                 }[order.status] || "";

//                 return (
//                   <div
//                     key={order.id}
//                     style={{
//                       background: cardStyles.bg,
//                       border: `1.5px solid ${cardStyles.border}`,
//                       borderRadius: "1rem",
//                       padding: "1rem 1.125rem",
//                       transition: "box-shadow 0.2s",
//                     }}
//                   >
//                     <div style={{ display: "flex", alignItems: "flex-start", gap: "0.875rem" }}>

//                       {/* Left Icon */}
//                       <div style={{
//                         width: 44, height: 44, borderRadius: "0.875rem",
//                         background: isBuy ? "#dcfce7" : "#fee2e2",
//                         display: "flex", alignItems: "center", justifyContent: "center",
//                         flexShrink: 0, marginTop: 2,
//                         border: isBuy ? "1px solid #bbf7d0" : "1px solid #fecaca",
//                       }}>
//                         <TrendingUp
//                           size={20}
//                           color={isBuy ? "#16a34a" : "#dc2626"}
//                           style={{ transform: isBuy ? "none" : "rotate(180deg)" }}
//                         />
//                       </div>

//                       {/* Content */}
//                       <div style={{ flex: 1, minWidth: 0 }}>

//                         {/* Row 1: badges */}
//                         <div style={{
//                           display: "flex", alignItems: "center",
//                           gap: 8, flexWrap: "wrap", marginBottom: 10,
//                         }}>
//                           <span style={{
//                             fontSize: "0.7rem", fontWeight: 800,
//                             padding: "3px 10px", borderRadius: 999,
//                             background: isBuy ? "#dcfce7" : "#fee2e2",
//                             color: isBuy ? "#15803d" : "#dc2626",
//                             border: isBuy ? "1px solid #bbf7d0" : "1px solid #fecaca",
//                             letterSpacing: "0.05em",
//                           }}>
//                             {order.orderType}
//                           </span>
//                           <span style={{ fontSize: "0.9rem", fontWeight: 700, color: "#1e293b" }}>
//                             {order.quantity} share{order.quantity > 1 ? "s" : ""}
//                           </span>
//                           <span style={{
//                             fontSize: "0.7rem", fontWeight: 700,
//                             padding: "3px 10px", borderRadius: 999,
//                             background: statusColors.bg,
//                             color: statusColors.text,
//                             border: `1px solid ${statusColors.border}`,
//                           }}>
//                             {statusEmoji} {order.status}
//                           </span>
//                         </div>

//                         {/* Row 2: Price Pills */}
//                         <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 10 }}>

//                           {/* Target */}
//                           <div style={{
//                             display: "flex", alignItems: "center", gap: 6,
//                             background: "#fff", border: "1px solid #e2e8f0",
//                             borderRadius: "0.625rem", padding: "6px 12px",
//                             boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
//                           }}>
//                             <span style={{ fontSize: "0.7rem", color: "#94a3b8" }}>🎯 Target</span>
//                             <span style={{ fontSize: "0.875rem", fontWeight: 800, color: "#1e293b" }}>
//                               ₹{order.targetPrice?.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
//                             </span>
//                           </div>

//                           {/* Live Price pill — updates in real time */}
//                           <div style={{
//                             display: "flex", alignItems: "center", gap: 6,
//                             background: "#fff",
//                             border: livePrice
//                               ? "1px solid #a5f3fc"
//                               : "1px solid #e2e8f0",
//                             borderRadius: "0.625rem", padding: "6px 12px",
//                             boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
//                           }}>
//                             <span style={{ fontSize: "0.7rem", color: "#94a3b8" }}>
//                               {livePrice ? "📡 Live" : "📊 Market"}
//                             </span>
//                             <span style={{
//                               fontSize: "0.875rem", fontWeight: 700,
//                               color: livePrice ? "#0891b2" : "#475569",
//                             }}>
//                               {livePrice
//                                 ? `₹${Number(livePrice).toLocaleString("en-IN", { minimumFractionDigits: 2 })}`
//                                 : `₹${order.currentPrice?.toLocaleString("en-IN", { minimumFractionDigits: 2 })}`
//                               }
//                             </span>
//                             {/* Live dot */}
//                             {livePrice && (
//                               <span style={{
//                                 width: 6, height: 6, borderRadius: "50%",
//                                 background: "#22d3ee", display: "inline-block",
//                                 animation: "pulse 1s infinite",
//                               }} />
//                             )}
//                           </div>

//                           {/* Est Total */}
//                           <div style={{
//                             display: "flex", alignItems: "center", gap: 6,
//                             background: "#fff", border: "1px solid #e2e8f0",
//                             borderRadius: "0.625rem", padding: "6px 12px",
//                             boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
//                           }}>
//                             <span style={{ fontSize: "0.7rem", color: "#94a3b8" }}>💰 Total</span>
//                             <span style={{
//                               fontSize: "0.875rem", fontWeight: 800,
//                               color: isBuy ? "#15803d" : "#dc2626",
//                             }}>
//                               ₹{(order.quantity * order.targetPrice).toLocaleString("en-IN", {
//                                 minimumFractionDigits: 2,
//                               })}
//                             </span>
//                           </div>
//                         </div>

//                         {/* ── Progress Bar (PENDING only) ── */}
//                         {isPending && livePrice && progress !== null && (
//                           <div style={{ marginBottom: 10 }}>
//                             {/* Label */}
//                             <div style={{
//                               display: "flex", justifyContent: "space-between",
//                               marginBottom: 4,
//                             }}>
//                               <span style={{ fontSize: "0.72rem", color: "#64748b", fontWeight: 600 }}>
//                                 {isBuy ? "Price needs to DROP" : "Price needs to RISE"} to target
//                               </span>
//                               <span style={{
//                                 fontSize: "0.72rem", fontWeight: 700,
//                                 color: progress >= 80
//                                   ? "#16a34a"
//                                   : progress >= 40
//                                   ? "#d97706"
//                                   : "#64748b",
//                               }}>
//                                 {progress.toFixed(0)}% there
//                               </span>
//                             </div>

//                             {/* Bar */}
//                             <div style={{
//                               width: "100%", height: 8,
//                               background: "#e2e8f0", borderRadius: 999,
//                               overflow: "hidden",
//                             }}>
//                               <div style={{
//                                 width: `${progress}%`, height: "100%",
//                                 borderRadius: 999,
//                                 background: progress >= 80
//                                   ? "#22c55e"
//                                   : progress >= 40
//                                   ? "#f59e0b"
//                                   : "#60a5fa",
//                                 transition: "width 0.5s ease",
//                               }} />
//                             </div>

//                             {/* Gap to target */}
//                             <div style={{
//                               marginTop: 4, fontSize: "0.72rem",
//                               color: "#94a3b8",
//                             }}>
//                               {isBuy
//                                 ? `₹${Math.abs(gap)} away from target ${
//                                     Number(gap) > 0 ? "(price needs to fall)" : "🎯 Target hit!"
//                                   }`
//                                 : `₹${Math.abs(gap)} away from target ${
//                                     Number(gap) < 0 ? "(price needs to rise)" : "🎯 Target hit!"
//                                   }`
//                               }
//                             </div>
//                           </div>
//                         )}

//                         {/* Row 3: Dates */}
//                         <div style={{
//                           display: "flex", gap: 16, flexWrap: "wrap",
//                           fontSize: "0.75rem", color: "#94a3b8",
//                         }}>
//                           <span>
//                             🕐 Placed: {new Date(order.createdAt).toLocaleString("en-IN", {
//                               day: "numeric", month: "short",
//                               year: "numeric", hour: "2-digit", minute: "2-digit",
//                             })}
//                           </span>
//                           {order.executedAt && (
//                             <span style={{ color: "#15803d", fontWeight: 600 }}>
//                               ✅ Executed: {new Date(order.executedAt).toLocaleString("en-IN", {
//                                 day: "numeric", month: "short",
//                                 hour: "2-digit", minute: "2-digit",
//                               })}
//                             </span>
//                           )}
//                           {order.expiresAt && isPending && (
//                             <span style={{ color: "#d97706" }}>
//                               ⏰ Expires: {new Date(order.expiresAt).toLocaleString("en-IN", {
//                                 day: "numeric", month: "short",
//                                 hour: "2-digit", minute: "2-digit",
//                               })}
//                             </span>
//                           )}
//                         </div>

//                         {/* Failure Reason */}
//                         {order.failureReason && (
//                           <div style={{
//                             marginTop: 8, fontSize: "0.75rem",
//                             color: "#be123c", background: "#fff1f2",
//                             border: "1px solid #fecdd3",
//                             borderRadius: "0.5rem", padding: "6px 12px",
//                           }}>
//                             ❌ {order.failureReason}
//                           </div>
//                         )}

//                         {/* Watching pulse */}
//                         {isPending && (
//                           <div style={{
//                             display: "flex", alignItems: "center",
//                             gap: 6, marginTop: 8,
//                           }}>
//                             <span style={{
//                               width: 8, height: 8, borderRadius: "50%",
//                               background: "#f59e0b", display: "inline-block",
//                               animation: "pulse 1.5s infinite",
//                             }} />
//                             <span style={{ fontSize: "0.75rem", color: "#b45309", fontWeight: 600 }}>
//                               Watching live price every second...
//                             </span>
//                           </div>
//                         )}
//                       </div>

//                       {/* Cancel Button */}
//                       {isPending && (
//                         <button
//                           onClick={() => handleCancelLimitOrder(order.id)}
//                           title="Cancel order"
//                           style={{
//                             width: 34, height: 34, borderRadius: "0.625rem",
//                             border: "1px solid #e2e8f0", background: "#fff",
//                             cursor: "pointer", display: "flex",
//                             alignItems: "center", justifyContent: "center",
//                             flexShrink: 0, color: "#94a3b8", transition: "all 0.2s",
//                           }}
//                           onMouseEnter={(e) => {
//                             e.currentTarget.style.background = "#fff1f2";
//                             e.currentTarget.style.borderColor = "#fecdd3";
//                             e.currentTarget.style.color = "#dc2626";
//                           }}
//                           onMouseLeave={(e) => {
//                             e.currentTarget.style.background = "#fff";
//                             e.currentTarget.style.borderColor = "#e2e8f0";
//                             e.currentTarget.style.color = "#94a3b8";
//                           }}
//                         >
//                           <X size={15} />
//                         </button>
//                       )}
//                     </div>
//                   </div>
//                 );
//               })
//             )}
//           </div>
//         </div>
//         {/* ───────────────────────────────────── */}

//         {/* Transaction History */}
//         <div className="wallet-transactions">
//           <TransactionHistory transactions={transactions} loading={txnLoading} />
//         </div>
//       </div>

//       <AddMoneyModal
//         isOpen={showAddMoney}
//         onClose={() => setShowAddMoney(false)}
//         onConfirm={handleAddMoney}
//         loading={addingMoney}
//       />
//     </div>
//   );
// };

// export default WalletPage;



import React, { useEffect, useState, useRef } from "react";
import { jwtDecode } from "jwt-decode";
import {
  Wallet,
  Plus,
  ArrowLeft,
  TrendingUp,
  ShieldCheck,
  IndianRupee,
  Clock,
  X,
} from "lucide-react";
import { Link } from "react-router-dom";
import ExploreNavbar from "../components/ExploreNavbar";
import TransactionHistory from "../components/TransactionHistory";
import AddMoneyModal from "../components/AddMoneyModal";
import {
  getWallet,
  createWallet,
  addMoneyToWallet,
  getTransactions,
} from "../services/WalletService";
import {
  getUserLimitOrders,
  cancelLimitOrder,
} from "../services/LimitOrderService";
import {
  connectSocket,
  unsubscribeSocket,
} from "../services/socketService";
import "../styles/WalletPage.css";

const WalletPage = () => {
  const [userId, setUserId]             = useState(null);
  const [walletData, setWalletData]     = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading]           = useState(true);
  const [txnLoading, setTxnLoading]     = useState(true);
  const [showAddMoney, setShowAddMoney] = useState(false);
  const [addingMoney, setAddingMoney]   = useState(false);
  const [error, setError]               = useState("");

  // ── Limit Orders ──
  const [limitOrders, setLimitOrders]   = useState([]);
  const [limitLoading, setLimitLoading] = useState(false);
  const [activeTab, setActiveTab]       = useState("ALL");

  // ── Live Prices from Socket ──
  const [livePrices, setLivePrices] = useState({});
  const socketIdRef                 = useRef(null);

  // ── Get userId from token ──
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUserId(decoded.userId || decoded.sub);
      } catch {
        setError("Invalid token");
      }
    }
  }, []);

  // ── Connect Socket ──
  useEffect(() => {
    socketIdRef.current = connectSocket((data) => {
      setLivePrices(data);
    });

    return () => unsubscribeSocket(socketIdRef.current);
  }, []);

  // ── Fetch data when userId is ready ──
  useEffect(() => {
    if (!userId) return;
    fetchWallet();
    fetchTransactions();
    fetchLimitOrders();

    // Poll limit orders every 15s
    const interval = setInterval(fetchLimitOrders, 15000);
    return () => clearInterval(interval);
  }, [userId]);

  const fetchWallet = async () => {
    try {
      setLoading(true);
      const data = await getWallet(userId);
      setWalletData(data);
    } catch {
      try {
        await createWallet(userId);
        const data = await getWallet(userId);
        setWalletData(data);
      } catch {
        setError("Failed to load wallet");
      }
    } finally {
      setLoading(false);
    }
  };

  const fetchTransactions = async () => {
    try {
      setTxnLoading(true);
      const data = await getTransactions(userId);
      setTransactions(data || []);
    } catch {
      setTransactions([]);
    } finally {
      setTxnLoading(false);
    }
  };

  const fetchLimitOrders = async () => {
    if (!userId) return;
    try {
      setLimitLoading(true);
      const res = await getUserLimitOrders(userId);
      setLimitOrders(res.data || []);
    } catch {
      setLimitOrders([]);
    } finally {
      setLimitLoading(false);
    }
  };

  const handleCancelLimitOrder = async (id) => {
    try {
      await cancelLimitOrder(id, userId);
      fetchLimitOrders();
      fetchWallet();
    } catch (err) {
      alert(err?.response?.data || "Failed to cancel order");
    }
  };

  const handleAddMoney = async (amount) => {
    if (!userId) return;
    try {
      setAddingMoney(true);
      await addMoneyToWallet(userId, amount);
      await fetchWallet();
      await fetchTransactions();
      setShowAddMoney(false);
    } catch (err) {
      alert("Failed: " + (typeof err === "string" ? err : err.message || err));
    } finally {
      setAddingMoney(false);
    }
  };

  const balance          = walletData?.balance || 0;
  const minBalance       = walletData?.minBalance || 0;
  const availableBalance = Math.max(0, balance - minBalance);

  // ── Filter limit orders by tab ──
  const filteredOrders = limitOrders.filter((o) => {
    if (activeTab === "ALL")      return true;
    if (activeTab === "PENDING")  return o.status === "PENDING";
    if (activeTab === "EXECUTED") return o.status === "EXECUTED";
    return true;
  });

  const pendingCount = limitOrders.filter((o) => o.status === "PENDING").length;

  // ── Get live price for an order ──
  const getLivePrice = (order) => {
    if (!livePrices || Object.keys(livePrices).length === 0) return null;
    return (
      livePrices[order.companyName]       ||
      livePrices[order.companyCode]       ||
      livePrices[String(order.companyId)] ||
      null
    );
  };

  // ── Progress: how close is live price to target ──
  const getPriceProgress = (order, livePrice) => {
    if (!livePrice) return null;
    const isBuy   = order.orderType === "BUY";
    const target  = order.targetPrice;
    const start   = order.currentPrice;

    if (isBuy) {
      if (start <= target) return 100;
      const progress = ((start - livePrice) / (start - target)) * 100;
      return Math.min(100, Math.max(0, progress));
    } else {
      if (start >= target) return 100;
      const progress = ((livePrice - start) / (target - start)) * 100;
      return Math.min(100, Math.max(0, progress));
    }
  };

  return (
    <div className="wallet-page">
      <ExploreNavbar />

      {/* ── Banner ── */}
      <div className="wallet-banner">
        <div className="wallet-banner-content">
          <Link to="/explore" className="wallet-back-link">
            <ArrowLeft size={16} />
            Back to Explore
          </Link>
          <h1>
            <Wallet size={28} />
            My Wallet
          </h1>
          <p>Manage your funds and view transaction history</p>
        </div>
      </div>

      {/* ── Content ── */}
      <div className="wallet-content">
        {error && <div className="wallet-error">⚠️ {error}</div>}

        {/* ── Balance Cards ── */}
        <div className="wallet-cards">

          {/* Total Balance */}
          <div className="wallet-card balance-card">
            <div className="wallet-card-icon balance-icon">
              <IndianRupee size={24} />
            </div>
            <div className="wallet-card-info">
              <span className="wallet-card-label">Total Balance</span>
              <span className="wallet-card-value">
                {loading
                  ? "Loading..."
                  : `₹${Number(balance).toLocaleString("en-IN", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}`}
              </span>
            </div>
            <button
              className="wallet-add-btn"
              onClick={() => setShowAddMoney(true)}
            >
              <Plus size={18} />
              Add Money
            </button>
          </div>

          {/* Available for Trading */}
          <div className="wallet-card available-card">
            <div className="wallet-card-icon available-icon">
              <TrendingUp size={24} />
            </div>
            <div className="wallet-card-info">
              <span className="wallet-card-label">Available for Trading</span>
              <span className="wallet-card-value">
                {loading
                  ? "Loading..."
                  : `₹${Number(availableBalance).toLocaleString("en-IN", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}`}
              </span>
            </div>
          </div>

          {/* Minimum Balance */}
          <div className="wallet-card min-card">
            <div className="wallet-card-icon min-icon">
              <ShieldCheck size={24} />
            </div>
            <div className="wallet-card-info">
              <span className="wallet-card-label">Minimum Balance</span>
              <span className="wallet-card-value">
                ₹{Number(minBalance).toLocaleString("en-IN", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </span>
            </div>
          </div>
        </div>

        {/* ───────────────────────────────────── */}
        {/*         LIMIT ORDERS SECTION          */}
        {/* ───────────────────────────────────── */}
        <div
          style={{
            marginTop: "2rem",
            background: "#fff",
            borderRadius: "1.25rem",
            boxShadow: "0 2px 16px rgba(0,0,0,0.06)",
            border: "1px solid #f0f0f0",
            overflow: "hidden",
          }}
        >
          {/* ── Section Header ── */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "1.25rem 1.5rem",
              borderBottom: "1px solid #f5f5f5",
              background: "linear-gradient(135deg, #f8faff 0%, #fff 100%)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>

              {/* Icon */}
              <div
                style={{
                  width: 44, height: 44,
                  borderRadius: "0.875rem",
                  background: "linear-gradient(135deg, #eff6ff, #dbeafe)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  border: "1px solid #bfdbfe",
                }}
              >
                <Clock size={20} color="#3b82f6" />
              </div>

              {/* Title */}
              <div>
                <h2
                  style={{
                    margin: 0, fontSize: "1.1rem",
                    fontWeight: 700, color: "#1e293b", lineHeight: 1.3,
                  }}
                >
                  Limit Orders
                </h2>
                <p style={{ margin: 0, fontSize: "0.75rem", color: "#94a3b8", marginTop: 2 }}>
                  Auto-executes when price hits your target
                </p>
              </div>

              {/* Live Badge */}
              <div
                style={{
                  display: "flex", alignItems: "center", gap: 5,
                  background: "#f0fdf4", border: "1px solid #bbf7d0",
                  borderRadius: 999, padding: "3px 10px",
                }}
              >
                <span
                  style={{
                    width: 7, height: 7, borderRadius: "50%",
                    background: "#22c55e", display: "inline-block",
                    animation: "pulse 1.5s infinite",
                  }}
                />
                <span style={{ fontSize: "0.7rem", fontWeight: 700, color: "#15803d" }}>
                  LIVE
                </span>
              </div>

              {/* Active Badge */}
              {pendingCount > 0 && (
                <div
                  style={{
                    display: "flex", alignItems: "center", gap: 6,
                    background: "#fffbeb", border: "1px solid #fde68a",
                    borderRadius: 999, padding: "4px 10px",
                  }}
                >
                  <span
                    style={{
                      width: 8, height: 8, borderRadius: "50%",
                      background: "#f59e0b", display: "inline-block",
                      animation: "pulse 1.5s infinite",
                    }}
                  />
                  <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "#b45309" }}>
                    {pendingCount} Active
                  </span>
                </div>
              )}
            </div>

            {/* Refresh Button */}
            <button
              onClick={fetchLimitOrders}
              style={{
                background: "none",
                border: "1px solid #e2e8f0",
                borderRadius: "0.625rem",
                padding: "6px 14px",
                fontSize: "0.8rem",
                fontWeight: 600,
                color: "#3b82f6",
                cursor: "pointer",
              }}
            >
              ↻ Refresh
            </button>
          </div>

          {/* ── Tabs ── */}
          <div
            style={{
              display: "flex",
              background: "#f8fafc",
              borderBottom: "1px solid #f0f0f0",
            }}
          >
            {[
              { key: "ALL",      label: "All Orders" },
              { key: "PENDING",  label: "Watching"   },
              { key: "EXECUTED", label: "Executed"   },
            ].map((tab) => {
              const count =
                tab.key === "ALL"
                  ? limitOrders.length
                  : limitOrders.filter((o) => o.status === tab.key).length;
              const isActive = activeTab === tab.key;

              return (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  style={{
                    flex: 1, padding: "12px 0",
                    border: "none",
                    borderBottom: isActive
                      ? "2.5px solid #3b82f6"
                      : "2.5px solid transparent",
                    background: isActive ? "#fff" : "transparent",
                    cursor: "pointer",
                    fontSize: "0.85rem",
                    fontWeight: isActive ? 700 : 500,
                    color: isActive ? "#3b82f6" : "#94a3b8",
                    transition: "all 0.2s",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 8,
                  }}
                >
                  {tab.label}
                  <span
                    style={{
                      fontSize: "0.7rem", fontWeight: 700,
                      padding: "2px 8px", borderRadius: 999,
                      background: isActive ? "#dbeafe" : "#e2e8f0",
                      color: isActive ? "#1d4ed8" : "#64748b",
                    }}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* ── Orders List ── */}
          <div
            style={{
              padding: "1.25rem",
              display: "flex",
              flexDirection: "column",
              gap: "0.75rem",
              maxHeight: 520,
              overflowY: "auto",
            }}
          >
            {/* Loading Skeleton */}
            {limitLoading ? (
              [1, 2].map((i) => (
                <div
                  key={i}
                  style={{
                    display: "flex", gap: 16, padding: 16,
                    background: "#f8fafc", borderRadius: "1rem",
                    border: "1px solid #f0f0f0",
                  }}
                >
                  <div
                    style={{
                      width: 44, height: 44,
                      borderRadius: "0.875rem",
                      background: "#e2e8f0",
                    }}
                  />
                  <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 8 }}>
                    <div style={{ height: 12, background: "#e2e8f0", borderRadius: 6, width: "40%" }} />
                    <div style={{ height: 12, background: "#e2e8f0", borderRadius: 6, width: "60%" }} />
                    <div style={{ height: 12, background: "#e2e8f0", borderRadius: 6, width: "30%" }} />
                  </div>
                </div>
              ))

            ) : filteredOrders.length === 0 ? (
              /* Empty State */
              <div style={{ textAlign: "center", padding: "3.5rem 1rem" }}>
                <div
                  style={{
                    width: 64, height: 64, borderRadius: "1.25rem",
                    background: "#f8fafc", border: "1.5px dashed #e2e8f0",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    margin: "0 auto 1rem",
                  }}
                >
                  <Clock size={28} color="#cbd5e1" />
                </div>
                <p style={{ fontWeight: 600, color: "#64748b", fontSize: "0.95rem", margin: 0 }}>
                  No {activeTab !== "ALL" ? activeTab.toLowerCase() + " " : ""}
                  limit orders
                </p>
                <p style={{ color: "#94a3b8", fontSize: "0.8rem", marginTop: 6, lineHeight: 1.6 }}>
                  Go to{" "}
                  <span style={{ color: "#3b82f6", fontWeight: 600 }}>Explore</span>
                  {" "}→ click Buy/Sell →{" "}
                  <span style={{ color: "#3b82f6", fontWeight: 600 }}>"Limit Order"</span> tab
                </p>
              </div>

            ) : (
              /* ── Order Cards ── */
              filteredOrders.map((order) => {
                const isBuy     = order.orderType === "BUY";
                const isPending = order.status === "PENDING";

                const livePrice = getLivePrice(order);
                const progress  = isPending ? getPriceProgress(order, livePrice) : null;
                const gap       = livePrice
                  ? (order.targetPrice - livePrice).toFixed(2)
                  : null;

                const cardStyles = {
                  PENDING:   { bg: "#fffbeb", border: "#fde68a"  },
                  EXECUTED:  { bg: "#f0fdf4", border: "#bbf7d0"  },
                  FAILED:    { bg: "#fff1f2", border: "#fecdd3"  },
                  CANCELLED: { bg: "#f8fafc", border: "#e2e8f0"  },
                  EXPIRED:   { bg: "#f8fafc", border: "#e2e8f0"  },
                }[order.status] || { bg: "#f8fafc", border: "#e2e8f0" };

                const statusColors = {
                  PENDING:   { bg: "#fffbeb", text: "#b45309", border: "#fde68a"  },
                  EXECUTED:  { bg: "#f0fdf4", text: "#15803d", border: "#bbf7d0"  },
                  FAILED:    { bg: "#fff1f2", text: "#be123c", border: "#fecdd3"  },
                  CANCELLED: { bg: "#f8fafc", text: "#64748b", border: "#e2e8f0"  },
                  EXPIRED:   { bg: "#f8fafc", text: "#94a3b8", border: "#e2e8f0"  },
                }[order.status] || {};

                const statusEmoji = {
                  PENDING:   "⏳",
                  EXECUTED:  "✅",
                  FAILED:    "❌",
                  CANCELLED: "✕",
                  EXPIRED:   "⏰",
                }[order.status] || "";

                return (
                  <div
                    key={order.id}
                    style={{
                      background: cardStyles.bg,
                      border: `1.5px solid ${cardStyles.border}`,
                      borderRadius: "1rem",
                      padding: "1rem 1.125rem",
                      transition: "box-shadow 0.2s",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "flex-start", gap: "0.875rem" }}>

                      {/* Left Icon */}
                      <div
                        style={{
                          width: 44, height: 44,
                          borderRadius: "0.875rem",
                          background: isBuy ? "#dcfce7" : "#fee2e2",
                          display: "flex", alignItems: "center", justifyContent: "center",
                          flexShrink: 0, marginTop: 2,
                          border: isBuy ? "1px solid #bbf7d0" : "1px solid #fecaca",
                        }}
                      >
                        <TrendingUp
                          size={20}
                          color={isBuy ? "#16a34a" : "#dc2626"}
                          style={{ transform: isBuy ? "none" : "rotate(180deg)" }}
                        />
                      </div>

                      {/* Center Content */}
                      <div style={{ flex: 1, minWidth: 0 }}>

                        {/* Row 1: Badges */}
                        <div
                          style={{
                            display: "flex", alignItems: "center",
                            gap: 8, flexWrap: "wrap", marginBottom: 10,
                          }}
                        >
                          <span
                            style={{
                              fontSize: "0.7rem", fontWeight: 800,
                              padding: "3px 10px", borderRadius: 999,
                              background: isBuy ? "#dcfce7" : "#fee2e2",
                              color: isBuy ? "#15803d" : "#dc2626",
                              border: isBuy ? "1px solid #bbf7d0" : "1px solid #fecaca",
                              letterSpacing: "0.05em",
                            }}
                          >
                            {order.orderType}
                          </span>
                          <span style={{ fontSize: "0.9rem", fontWeight: 700, color: "#1e293b" }}>
                            {order.quantity} share{order.quantity > 1 ? "s" : ""}
                          </span>
                          <span
                            style={{
                              fontSize: "0.7rem", fontWeight: 700,
                              padding: "3px 10px", borderRadius: 999,
                              background: statusColors.bg,
                              color: statusColors.text,
                              border: `1px solid ${statusColors.border}`,
                            }}
                          >
                            {statusEmoji} {order.status}
                          </span>

                          {/* Company Name */}
                          {order.companyName && (
                            <span style={{ fontSize: "0.78rem", color: "#64748b", fontWeight: 600 }}>
                              {order.companyName}
                            </span>
                          )}
                        </div>

                        {/* Row 2: Price Pills */}
                        <div
                          style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 10 }}
                        >
                          {/* Target */}
                          <div
                            style={{
                              display: "flex", alignItems: "center", gap: 6,
                              background: "#fff", border: "1px solid #e2e8f0",
                              borderRadius: "0.625rem", padding: "6px 12px",
                              boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
                            }}
                          >
                            <span style={{ fontSize: "0.7rem", color: "#94a3b8" }}>🎯 Target</span>
                            <span style={{ fontSize: "0.875rem", fontWeight: 800, color: "#1e293b" }}>
                              ₹{order.targetPrice?.toLocaleString("en-IN", {
                                minimumFractionDigits: 2,
                              })}
                            </span>
                          </div>

                          {/* Live Price */}
                          <div
                            style={{
                              display: "flex", alignItems: "center", gap: 6,
                              background: "#fff",
                              border: livePrice ? "1px solid #a5f3fc" : "1px solid #e2e8f0",
                              borderRadius: "0.625rem", padding: "6px 12px",
                              boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
                            }}
                          >
                            <span style={{ fontSize: "0.7rem", color: "#94a3b8" }}>
                              {livePrice ? "📡 Live" : "📊 At creation"}
                            </span>
                            <span
                              style={{
                                fontSize: "0.875rem", fontWeight: 700,
                                color: livePrice ? "#0891b2" : "#475569",
                              }}
                            >
                              {livePrice
                                ? `₹${Number(livePrice).toLocaleString("en-IN", {
                                    minimumFractionDigits: 2,
                                  })}`
                                : `₹${order.currentPrice?.toLocaleString("en-IN", {
                                    minimumFractionDigits: 2,
                                  })}`
                              }
                            </span>
                            {/* Live Dot */}
                            {livePrice && (
                              <span
                                style={{
                                  width: 6, height: 6, borderRadius: "50%",
                                  background: "#22d3ee", display: "inline-block",
                                  animation: "pulse 1s infinite",
                                }}
                              />
                            )}
                          </div>

                          {/* Est Total */}
                          <div
                            style={{
                              display: "flex", alignItems: "center", gap: 6,
                              background: "#fff", border: "1px solid #e2e8f0",
                              borderRadius: "0.625rem", padding: "6px 12px",
                              boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
                            }}
                          >
                            <span style={{ fontSize: "0.7rem", color: "#94a3b8" }}>💰 Total</span>
                            <span
                              style={{
                                fontSize: "0.875rem", fontWeight: 800,
                                color: isBuy ? "#15803d" : "#dc2626",
                              }}
                            >
                              ₹{(order.quantity * order.targetPrice).toLocaleString("en-IN", {
                                minimumFractionDigits: 2,
                              })}
                            </span>
                          </div>
                        </div>

                        {/* ── Progress Bar (PENDING + live price only) ── */}
                        {isPending && livePrice && progress !== null && (
                          <div style={{ marginBottom: 10 }}>
                            {/* Label Row */}
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                                marginBottom: 4,
                              }}
                            >
                              <span
                                style={{
                                  fontSize: "0.72rem",
                                  color: "#64748b",
                                  fontWeight: 600,
                                }}
                              >
                                {isBuy
                                  ? "Price needs to DROP to target"
                                  : "Price needs to RISE to target"}
                              </span>
                              <span
                                style={{
                                  fontSize: "0.72rem",
                                  fontWeight: 700,
                                  color:
                                    progress >= 80
                                      ? "#16a34a"
                                      : progress >= 40
                                      ? "#d97706"
                                      : "#64748b",
                                }}
                              >
                                {progress.toFixed(0)}% there
                              </span>
                            </div>

                            {/* Bar */}
                            <div
                              style={{
                                width: "100%", height: 8,
                                background: "#e2e8f0",
                                borderRadius: 999, overflow: "hidden",
                              }}
                            >
                              <div
                                style={{
                                  width: `${progress}%`,
                                  height: "100%",
                                  borderRadius: 999,
                                  background:
                                    progress >= 80
                                      ? "#22c55e"
                                      : progress >= 40
                                      ? "#f59e0b"
                                      : "#60a5fa",
                                  transition: "width 0.5s ease",
                                }}
                              />
                            </div>

                            {/* Gap Text */}
                            <div
                              style={{
                                marginTop: 4,
                                fontSize: "0.72rem",
                                color: "#94a3b8",
                              }}
                            >
                              {isBuy
                                ? Number(gap) > 0
                                  ? `₹${Math.abs(gap)} away — price needs to fall`
                                  : "🎯 Target reached!"
                                : Number(gap) < 0
                                ? `₹${Math.abs(gap)} away — price needs to rise`
                                : "🎯 Target reached!"}
                            </div>
                          </div>
                        )}

                        {/* Row 3: Dates */}
                        <div
                          style={{
                            display: "flex", gap: 16,
                            flexWrap: "wrap",
                            fontSize: "0.75rem", color: "#94a3b8",
                          }}
                        >
                          <span>
                            🕐 Placed:{" "}
                            {new Date(order.createdAt).toLocaleString("en-IN", {
                              day: "numeric", month: "short",
                              year: "numeric", hour: "2-digit", minute: "2-digit",
                            })}
                          </span>
                          {order.executedAt && (
                            <span style={{ color: "#15803d", fontWeight: 600 }}>
                              ✅ Executed:{" "}
                              {new Date(order.executedAt).toLocaleString("en-IN", {
                                day: "numeric", month: "short",
                                hour: "2-digit", minute: "2-digit",
                              })}
                            </span>
                          )}
                          {order.expiresAt && isPending && (
                            <span style={{ color: "#d97706" }}>
                              ⏰ Expires:{" "}
                              {new Date(order.expiresAt).toLocaleString("en-IN", {
                                day: "numeric", month: "short",
                                hour: "2-digit", minute: "2-digit",
                              })}
                            </span>
                          )}
                        </div>

                        {/* Failure Reason */}
                        {order.failureReason && (
                          <div
                            style={{
                              marginTop: 8, fontSize: "0.75rem",
                              color: "#be123c", background: "#fff1f2",
                              border: "1px solid #fecdd3",
                              borderRadius: "0.5rem", padding: "6px 12px",
                            }}
                          >
                            ❌ {order.failureReason}
                          </div>
                        )}

                        {/* Watching Pulse */}
                        {isPending && (
                          <div
                            style={{
                              display: "flex", alignItems: "center",
                              gap: 6, marginTop: 8,
                            }}
                          >
                            <span
                              style={{
                                width: 8, height: 8, borderRadius: "50%",
                                background: "#f59e0b", display: "inline-block",
                                animation: "pulse 1.5s infinite",
                              }}
                            />
                            <span
                              style={{
                                fontSize: "0.75rem",
                                color: "#b45309",
                                fontWeight: 600,
                              }}
                            >
                              Watching live price every second...
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Cancel Button */}
                      {isPending && (
                        <button
                          onClick={() => handleCancelLimitOrder(order.id)}
                          title="Cancel order"
                          style={{
                            width: 34, height: 34,
                            borderRadius: "0.625rem",
                            border: "1px solid #e2e8f0",
                            background: "#fff",
                            cursor: "pointer",
                            display: "flex", alignItems: "center", justifyContent: "center",
                            flexShrink: 0,
                            color: "#94a3b8",
                            transition: "all 0.2s",
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background    = "#fff1f2";
                            e.currentTarget.style.borderColor   = "#fecdd3";
                            e.currentTarget.style.color         = "#dc2626";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background    = "#fff";
                            e.currentTarget.style.borderColor   = "#e2e8f0";
                            e.currentTarget.style.color         = "#94a3b8";
                          }}
                        >
                          <X size={15} />
                        </button>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
        {/* ───────────────────────────────────── */}

        {/* ── Transaction History ── */}
        <div className="wallet-transactions">
          <TransactionHistory
            transactions={transactions}
            loading={txnLoading}
          />
        </div>
      </div>

      {/* ── Add Money Modal ── */}
      <AddMoneyModal
        isOpen={showAddMoney}
        onClose={() => setShowAddMoney(false)}
        onConfirm={handleAddMoney}
        loading={addingMoney}
      />
    </div>
  );
};

export default WalletPage;