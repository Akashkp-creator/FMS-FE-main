import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api", // ✅ adjust to your backend
  // baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000/api", // ✅ adjust to your backend
  withCredentials: true, // ✅ sends cookies along with requests
  headers: {
    "Content-Type": "application/json",
  },
});

// ✅ Optional: handle automatic logout or token errors globally
// api.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response && error.response.status === 401) {
//       console.warn("Unauthorized — token may have expired.");
//       // You can dispatch a logout action or redirect to login
//     }
//     return Promise.reject(error);
//   }
// );

export default api;
