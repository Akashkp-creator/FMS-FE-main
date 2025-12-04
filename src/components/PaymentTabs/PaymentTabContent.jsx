// import { useLoaderData } from "react-router-dom";
import { FaPrint } from "react-icons/fa";
import styles from "./PaymentTabContent.module.css";
import { useLoaderData } from "react-router-dom";

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
      {/* <div className={styles.paymentMethods}>
                    <h4>Make Payment</h4>
                    <div className={styles.methodGrid}>
                      <button
                        className={`${styles.methodButton} ${
                          paymentMethod === "online" ? styles.activeMethod : ""
                        }`}
                        onClick={() => setPaymentMethod("online")}
                      >
                        <div className={styles.methodIcon}>💳</div>
                        <span>Online Payment</span>
                      </button>
                      <button
                        className={`${styles.methodButton} ${
                          paymentMethod === "bank" ? styles.activeMethod : ""
                        }`}
                        onClick={() => setPaymentMethod("bank")}
                      >
                        <div className={styles.methodIcon}>🏦</div>
                        <span>Bank Transfer</span>
                      </button>
                      <button
                        className={`${styles.methodButton} ${
                          paymentMethod === "upi" ? styles.activeMethod : ""
                        }`}
                        onClick={() => setPaymentMethod("upi")}
                      >
                        <div className={styles.methodIcon}>📱</div>
                        <span>UPI</span>
                      </button>
                      <button
                        className={`${styles.methodButton} ${
                          paymentMethod === "cash" ? styles.activeMethod : ""
                        }`}
                        onClick={() => setPaymentMethod("cash")}
                      >
                        <div className={styles.methodIcon}>💵</div>
                        <span>Cash</span>
                      </button>
                    </div>
                  </div> */}

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
                <button className={styles.actionBtn}>
                  <FaPrint /> Print
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default PaymentTabContent;
