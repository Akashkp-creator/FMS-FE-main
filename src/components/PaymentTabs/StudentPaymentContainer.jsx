import PaymentFilter from "./PaymentFilter";
import PaymentPagination from "./PaymentPagination";
import PaymentTable from "./PaymentTable";

const StudentPaymentContainer = () => {
  return (
    <div>
      <PaymentFilter />
      <PaymentTable />
      <PaymentPagination />
    </div>
  );
};
export default StudentPaymentContainer;
