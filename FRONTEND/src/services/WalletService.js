import api from './axiosInstance';

const WALLET_API_URL = 'http://localhost:8084/wallet';

// ✅ Get wallet
export const getWallet = async (userId) => {
  const response = await api.get(`${WALLET_API_URL}/${userId}`);
  return response.data;
};

// ✅ Create wallet
export const createWallet = async (userId) => {
  const response = await api.post(`${WALLET_API_URL}/create`, {
    userId: String(userId),
  });
  return response.data;
};

// ✅ Add money
export const addMoneyToWallet = async (userId, amount) => {
  const response = await api.post(`${WALLET_API_URL}/credit`, {
    userId: String(userId),
    amount: amount,
  });
  return response.data;
};

// ✅ THIS WAS MISSING — Get transactions
export const getTransactions = async (userId) => {
  const response = await api.get(`${WALLET_API_URL}/transactions/${userId}`);
  return response.data;
};