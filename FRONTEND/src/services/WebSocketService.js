import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";

let stompClient = null;

export const connectWebSocket = (onPriceUpdate) => {
  // ✅ Connect to your simulation engine WebSocket
  const socket = new SockJS("http://localhost:8083/ws");

  stompClient = new Client({
    webSocketFactory: () => socket,
    reconnectDelay: 5000,
    heartbeatIncoming: 4000,
    heartbeatOutgoing: 4000,

    onConnect: () => {
      console.log("✅ WebSocket Connected!");

      // ✅ Subscribe to live prices
      stompClient.subscribe("/topic/prices", (message) => {
        try {
          const prices = JSON.parse(message.body);
          onPriceUpdate(prices);
        } catch (err) {
          console.error("Failed to parse prices:", err);
        }
      });
    },

    onStompError: (frame) => {
      console.error("STOMP Error:", frame.headers["message"]);
    },

    onDisconnect: () => {
      console.log("WebSocket Disconnected");
    },
  });

  stompClient.activate();
};

export const disconnectWebSocket = () => {
  if (stompClient) {
    stompClient.deactivate();
    console.log("WebSocket Disconnected");
  }
};