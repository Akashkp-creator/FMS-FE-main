import { useState } from "react";
import styles from "./PayCommissionModal.module.css";
import api from "../../utils/axiosConfig";

const PayCommissionModal = ({ partner, close, refreshData }) => {
  const [amount, setAmount] = useState("");
  const [paymentMode, setPaymentMode] = useState("Cash");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await api.post(
        `/manager/channel-partner/pay-commission/${partner._id}`,
        {
          amount: Number(amount),
          paymentMode,
        }
      );

      refreshData();
      close();
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2 className={styles.title}>Pay Commission</h2>

        <button className={styles.closeBtn} onClick={close}>
          ✕
        </button>

        <div className={styles.partnerInfo}>
          <h3>{partner.partnerName}</h3>
          <p>
            Pending Commission: ₹{partner.pendingCommission.toLocaleString()}
          </p>
        </div>

        {error && <div className={styles.error}>{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className={styles.field}>
            <label>Amount to Pay</label>
            <input
              type="number"
              value={amount}
              min={1}
              max={partner.pendingCommission}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </div>

          <div className={styles.field}>
            <label>Payment Mode</label>
            <select
              value={paymentMode}
              onChange={(e) => setPaymentMode(e.target.value)}
            >
              <option value="Cash">Cash</option>
              <option value="Bank Transfer">Bank Transfer</option>
              <option value="UPI">UPI</option>
            </select>
          </div>

          <button className={styles.submitBtn} disabled={loading}>
            {loading ? "Processing..." : "Pay Now"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PayCommissionModal;
