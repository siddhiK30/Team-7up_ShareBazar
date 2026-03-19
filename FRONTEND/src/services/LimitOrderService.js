// services/LimitOrderService.js
import axios from "axios";

const BASE_URL = "http://localhost:8086/orders/limit";

export const placeLimitOrder = (data) =>
  axios.post(`${BASE_URL}/place`, data);

export const cancelLimitOrder = (id, userId) =>
  axios.put(`${BASE_URL}/cancel/${id}?userId=${userId}`);

export const getUserLimitOrders = (userId) =>
  axios.get(`${BASE_URL}/user/${userId}`);