import { useState } from "react";
import api from "../../utils/axiosConfig";
import styles from "./PaymentModal.module.css";
import { toast } from "react-toastify";

const PaymentModal = ({ close, student, refreshData }) => {
  console.log(student);
  const [amount, setAmount] = useState("");
  const [mode, setMode] = useState("Cash");
  const [loading, setLoading] = useState(false);

  //   if (!show) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // console.log(student._id);
    try {
      const res = await api.post(
        `/channel-partner/manager/channel-partner/student/${student._id}/add-payment`,
        {
          amount: Number(amount),
          mode,
        }
      );
      console.log(res);

      //   alert("Payment added successfully!");
      // success handling
      toast.success(res.data?.message || "payment done");
      setLoading(false);
      refreshData();
      close();
      //   refreshData(); // optional reload function
    } catch (error) {
      alert(error.response?.data?.message || "Error adding payment");
      setLoading(false);
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalBox}>
        <h2>Add Payment — {student.studentName}</h2>

        <form onSubmit={handleSubmit}>
          <label>Amount</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />

          <label>Mode</label>
          <select value={mode} onChange={(e) => setMode(e.target.value)}>
            <option>Cash</option>
            <option>UPI</option>
            <option>Bank Transfer</option>
          </select>

          <div className={styles.buttons}>
            <button type="button" onClick={close} className={styles.cancel}>
              Cancel
            </button>
            <button type="submit" disabled={loading} className={styles.submit}>
              {loading ? "Adding..." : "Add Payment"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default PaymentModal;
