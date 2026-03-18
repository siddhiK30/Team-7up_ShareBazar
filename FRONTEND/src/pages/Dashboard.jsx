import React, { useEffect, useState } from 'react';
import { Briefcase, TrendingUp, ArrowUpRight, ArrowDownRight, Activity, User } from 'lucide-react';
import { jwtDecode } from 'jwt-decode'; // <-- We imported the decoder

const Dashboard = () => {
  const [userEmail, setUserEmail] = useState('');

  // When the dashboard loads, extract the real user info from the Spring Boot Token
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        // Spring Boot sets the "subject" (sub) to the user's email in JwtUtil.java
        setUserEmail(decodedToken.sub); 
      } catch (error) {
        console.error("Invalid token");
      }
    }
  }, []);

  // Mock data for the UI (Waiting for backend team to build the Portfolio API)
  const portfolio = [
    { symbol: 'RELIANCE', shares: 15, avgPrice: 2840.50, ltp: 2910.25, change: 2.45 },
    { symbol: 'TCS', shares: 10, avgPrice: 3950.00, ltp: 3890.10, change: -1.51 },
    { symbol: 'HDFCBANK', shares: 45, avgPrice: 1420.75, ltp: 1455.00, change: 2.41 },
  ];

  const calculateTotalValue = () => portfolio.reduce((acc, stock) => acc + (stock.shares * stock.ltp), 0);
  const calculateTotalInvested = () => portfolio.reduce((acc, stock) => acc + (stock.shares * stock.avgPrice), 0);
  
  const totalValue = calculateTotalValue();
  const totalInvested = calculateTotalInvested();
  const totalReturns = totalValue - totalInvested;
  const returnsPercentage = (totalReturns / totalInvested) * 100;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      {/* REAL BACKEND DATA DISPLAYED HERE */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-3">
          <Briefcase className="w-8 h-8 text-emerald-500" />
          <h1 className="text-3xl font-bold text-gray-900">My Portfolio</h1>
        </div>
        
        {userEmail && (
          <div className="hidden md:flex items-center space-x-2 bg-white px-4 py-2 rounded-full border border-gray-200 shadow-sm">
            <div className="bg-emerald-100 p-1 rounded-full">
              <User className="w-4 h-4 text-emerald-600" />
            </div>
            <span className="text-sm font-semibold text-gray-700">{userEmail}</span>
          </div>
        )}
      </div>

      {/* Top Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <p className="text-sm font-medium text-gray-500 mb-1">Total Investment</p>
          <p className="text-3xl font-bold text-gray-900">₹{totalInvested.toLocaleString('en-IN')}</p>
        </div>
        
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <p className="text-sm font-medium text-gray-500 mb-1">Current Value</p>
          <p className="text-3xl font-bold text-gray-900">₹{totalValue.toLocaleString('en-IN')}</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <p className="text-sm font-medium text-gray-500 mb-1">Total Returns</p>
          <div className="flex items-center space-x-2">
            <p className={`text-3xl font-bold ${totalReturns >= 0 ? 'text-emerald-500' : 'text-red-500'}`}>
              {totalReturns >= 0 ? '+' : ''}₹{totalReturns.toLocaleString('en-IN')}
            </p>
            <span className={`flex items-center text-sm font-semibold px-2 py-1 rounded-md ${totalReturns >= 0 ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'}`}>
              {totalReturns >= 0 ? <ArrowUpRight className="w-4 h-4 mr-1" /> : <ArrowDownRight className="w-4 h-4 mr-1" />}
              {returnsPercentage.toFixed(2)}%
            </span>
          </div>
        </div>
      </div>

      {/* Holdings Table Area */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
          <h2 className="text-lg font-bold text-gray-900 flex items-center">
            <Activity className="w-5 h-5 mr-2 text-emerald-500" />
            Your Holdings
          </h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-100 text-xs uppercase text-gray-500 bg-white">
                <th className="p-4 font-semibold">Instrument</th>
                <th className="p-4 font-semibold text-right">Qty</th>
                <th className="p-4 font-semibold text-right">Avg. Cost</th>
                <th className="p-4 font-semibold text-right">LTP</th>
                <th className="p-4 font-semibold text-right">Current Value</th>
                <th className="p-4 font-semibold text-right">P&L</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {portfolio.map((stock, idx) => {
                const currentValue = stock.shares * stock.ltp;
                const pnl = currentValue - (stock.shares * stock.avgPrice);
                return (
                  <tr key={idx} className="hover:bg-gray-50/50 transition cursor-pointer">
                    <td className="p-4">
                      <p className="font-bold text-gray-900">{stock.symbol}</p>
                      <p className="text-xs text-gray-500">NSE</p>
                    </td>
                    <td className="p-4 text-right font-medium text-gray-900">{stock.shares}</td>
                    <td className="p-4 text-right text-gray-600">₹{stock.avgPrice.toFixed(2)}</td>
                    <td className="p-4 text-right font-medium text-gray-900">₹{stock.ltp.toFixed(2)}</td>
                    <td className="p-4 text-right font-medium text-gray-900">₹{currentValue.toLocaleString('en-IN')}</td>
                    <td className={`p-4 text-right font-bold ${pnl >= 0 ? 'text-emerald-500' : 'text-red-500'}`}>
                      {pnl >= 0 ? '+' : ''}₹{pnl.toLocaleString('en-IN')}
                      <p className="text-xs font-medium opacity-80">{stock.change > 0 ? '+' : ''}{stock.change}%</p>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;