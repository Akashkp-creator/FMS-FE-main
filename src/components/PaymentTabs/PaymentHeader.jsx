import { useLoaderData } from "react-router-dom";
import styles from "./PaymentHeader.module.css";

const PaymentHeader = () => {
  const { data } = useLoaderData();
  const { name, email, phone, courseName } = data.student;

  return (
    <div className={styles.headerContainer}>
      {/* LEFT SECTION */}
      <div className={styles.leftSection}>
        <h2 className={styles.title}>{`${name}'s Payment Details`}</h2>
        <p className={styles.subtitle}>Manage your payments and installments</p>
      </div>

      {/* RIGHT SECTION (EMAIL, PHONE, COURSE) */}
      <div className={styles.rightSection}>
        <div className={styles.infoRow}>
          <span className={styles.label}>Email:</span>
          <span className={styles.value}>{email || "N/A"}</span>
        </div>

        <div className={styles.infoRow}>
          <span className={styles.label}>Phone:</span>
          <span className={styles.value}>{phone || "N/A"}</span>
        </div>

        <div className={styles.infoRow}>
          <span className={styles.label}>Course:</span>
          <span className={styles.value}>{courseName || "Not Enrolled"}</span>
        </div>
      </div>
    </div>
  );
};

export default PaymentHeader;
