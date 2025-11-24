import { toast } from "react-toastify";
import api from "./axiosConfig";
import { redirect } from "react-router-dom";

export async function AddManagerAction({ request }) {
  try {
    const formData = await request.formData();

    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");
    const phone = formData.get("phone");
    // const isActive = formData.get("isActive") === "true";
    const clientId = formData.get("clientId"); // (if included hidden)
    const allowedRegionType = formData.get("allowedRegionType");
    const regionJson = formData.get("regionJson");

    // -----------------------------
    // 1️⃣ Build allowedRegion object
    // -----------------------------
    let allowedRegion;

    if (allowedRegionType === "all") {
      allowedRegion = "all";
    } else {
      if (!regionJson) {
        return {
          error: "Region JSON is required for Polygon or MultiPolygon.",
        };
      }

      // Validate JSON
      try {
        const parsed = JSON.parse(regionJson);

        // Ensure correct type
        if (allowedRegionType === "polygon" && parsed.type !== "Polygon") {
          return { error: "Region JSON must contain a valid Polygon GeoJSON." };
        }

        if (
          allowedRegionType === "multipolygon" &&
          parsed.type !== "MultiPolygon"
        ) {
          return {
            error: "Region JSON must contain a valid MultiPolygon GeoJSON.",
          };
        }

        allowedRegion = parsed;
      } catch (err) {
        console.log(err);
        return { error: "Invalid JSON format in Region JSON field." };
      }
    }

    // -----------------------------
    // 2️⃣ Prepare request payload
    // -----------------------------
    const payload = {
      name,
      email,
      password,
      phone,
      clientId,
      // isActive,
      allowedRegion,
    };

    try {
      // Axios POST request
      const res = await api.post(`/admin/add-manager`, payload, {
        headers: { "Content-Type": "application/json" },
      });

      toast.success(res?.data?.message || "manager Created");
      // Axios puts response data in res.data directly
      // return {
      //   success: true,
      //   message: "Manager created successfully!",
      //   manager: res.data.manager, // adjust if your backend sends it like this
      // };
      return redirect("/");
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
      console.log(error);

      // Axios attaches response details to error.response
      const msg = error?.response?.data?.message || "Failed to add manager.";
      return { error: msg };
    }
  } catch (err) {
    toast.error(err.message);
    console.error("AddManagerAction Error:", err);
    return { error: "Something went wrong while adding manager." };
  }
}

// -----------------------------
// 3️⃣ Send request to backend
// -----------------------------
//     const res = await fetch(
//       `${import.meta.env.VITE_API_URL}/api/manager/add`,
//       {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(payload),
//       }
//     );

//     const data = await res.json();

//     if (!res.ok) {
//       return { error: data.message || "Failed to add manager." };
//     }

//     return {
//       success: true,
//       message: "Manager created successfully!",
//       manager: data.manager,
//     };
