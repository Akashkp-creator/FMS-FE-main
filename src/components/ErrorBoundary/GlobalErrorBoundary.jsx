import React from "react";
import { useRouteError, Link } from "react-router-dom";
import styles from "./GlobalErrorBoundary.module.css";

const GlobalErrorBoundary = () => {
  const error = useRouteError();
  console.log(error);

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        {/* <div className={styles.oopsText}>404</div> */}

        <h1 className={styles.title}>
          {error?.status === 404
            ? "Page Not Found"
            : error?.message || "Something went wrong"}
        </h1>

        <p className={styles.message}>
          {error?.status === 404
            ? "The page you’re looking for doesn’t exist or has been moved."
            : "An unexpected error has occurred."}
        </p>

        <div className={styles.actions}>
          <Link to="/" className={styles.homeButton}>
            Go Home
          </Link>
          <button
            onClick={() => window.location.reload()}
            className={styles.refreshButton}
          >
            Refresh Page
          </button>
        </div>
      </div>
    </div>
  );
};

export default GlobalErrorBoundary;
