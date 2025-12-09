import { Link, useLoaderData } from "react-router-dom";
import styles from "./StudentList.module.css";
import { useState } from "react";
import PaymentModal from "./PaymentModal";
// import { channelPartnerStudentsLoader } from "../../utils/channelPartnerStudentsLoader";
const StudentList = ({ onAddPayment }) => {
  //   const [showPaymentModal, setShowPaymentModal] = useState(false);
  //   const [selectedStudentId, setSelectedStudentId] = useState(null);

  //   const handleOpenPaymentModal = (studentId) => {
  //     setSelectedStudentId(studentId);
  //     setShowPaymentModal(true);
  //   };
  const { data, meta } = useLoaderData();
  const [showAllPayments, setShowAllPayments] = useState({});

  // Calculate commission for each student
  const calculateCommission = (student) => {
    const commissionPercent = student.channelPartnerId?.commissionPercent || 0;
    const commission = (student.totalPaid * commissionPercent) / 100;
    return commission;
  };

  // Toggle payment visibility
  const togglePayments = (studentId) => {
    setShowAllPayments((prev) => ({
      ...prev,
      [studentId]: !prev[studentId],
    }));
  };

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  // Calculate payment status
  const getPaymentStatus = (totalPaid, courseFee) => {
    const percentage = (totalPaid / courseFee) * 100;
    return percentage === 100 ? "Completed" : "Pending";
  };

  return (
    <div className={styles.tableContainer}>
      {/* Table Header */}
      <div className={styles.tableHeader}>
        <h2>Channel Partner Students ({meta.pagination.total})</h2>
        <div className={styles.headerInfo}>
          <span className={styles.filterBadge}>
            <span>👤</span>
            Showing {data.length} of {meta.pagination.total}
          </span>
          <span className={styles.filterBadge}>
            <span>💰</span>
            Page {meta.pagination.page} of {meta.pagination.pageCount}
          </span>
        </div>
      </div>

      {/* Table */}
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Student</th>
              <th>Channel Partner</th>
              <th>Course</th>
              <th>Payment Info</th>
              <th>Payments</th>
              <th>Commission</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((student) => {
              const commission = calculateCommission(student);
              const pendingAmount = student.courseFee - student.totalPaid;
              const paymentStatus = getPaymentStatus(
                student.totalPaid,
                student.courseFee
              );
              const paymentPercentage =
                (student.totalPaid / student.courseFee) * 100;
              const showAll = showAllPayments[student._id];
              const displayedPayments = showAll
                ? student.payments
                : student.payments.slice(0, 2);

              return (
                <tr key={student._id}>
                  {/* Student Column */}
                  <td className={styles.studentInfo}>
                    <div>
                      <span className={styles.studentName}>
                        {student.studentName}
                      </span>
                      <div className={styles.studentId}>
                        #{student._id.slice(-6)}
                      </div>
                      <div>{student.phone}</div>
                    </div>
                  </td>

                  {/* Channel Partner Column */}
                  <td className={styles.partnerInfo}>
                    {student.channelPartnerId ? (
                      <div>
                        <span className={styles.partnerName}>
                          {student.channelPartnerId.partnerName}
                        </span>
                        <div className={styles.partnerContact}>
                          {student.channelPartnerId.phone}
                        </div>
                        <div className={styles.partnerContact}>
                          {student.channelPartnerId.email}
                        </div>
                      </div>
                    ) : (
                      <span className={styles.partnerContact}>No Partner</span>
                    )}
                  </td>

                  {/* Course Column */}
                  <td className={styles.courseInfo}>
                    <div>
                      <span className={styles.courseName}>
                        {student.course}
                      </span>
                      <div className={styles.courseFee}>
                        Course Fee: ₹{student.courseFee.toLocaleString()}
                      </div>
                    </div>
                  </td>

                  {/* Payment Info Column */}
                  <td className={styles.paymentInfo}>
                    <div>
                      <div className={`${styles.amount} ${styles.totalPaid}`}>
                        ₹{student.totalPaid.toLocaleString()}
                        <div className={styles.courseFee}>Paid</div>
                      </div>

                      <div
                        className={`${styles.amount} ${styles.pendingAmount}`}
                      >
                        ₹{pendingAmount.toLocaleString()}
                        <div className={styles.courseFee}>Pending</div>
                      </div>

                      <div className={`${styles.amount} ${styles.totalFee}`}>
                        ₹{student.courseFee.toLocaleString()}
                        <div className={styles.courseFee}>Total</div>
                      </div>

                      {/* Progress Bar */}
                      <div className={styles.progressBar}>
                        <div
                          className={styles.progressFill}
                          style={{ width: `${paymentPercentage}%` }}
                        ></div>
                      </div>
                      <div className={styles.progressText}>
                        {paymentPercentage.toFixed(1)}% Complete
                      </div>
                    </div>
                  </td>

                  {/* Payments Column */}
                  <td className={styles.paymentsCell}>
                    <div className={styles.paymentsList}>
                      {student.payments.length > 0 ? (
                        <>
                          {displayedPayments.map((payment) => (
                            <div
                              key={payment._id}
                              className={styles.paymentItem}
                            >
                              <div className={styles.paymentHeader}>
                                <span className={styles.paymentAmount}>
                                  ₹{payment.amount.toLocaleString()}
                                </span>
                                <span className={styles.paymentDate}>
                                  {formatDate(payment.date)}
                                </span>
                              </div>
                              <div className={styles.paymentDetails}>
                                <span className={styles.paymentMode}>
                                  {payment.mode}
                                </span>
                                <span className={styles.paymentReceiver}>
                                  {payment.receivedBy}
                                </span>
                              </div>
                            </div>
                          ))}

                          {student.payments.length > 2 && (
                            <button
                              className={styles.viewMoreBtn}
                              onClick={() => togglePayments(student._id)}
                            >
                              {showAll
                                ? "Show Less"
                                : `+${student.payments.length - 2} More`}
                            </button>
                          )}
                        </>
                      ) : (
                        <div className={styles.paymentItem}>
                          <div className={styles.paymentDetails}>
                            No payments recorded
                          </div>
                        </div>
                      )}
                    </div>
                  </td>

                  {/* Commission Column */}
                  <td className={styles.commissionInfo}>
                    <div>
                      <span className={styles.commissionBadge}>
                        {student.channelPartnerId?.commissionPercent || 0}%
                      </span>
                      <div className={styles.commissionAmount}>
                        ₹{commission.toLocaleString()}
                      </div>
                    </div>
                  </td>

                  {/* Status Column */}
                  <td>
                    <span
                      className={`${styles.paymentStatus} ${
                        paymentStatus === "Completed"
                          ? styles.statusCompleted
                          : styles.statusPending
                      }`}
                    >
                      {paymentStatus}
                    </span>
                  </td>

                  {/* Actions Column */}
                  <td className={styles.actions}>
                    <div>
                      {/* <button className={styles.editBtn}>Edit</button> */}
                      {/* <button className={styles.addPaymentBtn}>
                        Add Payment
                      </button> */}
                      {paymentStatus !== "Completed" && (
                        <button
                          className={styles.addPaymentBtn}
                          onClick={() => onAddPayment(student)}
                        >
                          Add Payment
                        </button>
                      )}
                      {/* <button
                        className={styles.addPaymentBtn}
                        onClick={() => onAddPayment(student)}
                      >
                        Add Payment
                      </button> */}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {/* Empty State */}
        {data.length === 0 && (
          <div className={styles.emptyState}>
            <div>No students found</div>
            <p>Add students to see them listed here</p>
          </div>
        )}
      </div>

      {/* Pagination */}
      {meta.pagination.pageCount > 1 && (
        <div className={styles.pagination}>
          <div className={styles.paginationInfo}>
            Showing <strong>{data.length}</strong> of{" "}
            <strong>{meta.pagination.total}</strong> students
          </div>
        </div>
      )}

      {/* <PaymentModal
        show={showPaymentModal}
        close={() => setShowPaymentModal(false)}
        studentId={selectedStudentId}
        refreshData={() => channelPartnerStudentsLoader()} // if using loader
      /> */}
    </div>
  );
};
export default StudentList;
