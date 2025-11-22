// import React from "react";
// import { Outlet, useNavigation } from "react-router-dom";
// import Loading from "./components/Loading/Loading";
// import Navbar from "./components/Navbar/Navbar";
// import Footer from "./components/Footer/Footer";
// // import Navbar from "../components/Navbar/Navbar";
// // import Footer from "../components/Footer/Footer";
// // import Loading from "../components/Loading/Loading"; // Your spinner/loading UI

// const Layout = () => {
//   const navigation = useNavigation();
//   const isLoading = navigation.state === "loading";
//   // console.log(navigation);

//   return (
//     <>
//       {isLoading && <Loading />}
//       <main
//         style={{
//           background: "linear-gradient(135deg, #1a202c 0%, #2d3748 100%)",
//         }}
//       >
//         <Navbar />
//         <Outlet /> {/* ✅ This renders the page content */}
//         <Footer />
//       </main>
//     </>
//   );
// };

// export default Layout;

import React from "react";
import { Outlet, useNavigation } from "react-router-dom";
import Loading from "./components/Loading/Loading";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import styles from "./Layout.module.css";

const Layout = () => {
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";

  return (
    <>
      {isLoading && <Loading />}

      <main className={styles.layoutWrapper}>
        <Navbar />

        <div className={styles.pageContent}>
          <Outlet />
        </div>

        <Footer />
      </main>
    </>
  );
};

export default Layout;
