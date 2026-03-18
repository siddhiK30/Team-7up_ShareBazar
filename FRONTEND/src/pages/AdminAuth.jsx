// src/pages/AdminAuth.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Shield, Lock, TrendingUp } from 'lucide-react';

const AdminAuth = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Simulate small delay
    await new Promise((r) => setTimeout(r, 600));

    if (password === "admin123") {
      const header = btoa(JSON.stringify({ alg: "HS256", typ: "JWT" }));
      const payload = btoa(JSON.stringify({
        sub: "admin@sharebazar.com",
        role: "ADMIN",
        exp: Math.floor(Date.now() / 1000) + 86400,
        iat: Math.floor(Date.now() / 1000),
      }));
      const fakeToken = `${header}.${payload}.fake-signature`;

      localStorage.setItem("adminToken", fakeToken);
      localStorage.setItem("role", "ADMIN");
      navigate('/admin/dashboard');
    } else {
      setError("Wrong password. Please try again.");
    }

    setLoading(false);
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #ecfdf5 0%, #d1fae5 50%, #a7f3d0 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: "'Inter', -apple-system, sans-serif",
      padding: '20px',
    }}>

      <div style={{
        background: 'white',
        borderRadius: '20px',
        boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
        width: '100%',
        maxWidth: '400px',
        overflow: 'hidden',
      }}>

        {/* ✅ Green Header */}
        <div style={{
          background: 'linear-gradient(135deg, #10b981, #059669)',
          padding: '28px 24px',
          textAlign: 'center',
          position: 'relative',
        }}>
          {/* ✅ Back Button */}
          <button
            onClick={() => navigate('/')}
            style={{
              position: 'absolute',
              top: '16px',
              left: '16px',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              color: 'rgba(255,255,255,0.8)',
              background: 'rgba(255,255,255,0.15)',
              border: 'none',
              borderRadius: '8px',
              padding: '6px 12px',
              fontSize: '12px',
              fontWeight: '600',
              cursor: 'pointer',
            }}
          >
            <ArrowLeft size={14} />
            Back
          </button>

          {/* Logo */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            marginBottom: '12px',
          }}>
            <div style={{
              background: 'rgba(255,255,255,0.2)',
              borderRadius: '10px',
              padding: '8px',
              display: 'flex',
            }}>
              <TrendingUp size={22} color="white" />
            </div>
            <span style={{
              color: 'white',
              fontSize: '20px',
              fontWeight: '800',
            }}>
              ShareBazar
            </span>
          </div>

          {/* Shield Badge */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            background: 'rgba(255,255,255,0.2)',
            padding: '6px 14px',
            borderRadius: '20px',
            marginBottom: '8px',
          }}>
            <Shield size={14} color="white" />
            <span style={{
              color: 'white',
              fontSize: '12px',
              fontWeight: '700',
            }}>
              Admin Panel
            </span>
          </div>

          <h2 style={{
            color: 'white',
            fontSize: '22px',
            fontWeight: '800',
            margin: '8px 0 0',
          }}>
            Admin Login
          </h2>
        </div>

        {/* ✅ Form Body */}
        <div style={{ padding: '28px 24px' }}>

          {/* Error */}
          {error && (
            <div style={{
              background: '#fef2f2',
              border: '1px solid #fecaca',
              color: '#dc2626',
              padding: '10px 14px',
              borderRadius: '10px',
              fontSize: '13px',
              fontWeight: '600',
              marginBottom: '16px',
              textAlign: 'center',
            }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* Password Label */}
            <label style={{
              display: 'block',
              fontSize: '13px',
              fontWeight: '600',
              color: '#374151',
              marginBottom: '6px',
            }}>
              Admin Password
            </label>

            {/* Password Input */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              border: '2px solid #e5e7eb',
              borderRadius: '12px',
              overflow: 'hidden',
              marginBottom: '20px',
              transition: 'border-color 0.2s',
            }}>
              <Lock size={18} style={{
                marginLeft: '14px',
                color: '#9ca3af',
                flexShrink: 0,
              }} />
              <input
                type="password"
                placeholder="Enter admin password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError('');
                }}
                required
                style={{
                  flex: 1,
                  padding: '12px 14px',
                  border: 'none',
                  outline: 'none',
                  fontSize: '14px',
                  fontWeight: '500',
                  color: '#111827',
                }}
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%',
                padding: '14px',
                background: loading
                  ? '#9ca3af'
                  : 'linear-gradient(135deg, #10b981, #059669)',
                color: 'white',
                border: 'none',
                borderRadius: '12px',
                fontSize: '15px',
                fontWeight: '700',
                cursor: loading ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                boxShadow: '0 4px 14px rgba(16, 185, 129, 0.3)',
              }}
            >
              {loading ? (
                <>
                  <div style={{
                    width: '18px',
                    height: '18px',
                    border: '3px solid rgba(255,255,255,0.3)',
                    borderTopColor: 'white',
                    borderRadius: '50%',
                    animation: 'spin 0.8s linear infinite',
                  }} />
                  Logging in...
                </>
              ) : (
                <>
                  <Shield size={18} />
                  Login as Admin
                </>
              )}
            </button>
          </form>

          {/* ✅ Back to Home Link */}
          <div style={{
            textAlign: 'center',
            marginTop: '20px',
          }}>
            <button
              onClick={() => navigate('/')}
              style={{
                background: 'none',
                border: 'none',
                color: '#10b981',
                fontSize: '13px',
                fontWeight: '600',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
              }}
            >
              <ArrowLeft size={14} />
              Back to ShareBazar Home
            </button>
          </div>
        </div>
      </div>

      {/* ✅ Spinner Animation */}
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default AdminAuth;



// // src/pages/AdminAuth.jsx
// import React, { useState } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import {
//   Shield,
//   Mail,
//   Lock,
//   Eye,
//   EyeOff,
//   AlertCircle,
//   CheckCircle,
//   ArrowRight,
//   TrendingUp,
// } from "lucide-react";
// import axios from "axios";
// import "../styles/AdminAuth.css";

// const AdminAuth = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [loading, setLoading] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const [message, setMessage] = useState({ type: "", text: "" });
//   const [formData, setFormData] = useState({ email: "", password: "" });

//   // ✅ Show message if redirected
//   React.useEffect(() => {
//     if (location.state?.expired) {
//       setMessage({
//         type: "error",
//         text: "Your admin session has expired. Please login again.",
//       });
//     }
//     if (location.state?.unauthorized) {
//       setMessage({
//         type: "error",
//         text: "You don't have admin privileges.",
//       });
//     }
//   }, [location]);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//     setMessage({ type: "", text: "" });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!formData.email.trim() || !formData.password) {
//       setMessage({ type: "error", text: "Please fill in all fields." });
//       return;
//     }

//     setLoading(true);
//     setMessage({ type: "", text: "" });

//     try {
//       // ✅ Update this URL to match your admin login endpoint
//       const response = await axios.post("http://localhost:8081/admin/login", {
//         email: formData.email.trim(),
//         password: formData.password,
//       });

//       if (response.data && response.data.token) {
//         // ✅ Save as adminToken
//         localStorage.setItem("adminToken", response.data.token);
//         setMessage({
//           type: "success",
//           text: "Admin login successful! Redirecting...",
//         });
//         setTimeout(() => navigate("/admin/dashboard"), 1500);
//       } else {
//         setMessage({
//           type: "error",
//           text: "Login failed. Invalid response.",
//         });
//       }
//     } catch (error) {
//       if (error.response?.status === 401 || error.response?.status === 403) {
//         setMessage({
//           type: "error",
//           text: "Invalid admin credentials. Please try again.",
//         });
//       } else if (error.code === "ERR_NETWORK") {
//         setMessage({
//           type: "error",
//           text: "Unable to connect to server.",
//         });
//       } else {
//         setMessage({
//           type: "error",
//           text:
//             error.response?.data?.message ||
//             "Login failed. Please try again.",
//         });
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="admin-auth-page">
//       <div className="admin-auth-bg">
//         <div className="bg-circle circle-1" />
//         <div className="bg-circle circle-2" />
//       </div>

//       <div className="admin-auth-card">
//         {/* Header */}
//         <div className="admin-auth-header">
//           <div className="admin-auth-logo">
//             <div className="logo-circle">
//               <TrendingUp size={24} />
//             </div>
//             <span>ShareBazar</span>
//           </div>

//           <div className="admin-shield">
//             <Shield size={20} />
//             <span>Admin Panel</span>
//           </div>

//           <h2>Admin Login</h2>
//           <p>Access the administration dashboard</p>
//         </div>

//         {/* Message */}
//         {message.text && (
//           <div className={`admin-auth-message ${message.type}`}>
//             {message.type === "success" ? (
//               <CheckCircle size={16} />
//             ) : (
//               <AlertCircle size={16} />
//             )}
//             <span>{message.text}</span>
//           </div>
//         )}

//         {/* Form */}
//         <form onSubmit={handleSubmit} className="admin-auth-form">
//           <div className="form-group">
//             <label>Admin Email</label>
//             <div className="input-wrapper">
//               <Mail size={18} className="input-icon" />
//               <input
//                 type="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 placeholder="admin@sharebazar.com"
//                 autoComplete="email"
//               />
//             </div>
//           </div>

//           <div className="form-group">
//             <label>Password</label>
//             <div className="input-wrapper">
//               <Lock size={18} className="input-icon" />
//               <input
//                 type={showPassword ? "text" : "password"}
//                 name="password"
//                 value={formData.password}
//                 onChange={handleChange}
//                 placeholder="Enter admin password"
//                 autoComplete="current-password"
//               />
//               <button
//                 type="button"
//                 className="toggle-password"
//                 onClick={() => setShowPassword(!showPassword)}
//               >
//                 {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
//               </button>
//             </div>
//           </div>

//           <button type="submit" disabled={loading} className="submit-btn">
//             {loading ? (
//               <div className="btn-loading">
//                 <div className="spinner" />
//                 <span>Authenticating...</span>
//               </div>
//             ) : (
//               <div className="btn-content">
//                 <Shield size={18} />
//                 <span>Login as Admin</span>
//                 <ArrowRight size={18} />
//               </div>
//             )}
//           </button>
//         </form>

//         {/* Back link */}
//         <div className="admin-auth-footer">
//           <a href="/">← Back to ShareBazar</a>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminAuth;


