import api from './axiosInstance';

const PORTFOLIO_API_URL = 'http://localhost:8085/portfolio';

export const createPortfolio = async (userId, name) => {
  try {
    const response = await api.post(
      `${PORTFOLIO_API_URL}/create?userId=${userId}&name=${name}`
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const getUserPortfolios = async (userId) => {
  try {
    const response = await api.get(`${PORTFOLIO_API_URL}/user/${userId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const getPortfolioHoldings = async (portfolioId) => {
  try {
    const response = await api.get(`${PORTFOLIO_API_URL}/${portfolioId}/holdings`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const getPortfolioDetails = async (portfolioId) => {
  try {
    const response = await api.get(`${PORTFOLIO_API_URL}/${portfolioId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};
