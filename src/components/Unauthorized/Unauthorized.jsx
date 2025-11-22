// src/components/Unauthorized.jsx
import React from "react";
import { Shield, ArrowLeft, Home, LogIn, AlertTriangle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import styles from "./Unauthorized.module.css";

const Unauthorized = ({
  message = "You don't have permission to access this page.",
  showHomeButton = true,
  showLoginButton = true,
}) => {
  const navigate = useNavigate();

  return (
    <div className={styles.unauthorizedContainer}>
      {/* Background Effects */}
      <div className={styles.backgroundEffects}>
        <div className={styles.glowCircle1}></div>
        <div className={styles.glowCircle2}></div>
        <div className={styles.glowCircle3}></div>
      </div>

      {/* Main Content */}
      <div className={styles.contentWrapper}>
        {/* 3D Glass Card */}
        <div className={styles.glassCard}>
          {/* Icon Section */}
          <div className={styles.iconSection}>
            <div className={styles.iconWrapper}>
              <Shield className={styles.mainIcon} />
              <div className={styles.iconGlow}></div>
            </div>
            <div className={styles.warningIcon}>
              <AlertTriangle size={24} />
            </div>
          </div>

          {/* Text Content */}
          <div className={styles.textContent}>
            <h1 className={styles.title}>Access Denied</h1>
            <h2 className={styles.subtitle}>401 Unauthorized</h2>
            <p className={styles.message}>{message}</p>
          </div>

          {/* Action Buttons */}
          <div className={styles.actionButtons}>
            <button className={styles.backButton} onClick={() => navigate(-1)}>
              <ArrowLeft size={18} />
              <span>Go Back</span>
            </button>

            {showHomeButton && (
              <button
                className={styles.homeButton}
                onClick={() => navigate("/")}
              >
                <Home size={18} />
                <span>Home Page</span>
              </button>
            )}

            {showLoginButton && (
              <button
                className={styles.loginButton}
                onClick={() => navigate("/login")}
              >
                <LogIn size={18} />
                <span>Login Again</span>
              </button>
            )}
          </div>

          {/* Help Text */}
          <div className={styles.helpText}>
            <p>
              If you believe this is an error, please contact your
              administrator.
            </p>
          </div>
        </div>

        {/* Floating Security Elements */}
        <div className={styles.floatingLock}></div>
        <div className={styles.floatingShield}></div>
        <div className={styles.floatingKey}></div>
      </div>
    </div>
  );
};

export default Unauthorized;
