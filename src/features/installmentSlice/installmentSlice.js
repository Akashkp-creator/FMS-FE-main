import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  installments: [],
  loading: false,
  error: null,
};

const installmentSlice = createSlice({
  name: "installments",
  initialState,
  reducers: {
    setInstallments: (state, action) => {
      // The payload (action.payload) will be the array of pending installments (data.data)
      state.installments = action.payload;
      state.loading = false;
      state.error = null;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
      state.installments = [];
    },
    // You might add an updateInstallment status later if you implement payment recording
    // updateInstallment: (state, action) => { ... }
  },
});

export const { setInstallments, setLoading, setError } =
  installmentSlice.actions;

export default installmentSlice.reducer;
