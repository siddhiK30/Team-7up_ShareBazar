import api from './axiosInstance';

const WALLET_API_URL = 'http://localhost:8084/wallet';

export const createWallet = async (userId) => {
  try {
    const response = await api.post(`${WALLET_API_URL}/create`, { userId });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const creditWallet = async (userId, amount) => {
  try {
    const response = await api.post(`${WALLET_API_URL}/credit`, {
      userId,
      amount
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const debitWallet = async (userId, amount) => {
  try {
    const response = await api.post(`${WALLET_API_URL}/debit`, {
      userId,
      amount
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const getWallet = async (userId) => {
  try {
    const response = await api.get(`${WALLET_API_URL}/${userId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const getTransactions = async (userId) => {
  try {
    const response = await api.get(`${WALLET_API_URL}/transactions/${userId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};
