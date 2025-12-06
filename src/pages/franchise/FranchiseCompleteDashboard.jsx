import { useLoaderData } from "react-router-dom";
import FranchiseDashboard from "../../components/FranchiseDashboard/FranchiseDashboard";

const FranchiseCompleteDashboard = () => {
  // return (
  //   <div>
  //     <FranchiseDashboard />
  //   </div>
  // );
  const { data } = useLoaderData();
  console.log(data);

  // console.log("Analytics Data:", dashboardData);

  // if (loading) {
  //   return (
  //     <div
  //       style={{
  //         minHeight: "100vh",
  //         background: "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)",
  //         display: "flex",
  //         justifyContent: "center",
  //         alignItems: "center",
  //         color: "#ffd700",
  //       }}
  //     >
  //       <div
  //         style={{
  //           fontSize: "1.5rem",
  //           animation: "pulse 2s infinite",
  //         }}
  //       >
  //         Loading Dashboard...
  //       </div>
  //     </div>
  //   );
  // }

  // if (error) {
  //   return (
  //     <div
  //       style={{
  //         minHeight: "100vh",
  //         background: "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)",
  //         display: "flex",
  //         justifyContent: "center",
  //         alignItems: "center",
  //         color: "#ef4444",
  //         padding: "2rem",
  //         textAlign: "center",
  //       }}
  //     >
  //       <div>
  //         <h2>Error Loading Dashboard</h2>
  //         <p>{error}</p>
  //         <button
  //           onClick={() => window.location.reload()}
  //           style={{
  //             background: "rgba(255, 215, 0, 0.2)",
  //             border: "1px solid rgba(255, 215, 0, 0.3)",
  //             color: "#ffd700",
  //             padding: "0.75rem 1.5rem",
  //             borderRadius: "8px",
  //             cursor: "pointer",
  //             marginTop: "1rem",
  //           }}
  //         >
  //           Retry
  //         </button>
  //       </div>
  //     </div>
  //   );
  // }

  return <FranchiseDashboard dashboardData={data} />;
};
export default FranchiseCompleteDashboard;
