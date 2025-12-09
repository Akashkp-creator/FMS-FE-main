import api from "./axiosConfig";

export const channelPartnerStudentsLoader = async ({ request }) => {
  try {
    const url = new URL(request.url);

    const name = url.searchParams.get("name") || "";
    const phone = url.searchParams.get("phone") || "";
    const page = url.searchParams.get("page") || 1; // ✅ IMPORTANT

    const response = await api.get("/channel-partner/list/students", {
      params: { name, phone, page }, // ✅ MUST SEND PAGE
    });
    console.log("response" + response.data);

    return {
      ...response.data,
      params: { name, phone, page },
    };
  } catch (error) {
    throw new Response("Failed to load data", {
      status: error?.response?.status || 500,
    });
  }
};
