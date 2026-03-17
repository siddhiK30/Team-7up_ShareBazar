// src/services/companyService.js

import axios from "axios";

const API_BASE = "http://localhost:8080/companies";

const companyService = {
  getAllCompanies: async () => {
    const response = await axios.get(API_BASE);
    return response.data;
  },

  addCompany: async (company) => {
    const response = await axios.post(API_BASE, company);
    return response.data;
  },
};

export default companyService;