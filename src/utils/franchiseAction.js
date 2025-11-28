// // src/actions/franchiseAction.js
// export async function AddFranchiseAction({ request }) {
//   try {
//     const formData = await request.formData();

//     // --- Extract Franchise Fields ---
//     const franchiseName = formData.get("franchiseName");
//     const managerId = formData.get("managerId");
//     const address = formData.get("address");

//     // Location comes as string => "12.345, 77.123"
//     const locationString = formData.get("location");
//     const [lng, lat] = locationString.split(",").map(Number);

//     // --- Extract Payment Fields ---
//     const franchiseFee = Number(formData.get("franchiseFee"));
//     const depositAmount = Number(formData.get("depositAmount"));
//     const extraCharges = Number(formData.get("extraCharges"));
//     const yearlyRenewalFee = Number(formData.get("yearlyRenewalFee"));
//     const refundAmount = Number(formData.get("refundAmount"));
//     const discount = Number(formData.get("discount"));

//     // Calculate net total (optional)
//     const netTotal =
//       franchiseFee +
//       depositAmount +
//       extraCharges +
//       yearlyRenewalFee -
//       refundAmount -
//       discount;

//     // --- Payload to Backend ---
//     const payload = {
//       franchiseName,
//       managerId,
//       address,
//       location: {
//         type: "Point",
//         coordinates: [lng, lat],
//       },
//       payment: {
//         franchiseFee,
//         depositAmount,
//         extraCharges,
//         yearlyRenewalFee,
//         refundAmount,
//         discount,
//         netTotal,
//       },
//     };

//     // --- Send to Backend ---
//     const response = await fetch("http://localhost:5000/api/franchise", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(payload),
//     });

//     const result = await response.json();

//     if (!response.ok) {
//       return { error: result.message || "Failed to add franchise" };
//     }

//     return { success: true, data: result };
//   } catch (error) {
//     console.error("Action error:", error);
//     return { error: error.message || "Something went wrong" };
//   }
// }

// // import axios from "axios";
// import api from "./axiosConfig";

// export async function AddFranchiseAction({ request }) {
//   try {
//     const formData = await request.formData();

//     // --- Extract Franchise Fields ---
//     const franchiseName = formData.get("franchiseName");
//     // const managerId = formData.get("managerId");
//     const address = formData.get("address");

//     // FIXED LOCATION HANDLING
//     const lng = Number(formData.get("lng"));
//     const lat = Number(formData.get("lat"));

//     if (isNaN(lng) || isNaN(lat)) {
//       return { error: "Longitude and Latitude are required" };
//     }

//     // --- Extract Payment Fields ---
//     const franchiseFee = Number(formData.get("franchiseFee"));
//     const depositAmount = Number(formData.get("depositAmount"));
//     const extraCharges = Number(formData.get("extraCharges"));
//     const yearlyRenewalFee = Number(formData.get("yearlyRenewalFee"));
//     const refundAmount = Number(formData.get("refundAmount"));
//     const discount = Number(formData.get("discount"));
//     const netTotal = Number(formData.get("netTotal"));
//     const franchiseUserName = formData.get("franchiseUserName");
//     const franchisePassword = formData.get("franchisePassword");

//     // Calculate net total (optional)
//     // const netTotal =
//     //   franchiseFee +
//     //   depositAmount +
//     //   extraCharges +
//     //   yearlyRenewalFee -
//     //   refundAmount -
//     //   discount;

//     // --- Payload to Backend ---
//     const payload = {
//       franchiseName,
//       //   managerId,
//       franchisePassword,
//       franchiseUserName,
//       address,
//       location: {
//         type: "Point",
//         coordinates: [lng, lat],
//       },
//       payment: {
//         franchiseFee,
//         depositAmount,
//         extraCharges,
//         yearlyRenewalFee,
//         refundAmount,
//         discount,
//         netTotal,
//       },
//     };
//     console.log(payload);
//     // --- Send to Backend using Axios ---
//     const response = await api.post(
//       "/manager/franchise/create-franchise/:FranchiseLeadId",
//       payload,
//       {
//         headers: { "Content-Type": "application/json" },
//       }
//     );

//     // Axios automatically parses JSON in response.data
//     return { success: true, data: response.data };
//   } catch (error) {
//     console.error("Action error:", error);
//     // Extract message from server response if any, else fallback
//     const msg =
//       error?.response?.data?.message || error.message || "Something went wrong";
//     return { error: msg };
//   }
// }
import { toast } from "react-toastify";
import api from "./axiosConfig";

export async function AddFranchiseAction({ request, params }) {
  try {
    const formData = await request.formData();

    // =============================================
    // REQUIRED: FranchiseLeadId from route params
    const { FranchiseLeadId } = params;

    if (!FranchiseLeadId) {
      return { error: "Franchise Lead ID is missing in the URL." };
    }

    // --- Extract Franchise Fields ---
    const franchiseName = formData.get("franchiseName");
    const address = formData.get("address");

    // --- Proper Location Handling ---
    const lng = Number(formData.get("lng"));
    const lat = Number(formData.get("lat"));

    if (isNaN(lng) || isNaN(lat)) {
      return { error: "Valid latitude & longitude required." };
    }

    // ⭐⭐⭐ ADD VALIDATION HERE ⭐⭐⭐

    if (lat < -90 || lat > 90) {
      toast.error("Latitude must be between -90 and 90");
      return { error: "Invalid latitude" };
    }

    if (lng < -180 || lng > 180) {
      toast.error("Longitude must be between -180 and 180");
      return { error: "Invalid longitude" };
    }
    // =============================================

    // --- Payment Fields ---
    const franchiseFee = Number(formData.get("franchiseFee"));
    const depositAmount = Number(formData.get("depositAmount"));
    const extraCharges = Number(formData.get("extraCharges"));
    const yearlyRenewalFee = Number(formData.get("yearlyRenewalFee"));
    const nonRefundAmount = Number(formData.get("nonRefundAmount"));
    const discount = Number(formData.get("discount"));
    const netTotal = Number(formData.get("netTotal"));

    // Franchise login creation fields
    const ownerName = formData.get("ownerName");
    const franchisePassword = formData.get("franchisePassword");
    const franchiseEmail = formData.get("franchiseEmail");
    const ownerPhone = formData.get("ownerPhone");

    // --- Payload to Backend ---
    const payload = {
      franchiseName,
      ownerName,
      ownerPhone,
      franchisePassword,
      franchiseEmail,
      address,
      location: {
        type: "Point",
        coordinates: [lng, lat], // backend expects [lng, lat]
      },
      payment: {
        franchiseFee,
        depositAmount,
        extraCharges,
        yearlyRenewalFee,
        nonRefundAmount,
        discount,
        netTotal,
      },
    };

    // console.log("FINAL PAYLOAD:", payload);
    // return null;
    // --- SEND TO BACKEND ---
    const response = await api.post(
      `/manager/franchise/create-franchise/${FranchiseLeadId}`,
      payload,
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    // console.log(response.data);
    toast.success(response?.data?.message || "Franchise created");
    return { success: true, data: response.data };
  } catch (error) {
    console.error("Action error:", error);
    toast.error(`${error?.response?.data?.message}` || "Something went wrong");

    const msg =
      error?.response?.data?.message || error.message || "Something went wrong";

    return { error: msg };
  }
}
