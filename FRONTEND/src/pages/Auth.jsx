// src/pages/Auth.jsx
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { loginAPI, registerAPI } from "../services/api";
import {
  Mail,
  Lock,
  User,
  CreditCard,
  Eye,
  EyeOff,
  AlertCircle,
  CheckCircle,
  ArrowRight,
  TrendingUp,
} from "lucide-react";
import "../styles/Auth.css";

const Auth = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [fieldErrors, setFieldErrors] = useState({});

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    panNumber: "",
  });

  useEffect(() => {
    if (location.state?.isRegister === true) {
      setIsLogin(false);
    } else {
      setIsLogin(true);
    }
  }, [location]);

  // ✅ Clear everything when switching tabs
  const switchTab = (login) => {
    setIsLogin(login);
    setMessage({ type: "", text: "" });
    setFieldErrors({});
    setFormData({ username: "", email: "", password: "", panNumber: "" });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // ✅ Clear field error when user starts typing
    if (fieldErrors[name]) {
      setFieldErrors({ ...fieldErrors, [name]: "" });
    }
    setMessage({ type: "", text: "" });
  };

  // ✅ CLIENT-SIDE VALIDATION
  const validateForm = () => {
    const errors = {};

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      errors.email = "Please enter a valid email address";
    }

    // Password validation
    if (!formData.password) {
      errors.password = "Password is required";
    } else if (formData.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }

    // Registration-only validations
    if (!isLogin) {
      // Username
      if (!formData.username.trim()) {
        errors.username = "Full name is required";
      } else if (formData.username.trim().length < 2) {
        errors.username = "Name must be at least 2 characters";
      }

      // PAN validation (Indian PAN format: ABCDE1234F)
      const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
      if (!formData.panNumber.trim()) {
        errors.panNumber = "PAN number is required";
      } else if (!panRegex.test(formData.panNumber.toUpperCase())) {
        errors.panNumber =
          "Invalid PAN format. Expected: ABCDE1234F";
      }

      // Stronger password for registration
      if (formData.password && formData.password.length < 8) {
        errors.password = "Password must be at least 8 characters";
      }
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // ✅ PARSE SERVER ERRORS INTO READABLE MESSAGES
  const parseServerError = (error) => {
    // Check for response data
    if (error.response) {
      const status = error.response.status;
      const data = error.response.data;

      // 401 Unauthorized
      if (status === 401) {
        return "Invalid email or password. Please try again.";
      }

      // 403 Forbidden
      if (status === 403) {
        return "Access denied. Please check your credentials.";
      }

      // 404
      if (status === 404) {
        return "Account not found. Please register first.";
      }

      // 409 Conflict (duplicate email)
      if (status === 409) {
        return "This email is already registered. Please login instead.";
      }

      // 400 Bad Request with validation errors
      if (status === 400) {
        if (typeof data === "string") {
          return formatErrorMessage(data);
        }
        if (typeof data === "object") {
          // Handle Spring Boot validation errors
          if (data.message) return formatErrorMessage(data.message);
          if (data.error) return formatErrorMessage(data.error);

          // Handle field-level errors from Spring
          const fieldErrs = {};
          let hasFieldErrors = false;

          Object.entries(data).forEach(([key, value]) => {
            const fieldName = key.toLowerCase();
            if (
              fieldName.includes("email") ||
              fieldName.includes("username") ||
              fieldName.includes("password") ||
              fieldName.includes("pan")
            ) {
              const mappedField = fieldName.includes("email")
                ? "email"
                : fieldName.includes("username")
                ? "username"
                : fieldName.includes("password")
                ? "password"
                : "panNumber";
              fieldErrs[mappedField] = String(value);
              hasFieldErrors = true;
            }
          });

          if (hasFieldErrors) {
            setFieldErrors((prev) => ({ ...prev, ...fieldErrs }));
            return "Please fix the errors below.";
          }

          // Generic object errors
          return Object.values(data).join(". ");
        }
      }

      // 500 Server Error
      if (status === 500) {
        return "Server error. Please try again later.";
      }

      // Any other status with data
      if (data) {
        if (typeof data === "string") return formatErrorMessage(data);
        if (data.message) return formatErrorMessage(data.message);
        if (data.error) return formatErrorMessage(data.error);
      }
    }

    // Network errors
    if (error.code === "ERR_NETWORK") {
      return "Unable to connect to server. Please check your internet connection.";
    }

    if (error.message) {
      return formatErrorMessage(error.message);
    }

    return "Something went wrong. Please try again.";
  };

  // ✅ Format raw error messages into user-friendly text
  const formatErrorMessage = (msg) => {
    if (!msg) return "Something went wrong.";
    const str = String(msg);

    // Common raw error → friendly message mapping
    const errorMap = {
      "bad credentials": "Invalid email or password.",
      "user not found": "No account found with this email.",
      "email already exists": "This email is already registered. Please login.",
      "email already registered": "This email is already registered. Please login.",
      "duplicate": "This account already exists.",
      "invalid pan": "Invalid PAN card number format.",
      "pan already": "This PAN number is already registered.",
      "password too short": "Password must be at least 8 characters.",
      "invalid email": "Please enter a valid email address.",
      "unauthorized": "Invalid credentials. Please try again.",
      "access denied": "Access denied. Please check your credentials.",
      "expired": "Session expired. Please login again.",
    };

    const lowerMsg = str.toLowerCase();
    for (const [key, value] of Object.entries(errorMap)) {
      if (lowerMsg.includes(key)) return value;
    }

    // Capitalize first letter if raw message
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  // ✅ SUBMIT HANDLER
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Client-side validation first
    if (!validateForm()) {
      setMessage({ type: "error", text: "Please fix the errors below." });
      return;
    }

    setLoading(true);
    setMessage({ type: "", text: "" });
    setFieldErrors({});

    try {
      if (isLogin) {
        // ✅ LOGIN
        const response = await loginAPI({
          email: formData.email.trim(),
          password: formData.password,
        });

        if (response && response.token) {
          localStorage.setItem("token", response.token);
          setMessage({
            type: "success",
            text: "Login successful! Redirecting...",
          });
          setTimeout(() => navigate("/explore"), 1500);
        } else {
          setMessage({
            type: "error",
            text: "Login failed. Invalid response from server.",
          });
        }
      } else {
        // ✅ REGISTER
        const payload = {
          username: formData.username.trim(),
          email: formData.email.trim(),
          password: formData.password,
          pan: formData.panNumber.toUpperCase().trim(),
        };

        const response = await registerAPI(payload);

        setMessage({
          type: "success",
          text:
            typeof response === "string"
              ? response
              : "Registration successful! Please login.",
        });

        // ✅ Switch to login after 2 seconds
        setTimeout(() => {
          switchTab(true);
          // Keep email for convenience
          setFormData((prev) => ({
            username: "",
            email: prev.email,
            password: "",
            panNumber: "",
          }));
        }, 2000);
      }
    } catch (error) {
      console.error("Auth error:", error);
      const errorMessage = parseServerError(error);
      setMessage({ type: "error", text: errorMessage });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      {/* Background decoration */}
      <div className="auth-bg">
        <div className="bg-circle circle-1" />
        <div className="bg-circle circle-2" />
        <div className="bg-circle circle-3" />
      </div>

      <div className="auth-container">
        {/* Left side - Branding */}
        <div className="auth-branding">
          <div className="brand-content">
            <div className="brand-logo">
              <TrendingUp size={28} />
              <span>ShareBazar</span>
            </div>
            <h2>Start your investment journey</h2>
            <p>
              Join thousands of investors building their wealth with ShareBazar's
              smart portfolio management.
            </p>

            <div className="brand-features">
              <div className="feature-item">
                <CheckCircle size={16} />
                <span>Real-time stock prices</span>
              </div>
              <div className="feature-item">
                <CheckCircle size={16} />
                <span>Multiple portfolio support</span>
              </div>
              <div className="feature-item">
                <CheckCircle size={16} />
                <span>Instant buy & sell</span>
              </div>
              <div className="feature-item">
                <CheckCircle size={16} />
                <span>Secure wallet system</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right side - Form */}
        <div className="auth-form-section">
          <div className="auth-card">
            {/* Tab Toggle */}
            <div className="auth-tabs">
              <button
                onClick={() => switchTab(true)}
                className={`auth-tab ${isLogin ? "active" : ""}`}
              >
                Login
              </button>
              <button
                onClick={() => switchTab(false)}
                className={`auth-tab ${!isLogin ? "active" : ""}`}
              >
                Register
              </button>
              <div
                className={`tab-indicator ${isLogin ? "left" : "right"}`}
              />
            </div>

            <div className="form-body">
              <h2 className="form-title">
                {isLogin ? "Welcome back!" : "Create your account"}
              </h2>
              <p className="form-subtitle">
                {isLogin
                  ? "Enter your credentials to access your portfolio"
                  : "Fill in the details to get started"}
              </p>

              {/* ✅ Global Message */}
              {message.text && (
                <div className={`auth-message ${message.type}`}>
                  {message.type === "success" ? (
                    <CheckCircle size={16} />
                  ) : (
                    <AlertCircle size={16} />
                  )}
                  <span>{message.text}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="auth-form" noValidate>
                {/* Username (Register only) */}
                {!isLogin && (
                  <div className={`form-group ${fieldErrors.username ? "has-error" : ""}`}>
                    <label>Full Name</label>
                    <div className="input-wrapper">
                      <User size={18} className="input-icon" />
                      <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        placeholder="Enter your full name"
                        autoComplete="name"
                      />
                    </div>
                    {fieldErrors.username && (
                      <span className="field-error">
                        <AlertCircle size={12} />
                        {fieldErrors.username}
                      </span>
                    )}
                  </div>
                )}

                {/* Email */}
                <div className={`form-group ${fieldErrors.email ? "has-error" : ""}`}>
                  <label>Email Address</label>
                  <div className="input-wrapper">
                    <Mail size={18} className="input-icon" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      autoComplete="email"
                    />
                  </div>
                  {fieldErrors.email && (
                    <span className="field-error">
                      <AlertCircle size={12} />
                      {fieldErrors.email}
                    </span>
                  )}
                </div>

                {/* Password */}
                <div className={`form-group ${fieldErrors.password ? "has-error" : ""}`}>
                  <label>Password</label>
                  <div className="input-wrapper">
                    <Lock size={18} className="input-icon" />
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder={
                        isLogin
                          ? "Enter your password"
                          : "Minimum 8 characters"
                      }
                      autoComplete={isLogin ? "current-password" : "new-password"}
                    />
                    <button
                      type="button"
                      className="toggle-password"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff size={18} />
                      ) : (
                        <Eye size={18} />
                      )}
                    </button>
                  </div>
                  {fieldErrors.password && (
                    <span className="field-error">
                      <AlertCircle size={12} />
                      {fieldErrors.password}
                    </span>
                  )}
                  {/* Password strength indicator (Register only) */}
                  {!isLogin && formData.password && (
                    <div className="password-strength">
                      <div
                        className={`strength-bar ${
                          formData.password.length >= 12
                            ? "strong"
                            : formData.password.length >= 8
                            ? "medium"
                            : "weak"
                        }`}
                      >
                        <div
                          className="strength-fill"
                          style={{
                            width:
                              formData.password.length >= 12
                                ? "100%"
                                : formData.password.length >= 8
                                ? "66%"
                                : `${Math.min(
                                    (formData.password.length / 8) * 33,
                                    33
                                  )}%`,
                          }}
                        />
                      </div>
                      <span
                        className={`strength-text ${
                          formData.password.length >= 12
                            ? "strong"
                            : formData.password.length >= 8
                            ? "medium"
                            : "weak"
                        }`}
                      >
                        {formData.password.length >= 12
                          ? "Strong"
                          : formData.password.length >= 8
                          ? "Medium"
                          : "Weak"}
                      </span>
                    </div>
                  )}
                </div>

                {/* PAN Number (Register only) */}
                {!isLogin && (
                  <div className={`form-group ${fieldErrors.panNumber ? "has-error" : ""}`}>
                    <label>PAN Card Number</label>
                    <div className="input-wrapper">
                      <CreditCard size={18} className="input-icon" />
                      <input
                        type="text"
                        name="panNumber"
                        value={formData.panNumber}
                        onChange={handleChange}
                        placeholder="ABCDE1234F"
                        maxLength={10}
                        style={{ textTransform: "uppercase" }}
                        autoComplete="off"
                      />
                    </div>
                    {fieldErrors.panNumber && (
                      <span className="field-error">
                        <AlertCircle size={12} />
                        {fieldErrors.panNumber}
                      </span>
                    )}
                    {!fieldErrors.panNumber && formData.panNumber && (
                      <span className="field-hint">
                        Format: 5 letters + 4 digits + 1 letter (e.g.,
                        ABCDE1234F)
                      </span>
                    )}
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="submit-btn"
                >
                  {loading ? (
                    <div className="btn-loading">
                      <div className="spinner" />
                      <span>Processing...</span>
                    </div>
                  ) : (
                    <div className="btn-content">
                      <span>{isLogin ? "Login" : "Create Account"}</span>
                      <ArrowRight size={18} />
                    </div>
                  )}
                </button>
              </form>

              {/* Switch text */}
              <div className="switch-text">
                {isLogin ? (
                  <p>
                    Don't have an account?{" "}
                    <button onClick={() => switchTab(false)}>
                      Register here
                    </button>
                  </p>
                ) : (
                  <p>
                    Already have an account?{" "}
                    <button onClick={() => switchTab(true)}>
                      Login here
                    </button>
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;