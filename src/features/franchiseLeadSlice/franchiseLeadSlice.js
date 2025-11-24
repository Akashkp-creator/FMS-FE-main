// src/features/franchiseLeadSlice.js
import { createSlice } from "@reduxjs/toolkit";

const franchiseLeadSlice = createSlice({
  name: "franchiseLeads",
  initialState: {
    leads: [],
    meta: {
      page: 1,
      pageSize: 10,
      pageCount: 0,
      total: 0,
    },
    params: {}, // query params (name, status, page, etc.)
    loading: false,
    error: null,
  },

  reducers: {
    setLeads: (state, action) => {
      state.leads = action.payload;
      state.loading = false;
    },

    setMeta: (state, action) => {
      state.meta = action.payload;
    },

    setParams: (state, action) => {
      state.params = action.payload;
    },

    setLoading: (state) => {
      state.loading = true;
      state.error = null;
    },

    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { setLeads, setMeta, setParams, setLoading, setError } =
  franchiseLeadSlice.actions;

export default franchiseLeadSlice.reducer;
