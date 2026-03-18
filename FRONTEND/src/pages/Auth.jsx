// src/pages/Auth.jsx
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { loginAPI, registerAPI } from '../services/api';

const Auth = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true);

  // ✅ Toggle login/register
  useEffect(() => {
    if (location.state?.isRegister === true) {
      setIsLogin(false);
    } else {
      setIsLogin(true);
    }
  }, [location]);

  // ✅ AUTO REDIRECT if already logged in
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/explore");
    }
  }, [navigate]);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    panNumber: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setMessage({ type: '', text: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      if (isLogin) {
        const response = await loginAPI({
          email: formData.email,
          password: formData.password
        });

        // ✅ SAVE TOKEN
        localStorage.setItem('token', response.token);

        // ✅ TRIGGER APP UPDATE
        window.dispatchEvent(new Event("storage"));

        setMessage({ type: 'success', text: 'Login Successful!' });

        // ✅ INSTANT REDIRECT
        navigate('/explore');

      } else {
        const payload = {
          username: formData.username,
          email: formData.email,
          password: formData.password,
          pan: formData.panNumber
        };

        const response = await registerAPI(payload);

        setMessage({
          type: 'success',
          text: response || 'Registration Successful! Please login.'
        });

        setTimeout(() => {
          setIsLogin(true);
          setMessage({ type: '', text: '' });
        }, 2000);
      }

    } catch (error) {
      if (error.response && error.response.data) {
        const errorText = Object.values(error.response.data).join(", ");
        setMessage({ type: 'error', text: errorText });
      } else {
        setMessage({ type: 'error', text: 'Something went wrong' });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">

        {/* Toggle */}
        <div className="flex border-b border-gray-100">
          <button 
            onClick={() => setIsLogin(true)} 
            className={`flex-1 py-4 text-sm font-bold ${
              isLogin
                ? 'text-emerald-600 border-b-2 border-emerald-500 bg-emerald-50/30'
                : 'text-gray-500'
            }`}
          >
            Login
          </button>

          <button 
            onClick={() => setIsLogin(false)} 
            className={`flex-1 py-4 text-sm font-bold ${
              !isLogin
                ? 'text-emerald-600 border-b-2 border-emerald-500 bg-emerald-50/30'
                : 'text-gray-500'
            }`}
          >
            Register
          </button>
        </div>

        <div className="p-8">
          <h2 className="text-2xl font-bold text-center mb-6">
            {isLogin ? 'Welcome back' : 'Create your account'}
          </h2>

          {message.text && (
            <div className="p-3 mb-6 rounded-md text-sm text-center">
              {message.text}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">

            {!isLogin && (
              <input
                name="username"
                placeholder="Full Name"
                onChange={handleChange}
                className="w-full p-3 border rounded-lg"
              />
            )}

            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleChange}
              className="w-full p-3 border rounded-lg"
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              className="w-full p-3 border rounded-lg"
            />

            {!isLogin && (
              <input
                name="panNumber"
                placeholder="PAN"
                onChange={handleChange}
                className="w-full p-3 border rounded-lg"
              />
            )}

            <button className="w-full bg-emerald-500 text-white py-3 rounded-lg">
              {loading ? "Processing..." : isLogin ? "Login" : "Register"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Auth;