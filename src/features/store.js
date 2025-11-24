// src/store/store.js
import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice/authSlice";
import franchiseLeadSlice from "../features/franchiseLeadSlice/franchiseLeadSlice";
// import leadSlice from "./leadSlice/leadSlice";
// import installmentSlice from "./installmentSlice/installmentSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    // leads: leadSlice,
    // installment: installmentSlice,
    franchiseLeads: franchiseLeadSlice, // 👈 added
  },
});

export default store;
