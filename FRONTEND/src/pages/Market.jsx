import React, { useEffect, useState } from "react";
import { connectSocket, disconnectSocket } from "../services/socketService";

const Market = () => {
  const [prices, setPrices] = useState({});
  const [prevPrices, setPrevPrices] = useState({});

  // ✅ FIXED useEffect (runs once, no reconnect loop)
  useEffect(() => {
    connectSocket((data) => {
      setPrevPrices((prev) => prices);
      setPrices(data);
    });

    return () => disconnectSocket();
  }, []);

  // Loading state
  if (!prices || Object.keys(prices).length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white text-black-800">
        <h2>📡 Connecting to Live Market...</h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-gray-900 p-8">
      <h1 className="text-2xl font-bold mb-6">
        📈 Live Market (Real-Time)
      </h1>

      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b border-gray-300">
            <th className="text-left p-3">Company</th>
            <th className="text-left p-3">Price</th>
            <th className="text-left p-3">Change</th>
          </tr>
        </thead>

        <tbody>
          {Object.entries(prices).map(([company, price]) => {
            const prev = prevPrices[company] || price;
            const isUp = price > prev;
            const isDown = price < prev;

            return (
              <tr
                key={company}
                className="border-b border-gray-200 hover:bg-gray-50 transition"
              >
                {/* Company */}
                <td className="p-3 font-medium text-gray-800">
                  {company}
                </td>

                {/* Price */}
                <td
                  className={`p-3 font-bold ${
                    isUp
                      ? "text-green-600"
                      : isDown
                      ? "text-red-500"
                      : "text-gray-800"
                  }`}
                >
                  ₹ {Number(price).toFixed(2)}
                </td>

                {/* Change */}
                <td className="p-3 text-lg">
                  {isUp && <span className="text-green-600">⬆️</span>}
                  {isDown && <span className="text-red-500">⬇️</span>}
                  {!isUp && !isDown && <span className="text-gray-500">-</span>}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Market;