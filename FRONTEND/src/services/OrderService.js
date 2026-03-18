import api from './axiosInstance';

const ORDER_API_URL = 'http://localhost:8083/orders';

export const buyStock = async (orderData) => {
  try {
    const response = await api.post(`${ORDER_API_URL}/buy`, orderData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const sellStock = async (orderData) => {
  try {
    const response = await api.post(`${ORDER_API_URL}/sell`, orderData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const getOrders = async (userId) => {
  try {
    const response = await api.get(`${ORDER_API_URL}/user/${userId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const getOrderDetails = async (orderId) => {
  try {
    const response = await api.get(`${ORDER_API_URL}/${orderId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};
