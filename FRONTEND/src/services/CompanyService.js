// src/services/companyService.js

import axios from "axios";

const API_BASE = "http://localhost:8080/companies";
const API_URL = "http://localhost:8080/companies";
const companyService = {
  getAllCompanies: async () => {
    const response = await axios.get(API_BASE);
    return response.data;
  },

  addCompany: async (company) => {
    const response = await axios.post(API_BASE, company);
    return response.data;
  },
  // ✅ DELETE
  deleteCompany: async (id) => {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  },

  // ✅ PARTIAL UPDATE (stock + price)
  updateCompany: async (id, updateData) => {
    const response = await axios.patch(`${API_URL}/${id}`, updateData);
    return response.data;
  },
};

export default companyService;