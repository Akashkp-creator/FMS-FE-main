// import { useLoaderData } from "react-router-dom";
import { FaDownload, FaPrint } from "react-icons/fa";
import styles from "./PaymentTabContent.module.css";
import { useLoaderData } from "react-router-dom";
import PDFDownloadButton from "./PDFDownloadButton";

const PaymentTabContent = () => {
  const { data } = useLoaderData();
  console.log(data);
  // const paymentData=
  // const paymentData = {
  //   // totalAmount: 25000,
  //   // paidAmount: 10000,
  //   // pendingAmount: 15000,
  //   transactions: [
  //     {
  //       id: 1,
  //       date: "2024-01-15",
  //       amount: 5000,
  //       method: "UPI",
  //       status: "completed",
  //     },
  //     {
  //       id: 2,
  //       date: "2024-01-30",
  //       amount: 5000,
  //       method: "Bank Transfer",
  //       status: "completed",
  //     },
  //   ],
  // };
  return (
    <div className={styles.paymentContent}>
      <div className={styles.paymentHeader}>
        {/* <h3>Payment History</h3> */}
        <div className={styles.actionButtons}>
          {/* <button className={styles.actionBtn}>
                        <FaDownload /> Export
                      </button> */}
          {/* <button className={styles.actionBtn}>
                        <FaPrint /> Print
                      </button> */}
          {/* <button className={styles.actionBtn}>
                        <FaShare /> Share
                      </button> */}
        </div>
      </div>

      {/* Payment Methods */}

      {/* Transactions List */}
      <div className={styles.transactions}>
        <h4>Recent Transactions</h4>
        <div className={styles.transactionList}>
          {data.transactions.map((transaction) => (
            <div key={transaction.id} className={styles.transactionItem}>
              <div className={styles.transactionInfo}>
                <div className={styles.transactionDate}>{transaction.date}</div>
                <div className={styles.transactionMethod}>
                  {transaction.method}
                </div>
              </div>
              <div className={styles.transactionAmount}>
                <span className={styles.amount}>
                  ₹{transaction.amount.toLocaleString()}
                </span>
                <span
                  className={`${styles.status} ${
                    transaction.status === "completed" ? styles.completed : ""
                  }`}
                >
                  {transaction.status}
                </span>
                {/* ✅ Add Print Button here */}
                {/* <button className={styles.actionBtn}> */}
                {/* <FaDownload /> Download */}
                <PDFDownloadButton
                  studentId={data.student.id}
                  installmentNo={transaction.installmentNo}
                  buttonText="Download Slip"
                />
                {/* // </button> */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default PaymentTabContent;
