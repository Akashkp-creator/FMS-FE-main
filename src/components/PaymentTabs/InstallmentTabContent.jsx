import { useLoaderData } from "react-router-dom";
import styles from "./InstallmentTabContent.module.css";
import { FaCheckCircle } from "react-icons/fa";

const InstallmentTabContent = ({handlePayNow}) => {
  const { data } = useLoaderData();
  return (
    <div className={styles.installmentContent}>
      <div className={styles.installmentHeader}>
        <h3>Installment Schedule</h3>
        {/* <button className={styles.payAllBtn}>
                      Pay All Installments
                    </button> */}
      </div>

      {/* Installment List */}
      <div className={styles.installmentList}>
        {data.installments.map((installment) => (
          <div key={installment.id} className={styles.installmentItem}>
            <div className={styles.installmentInfo}>
              <div className={styles.installmentNumber}>
                Installment #{installment.id}
              </div>
              <div className={styles.dueDate}>
                Due: <span>{installment.dueDate}</span>
              </div>
              {installment.paidDate && (
                <div className={styles.paidDate}>
                  Paid on: <span>{installment.paidDate}</span>
                </div>
              )}
            </div>
            <div className={styles.installmentActions}>
              <div className={styles.installmentAmount}>
                ₹{installment.amount.toLocaleString()}
              </div>
              <div
                className={`${styles.installmentStatus} ${
                  styles[installment.status]
                }`}
              >
                {installment.status}
              </div>
              {(installment.status === "pending" ||
                installment.status === "overdue") && (
                <button
                  className={styles.payNowBtn}
                  onClick={() => handlePayNow(installment)}
                >
                  Pay Now
                </button>
              )}
              {installment.status === "paid" && (
                <div className={styles.paidBadge}>
                  <FaCheckCircle /> Paid
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Payment Summary */}
      <div className={styles.paymentSummary}>
        <h4>Payment Summary</h4>
        <div className={styles.summaryDetails}>
          <div className={styles.summaryRow}>
            <span>Total Installments:</span>
            <span>{data.installments.length}</span>
          </div>
          <div className={styles.summaryRow}>
            <span>Paid Installments:</span>
            <span>
              {data.installments.filter((i) => i.status === "paid").length}
            </span>
          </div>
          <div className={styles.summaryRow}>
            <span>Pending Installments:</span>
            <span>
              {
                data.installments.filter(
                  (i) => i.status === "pending" || i.status === "overdue"
                ).length
              }
            </span>
          </div>
          <div className={styles.summaryRow}>
            <span>Total Amount:</span>
            <span>
              ₹
              {data.installments
                .reduce((sum, item) => sum + item.amount, 0)
                .toLocaleString()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default InstallmentTabContent;
