// PDFDownloadButton.jsx
import React, { useState } from "react";
import axios from "axios";
import styles from "./PDFDownloadButton.module.css";

const PDFDownloadButton = ({
  studentId,
  installmentNo,
  buttonText = "Download PDF",
}) => {
  const [loading, setLoading] = useState(false);

  const handleDownload = async () => {
    try {
      setLoading(true);
      // "/payment-slips/download/:studentId/installment/:installmentNo"
      const response = await axios.get(
        `http://localhost:3000/api/student-payment-slip/payment-slips/download/${studentId}/installment/${installmentNo}`,
        {
          responseType: "blob", // Important for PDF download
          withCredentials: true,
        }
      );

      // Create blob from response
      const blob = new Blob([response.data], { type: "application/pdf" });

      // Create download link
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;

      // Generate filename
      const fileName = `payment-slip-${studentId}-${installmentNo}.pdf`;
      link.setAttribute("download", fileName);

      // Trigger download
      document.body.appendChild(link);
      link.click();

      // Cleanup
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading PDF:", error);
      alert("Failed to download PDF. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      className={styles.downloadButton}
      onClick={handleDownload}
      disabled={loading}
    >
      {loading ? (
        <>
          <span className={styles.spinner}></span>
          Generating...
        </>
      ) : (
        <>
          <svg
            className={styles.pdfIcon}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          {buttonText}
        </>
      )}
    </button>
  );
};

export default PDFDownloadButton;
