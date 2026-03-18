import api from './axiosInstance';

export const registerAPI = async (userData) => {
    const response = await api.post('/api/auth/register', userData);
    return response.data;
};

export const loginAPI = async (credentials) => {
    const response = await api.post('/api/auth/login', credentials);
    return response.data;
};