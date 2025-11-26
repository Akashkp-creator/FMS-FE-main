import "./App.css";
import "react-toastify/dist/ReactToastify.css";
// import "react-toastify/dist/ReactToastify.css"; // if needed for styles
import router from "./router";
// import Suspenses from "./components/Suspense/Suspense";
import { RouterProvider } from "react-router-dom";
import Loading from "./components/Loading/Loading";
import React from "react";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      {/* <Suspenses fallback={<div>Loading...</div>}>
        <RouterProvider router={router} />
      </Suspenses> */}
      <React.Suspense
        fallback={
          <div>
            <Loading />
          </div>
        }
      >
        <RouterProvider router={router} />
      </React.Suspense>
      {/* MUST be present */}
      {/* <ToastContainer
        position="top-center"
        // autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"
        autoClose={2000}
      /> */}
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="dark" // Use dark as base for better contrast
      />
    </>
  );
}

export default App;
