// src/features/leads/leadSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  leads: [],
  loading: false,
  error: null,
};

const leadSlice = createSlice({
  name: "leads",
  initialState,
  reducers: {
    setLeads: (state, action) => {
      state.leads = action.payload;
      state.loading = false;
      state.error = null;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    clearLeads: (state) => {
      state.leads = [];
      state.error = null;
    },
    addSingleLead: (state, action) => {
      const lead = action.payload;
      const exists = state.leads.find((l) => l._id === lead._id);
      if (!exists) state.leads.push(lead);
    },
  },
});

export const { setLeads, setLoading, setError, clearLeads, addSingleLead } =
  leadSlice.actions;
export default leadSlice.reducer;
