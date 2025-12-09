// import StudentFilter from "./StudentFilter";
// import StudentList from "./StudentList";
// import StudentPagination from "./StudentPagination";

// const ChannelPartnerStudentsContainer = () => {
//   return (
//     <>
//       <StudentFilter />
//       <StudentList />
//       <StudentPagination />
//     </>
//   );
// };
// export default ChannelPartnerStudentsContainer;

import { useState } from "react";
import StudentFilter from "./StudentFilter";
import StudentList from "./StudentList";
import StudentPagination from "./StudentPagination";
import PaymentModal from "./PaymentModal";
// import { channelPartnerStudentsLoader } from "../../utils/channelPartnerStudentsLoader";
import { useRevalidator } from "react-router-dom";
// import AddPaymentModal from "./AddPaymentModal";

const ChannelPartnerStudentsContainer = () => {
  const { revalidate } = useRevalidator();

  const refreshData = () => {
    revalidate(); // 🔥 This reruns channelPartnerStudentsLoader
  };
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  const openPaymentModal = (student) => {
    setSelectedStudent(student);
    setShowPaymentModal(true);
  };

  const closePaymentModal = () => {
    setSelectedStudent(null);
    setShowPaymentModal(false);
  };

  return (
    <>
      <StudentFilter />

      {/* Pass callback */}
      <StudentList onAddPayment={openPaymentModal} />

      <StudentPagination />

      {/* Modal */}
      {showPaymentModal && (
        <PaymentModal
          student={selectedStudent}
          close={closePaymentModal}
          // refreshData={() => channelPartnerStudentsLoader()}
          refreshData={refreshData} // Pass actual refresh function
        />
      )}
    </>
  );
};

export default ChannelPartnerStudentsContainer;
