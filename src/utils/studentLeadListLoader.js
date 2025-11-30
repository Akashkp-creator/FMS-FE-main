import api from "./axiosConfig";

export const leadListLoader = async ({ request }) => {
  try {
    const url = new URL(request.url);

    // Extract query params
    const name = url.searchParams.get("name") || "";
    const status = url.searchParams.get("status") || "";
    const dateFrom = url.searchParams.get("dateFrom") || "";
    const dateTo = url.searchParams.get("dateTo") || "";
    const page = url.searchParams.get("page") || 1;
    const phone = url.searchParams.get("phone") || "";
    const pageSize = 10;
    // const pageSize = url.searchParams.get("pageSize") || 10;

    // API call
    const response = await api.get(
      "/LeadStudentData/student-leadList/my-leads",
      {
        params: { name, status, dateFrom, dateTo, page, pageSize, phone },
      }
    );
    // console.log(response);

    // return response.data; // returns { data:[], meta:{} ,}
    return {
      ...response.data, // { data: [], meta: {} }
      params: { name, status, dateFrom, dateTo, page, pageSize }, // Add your params
    };
  } catch (error) {
    console.error("Lead List Loader Error:", error);

    throw new Response("Failed to load leads", {
      status: error?.response?.status || 500,
    });
  }
};
