// import api from "./axiosConfig";
// import { toast } from "react-toastify";
// import { login } from "../features/authSlice/authSlice";
// import { redirect } from "react-router";

// export const LoginAction =
//   (store) =>
//   async ({ request }) => {
//     const formData = await request.formData();
//     const data = Object.fromEntries(formData);
//     try {
//       const response = await api.post("/auth/login", data);
//       console.log(response);
//       // response.data should look like: { user: {...}, message: "Login successful" }
//       const { user } = response.data;

//       // Store user in Redux and localStorage
//       store.dispatch(login(user));
//       toast.success("logged in successfully");

//       //   return redirect("/manager/add-users");
//       //   return response;

//       // 🔹 Conditional redirects based on role
//       switch (user.role) {
//         case "Manager":
//           return redirect("/");
//         case "ChannelPartner":
//           return redirect("/");
//         case "Franchise":
//           return redirect("/");
//         case "Admin":
//           return redirect("/");

//         default:
//           return redirect("/");
//       }
//     } catch (error) {
//       const errorMessage =
//         error?.response?.data?.error?.message ||
//         "please double check your credentials";

//       toast.error(errorMessage);
//       return null;
//     }
//   };
import api from "./axiosConfig";
import { toast } from "react-toastify";
import { login } from "../features/authSlice/authSlice";
import { redirect } from "react-router-dom";

export const LoginAction = (store) => {
  return async ({ request }) => {
    try {
      const formData = await request.formData();
      const credentials = Object.fromEntries(formData);
      // console.log(credentials);

      const res = await api.post("/auth/login", credentials);

      const { user, client, franchise } = res.data;
      console.log(res);
      if (!user) {
        toast.error("Invalid server response");
        return null;
      }
      // Combine user and client info in one object
      const userData = { ...user, client, franchise };
      // Save to Redux
      // console.log(userData);
      store.dispatch(login(userData));

      // Save to localStorage
      // localStorage.setItem("user", JSON.stringify(user));

      toast.success(`${res.data.message}` || "Login successful");

      // -----------------------------------
      // ROLE-BASED REDIRECTS (clean version)
      // -----------------------------------
      const roleRedirects = {
        SuperAdmin: "/",
        Admin: "/",
        Franchise: "/franchise/dashboard",
        Manager: "/",
        Trainer: "/",
        ChannelPartner: "/",
      };

      // Default to "/" if role is not mapped
      const redirectTo = roleRedirects[user.role] || "/";

      return redirect(redirectTo);
      // return redirect("/");
    } catch (error) {
      console.log("Login error:", error?.response?.data);

      const message =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        "Login failed. Please check your credentials";

      toast.error(message);
      return null;
    }
  };
};

// ===================================
// export const LoginAction = (store) => {
//   return async ({ request }) => {
//     try {
//       const formData = await request.formData();
//       const credentials = Object.fromEntries(formData);

//       const res = await api.post("/auth/login", credentials);

//       const { user, client } = res.data;

//       const userData = { ...user, client };
//       store.dispatch(login(userData));

//       return redirect("/");
//     } catch (error) {
//       return {
//         error:
//           error?.response?.data?.message ||
//           error?.response?.data?.error ||
//           "Login failed. Please check your credentials",
//       };
//     }
//   };
// };
