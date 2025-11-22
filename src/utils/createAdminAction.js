// src/actions/createAdminAction.js
// import axios from "../utils/axiosConfig";

import { toast } from "react-toastify";
import api from "./axiosConfig";

export async function createAdminAction({ request }) {
  try {
    const formData = await request.formData();
    //  const data = Object.fromEntries(formData);

    //       const institutionName = formData.get("institutionName");
    //   const addressLine1 = formData.get("addressLine1");
    //   const addressLine2 = formData.get("addressLine2");
    //   const city = formData.get("city");
    //   const state = formData.get("state");
    //   const pincode = formData.get("pincode");

    //   const institutionAddress = `
    //     ${addressLine1},
    //     ${addressLine2 ? addressLine2 + "," : ""}
    //     ${city}, ${state} - ${pincode}
    //   `.replace(/\s+/g, " ").trim();

    // ---------------------------
    // Extract form fields
    // ---------------------------
    const institutionName = formData.get("institutionName");
    const addressLine1 = formData.get("addressLine1");
    const addressLine2 = formData.get("addressLine2");
    const city = formData.get("city");
    const state = formData.get("state");
    const pincode = formData.get("pincode");

    const institutionPhone = formData.get("institutionPhone");
    const logoUrl = formData.get("logoUrl");

    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");

    // ---------------------------
    // Concatenate Address
    // ---------------------------
    const institutionAddress = `${addressLine1}, ${addressLine2}, ${city}, ${state} - ${pincode}`;

    // ---------------------------
    // Prepare Payload
    // ---------------------------
    const payload = {
      institutionName,
      institutionAddress,
      institutionPhone,
      logoUrl,
      name,
      email,
      password,
    };
    console.log(payload);
    // ---------------------------
    // API Call
    // ---------------------------
    const res = await api.post("/user/create-admin", payload);
    toast.success(res?.data?.message || "Admin Created");
    console.log(res);
    // return null;

    return {
      ok: true,
      message: res.data.message,
      admin: res.data.admin,
      client: res.data.client,
    };
  } catch (error) {
    return {
      ok: false,
      message: error.response?.data?.message || "Something went wrong",
    };
  }
}

// export const createAdminAction = async ({ request }) => {
//   const formData = await request.formData();

//   const payload = {
//     institutionName,
//     institutionAddress,
//     institutionPhone: formData.get("institutionPhone"),
//     logoUrl: formData.get("logoUrl"),
//     name: formData.get("name"),
//     email: formData.get("email"),
//     password: formData.get("password"),
//   };

//   const res = await fetch("/api/superadmin/create-admin", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     credentials: "include",
//     body: JSON.stringify(payload),
//   });

//   if (!res.ok) {
//     const error = await res.json();
//     throw new Error(error.message || "Failed to create Admin");
//   }

//   return { success: true };
// };
