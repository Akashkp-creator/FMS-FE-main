// routes/studentPaymentsLoader.js
// import api from "../../utils/axiosConfig"; // adjust path

import api from "./axiosConfig";

export async function studentPaymentsLoader({ params }) {
  const { studentId } = params;
  //   console.log(studentId);

  try {
    const res = await api.get(
      `/student-data/student/${studentId}`
      //     , {
      //   withCredentials: true, // same as credentials: "include"
      // }
    );

    // Axios throws on non-2xx, so if we are here status is OK
    // console.log(res.data);
    return res.data;
  } catch (error) {
    // If server responded with a status code
    if (error.response) {
      throw new Response(
        error.response.data?.message || "Failed to fetch data",
        { status: error.response.status }
      );
    }

    // Network error or something else
    throw new Response("Failed to fetch data", { status: 500 });
  }
}
