// src/loaders/franchiseLeadLoader.js
// import api from "./api/axiosConfig";
import {
  setLeads,
  setMeta,
  setParams,
  setError,
  setLoading,
} from "../features/franchiseLeadSlice/franchiseLeadSlice";
import api from "./axiosConfig";

export const franchiseLeadLoader =
  (store) =>
  async ({ request }) => {
    const params = Object.fromEntries(
      new URL(request.url).searchParams.entries()
    );

    // Save params in redux (optional)
    store.dispatch(setParams(params));
    store.dispatch(setLoading(true));

    try {
      const res = await api.get("/manager/franchise/my-leads", { params });
      console.log(res);

      store.dispatch(setLeads(res.data.data)); // leads array
      store.dispatch(setMeta(res.data.meta)); // pagination meta

      return {
        data: res.data.data,
        meta: res.data.meta,
        params,
      };
    } catch (err) {
      store.dispatch(
        setError(err.response?.data?.message || "Failed to load leads")
      );
      throw err;
    }
  };
