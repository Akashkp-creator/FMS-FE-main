// src/store/store.js
import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice/authSlice";
import leadSlice from "./leadSlice/leadSlice";
import installmentSlice from "./installmentSlice/installmentSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    leads: leadSlice,
    installment: installmentSlice,
  },
});

export default store;
