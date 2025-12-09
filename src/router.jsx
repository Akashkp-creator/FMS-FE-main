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
import { AddManagerAction } from "./utils/AddManagerAction";
import AddFranchiseLead from "./pages/manager/AddFranchiseLead";
import { addFranchiseLeadAction } from "./utils/franchiseLeadAction";
import FranchiseEnrollmentContainer from "./pages/manager/FranchiseEnrollmentContainer";
import { franchiseLeadLoader } from "./utils/franchiseLeadLoader";
import AddFranchise from "./pages/manager/AddFranchise";
import { AddFranchiseAction } from "./utils/franchiseAction";
import Profile from "./pages/franchise/Profile";
import AddStudentLead from "./pages/franchise/AddStudentLead";
import { franchiseCoursesLoader } from "./utils/getCourseDetailsStudentLeadForm";
import LeadStudentList from "./pages/franchise/LeadStudentList";
import { leadListLoader } from "./utils/studentLeadListLoader";
import Contact from "./components/Contact/Contact";
import FeaturesSection from "./components/FeaturesSection/FeaturesSection";
import AddStudent from "./pages/franchise/AddStudent";
import { createStudentAction } from "./utils/studentActions";
import PaymentContainer from "./pages/franchise/PaymentContainer";
import { installmentPaymentsLoader } from "./utils/paymentListLoader";
import PaymentTabs from "./components/PaymentTabs/PaymentTabs";
import { studentPaymentsLoader } from "./utils/studentPaymentsLoader";
import FranchiseCompleteDashboard from "./pages/franchise/FranchiseCompleteDashboard";
import { franchiseDashboardLoader } from "./utils/franchisedashboardLoader";
import ChannelPartnerContainer from "./pages/manager/ChannelPartnerContainer";
import { channelPartnerLoader } from "./utils/channelPartnerLoaderForManager";
import ChannelPatnerListContainer from "./components/ChannelPatnerListContainer/ChannelPatnerListContainer";
import AddStudentForm from "./components/StudentsOfChannelPartner/AddStudentForm";
import ChannelPartnerStudentsContainer from "./components/AddStudentPaymentOfChannelPartner/ChannelPartnerStudentsContainer";
import { channelPartnerStudentsLoader } from "./utils/channelPartnerStudentsLoader";

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

      // contact page (public)
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "features",
        element: <FeaturesSection />,
      },

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
          {
            path: "admin-manager",
            element: <Manager />,
            action: AddManagerAction,
          },
        ],
      },
      // MANAGER ROUTES
      {
        element: <RoleProtectedRoute allowedRoles={["Manager"]} />,
        children: [
          {
            path: "add-lead",
            element: <AddFranchiseLead />,
            action: addFranchiseLeadAction,
          },
          {
            path: "manager/enroll-lead/franchise",
            element: <FranchiseEnrollmentContainer />,
            loader: franchiseLeadLoader(store),
          },
          {
            path: "manager/my-FranchiseLead/:FranchiseLeadId",
            element: <AddFranchise />,
            action: AddFranchiseAction,
          },
          {
            path: "manager/addChannel-partner",
            element: <ChannelPartnerContainer />,
            // loader: channelPartnerLoader,
            // action: AddManagerAction,
          },
          {
            path: "manager/channel-partner/list",
            element: <ChannelPatnerListContainer />,
            loader: channelPartnerLoader,
            // action: AddManagerAction,
          },
          {
            path: "manager/channel-partner/students",
            element: <AddStudentForm />,
            // loader: channelPartnerLoader,
            // action: AddManagerAction,
          },
          {
            path: "manager/channel-partner/list/students",
            element: <ChannelPartnerStudentsContainer />,
            loader: channelPartnerStudentsLoader,
            // action: AddManagerAction,
          },
        ],
      },
      // Franchise ROUTES
      {
        element: <RoleProtectedRoute allowedRoles={["Franchise"]} />,
        children: [
          {
            path: "franchise/profile",
            element: <Profile />,
            action: addFranchiseLeadAction,
          },
          {
            path: "/franchise/add-student/lead",
            element: <AddStudentLead />,
            loader: franchiseCoursesLoader,
            // action: addFranchiseLeadAction,
          },
          {
            path: "/franchise/my-lead-list",
            element: <LeadStudentList />,
            loader: leadListLoader,
          },
          {
            path: "/Franchise-add/my-StudentLead/:studentLeadId",
            element: <AddStudent />,
            loader: franchiseCoursesLoader,
            action: createStudentAction,
          },
          {
            path: "/student/installment-payments",
            element: <PaymentContainer />,
            loader: installmentPaymentsLoader,
            // loader: franchiseCoursesLoader,
            // action: createStudentAction,
          },
          {
            path: "/student/payment-tabs/:studentId",
            element: <PaymentTabs />,
            loader: studentPaymentsLoader,
            // loader: installmentPaymentsLoader,
            // loader: franchiseCoursesLoader,
            // action: createStudentAction,
          },
          {
            path: "/franchise/dashboard",
            element: <FranchiseCompleteDashboard />,
            loader: franchiseDashboardLoader,
            // loader: installmentPaymentsLoader,
            // loader: franchiseCoursesLoader,
            // action: createStudentAction,
          },
          // {
          //   path: "manager/my-FranchiseLead/:FranchiseLeadId",
          //   element: <AddFranchise />,
          //   action: AddFranchiseAction,
          // },
          // // {
          // //   path: "admin-manager",
          // //   element: <Manager />,
          // //   action: AddManagerAction,
          // // },
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
