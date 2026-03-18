// src/pages/AdminAuth.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginAPI } from '../services/api';

const AdminAuth = () => {
  const navigate = useNavigate();

  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

 const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const res = await loginAPI({
      username: "admin",   // for now fixed
      password: password
    });
    // 🔐 store JWT
    localStorage.setItem("token", res.token);
    // optional role
    localStorage.setItem("role", res.role);
    navigate('/admin/dashboard');
  } catch (err) {
    setError("Invalid credentials");
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-sm">

        <h2 className="text-2xl font-bold text-center mb-6">
          Admin Login
        </h2>

        {error && (
          <div className="mb-4 p-3 text-sm rounded bg-red-100 text-red-700">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <input
            type="password"
            placeholder="Enter Admin Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError('');
            }}
            required
            className="w-full px-4 py-3 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />

          <button
            type="submit"
            className="w-full bg-emerald-500 text-white py-3 rounded-lg font-semibold hover:bg-emerald-600"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminAuth;