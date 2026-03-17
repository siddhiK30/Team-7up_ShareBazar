import React, { useEffect, useState } from "react";
import { connectSocket, disconnectSocket } from "../services/socketService";

const Market = () => {
  const [prices, setPrices] = useState({});
  const [prevPrices, setPrevPrices] = useState({});

  useEffect(() => {
    connectSocket((data) => {
      setPrevPrices(prices);
      setPrices(data);
    });

    return () => disconnectSocket();
  }, [prices]);

  // Loading state
  if (!prices || Object.keys(prices).length === 0) {
    return (
      <div style={{ padding: "40px", textAlign: "center", color: "white" }}>
        <h2>📡 Connecting to Live Market...</h2>
      </div>
    );
  }

  return (
    <div style={{ padding: "30px", color: "white" }}>
      <h1 style={{ fontSize: "28px", marginBottom: "20px" }}>
        📈 Live Market (Real-Time)
      </h1>

      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ borderBottom: "1px solid gray" }}>
            <th style={{ textAlign: "left", padding: "10px" }}>Company</th>
            <th style={{ textAlign: "left", padding: "10px" }}>Price</th>
            <th style={{ textAlign: "left", padding: "10px" }}>Change</th>
          </tr>
        </thead>

        <tbody>
          {Object.entries(prices).map(([company, price]) => {
            const prev = prevPrices[company] || price;
            const isUp = price > prev;
            const isDown = price < prev;

            return (
              <tr key={company} style={{ borderBottom: "1px solid #333" }}>
                <td style={{ padding: "10px" }}>{company}</td>

                <td
                  style={{
                    padding: "10px",
                    color: isUp ? "lightgreen" : isDown ? "red" : "white",
                    fontWeight: "bold",
                  }}
                >
                  ₹ {Number(price).toFixed(2)}
                </td>

                <td style={{ padding: "10px" }}>
                  {isUp && "⬆️"}
                  {isDown && "⬇️"}
                  {!isUp && !isDown && "-"}
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