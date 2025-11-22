// src/pages/Login.jsx
import React, { useState } from "react";
import {
  //   useNavigate,
  Link,
  useNavigation,
  useRouteError,
  Form,
  //   useActionData,
  //   redirect,
} from "react-router-dom";

import {
  Eye,
  EyeOff,
  LogIn,
  Building2,
  Mail,
  Lock,
  AlertCircle,
  Home,
} from "lucide-react";

import styles from "./Login.module.css";

const Login = () => {
  const navigation = useNavigation();
  //   const data = useActionData();
  //   console.log(data);

  // Check if the app is currently navigating (loading a route)
  const isLoading = navigation.state === "loading";
  const error = useRouteError();

  //   const navigate = useNavigate();
  //   const [formData, setFormData] = useState({
  //     email: "",
  //     password: "",
  //   });
  const [showPassword, setShowPassword] = useState(false);
  //   const [isLoading, setIsLoading] = useState(false);
  //   const [error, setError] = useState("");

  //   const handleChange = (e) => {
  //     const { name, value } = e.target;
  //     setFormData((prev) => ({
  //       ...prev,
  //       [name]: value,
  //     }));
  //     // Clear error when user starts typing
  //     if (error) setError("");
  //   };

  //   const handleSubmit = async (e) => {
  //     e.preventDefault();
  //     setIsLoading(true);
  //     setError("");

  //     try {
  //       const response = await api.login(formData);
  //       console.log(response);

  //       // if (response.data.user) {
  //       //   // Store user data in localStorage (optional - you're using cookies)
  //       //   localStorage.setItem("user", JSON.stringify(response.data.user));

  //       //   // Redirect based on user role
  //       //   const { role } = response.data.user;
  //       //   switch (role) {
  //       //     case "Admin":
  //       //       navigate("/admin/dashboard");
  //       //       break;
  //       //     case "Manager":
  //       //       navigate("/manager/dashboard");
  //       //       break;
  //       //     case "Franchise":
  //       //       navigate("/franchise/dashboard");
  //       //       break;
  //       //     case "ChannelPartner":
  //       //       navigate("/partner/dashboard");
  //       //       break;
  //       //     default:
  //       //       navigate("/dashboard");
  //       //   }
  //       // }
  //     } catch (err) {
  //       setError(
  //         err.response?.data?.message ||
  //           "Login failed. Please check your credentials and try again."
  //       );
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };

  // const handleDemoLogin = (role) => {
  //   const demoCredentials = {
  //     Admin: { email: "admin@franchisepro.com", password: "demo123" },
  //     Manager: { email: "manager@franchisepro.com", password: "demo123" },
  //     Franchise: { email: "franchise@franchisepro.com", password: "demo123" },
  //     ChannelPartner: {
  //       email: "partner@franchisepro.com",
  //       password: "demo123",
  //     },
  //   };

  //   setFormData(demoCredentials[role]);
  // };

  return (
    <div className={styles.loginContainer}>
      {/* Background Effects */}
      <div className={styles.backgroundEffects}>
        <div className={styles.glowCircle1}></div>
        <div className={styles.glowCircle2}></div>
        <div className={styles.glowCircle3}></div>
      </div>

      <div className={styles.loginContent}>
        {/* Left Side - Branding */}
        <div className={styles.brandSection}>
          <div className={styles.brandContent}>
            <div className={styles.logo}>
              <Building2 className={styles.logoIcon} />
              <span className={styles.logoText}>Snipe Partner</span>
            </div>
            <h1 className={styles.welcomeTitle}>Welcome Back</h1>
            <p className={styles.welcomeSubtitle}>
              Streamline your franchise operations with our powerful management
              platform
            </p>

            {/* Demo Login Buttons */}
            {/* <div className={styles.demoSection}>
              <h3>Quick Demo Access</h3>
              <div className={styles.demoButtons}>
                <button
                  className={styles.demoButton}
                  onClick={() => handleDemoLogin("Admin")}
                >
                  Admin Demo
                </button>
                <button
                  className={styles.demoButton}
                  onClick={() => handleDemoLogin("Manager")}
                >
                  Manager Demo
                </button>
                <button
                  className={styles.demoButton}
                  onClick={() => handleDemoLogin("Franchise")}
                >
                  Franchise Demo
                </button>
                <button
                  className={styles.demoButton}
                  onClick={() => handleDemoLogin("ChannelPartner")}
                >
                  Partner Demo
                </button>
              </div>
            </div> */}
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className={styles.formSection}>
          <div className={styles.glassCard}>
            <div className={styles.formHeader}>
              <h2>Sign In to Your Account</h2>
              <p>Enter your credentials to access the dashboard</p>
            </div>

            {/* Error Message */}
            {error && (
              <div className={styles.errorAlert}>
                <AlertCircle size={18} />
                <span>{error}</span>
              </div>
            )}

            <Form method="POST" className={styles.loginForm}>
              {/* Email Field */}
              <div className={styles.formGroup}>
                <label htmlFor="email" className={styles.formLabel}>
                  <Mail size={18} />
                  <span>Email Address</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  //   value={formData.email}
                  //   onChange={handleChange}
                  className={styles.formInput}
                  placeholder="Enter your email"
                  required
                  disabled={isLoading}
                />
              </div>

              {/* Password Field */}
              <div className={styles.formGroup}>
                <label htmlFor="password" className={styles.formLabel}>
                  <Lock size={18} />
                  <span>Password</span>
                </label>
                <div className={styles.passwordInputWrapper}>
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    // value={formData.password}
                    // onChange={handleChange}
                    className={styles.formInput}
                    placeholder="Enter your password"
                    required
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    className={styles.passwordToggle}
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={isLoading}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {/* Remember Me & Forgot Password */}
              {/* <div className={styles.formOptions}>
                <label className={styles.rememberMe}>
                  <input type="checkbox" />
                  <span>Remember me</span>
                </label>
                <Link to="/forgot-password" className={styles.forgotPassword}>
                  Forgot password?
                </Link>
              </div> */}

              {/* Submit Button */}
              <button
                type="submit"
                className={styles.submitButton}
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className={styles.loadingSpinner}></div>
                ) : (
                  <>
                    <LogIn size={18} />
                    <span>Sign In</span>
                  </>
                )}
              </button>

              {/* Divider */}
              {/* <div className={styles.divider}>
                <span>or continue with</span>
              </div> */}

              {/* Demo Login Quick Access */}
              {/* <div className={styles.quickDemo}>
                <p>Quick access for testing:</p>
                <div className={styles.quickDemoButtons}>
                  <button
                    type="button"
                    className={styles.quickDemoButton}
                    onClick={() => handleDemoLogin("Admin")}
                    disabled={isLoading}
                  >
                    Admin
                  </button>
                  <button
                    type="button"
                    className={styles.quickDemoButton}
                    onClick={() => handleDemoLogin("Franchise")}
                    disabled={isLoading}
                  >
                    Franchise
                  </button>
                </div>
              </div> */}
            </Form>

            {/* Footer Links */}

            {/* <div className={styles.formFooter}>
              <p>
                Don't have an account?{" "}
                <Link to="/contact" className={styles.footerLink}>
                  Contact Us
                </Link>
              </p>
              <p>
                Don't have an account?{" "}
                <Link to="/contact" className={styles.footerLink}>
                  Contact Us
                </Link>
              </p>
            </div> */}
            <div className={styles.formFooter}>
              <p>
                {" "}
                <Link to="/" className={styles.footerLink}>
                  <Home size={16} className={styles.icon} /> Home
                </Link>
              </p>
              <p>
                Don’t have an account?{" "}
                <Link to="/contact" className={styles.footerLink}>
                  Contact Us
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
