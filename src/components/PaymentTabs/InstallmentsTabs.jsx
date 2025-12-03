import { FaCalendarAlt, FaCreditCard } from "react-icons/fa";
import styles from "./InstallmentsTabs.module.css";

const InstallmentsTabs = ({ activeTab, setActiveTab }) => {
  return (
    <div className={styles.tabNav}>
      <button
        className={`${styles.tabButton} ${
          activeTab === "installment" ? styles.activeTab : ""
        }`}
        onClick={() => setActiveTab("installment")}
      >
        <FaCalendarAlt className={styles.tabIcon} />
        Installment Schedule
      </button>
      <button
        className={`${styles.tabButton} ${
          activeTab === "payment" ? styles.activeTab : ""
        }`}
        onClick={() => setActiveTab("payment")}
      >
        <FaCreditCard className={styles.tabIcon} />
        Payment History
      </button>
    </div>
  );
};
export default InstallmentsTabs;
