import { useLoaderData } from "react-router-dom";
import {
  FaRupeeSign,
  FaTag,
  FaPercentage,
  FaMoneyBillWave,
  FaCalendarCheck,
  FaIdCard,
} from "react-icons/fa";
import styles from "./SummaryCards.module.css";

const SummaryCards = () => {
  const { data } = useLoaderData();
  return (
    <div>
      <div className={styles.summaryCards}>
        {/* Total Fee */}
        <div className={styles.summaryCard}>
          <div
            className={styles.summaryIcon}
            style={{ backgroundColor: "#3b82f620", color: "#3b82f6" }}
          >
            <FaRupeeSign />
          </div>
          <div className={styles.summaryContent}>
            <h3>₹{data.paymentDetails.totalFee.toLocaleString()}</h3>
            <p>Total Fee</p>
          </div>
        </div>

        {/* Discount */}
        <div className={styles.summaryCard}>
          <div
            className={styles.summaryIcon}
            style={{ backgroundColor: "#10b98120", color: "#10b981" }}
          >
            <FaTag />
          </div>
          <div className={styles.summaryContent}>
            <h3>₹{data.paymentDetails.discount.toLocaleString()}</h3>
            <p>Discount</p>
          </div>
        </div>

        {/* GST */}
        <div className={styles.summaryCard}>
          <div
            className={styles.summaryIcon}
            style={{ backgroundColor: "#f59e0b20", color: "#f59e0b" }}
          >
            <FaPercentage />
          </div>
          <div className={styles.summaryContent}>
            <h3>₹{data.paymentDetails.gst.toLocaleString()}</h3>
            <p>GST</p>
          </div>
        </div>

        {/* Final Fee */}
        <div className={styles.summaryCard}>
          <div
            className={styles.summaryIcon}
            style={{ backgroundColor: "#8b5cf620", color: "#8b5cf6" }}
          >
            <FaMoneyBillWave />
          </div>
          <div className={styles.summaryContent}>
            <h3>₹{data.paymentDetails.finalFee.toLocaleString()}</h3>
            <p>Final Payable</p>
          </div>
        </div>

        {/* Installment Plan */}
        <div className={styles.summaryCard}>
          <div
            className={styles.summaryIcon}
            style={{ backgroundColor: "#06b6d420", color: "#06b6d4" }}
          >
            <FaCalendarCheck />
          </div>
          <div className={styles.summaryContent}>
            <h3>{data.paymentDetails.installmentPlan}</h3>
            <p>Installment Plan</p>
          </div>
        </div>

        {/* Payment ID */}
        <div className={styles.summaryCard}>
          <div
            className={styles.summaryIcon}
            style={{ backgroundColor: "#dc262620", color: "#dc2626" }}
          >
            <FaIdCard />
          </div>
          <div className={styles.summaryContent}>
            <h3 style={{ fontSize: "14px", wordBreak: "break-all" }}>
              {data.paymentDetails.paymentId}
            </h3>
            <p>Payment ID</p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SummaryCards;
