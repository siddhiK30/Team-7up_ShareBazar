// src/services/socketService.js
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";

let stompClient       = null;
let stompSubscription = null;
let subscribers       = new Map();
let idCounter         = 0;

export const connectSocket = (onMessageReceived) => {
  // ── Give this subscriber a unique ID ──
  const id = `sub_${idCounter++}`;
  subscribers.set(id, onMessageReceived);

  // ── Already connected → just add the new callback, don't reconnect ──
  if (stompClient && stompClient.connected && stompSubscription) {
    console.log(`✅ Reusing existing socket connection [${id}]`);
    return id;
  }

  // ── Already connecting → just wait, callback is already registered ──
  if (stompClient && !stompClient.connected) {
    console.log(`⏳ Socket connecting... registered [${id}]`);
    return id;
  }

  // ── Create fresh client ──
  stompClient = new Client({
    webSocketFactory: () => new SockJS("http://localhost:8083/ws"),
    reconnectDelay: 5000,

    onConnect: () => {
      console.log("✅ Connected to WebSocket");

      // ── Subscribe ONCE, broadcast to ALL subscribers ──
      if (!stompSubscription) {
        stompSubscription = stompClient.subscribe(
          "/topic/prices",
          (message) => {
            try {
              const data = JSON.parse(message.body);
              // Notify every registered callback
              subscribers.forEach((callback, subId) => {
                try {
                  callback(data);
                } catch (e) {
                  console.error(`❌ Callback error [${subId}]:`, e);
                }
              });
            } catch (e) {
              console.error("❌ Failed to parse message:", e);
            }
          }
        );
      }
    },

    onDisconnect: () => {
      console.log("🔌 WebSocket disconnected");
      stompSubscription = null;
    },

    onStompError: (frame) => {
      console.error("❌ STOMP error:", frame);
    },
  });

  stompClient.activate();
  return id; // ← return ID so component can unsubscribe later
};

// ── Remove ONE subscriber without killing connection ──
export const unsubscribeSocket = (id) => {
  if (!id) return;

  subscribers.delete(id);
  console.log(
    `🗑️ Removed [${id}] — ${subscribers.size} subscriber(s) remaining`
  );

  // Only fully disconnect when nobody is listening
  if (subscribers.size === 0) {
    disconnectSocket();
  }
};

// ── Full disconnect ──
export const disconnectSocket = () => {
  if (stompClient) {
    stompSubscription = null;
    subscribers.clear();
    stompClient.deactivate();
    stompClient = null;
    console.log("🔌 Socket fully disconnected");
  }
};