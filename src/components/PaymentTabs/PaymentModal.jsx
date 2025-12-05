import { useState } from "react";
import {
  FaTimes,
  FaReceipt,
  FaCalendarAlt,
  FaCreditCard,
  FaMobileAlt,
  FaUniversity,
  FaMoneyBill,
} from "react-icons/fa";

import styles from "./PaymentModal.module.css";
import api from "../../utils/axiosConfig";
// import { useLoaderData } from "react-router-dom";
const PaymentModal = ({
  showPaymentForm,
  setShowPaymentForm,
  selectedInstallment,
  studentId,
}) => {
  const [paymentMethod, setPaymentMethod] = useState("");
  // const { data } = useLoaderData();
  // console.log(selectedInstallment);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState({
    // transactionId: "",
    // utrNumber: "",
    // bankName: "",
    // accountNumber: "",
    // cashReceiptNumber: "",
    paidAmount: selectedInstallment.paidAmount || 0,
    paidDate: new Date().toISOString().split("T")[0],
    status: "Completed",
    notes: "",
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      const payload = {
        installmentNo: selectedInstallment.id,
        // paidAmount: Number(paymentDetails.paidAmount),
        paidAmount: selectedInstallment.originalAmount,
        method: paymentMethod,
        notes: paymentDetails.notes,
        paidDate: paymentDetails.paidDate, // send as string or date
      };

      // console.log("Payload to backend:", payload);

      const response = await api.post(
        `/student-payment/payment-tabs/${studentId}/make-payment`,
        payload
      );

      console.log("Payment Success:", response.data);

      // setShowPaymentForm(false);
      // resetForm();
      setPaymentSuccess(true);

      setTimeout(() => {
        window.location.href = `/student/payment-tabs/${studentId}`;
      }, 2000); // 2 seconds animation time
    } catch (err) {
      console.error(err);
      alert(err?.response?.data?.message || "Payment failed");
    } finally {
      setIsProcessing(false);
    }
  };

  const resetForm = () => {
    setPaymentMethod("");
    setPaymentDetails({
      transactionId: "",
      utrNumber: "",
      bankName: "",
      accountNumber: "",
      cashReceiptNumber: "",
      paidAmount: selectedInstallment?.paidAmount || 0,
      paidDate: new Date().toISOString().split("T")[0],
      status: "Completed",
      notes: "",
    });
    setAgreedToTerms(false);
  };

  // Render payment form based on selected method
  // const renderPaymentForm = () => {
  //   switch (paymentMethod) {
  //     case "UPI":
  //       return (
  //         <div className={styles.methodForm}>
  //           <div className={styles.formGroup}>
  //             <label>
  //               <FaMobileAlt /> UPI Transaction ID
  //             </label>
  //             <input
  //               type="text"
  //               placeholder="Enter UPI Transaction ID"
  //               value={paymentDetails.transactionId}
  //               onChange={(e) =>
  //                 setPaymentDetails({
  //                   ...paymentDetails,
  //                   transactionId: e.target.value,
  //                 })
  //               }
  //               required
  //             />
  //           </div>
  // <div className={styles.formGroup}>
  //   <label>
  //     <FaCalendarAlt /> Payment Date
  //   </label>
  //   <input
  //     type="date"
  //     value={paymentDetails.paidDate}
  //     onChange={(e) =>
  //       setPaymentDetails({
  //         ...paymentDetails,
  //         paidDate: e.target.value,
  //       })
  //     }
  //     required
  //   />
  // </div>
  //           <div className={styles.formGroup}>
  //             <label>
  //               <FaReceipt /> UTR Number
  //             </label>
  //             <input
  //               type="text"
  //               placeholder="Enter UTR Number"
  //               value={paymentDetails.utrNumber}
  //               onChange={(e) =>
  //                 setPaymentDetails({
  //                   ...paymentDetails,
  //                   utrNumber: e.target.value,
  //                 })
  //               }
  //             />
  //           </div>
  //         </div>
  //       );

  //     case "Online":
  //       return (
  //         <div className={styles.methodForm}>
  //           <div className={styles.formGroup}>
  //             <label>
  //               <FaCreditCard /> Transaction ID
  //             </label>
  //             <input
  //               type="text"
  //               placeholder="Enter Transaction ID"
  //               value={paymentDetails.transactionId}
  //               onChange={(e) =>
  //                 setPaymentDetails({
  //                   ...paymentDetails,
  //                   transactionId: e.target.value,
  //                 })
  //               }
  //               required
  //             />
  //           </div>
  //           <div className={styles.formGroup}>
  //             <label>
  //               <FaCalendarAlt /> Payment Date
  //             </label>
  //             <input
  //               type="date"
  //               value={paymentDetails.paidDate}
  //               onChange={(e) =>
  //                 setPaymentDetails({
  //                   ...paymentDetails,
  //                   paidDate: e.target.value,
  //                 })
  //               }
  //               required
  //             />
  //           </div>
  //         </div>
  //       );

  //     case "Bank Transfer":
  //       return (
  //         <div className={styles.methodForm}>
  //           <div className={styles.formGroup}>
  //             <label>
  //               <FaUniversity /> Bank Name
  //             </label>
  //             <input
  //               type="text"
  //               placeholder="Enter Bank Name"
  //               value={paymentDetails.bankName}
  //               onChange={(e) =>
  //                 setPaymentDetails({
  //                   ...paymentDetails,
  //                   bankName: e.target.value,
  //                 })
  //               }
  //               required
  //             />
  //           </div>
  //           <div className={styles.formGroup}>
  //             <label>Account Number (Last 4 digits)</label>
  //             <input
  //               type="text"
  //               placeholder="XXXX XXXX XXXX 1234"
  //               value={paymentDetails.accountNumber}
  //               onChange={(e) =>
  //                 setPaymentDetails({
  //                   ...paymentDetails,
  //                   accountNumber: e.target.value,
  //                 })
  //               }
  //               maxLength={4}
  //             />
  //           </div>
  //           <div className={styles.formGroup}>
  //             <label>UTR/Reference Number</label>
  //             <input
  //               type="text"
  //               placeholder="Enter UTR/Reference Number"
  //               value={paymentDetails.utrNumber}
  //               onChange={(e) =>
  //                 setPaymentDetails({
  //                   ...paymentDetails,
  //                   utrNumber: e.target.value,
  //                 })
  //               }
  //               required
  //             />
  //           </div>
  //         </div>
  //       );

  //     case "Cash":
  //       return (
  //         <div className={styles.methodForm}>
  //           <div className={styles.formGroup}>
  //             <label>
  //               <FaMoneyBill /> Cash Receipt Number
  //             </label>
  //             <input
  //               type="text"
  //               placeholder="Enter Receipt Number"
  //               value={paymentDetails.cashReceiptNumber}
  //               onChange={(e) =>
  //                 setPaymentDetails({
  //                   ...paymentDetails,
  //                   cashReceiptNumber: e.target.value,
  //                 })
  //               }
  //               required
  //             />
  //           </div>
  //           <div className={styles.formGroup}>
  //             <label>
  //               <FaCalendarAlt /> Payment Date
  //             </label>
  //             <input
  //               type="date"
  //               value={paymentDetails.paidDate}
  //               onChange={(e) =>
  //                 setPaymentDetails({
  //                   ...paymentDetails,
  //                   paidDate: e.target.value,
  //                 })
  //               }
  //               required
  //             />
  //           </div>
  //         </div>
  //       );

  //     default:
  //       return (
  //         <div className={styles.selectMethodPrompt}>
  //           <p>Please select a payment method to proceed</p>
  //         </div>
  //       );
  //   }
  // };

  if (paymentSuccess) {
    return (
      <div className={styles.successOverlay}>
        <div className={styles.successBox}>
          <div className={styles.checkmark}></div>
          <h2>Payment Successful!</h2>
          <p>Redirecting...</p>
        </div>
      </div>
    );
  }

  return (
    showPaymentForm &&
    selectedInstallment && (
      <div className={styles.modalOverlay}>
        <div className={styles.modal}>
          {/* Modal Header */}
          <div className={styles.modalHeader}>
            <h3>Make Payment</h3>
            <button
              className={styles.closeButton}
              onClick={() => {
                setShowPaymentForm(false);
                resetForm();
              }}
              disabled={isProcessing}
            >
              <FaTimes />
            </button>
          </div>

          {/* Payment Details Summary */}
          <div className={styles.paymentDetails}>
            <div className={styles.detailCard}>
              <div className={styles.detailItem}>
                <span>Installment:</span>
                <strong>#{selectedInstallment.id}</strong>
              </div>
              <div className={styles.detailItem}>
                <span>Due Date:</span>
                <strong>
                  {new Date(selectedInstallment.dueDate).toLocaleDateString()}
                </strong>
              </div>
              {/* <div className={styles.detailItem}>
                <span>Original Amount:</span>
                <strong>
                  ₹{selectedInstallment.originalAmount.toLocaleString()}
                </strong>
              </div> */}
              {selectedInstallment.franchiseDiscount > 0 && (
                <div className={styles.detailItem}>
                  <span>Discount:</span>
                  <strong className={styles.discount}>
                    -₹{selectedInstallment.franchiseDiscount.toLocaleString()}
                  </strong>
                </div>
              )}
              {selectedInstallment.gstAmount > 0 && (
                <div className={styles.detailItem}>
                  <span>GST:</span>
                  <strong>
                    +₹{selectedInstallment.gstAmount.toLocaleString()}
                  </strong>
                </div>
              )}
              <div className={styles.detailItem}>
                <span>Total Payable:</span>
                <strong className={styles.amountHighlight}>
                  {/* ₹{selectedInstallment.amount.toLocaleString()} */}₹
                  {Math.round(selectedInstallment.amount).toLocaleString(
                    "en-IN"
                  )}
                </strong>
              </div>
            </div>
          </div>

          {/* Payment Method Selection */}
          <div className={styles.modalMethods}>
            <h2>Select Payment Method</h2>
            <div className={styles.methodButtons}>
              {[
                { value: "UPI", label: "📱 UPI", icon: <FaMobileAlt /> },
                { value: "Online", label: "💳 Online", icon: <FaCreditCard /> },
                {
                  value: "Bank Transfer",
                  label: "🏦 Bank Transfer",
                  icon: <FaUniversity />,
                },
                { value: "Cash", label: "💵 Cash", icon: <FaMoneyBill /> },
              ].map((method) => (
                <button
                  key={method.value}
                  type="button"
                  className={`${styles.methodBtn} ${
                    paymentMethod === method.value ? styles.activeMethodBtn : ""
                  }`}
                  onClick={() => setPaymentMethod(method.value)}
                  disabled={isProcessing}
                >
                  {method.icon}
                  <span>{method.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Payment Form */}
          <form onSubmit={handlePaymentSubmit} className={styles.paymentForm}>
            {/* {renderPaymentForm()} */}

            {/* Payment Amount (Editable for partial payments) */}
            <div className={styles.formGroup}>
              <label>
                <FaCalendarAlt /> Payment Date
              </label>
              <input
                type="date"
                value={paymentDetails.paidDate}
                onChange={(e) =>
                  setPaymentDetails({
                    ...paymentDetails,
                    paidDate: e.target.value,
                  })
                }
                // disabled="true"
                disabled={true}
                required
              />
            </div>
            <div className={styles.amountSection}>
              <div className={styles.formGroup}>
                <label>Payment Amount (₹)</label>
                {/* <input
                  type="number"
                  value={selectedInstallment.finalAmount}
                  // onChange={(e) =>
                  //   setPaymentDetails({
                  //     ...paymentDetails,
                  //     paidAmount: Math.min(
                  //       Math.max(0, parseFloat(e.target.value) || 0)
                  //       // selectedInstallment.totalPayable
                  //     ),
                  //   })
                  // }
                  min="0"
                  // max={selectedInstallment.totalPayable}
                  step="0.01"
                  required
                  // disabled={isProcessing}
                  // disabled="true"
                  disabled={true}
                /> */}
                <input
                  type="number"
                  value={Math.round(selectedInstallment.finalAmount)}
                  min="0"
                  step="1"
                  required
                  disabled={true}
                />

                <small className={styles.amountHint}>
                  {/* Maximum: ₹{selectedInstallment.totalPayable.toLocaleString()} */}
                </small>
              </div>
            </div>

            {/* Additional Notes */}
            <div className={styles.notesSection}>
              <div className={styles.formGroup}>
                <label>Additional Notes</label>
                <textarea
                  placeholder="Any additional payment notes..."
                  value={paymentDetails.notes}
                  onChange={(e) =>
                    setPaymentDetails({
                      ...paymentDetails,
                      notes: e.target.value,
                    })
                  }
                  rows={2}
                  disabled={isProcessing}
                />
              </div>
            </div>

            {/* Terms and Conditions */}
            <div className={styles.terms}>
              <label className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  checked={agreedToTerms}
                  onChange={(e) => setAgreedToTerms(e.target.checked)}
                  required
                  disabled={isProcessing}
                />
                <span>
                  I confirm that this payment has been received and agree to
                  update the student's payment record.
                </span>
              </label>
            </div>

            {/* Action Buttons */}
            <div className={styles.formActions}>
              <button
                type="button"
                className={styles.cancelBtn}
                onClick={() => {
                  setShowPaymentForm(false);
                  resetForm();
                }}
                disabled={isProcessing}
              >
                Cancel
              </button>
              <button
                type="submit"
                className={styles.submitBtn}
                disabled={!paymentMethod || !agreedToTerms || isProcessing}
              >
                {isProcessing ? (
                  <>
                    <span className={styles.spinner}></span>
                    Processing...
                  </>
                ) : (
                  `Pay ₹${Math.round(
                    selectedInstallment.finalAmount
                  ).toLocaleString("en-IN")}`
                )}
              </button>
            </div>
          </form>

          {/* Security Notice */}
          <div className={styles.securityNotice}>
            <p>🔒 Payment records will be securely stored and auditable</p>
            <p>📝 Receipt will be generated upon successful payment</p>
          </div>
        </div>
      </div>
    )
  );
};

export default PaymentModal;
