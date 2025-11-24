import FranchiseEnrollmentFilter from "../../components/FranchiseEnrollment/FranchiseEnrollmentFilter";
import FranchiseEnrollmentPagination from "../../components/FranchiseEnrollment/FranchiseEnrollmentPagination";
import FranchiseEnrollmentTable from "../../components/FranchiseEnrollment/FranchiseEnrollmentTable";

const FranchiseEnrollmentContainer = () => {
  return (
    <div>
      <FranchiseEnrollmentFilter />
      <FranchiseEnrollmentTable />
      <FranchiseEnrollmentPagination />
    </div>
  );
};
export default FranchiseEnrollmentContainer;
