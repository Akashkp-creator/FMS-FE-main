// src/loaders/installmentPaymentsLoader.js

import api from "./axiosConfig";

// export async function installmentPaymentsLoader({ request }) {
//   const params = Object.fromEntries(
//     new URL(request.url).searchParams.entries()
//   );

//   // Build query string
//   const query = new URLSearchParams(params).toString();

//   try {
//     const res = await fetch(
//       `${import.meta.env.VITE_API_URL}/student/installment-payments?${query}`,
//       {
//         credentials: "include",
//       }
//     );

//     if (!res.ok) {
//       throw new Response("Failed to load data", { status: res.status });
//     }

//     const json = await res.json();
//     return json; // { success, data, meta }
//   } catch (err) {
//     throw new Response("Server error", { status: 500 });
//   }
// }

//import api from "../../utils/axiosConfig"; // Your axios instance

export async function installmentPaymentsLoader({ request }) {
  const params = Object.fromEntries(
    new URL(request.url).searchParams.entries()
  );

  try {
    const res = await api.get(
      "/student-data/Franchise/my-Student/paymentList",
      {
        params, // Automatically converts to query string
        // withCredentials: true // For cookies/JWT
      }
    );
    console.log(res.data);
    // return res.data; // { success, data, meta }
    return {
      ...res.data, // { data: [], meta: {} }
      params: {
        name: params.name,
        dueDateTo: params.dueDateTo,
        dueDateFrom: params.dueDateFrom,
        phone: params.phone,
      }, // Add your params
    };
  } catch (error) {
    // Axios error handling
    if (error.response) {
      // Server responded with error status
      throw new Response(
        error.response.data?.message || "Failed to load data",
        {
          status: error.response.status,
        }
      );
    } else {
      // Network error or other
      throw new Response("Server error", { status: 500 });
    }
  }
}
