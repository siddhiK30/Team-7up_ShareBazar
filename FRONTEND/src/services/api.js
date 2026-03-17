import axios from 'axios';

const API_URL = 'http://localhost:8080/api/auth';

export const registerAPI = async (userData) => {
    try {
        const response = await axios.post(`${API_URL}/register`, userData);
        return response.data; 
    } catch (error) {
        throw error;
    }
};

export const loginAPI = async (credentials) => {
    try {
        const response = await axios.post(`${API_URL}/login`, credentials);
        return response.data; 
    } catch (error) {
        throw error;
    }
};