import { useEffect, useState } from "react";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";

export default function LivePrices() {
  const [prices, setPrices] = useState({});

  useEffect(() => {
    const socket = new SockJS("http://localhost:8080/ws");

    const client = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 5000,
      onConnect: () => {
        client.subscribe("/topic/prices", (message) => {
          const data = JSON.parse(message.body);
          setPrices(data);
        });
      },
    });

    client.activate();

    return () => client.deactivate();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-2xl font-bold mb-6">Live Stock Prices</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {Object.entries(prices).map(([code, price]) => (
          <div
            key={code}
            className="bg-gray-800 p-4 rounded-2xl shadow-md flex justify-between items-center"
          >
            <span className="text-lg font-semibold">{code}</span>
            <span className="text-green-400 font-mono">
              ₹ {parseFloat(price).toFixed(2)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}