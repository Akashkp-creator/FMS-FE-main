import { useLoaderData } from "react-router-dom";

const FranchiseDashboard = () => {
  const analytics = useLoaderData();

  console.log("Analytics Data:", analytics);

  return (
    <div>
      <h1>Franchise Dashboard</h1>
      {/* Render your analytics data here */}
    </div>
  );
};
export default FranchiseDashboard;
