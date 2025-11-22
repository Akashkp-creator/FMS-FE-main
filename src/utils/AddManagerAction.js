export async function AddManagerAction({ request }) {
  try {
    const formData = await request.formData();

    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");
    const phone = formData.get("phone");
    const isActive = formData.get("isActive") === "true";
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
      isActive,
      allowedRegion,
    };
    console.log(payload);
    return null;
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
  } catch (err) {
    console.error("AddManagerAction Error:", err);
    return { error: "Something went wrong while adding manager." };
  }
}
