import React, { useEffect, useState } from "react";
import ExploreNavbar from "../components/ExploreNavbar";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { connectSocket, disconnectSocket } from "../services/socketService";

const stockLogos = {
  RELIANCE: "https://logo.clearbit.com/relianceindustries.com",
  TCS: "https://logo.clearbit.com/tcs.com",
  INFY: "https://logo.clearbit.com/infosys.com",
  HDFC: "https://logo.clearbit.com/hdfcbank.com",
};

const Explore = () => {
  const [prices, setPrices] = useState({});
  const [chartData, setChartData] = useState([]);

  // ✅ Dummy graph so UI always shows
  useEffect(() => {
    const dummy = Array.from({ length: 20 }, (_, i) => ({
      time: i,
      price: 1000 + Math.random() * 100,
    }));
    setChartData(dummy);
  }, []);

  // ✅ Live socket (optional)
  useEffect(() => {
    connectSocket((data) => {
      setPrices(data);

      const time = new Date().toLocaleTimeString();
      const firstCompany = Object.keys(data)[0];
      const price = data[firstCompany];

      setChartData((prev) => [
        ...prev.slice(-20),
        { time, price },
      ]);
    });

    return () => disconnectSocket();
  }, []);

  return (
    <>
      {/* ✅ NAVBAR */}
      <ExploreNavbar />

      <div className="min-h-screen bg-gray-50 p-8">

        {/* PAGE TITLE */}
        <div className="max-w-7xl mx-auto mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Explore Markets
          </h1>
          <p className="text-gray-500 mt-1">
            Track live stock performance in real-time
          </p>
        </div>

        <div className="max-w-7xl mx-auto">

          {/* 🔥 GRAPH CARD */}
          <div className="bg-white rounded-2xl shadow-sm border p-6 mb-10">
            <h2 className="text-lg font-semibold mb-4">
              📈 Market Trend
            </h2>

            <ResponsiveContainer width="100%" height={350}>
              <LineChart data={chartData}>
                <XAxis dataKey="time" hide />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="price"
                  stroke="#00b386"
                  strokeWidth={3}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* 🔥 STOCK CARDS */}
          <div>
            <h2 className="text-lg font-semibold mb-6">
              Top Stocks
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

              {(Object.keys(prices).length === 0
                ? ["RELIANCE", "TCS", "INFY", "HDFC"]
                : Object.keys(prices)
              ).map((company) => {
                const price =
                  prices[company] || Math.floor(Math.random() * 2000);

                return (
                  <div
                    key={company}
                    className="bg-white p-5 rounded-xl border hover:shadow-md transition cursor-pointer"
                  >
                    <div className="flex items-center space-x-3 mb-3">
                      <img
                        src={stockLogos[company] || "https://via.placeholder.com/40"}
                        alt={company}
                        className="w-10 h-10 rounded-full"
                      />
                      <div>
                        <p className="font-semibold text-gray-800">
                          {company}
                        </p>
                        <p className="text-xs text-gray-500">
                          NSE
                        </p>
                      </div>
                    </div>

                    <p className="text-emerald-600 font-bold text-lg">
                      ₹ {Number(price).toFixed(2)}
                    </p>
                  </div>
                );
              })}

            </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default Explore;