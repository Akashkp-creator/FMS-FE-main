// // actions/studentActions.js
// // import api from "../../utils/axiosConfig";

import api from "./axiosConfig";

// export const createStudentAction = async ({ request, params }) => {
//   try {
//     const formData = await request.formData();

//     // Convert FormData to JSON object
//     const data = {};
//     for (const [key, value] of formData.entries()) {
//       try {
//         // Parse JSON fields
//         data[key] = key.includes("[") ? JSON.parse(value) : value;
//       } catch {
//         data[key] = value;
//       }
//     }

//     // Extract studentLeadId from params
//     data.studentLeadId = params.studentLeadId;
//     console.log(data);
//     // return null;
//     //      /student-data/Franchise-add/my-StudentLead/:studentLeadId
//     const response = await api.post(
//       `/student-data/Franchise-add/my-StudentLead/${params.studentLeadId}`,
//       //   "/api/students/Franchise-add/my-StudentLead/" + params.studentLeadId,
//       data
//     );
//     console.log(response);

//     return { success: true, ...response.data };
//   } catch (error) {
//     const message =
//       error?.response?.data?.message || "Failed to create student";
//     return { success: false, message, errors: error?.response?.data?.errors };
//   }
// };
// In your action function
export const createStudentAction = async ({ request, params }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  // Transform the data
  const transformedData = {
    ...data,
    address: {
      street: data["address.street"] || "",
      area: data["address.area"] || "",
      landmark: data["address.landmark"] || "",
      city: data["address.city"] || "",
      state: data["address.state"] || "",
      zip: data["address.zip"] || "",
      country: "India",
    },
  };

  // Remove dot notation
  delete transformedData["address.street"];
  delete transformedData["address.area"];
  delete transformedData["address.landmark"];
  delete transformedData["address.city"];
  delete transformedData["address.state"];
  delete transformedData["address.zip"];

  // Send to your API
  const response = await api.post(
    `/student-data/Franchise-add/my-StudentLead/${params.studentLeadId}`,
    transformedData
  );

  return response.data;
};
