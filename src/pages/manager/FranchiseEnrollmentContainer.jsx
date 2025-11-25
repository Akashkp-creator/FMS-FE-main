import FranchiseEnrollmentFilter from "../../components/FranchiseEnrollment/FranchiseEnrollmentFilter";
import FranchiseEnrollmentPagination from "../../components/FranchiseEnrollment/FranchiseEnrollmentPagination";
import FranchiseEnrollmentTable from "../../components/FranchiseEnrollment/FranchiseEnrollmentTable";
// import styles from "./FranchiseEnrollmentContainer.module.css";
const FranchiseEnrollmentContainer = () => {
  return (
    <div>
      {/* Background with gradient */}
      {/* <div className={styles.backgroundGradient}></div> */}
      <div>
        <FranchiseEnrollmentFilter />
        <FranchiseEnrollmentTable />
        <FranchiseEnrollmentPagination />
      </div>
    </div>
  );
};
export default FranchiseEnrollmentContainer;
