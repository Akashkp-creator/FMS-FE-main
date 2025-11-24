// export const addFranchiseLeadAction = async ({ request }) => {
//   const formData = await request.formData();

//   const data = {
//     ownerName: formData.get("ownerName"),
//     ownerEmail: formData.get("ownerEmail"),
//     ownerPhone: formData.get("ownerPhone"),
//     fullAddress: formData.get("fullAddress"),
//   };

//   const res = await fetch("http://localhost:5000/api/manager/franchise-lead", {
//     method: "POST",
//     credentials: "include", // if using cookies/JWT
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(data),
//   });

//   if (!res.ok) {
//     return { error: true, message: "Failed to create lead" };
//   }

//   return await res.json();
// };

// import axios from "axios";
import { toast } from "react-toastify";
import api from "./axiosConfig";

export const addFranchiseLeadAction = async ({ request }) => {
  try {
    const formData = await request.formData();

    // const data = {
    //   ownerName: formData.get("ownerName"),
    //   ownerEmail: formData.get("ownerEmail"),
    //   ownerPhone: formData.get("ownerPhone"),
    //   fullAddress: formData.get("fullAddress"),
    // };
    // collect address fields
    const house = formData.get("house");
    const street = formData.get("street");
    const locality = formData.get("locality");
    const city = formData.get("city");
    const district = formData.get("district");
    const state = formData.get("state");
    const pincode = formData.get("pincode");

    // merge into one clean full address
    const fullAddress = `${house}, ${street}, ${locality}, ${city}, ${district}, ${state} - ${pincode}`;

    const data = {
      ownerName: formData.get("ownerName"),
      ownerEmail: formData.get("ownerEmail"),
      ownerPhone: formData.get("ownerPhone"),
      fullAddress, // final merged address
    };
    console.log(data);
    // return null;

    const res = await api.post("/manager/franchise/create", data, {
      withCredentials: true, // for cookies/JWT
      headers: {
        "Content-Type": "application/json",
      },
    });

    toast.success(res.data.message || "Lead created successfully");

    return res.data; // assuming your API returns JSON
  } catch (error) {
    const msg =
      error?.response?.data?.message ||
      "Failed to create lead. Please try again.";
    toast.error(msg);
    return { error: true, message: msg };
  }
};
