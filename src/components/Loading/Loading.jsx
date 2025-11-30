// src/components/Loading.jsx
import React from "react";
import { Building2, SearchCode } from "lucide-react";
import styles from "./Loading.module.css";

// const Loading = ({ message = "Loading....." }) => {
//   return (
//     <div className={styles.loadingOverlay}>
//       <div className={styles.loadingContainer}>
//         {/* 3D Glass Card */}
//         <div className={styles.glassCard}>
//           {/* Animated Logo */}
//           <div className={styles.logoContainer}>
//             <div className={styles.logoWrapper}>
//               <Building2 className={styles.logoIcon} />
//             </div>
//             <div className={styles.logoGlow}></div>
//           </div>

//           {/* Loading Text */}
//           <div className={styles.loadingContent}>
//             <h3 className={styles.loadingImg}>
//               <img
//                 src="https://www.snipe.co.in/img/logo.png"
//                 alt="Snipe Tech Pvt Ltds"
//               />
//             </h3>
//             <p className={styles.loadingMessage}>{message}</p>
//           </div>

//           {/* Animated Progress */}
//           <div className={styles.progressContainer}>
//             <div className={styles.progressBar}>
//               <div className={styles.progressFill}></div>
//             </div>
//             <div className={styles.progressDots}>
//               <div className={styles.dot}></div>
//               <div className={styles.dot}></div>
//               <div className={styles.dot}></div>
//             </div>
//           </div>

//           {/* Floating Elements */}
//           <div className={styles.floatingElement1}></div>
//           <div className={styles.floatingElement2}></div>
//           <div className={styles.floatingElement3}></div>
//         </div>

//         {/* Background Glow Effects */}
//         <div className={styles.backgroundGlow1}></div>
//         <div className={styles.backgroundGlow2}></div>
//       </div>
//     </div>
//   );
// };

// export default Loading;

const Loading = ({ message = "Loading....." }) => {
  return (
    <div className={styles.loadingOverlay}>
      <div className={styles.loadingContainer}>
        {/* 3D Glass Card */}
        <div className={styles.glassCard}>
          {/* Animated Logo */}
          <div className={styles.logoContainer}>
            <div className={styles.logoWrapper}>
              <SearchCode className={styles.logoIcon} />
            </div>
            <div className={styles.logoGlow}></div>
          </div>

          {/* Loading Text */}
          <div className={styles.loadingContent}>
            <h3 className={styles.loadingImg}>
              <img
                src="https://www.snipe.co.in/img/logo.png"
                alt="Snipe Tech Pvt Ltd"
              />
            </h3>
            <p className={styles.loadingMessage}>{message}</p>
          </div>

          {/* Animated Progress */}
          <div className={styles.progressContainer}>
            <div className={styles.progressBar}>
              <div className={styles.progressFill}></div>
            </div>
            <div className={styles.progressDots}>
              <div className={styles.dot}></div>
              <div className={styles.dot}></div>
              <div className={styles.dot}></div>
            </div>
          </div>

          {/* Floating Elements */}
          <div className={styles.floatingElement1}></div>
          <div className={styles.floatingElement2}></div>
          <div className={styles.floatingElement3}></div>
        </div>

        {/* Background Glow Effects */}
        <div className={styles.backgroundGlow1}></div>
        <div className={styles.backgroundGlow2}></div>
      </div>
    </div>
  );
};

export default Loading;
