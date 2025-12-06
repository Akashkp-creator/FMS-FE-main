// src/loaders/franchiseAnalyticsLoader.js
// import api from "../utils/axiosConfig";

import { LogIn } from "lucide-react";
import api from "./axiosConfig";

export const franchiseDashboardLoader = async () => {
  try {
    const res = await api.get("/franchise-dashboard/dashboard/franchise");

    return res.data;
  } catch (error) {
    console.log(error);

    throw new Response("Failed to load analytics data", { status: 500 });
  }
};
