// import axios from "axios";
import api from "./axiosConfig";

export const franchiseCoursesLoader = async () => {
  try {
    const response = await api.get("/getLeadStudentData/courses-details");

    return response.data; // Loader must return data
  } catch (error) {
    // Handle expected backend errors
    const message =
      error?.response?.data?.message || "Failed to fetch franchise courses";

    throw new Response(message, {
      status: error?.response?.status || 500,
    });
  }
};
