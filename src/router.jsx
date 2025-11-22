// import { createBrowserRouter } from "react-router-dom";
// // import RoleProtectedRoute from "./components/RoleProtectedRoute";
// // import AppLayout from "./layout/AppLayout";
// import React from "react";
// import RoleProtectedRoute from "./components/RoleProtectedRoute/RoleProtectedRoute";
// import GlobalErrorBoundary from "./components/ErrorBoundary/GlobalErrorBoundary";
// import Unauthorized from "./components/Unauthorized/Unauthorized";
// import Login from "./pages/public/Login";
// import Home from "./pages/public/Home";
// import { LoginAction } from "./utils/LoginActions";
// import store from "./features/store";
// import { createAdminAction } from "./utils/createAdminAction";
// // import  from "";
// // import  from "";
// // import  from "";
// // import Layout from "./Layout";
// // import Layout from "./Layout";

// const Layout = React.lazy(() => import("./Layout"));
// const SuperAdminHome = React.lazy(() =>
//   import("./pages/SuperAdmin/SuperAdminHome")
// );
// const AdminHome = React.lazy(() => import("./pages/Admin/AdminHome"));
// // const TrainerPage = React.lazy(() => import("./pages/Trainer"));
// const AddClient = React.lazy(() => import("./pages/SuperAdmin/AddClient"));
// // const SuperAdminPage = React.lazy(() => import("./pages/SuperAdmin"));

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <Layout />,
//     errorElement: <GlobalErrorBoundary />,
//     children: [
//       {
//         index: true,
//         element: <Home />,
//       },
//       // ---------------------
//       // SUPER ADMIN ROUTES
//       // ---------------------
//       {
//         element: <RoleProtectedRoute allowedRoles={["SuperAdmin"]} />,
//         children: [
//           { path: "super-admin", element: <SuperAdminHome /> },
//           {
//             path: "add-client",
//             element: <AddClient />,
//             action: createAdminAction,
//           },
//         ],
//       },

//       // ---------------------
//       // ADMIN ROUTES
//       // ---------------------
//       {
//         element: <RoleProtectedRoute allowedRoles={["Admin"]} />,
//         children: [
//           {
//             path: "admin",
//             element: <AdminHome />,
//           },
//         ],
//       },

//       // ---------------------
//       // FRANCHISE ROUTES
//       // ---------------------
//       //   {
//       //     element: <RoleProtectedRoute allowedRoles={["Franchise"]} />,
//       //     children: [{ path: "franchise", element: <FranchisePage /> }],
//       //   },

//       //   // ---------------------
//       //   // MANAGER ROUTES
//       //   // ---------------------
//       //   {
//       //     element: <RoleProtectedRoute allowedRoles={["Manager"]} />,
//       //     children: [{ path: "manager", element: <ManagerPage /> }],
//       //   },

//       //   // ---------------------
//       //   // TRAINER ROUTES
//       //   // ---------------------
//       //   {
//       //     element: <RoleProtectedRoute allowedRoles={["Trainer"]} />,
//       //     children: [{ path: "trainer", element: <TrainerPage /> }],
//       //   },

//       //   { path: "dashboard", element: <Dashboard /> },
//       { path: "unauthorized", element: <Unauthorized /> },
//     ],
//   },

//   { path: "/login", element: <Login />, action: LoginAction(store) },
// ]);

// export default router;

import React from "react";
import { createBrowserRouter } from "react-router-dom";

import RoleProtectedRoute from "./components/RoleProtectedRoute/RoleProtectedRoute";
import GlobalErrorBoundary from "./components/ErrorBoundary/GlobalErrorBoundary";
import Unauthorized from "./components/Unauthorized/Unauthorized";
import Login from "./pages/public/Login";
import Home from "./pages/public/Home";

import { LoginAction } from "./utils/LoginActions";
import { createAdminAction } from "./utils/createAdminAction";

import store from "./features/store";
import AddDetails from "./pages/Admin/AddDetails";
import Manager from "./pages/Admin/Manager";

// Lazy imports MUST be named functions
const Layout = React.lazy(function LazyLayout() {
  return import("./Layout");
});

const SuperAdminHome = React.lazy(function LazySuperAdminHome() {
  return import("./pages/SuperAdmin/SuperAdminHome");
});

const AdminHome = React.lazy(function LazyAdminHome() {
  return import("./pages/Admin/AdminHome");
});

const AddClient = React.lazy(function LazyAddClient() {
  return import("./pages/SuperAdmin/AddClient");
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <GlobalErrorBoundary />,

    children: [
      { index: true, element: <Home /> },

      // SUPER ADMIN ROUTES
      {
        element: <RoleProtectedRoute allowedRoles={["SuperAdmin"]} />,
        children: [
          { path: "super-admin", element: <SuperAdminHome /> },

          {
            path: "add-client", // FIXED (no leading slash)
            element: <AddClient />,
            action: createAdminAction, // FIXED (belongs to this form page)
          },
        ],
      },

      // ADMIN ROUTES
      {
        element: <RoleProtectedRoute allowedRoles={["Admin"]} />,
        children: [
          { path: "admin", element: <AdminHome /> },
          { path: "fee-details", element: <AddDetails /> },
          { path: "admin-manager", element: <Manager /> },
        ],
      },

      { path: "unauthorized", element: <Unauthorized /> },
    ],
  },

  {
    path: "/login",
    element: <Login />,
    action: LoginAction(store),
  },
]);

export default router;
