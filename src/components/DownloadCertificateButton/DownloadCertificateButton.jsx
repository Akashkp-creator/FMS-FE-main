// // components/DownloadCertificateButton.jsx
// import React, { useState } from "react";

// // import api from "../../utils/axiosConfig";
// import axios from "axios";

// const DownloadCertificateButton = ({ franchiseId }) => {
//   const [loading, setLoading] = useState(false);

//   const handleDownload = async () => {
//     setLoading(true);
//     try {
//       // 1. Make the GET request to the backend route
//       const res = await axios.get(
//         `http://localhost:3000/api/certificate/franchise/certificate/${franchiseId}`,
//         {
//           // responseType: "blob" is crucial for binary data like files
//           responseType: "blob",
//           // withCredentials: true ensures cookies are sent automatically by the browser
//           withCredentials: true,
//           // No manual Authorization header needed as the cookie is sent automatically
//         }
//       );

//       // Create blob and download
//       const blob = new Blob([res.data], { type: "application/pdf" });
//       const url = window.URL.createObjectURL(blob);
//       const a = document.createElement("a");
//       a.href = url;
//       a.download = `certificate-${franchiseId}.pdf`;
//       document.body.appendChild(a);
//       a.click();
//       a.remove();
//       window.URL.revokeObjectURL(url);
//     } catch (err) {
//       if (err.response && err.response.data instanceof Blob) {
//         const text = await err.response.data.text();
//         console.log("Error message:", text);
//       }

//       // console.error(err);
//       alert("Failed to download certificate");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <button onClick={handleDownload} disabled={loading}>
//       {loading ? "Preparing…" : "Download Certificate"}
//     </button>
//   );
// };

// export default DownloadCertificateButton;
// ======================================================2nd
import axios from "axios";
import { useState } from "react";

const DownloadCertificateButton = ({ franchiseId }) => {
  const [loading, setLoading] = useState(false);

  const handleDownload = async () => {
    setLoading(true);

    try {
      const res = await axios.get(
        `http://localhost:3000/api/certificate/franchise/certificate/${franchiseId}`,
        {
          responseType: "blob",
          withCredentials: true,
        }
      );

      // extract filename from header
      let fileName = "certificate.pdf";
      const disposition = res.headers["content-disposition"];

      if (disposition && disposition.includes("filename=")) {
        fileName = disposition.split("filename=")[1].replace(/"/g, "");
      }

      // create blob
      const blob = new Blob([res.data], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      a.remove();

      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.log(err);
      alert("Failed to download certificate");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button onClick={handleDownload} disabled={loading}>
      {loading ? "Preparing..." : "Download Certificate"}
    </button>
  );
};

export default DownloadCertificateButton;
