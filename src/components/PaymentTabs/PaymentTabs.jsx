// import { useState } from "react";
// import {
//   FaCreditCard,
//   FaCalendarAlt,
//   FaDownload,
//   FaPrint,
//   FaShare,
//   FaHistory,
// } from "react-icons/fa";
// import styles from "./PaymentTabs.module.css";

// const PaymentTabs = () => {
//   const [activeTab, setActiveTab] = useState("payment");
//   const [paymentMethod, setPaymentMethod] = useState("online");

//   // Sample payment data
//   const paymentData = {
//     totalAmount: 25000,
//     paidAmount: 10000,
//     pendingAmount: 15000,
//     transactions: [
//       {
//         id: 1,
//         date: "2024-01-15",
//         amount: 5000,
//         method: "UPI",
//         status: "completed",
//       },
//       {
//         id: 2,
//         date: "2024-01-30",
//         amount: 5000,
//         method: "Bank Transfer",
//         status: "completed",
//       },
//     ],
//   };

//   // Sample installment data
//   const installmentData = [
//     {
//       id: 1,
//       dueDate: "2024-02-15",
//       amount: 5000,
//       status: "upcoming",
//       paidDate: null,
//     },
//     {
//       id: 2,
//       dueDate: "2024-03-15",
//       amount: 5000,
//       status: "upcoming",
//       paidDate: null,
//     },
//     {
//       id: 3,
//       dueDate: "2024-04-15",
//       amount: 5000,
//       status: "upcoming",
//       paidDate: null,
//     },
//   ];

//   return (
//     <div className={styles.container}>
//       {/* Header */}
//       <div className={styles.header}>
//         <h2 className={styles.title}>Payment Management</h2>
//         <p className={styles.subtitle}>Manage your payments and installments</p>
//       </div>

//       {/* Summary Cards */}
//       <div className={styles.summaryCards}>
//         <div className={styles.summaryCard}>
//           <div
//             className={styles.summaryIcon}
//             style={{ backgroundColor: "#10b98120", color: "#10b981" }}
//           >
//             <FaCreditCard />
//           </div>
//           <div className={styles.summaryContent}>
//             <h3>₹{paymentData.totalAmount.toLocaleString()}</h3>
//             <p>Total Amount</p>
//           </div>
//         </div>

//         <div className={styles.summaryCard}>
//           <div
//             className={styles.summaryIcon}
//             style={{ backgroundColor: "#3b82f620", color: "#3b82f6" }}
//           >
//             <FaCalendarAlt />
//           </div>
//           <div className={styles.summaryContent}>
//             <h3>₹{paymentData.paidAmount.toLocaleString()}</h3>
//             <p>Amount Paid</p>
//           </div>
//         </div>

//         <div className={styles.summaryCard}>
//           <div
//             className={styles.summaryIcon}
//             style={{ backgroundColor: "#ef444420", color: "#ef4444" }}
//           >
//             <FaHistory />
//           </div>
//           <div className={styles.summaryContent}>
//             <h3>₹{paymentData.pendingAmount.toLocaleString()}</h3>
//             <p>Pending Amount</p>
//           </div>
//         </div>
//       </div>

//       {/* Tab Navigation */}
//       <div className={styles.tabContainer}>
//         <div className={styles.tabNav}>
//           <button
//             className={`${styles.tabButton} ${
//               activeTab === "payment" ? styles.activeTab : ""
//             }`}
//             onClick={() => setActiveTab("payment")}
//           >
//             <FaCreditCard className={styles.tabIcon} />
//             Payment History
//           </button>
//           <button
//             className={`${styles.tabButton} ${
//               activeTab === "installment" ? styles.activeTab : ""
//             }`}
//             onClick={() => setActiveTab("installment")}
//           >
//             <FaCalendarAlt className={styles.tabIcon} />
//             Installment Schedule
//           </button>
//         </div>

//         {/* Tab Content */}
//         <div className={styles.tabContent}>
//           {activeTab === "payment" ? (
//             // Payment Tab Content
//             <div className={styles.paymentContent}>
//               <div className={styles.paymentHeader}>
//                 <h3>Payment History</h3>
//                 <div className={styles.actionButtons}>
//                   <button className={styles.actionBtn}>
//                     <FaDownload /> Export
//                   </button>
//                   <button className={styles.actionBtn}>
//                     <FaPrint /> Print
//                   </button>
//                   <button className={styles.actionBtn}>
//                     <FaShare /> Share
//                   </button>
//                 </div>
//               </div>

//               {/* Payment Methods */}
//               <div className={styles.paymentMethods}>
//                 <h4>Make Payment</h4>
//                 <div className={styles.methodGrid}>
//                   <button
//                     className={`${styles.methodButton} ${
//                       paymentMethod === "online" ? styles.activeMethod : ""
//                     }`}
//                     onClick={() => setPaymentMethod("online")}
//                   >
//                     <div className={styles.methodIcon}>💳</div>
//                     <span>Online Payment</span>
//                   </button>
//                   <button
//                     className={`${styles.methodButton} ${
//                       paymentMethod === "bank" ? styles.activeMethod : ""
//                     }`}
//                     onClick={() => setPaymentMethod("bank")}
//                   >
//                     <div className={styles.methodIcon}>🏦</div>
//                     <span>Bank Transfer</span>
//                   </button>
//                   <button
//                     className={`${styles.methodButton} ${
//                       paymentMethod === "upi" ? styles.activeMethod : ""
//                     }`}
//                     onClick={() => setPaymentMethod("upi")}
//                   >
//                     <div className={styles.methodIcon}>📱</div>
//                     <span>UPI</span>
//                   </button>
//                   <button
//                     className={`${styles.methodButton} ${
//                       paymentMethod === "cash" ? styles.activeMethod : ""
//                     }`}
//                     onClick={() => setPaymentMethod("cash")}
//                   >
//                     <div className={styles.methodIcon}>💵</div>
//                     <span>Cash</span>
//                   </button>
//                 </div>
//               </div>

//               {/* Transactions List */}
//               <div className={styles.transactions}>
//                 <h4>Recent Transactions</h4>
//                 <div className={styles.transactionList}>
//                   {paymentData.transactions.map((transaction) => (
//                     <div
//                       key={transaction.id}
//                       className={styles.transactionItem}
//                     >
//                       <div className={styles.transactionInfo}>
//                         <div className={styles.transactionDate}>
//                           {transaction.date}
//                         </div>
//                         <div className={styles.transactionMethod}>
//                           {transaction.method}
//                         </div>
//                       </div>
//                       <div className={styles.transactionAmount}>
//                         <span className={styles.amount}>
//                           ₹{transaction.amount.toLocaleString()}
//                         </span>
//                         <span
//                           className={`${styles.status} ${
//                             transaction.status === "completed"
//                               ? styles.completed
//                               : ""
//                           }`}
//                         >
//                           {transaction.status}
//                         </span>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           ) : (
//             // Installment Tab Content
//             <div className={styles.installmentContent}>
//               <div className={styles.installmentHeader}>
//                 <h3>Installment Schedule</h3>
//                 <button className={styles.payAllBtn}>
//                   Pay All Installments
//                 </button>
//               </div>

//               {/* Installment List */}
//               <div className={styles.installmentList}>
//                 {installmentData.map((installment) => (
//                   <div key={installment.id} className={styles.installmentItem}>
//                     <div className={styles.installmentInfo}>
//                       <div className={styles.installmentNumber}>
//                         Installment #{installment.id}
//                       </div>
//                       <div className={styles.dueDate}>
//                         Due: <span>{installment.dueDate}</span>
//                       </div>
//                     </div>
//                     <div className={styles.installmentActions}>
//                       <div className={styles.installmentAmount}>
//                         ₹{installment.amount.toLocaleString()}
//                       </div>
//                       <div
//                         className={`${styles.installmentStatus} ${
//                           styles[installment.status]
//                         }`}
//                       >
//                         {installment.status}
//                       </div>
//                       <button className={styles.payNowBtn}>Pay Now</button>
//                     </div>
//                   </div>
//                 ))}
//               </div>

//               {/* Payment Summary */}
//               <div className={styles.paymentSummary}>
//                 <h4>Payment Summary</h4>
//                 <div className={styles.summaryDetails}>
//                   <div className={styles.summaryRow}>
//                     <span>Total Installments:</span>
//                     <span>{installmentData.length}</span>
//                   </div>
//                   <div className={styles.summaryRow}>
//                     <span>Total Amount:</span>
//                     <span>
//                       ₹
//                       {installmentData
//                         .reduce((sum, item) => sum + item.amount, 0)
//                         .toLocaleString()}
//                     </span>
//                   </div>
//                   <div className={styles.summaryRow}>
//                     <span>Next Due Date:</span>
//                     <span>{installmentData[0]?.dueDate || "N/A"}</span>
//                   </div>
//                   <div className={styles.summaryRow}>
//                     <span>Next Amount:</span>
//                     <span>
//                       ₹{installmentData[0]?.amount.toLocaleString() || "0"}
//                     </span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PaymentTabs;

import { useState } from "react";
import {
  FaCreditCard,
  FaCalendarAlt,
  FaDownload,
  FaPrint,
  FaShare,
  FaHistory,
  FaTimes,
  FaCheckCircle,
  FaBuilding,
  FaUser,
} from "react-icons/fa";
import styles from "./PaymentTabs.module.css";

const PaymentTabs = () => {
  const [activeTab, setActiveTab] = useState("installment");
  const [paymentMethod, setPaymentMethod] = useState("online");
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [selectedInstallment, setSelectedInstallment] = useState(null);
  const [paymentDetails, setPaymentDetails] = useState({
    amount: "",
    cardNumber: "",
    cardHolder: "",
    expiryDate: "",
    cvv: "",
    upiId: "",
    bankName: "",
    accountNumber: "",
    ifscCode: "",
    transactionId: "",
  });

  // Sample payment data
  const paymentData = {
    totalAmount: 25000,
    paidAmount: 10000,
    pendingAmount: 15000,
    transactions: [
      {
        id: 1,
        date: "2024-01-15",
        amount: 5000,
        method: "UPI",
        status: "completed",
      },
      {
        id: 2,
        date: "2024-01-30",
        amount: 5000,
        method: "Bank Transfer",
        status: "completed",
      },
    ],
  };

  // Sample installment data
  const [installments, setInstallments] = useState([
    {
      id: 1,
      dueDate: "2024-02-15",
      amount: 5000,
      status: "upcoming",
      paidDate: null,
    },
    {
      id: 2,
      dueDate: "2024-03-15",
      amount: 5000,
      status: "upcoming",
      paidDate: null,
    },
    {
      id: 3,
      dueDate: "2024-04-15",
      amount: 5000,
      status: "upcoming",
      paidDate: null,
    },
  ]);

  // Handle Pay Now click
  const handlePayNow = (installment) => {
    setSelectedInstallment(installment);
    setPaymentDetails((prev) => ({
      ...prev,
      amount: installment.amount.toString(),
    }));
    setShowPaymentForm(true);
  };

  // Handle payment form submission
  const handlePaymentSubmit = (e) => {
    e.preventDefault();

    // Simulate payment processing
    setTimeout(() => {
      // Update installment status
      const updatedInstallments = installments.map((inst) =>
        inst.id === selectedInstallment.id
          ? {
              ...inst,
              status: "paid",
              paidDate: new Date().toISOString().split("T")[0],
            }
          : inst
      );

      setInstallments(updatedInstallments);
      setShowPaymentForm(false);
      setSelectedInstallment(null);
      setPaymentDetails({
        amount: "",
        cardNumber: "",
        cardHolder: "",
        expiryDate: "",
        cvv: "",
        upiId: "",
        bankName: "",
        accountNumber: "",
        ifscCode: "",
        transactionId: "",
      });

      // Show success message (you can use toast here)
      alert(
        `Payment of ₹${selectedInstallment.amount} submitted successfully!`
      );
    }, 1500);
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPaymentDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Payment form based on selected method
  const renderPaymentForm = () => {
    switch (paymentMethod) {
      case "online":
        return (
          <div className={styles.paymentFormSection}>
            <div className={styles.formGroup}>
              <label>Card Number</label>
              <input
                type="text"
                name="cardNumber"
                placeholder="1234 5678 9012 3456"
                value={paymentDetails.cardNumber}
                onChange={handleInputChange}
                maxLength="19"
              />
            </div>
            <div className={styles.formGroup}>
              <label>Card Holder Name</label>
              <input
                type="text"
                name="cardHolder"
                placeholder="John Doe"
                value={paymentDetails.cardHolder}
                onChange={handleInputChange}
              />
            </div>
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label>Expiry Date</label>
                <input
                  type="text"
                  name="expiryDate"
                  placeholder="MM/YY"
                  value={paymentDetails.expiryDate}
                  onChange={handleInputChange}
                  maxLength="5"
                />
              </div>
              <div className={styles.formGroup}>
                <label>CVV</label>
                <input
                  type="password"
                  name="cvv"
                  placeholder="123"
                  value={paymentDetails.cvv}
                  onChange={handleInputChange}
                  maxLength="3"
                />
              </div>
            </div>
          </div>
        );

      case "upi":
        return (
          <div className={styles.paymentFormSection}>
            <div className={styles.formGroup}>
              <label>UPI ID</label>
              <input
                type="text"
                name="upiId"
                placeholder="username@bank"
                value={paymentDetails.upiId}
                onChange={handleInputChange}
              />
            </div>
            <div className={styles.upiHint}>
              <p>💡 Enter your UPI ID (e.g., username@bank)</p>
              <p>We'll send a payment request to your UPI app</p>
            </div>
          </div>
        );

      case "bank":
        return (
          <div className={styles.paymentFormSection}>
            <div className={styles.formGroup}>
              <label>Bank Name</label>
              <input
                type="text"
                name="bankName"
                placeholder="State Bank of India"
                value={paymentDetails.bankName}
                onChange={handleInputChange}
              />
            </div>
            <div className={styles.formGroup}>
              <label>Account Number</label>
              <input
                type="text"
                name="accountNumber"
                placeholder="XXXXXXXXXXXX"
                value={paymentDetails.accountNumber}
                onChange={handleInputChange}
              />
            </div>
            <div className={styles.formGroup}>
              <label>IFSC Code</label>
              <input
                type="text"
                name="ifscCode"
                placeholder="SBIN0001234"
                value={paymentDetails.ifscCode}
                onChange={handleInputChange}
              />
            </div>
          </div>
        );

      case "cash":
        return (
          <div className={styles.paymentFormSection}>
            <div className={styles.formGroup}>
              <label>Transaction/Receipt ID</label>
              <input
                type="text"
                name="transactionId"
                placeholder="Enter cash transaction ID"
                value={paymentDetails.transactionId}
                onChange={handleInputChange}
              />
            </div>
            <div className={styles.cashHint}>
              <p>💵 Please submit cash payment at our office</p>
              <p>📍 Address: 123 Main Street, Bangalore</p>
              <p>🕒 Timings: 9:00 AM - 6:00 PM (Mon-Sat)</p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <h2 className={styles.title}>Payment Management</h2>
        <p className={styles.subtitle}>Manage your payments and installments</p>
      </div>

      {/* Summary Cards */}
      <div className={styles.summaryCards}>
        <div className={styles.summaryCard}>
          <div
            className={styles.summaryIcon}
            style={{ backgroundColor: "#10b98120", color: "#10b981" }}
          >
            <FaCreditCard />
          </div>
          <div className={styles.summaryContent}>
            <h3>₹{paymentData.totalAmount.toLocaleString()}</h3>
            <p>Total Amount</p>
          </div>
        </div>

        <div className={styles.summaryCard}>
          <div
            className={styles.summaryIcon}
            style={{ backgroundColor: "#3b82f620", color: "#3b82f6" }}
          >
            <FaCalendarAlt />
          </div>
          <div className={styles.summaryContent}>
            <h3>₹{paymentData.paidAmount.toLocaleString()}</h3>
            <p>Amount Paid</p>
          </div>
        </div>

        <div className={styles.summaryCard}>
          <div
            className={styles.summaryIcon}
            style={{ backgroundColor: "#ef444420", color: "#ef4444" }}
          >
            <FaHistory />
          </div>
          <div className={styles.summaryContent}>
            <h3>₹{paymentData.pendingAmount.toLocaleString()}</h3>
            <p>Pending Amount</p>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className={styles.tabContainer}>
        <div className={styles.tabNav}>
          <button
            className={`${styles.tabButton} ${
              activeTab === "payment" ? styles.activeTab : ""
            }`}
            onClick={() => setActiveTab("payment")}
          >
            <FaCreditCard className={styles.tabIcon} />
            Payment History
          </button>
          <button
            className={`${styles.tabButton} ${
              activeTab === "installment" ? styles.activeTab : ""
            }`}
            onClick={() => setActiveTab("installment")}
          >
            <FaCalendarAlt className={styles.tabIcon} />
            Installment Schedule
          </button>
        </div>

        {/* Tab Content */}
        <div className={styles.tabContent}>
          {activeTab === "payment" ? (
            // Payment Tab Content
            <div className={styles.paymentContent}>
              <div className={styles.paymentHeader}>
                <h3>Payment History</h3>
                <div className={styles.actionButtons}>
                  {/* <button className={styles.actionBtn}>
                    <FaDownload /> Export
                  </button> */}
                  <button className={styles.actionBtn}>
                    <FaPrint /> Print
                  </button>
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
                  {paymentData.transactions.map((transaction) => (
                    <div
                      key={transaction.id}
                      className={styles.transactionItem}
                    >
                      <div className={styles.transactionInfo}>
                        <div className={styles.transactionDate}>
                          {transaction.date}
                        </div>
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
                            transaction.status === "completed"
                              ? styles.completed
                              : ""
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
          ) : (
            // Installment Tab Content
            <div className={styles.installmentContent}>
              <div className={styles.installmentHeader}>
                <h3>Installment Schedule</h3>
                {/* <button className={styles.payAllBtn}>
                  Pay All Installments
                </button> */}
              </div>

              {/* Installment List */}
              <div className={styles.installmentList}>
                {installments.map((installment) => (
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
                      {installment.status === "upcoming" && (
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
                    <span>{installments.length}</span>
                  </div>
                  <div className={styles.summaryRow}>
                    <span>Paid Installments:</span>
                    <span>
                      {installments.filter((i) => i.status === "paid").length}
                    </span>
                  </div>
                  <div className={styles.summaryRow}>
                    <span>Pending Installments:</span>
                    <span>
                      {
                        installments.filter((i) => i.status === "upcoming")
                          .length
                      }
                    </span>
                  </div>
                  <div className={styles.summaryRow}>
                    <span>Total Amount:</span>
                    <span>
                      ₹
                      {installments
                        .reduce((sum, item) => sum + item.amount, 0)
                        .toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Payment Form Modal */}
      {showPaymentForm && selectedInstallment && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            {/* Modal Header */}
            <div className={styles.modalHeader}>
              <h3>Make Payment</h3>
              <button
                className={styles.closeButton}
                onClick={() => setShowPaymentForm(false)}
              >
                <FaTimes />
              </button>
            </div>

            {/* Payment Details */}
            <div className={styles.paymentDetails}>
              <div className={styles.detailCard}>
                <div className={styles.detailItem}>
                  <span>Installment:</span>
                  <strong>#{selectedInstallment.id}</strong>
                </div>
                <div className={styles.detailItem}>
                  <span>Due Date:</span>
                  <strong>{selectedInstallment.dueDate}</strong>
                </div>
                <div className={styles.detailItem}>
                  <span>Amount:</span>
                  <strong className={styles.amountHighlight}>
                    ₹{selectedInstallment.amount.toLocaleString()}
                  </strong>
                </div>
              </div>
            </div>

            {/* Payment Method Selection */}
            <div className={styles.modalMethods}>
              <h4>Select Payment Method</h4>
              <div className={styles.methodButtons}>
                {["online", "upi", "bank", "cash"].map((method) => (
                  <button
                    key={method}
                    className={`${styles.methodBtn} ${
                      paymentMethod === method ? styles.activeMethodBtn : ""
                    }`}
                    onClick={() => setPaymentMethod(method)}
                  >
                    {method === "online" && "💳 Online"}
                    {method === "upi" && "📱 UPI"}
                    {method === "bank" && "🏦 Bank"}
                    {method === "cash" && "💵 Cash"}
                  </button>
                ))}
              </div>
            </div>

            {/* Payment Form */}
            <form onSubmit={handlePaymentSubmit} className={styles.paymentForm}>
              {renderPaymentForm()}

              {/* Terms and Conditions */}
              <div className={styles.terms}>
                <label className={styles.checkboxLabel}>
                  <input type="checkbox" required />
                  <span>I agree to the terms and conditions</span>
                </label>
              </div>

              {/* Action Buttons */}
              <div className={styles.formActions}>
                <button
                  type="button"
                  className={styles.cancelBtn}
                  onClick={() => setShowPaymentForm(false)}
                >
                  Cancel
                </button>
                <button type="submit" className={styles.submitBtn}>
                  Pay ₹{selectedInstallment.amount.toLocaleString()}
                </button>
              </div>
            </form>

            {/* Security Notice */}
            <div className={styles.securityNotice}>
              <p>🔒 Your payment is secure and encrypted</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentTabs;
