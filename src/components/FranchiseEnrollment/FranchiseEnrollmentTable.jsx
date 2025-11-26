import ReactDOM from "react-dom";
import { useEffect, useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
// import { setLeads } from "../../features/leadSlice/leadSlice";
import styles from "./FranchiseEnrollmentTable.module.css";
import api from "../../utils/axiosConfig";
import { FileClock, NotebookPen, UserX } from "lucide-react";
// import Loading from "../Loading/Loading";
import { setLeads } from "../../features/franchiseLeadSlice/franchiseLeadSlice";
import Loading from "../Loading/Loading";
import followUpOptions from "../../utils/followUpOptions";
import { toast } from "react-toastify";

const FranchiseEnrollmentTable = () => {
  const loaderLeads = useLoaderData();
  // console.log(loaderLeads);
  const { meta } = loaderLeads;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleEnroll = (leadId) => {
    navigate(`/manager/my-FranchiseLead/${leadId}`);
  };
  const [showModal, setShowModal] = useState(false);
  const [showHistoryModal, setShowHistoryModal] = useState(false); // 🎯 NEW
  const [historyData, setHistoryData] = useState([]); // 🎯 NEW
  const [selectedLeadId, setSelectedLeadId] = useState(null);
  const [note, setNote] = useState("");

  const [showReasonModal, setShowReasonModal] = useState(false);
  const [reasonText, setReasonText] = useState("");
  const [selectedLeadForReason, setSelectedLeadForReason] = useState(null);

  const openReasonModal = (leadId) => {
    setSelectedLeadForReason(leadId);
    setReasonText("");
    setShowReasonModal(true);
  };

  const closeReasonModal = () => {
    setShowReasonModal(false);
    setSelectedLeadForReason(null);
    setReasonText("");
  };

  const submitNotInterestedReason = async () => {
    if (!reasonText.trim()) {
      toast.warning("Please enter a reason");
      return;
    }

    try {
      const res = await api.put(
        `/manager/franchise/franchise-leads/status-not-interested/${selectedLeadForReason}`,
        { reason: reasonText }, // pass reason here
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (res.status === 200) {
        toast.success("Lead status updated to 'Not Interested'");
        // Update Redux or local state if needed
        dispatch(
          setLeads(
            leads.map((lead) =>
              lead._id === selectedLeadForReason
                ? { ...lead, status: "Not Interested", reason: reasonText }
                : lead
            )
          )
        );
        closeReasonModal();
      } else {
        throw new Error(res.data?.message || "Failed to update status");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Error updating lead status");
      console.error("Update Not Interested Error:", err);
    }
  };

  const openModal = (leadId) => {
    setSelectedLeadId(leadId);
    setNote("");
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedLeadId(null);
    setNote("");
  };

  const closeHistoryModal = () => {
    // 🎯 NEW function
    setShowHistoryModal(false);
    setHistoryData([]);
    setSelectedLeadId(null);
  };
  // --- New History Fetch Function ---
  // const handleViewHistory = async (leadId) => {
  //   // 🎯 NEW
  //   setSelectedLeadId(leadId);
  //   try {
  //     const res = await api.get(`/contacted-leads/${leadId}/contact-updates`);
  //     setHistoryData(res.data);
  //     setShowHistoryModal(true);
  //   } catch (err) {
  //     alert(err.response?.data?.message || "Error fetching history.");
  //     console.error("History Fetch Error:", err);
  //   }
  // };
  const handleViewHistory = async (leadId) => {
    setSelectedLeadId(leadId);

    try {
      const res = await api.get(`/manager/franchise/${leadId}/notes`);
      // console.log(res.data);

      setHistoryData(res.data.notes); // <- GET ONLY NOTES ARRAY
      setShowHistoryModal(true);
    } catch (err) {
      toast.error(err.response?.data?.message || "Error fetching history.");
      console.error("History Fetch Error:", err);
    }
  };

  const handleSave = async () => {
    if (!note.trim()) {
      toast.warning("Please select a note");
      return;
    }

    try {
      const res = await api.post(
        `/manager/franchise/${selectedLeadId}/add-note`,
        { note },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (res.status === 200) {
        toast.success("Follow-up note added successfully!");
        closeModal();
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Error saving follow-up note");
      console.error("API Error:", err);
    }
  };

  // const data = useSelector((state) => state.franchiseLeads);
  // console.log(data);
  const { leads, loading, error } = useSelector(
    (state) => state.franchiseLeads
  );

  // ... rest of the component

  useEffect(() => {
    if (loaderLeads?.length && leads?.length === 0) {
      dispatch(setLeads(loaderLeads));
    }
  }, [loaderLeads, dispatch, leads?.length]);

  if (loading) return <Loading />;
  if (error) return <p className={styles.error}>❌ {error}</p>;

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Enrollment Student</h2>

      {leads.length === 0 ? (
        <p style={{ color: "white" }}>No Leads found.</p>
      ) : (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Contact</th>
              <th>Email</th>
              <th>Status</th>
              {/* <th>Source</th> */}
              <th>Action</th>
              <th>Others</th>
            </tr>
          </thead>
          <tbody>
            {leads.map((lead) => (
              <tr key={lead._id}>
                <td>{lead.ownerName}</td>
                <td>{lead.ownerPhone || "—"}</td>
                <td>{lead.ownerEmail || "—"}</td>

                <td>{lead.status}</td>
                {/* <td>{lead.source}</td> */}
                {/* <td>
                  {lead.status !== "Enrolled" &&
                  lead.status !== "Not Interested" ? (
                    <button
                      className={styles.enrollBtn}
                      onClick={() => handleEnroll(lead._id)}
                    >
                      Enroll
                    </button>
                  ) : (
                    <span className={styles.enrolled}>Already Enrolled</span>
                  )}
                </td> */}
                <td>
                  {lead.status === "Enrolled" ? (
                    <span className={styles.enrolled}>Already Enrolled</span>
                  ) : lead.status === "Not Interested" ? (
                    <span className={styles.notInterested}>Not Interested</span>
                  ) : (
                    <button
                      className={styles.enrollBtn}
                      onClick={() => handleEnroll(lead._id)}
                    >
                      Enroll
                    </button>
                  )}
                </td>

                {/* ✅ New Lead Update column */}
                <td>
                  {lead.status !== "Enrolled" &&
                    lead.status != "Not Interested" && (
                      <>
                        <button
                          className={styles.updateBtn}
                          onClick={() => openModal(lead._id)}
                        >
                          <NotebookPen />
                          <span className={styles.tooltip}>Add Follow-ups</span>
                        </button>
                        <button
                          className={styles.updateBtn}
                          style={{ margin: "5px" }}
                          onClick={() => handleViewHistory(lead._id)} // 🎯 Attach new handler
                        >
                          <FileClock />
                          <span className={styles.tooltip}>View History</span>
                        </button>
                        {/* <button
                        className={styles.updateBtn}
                        style={{ margin: "5px" }}
                        onClick={() => handleNotInterested(lead._id)} // 🎯 ADDED onClick
                      >
                        <UserX />
                        <span className={styles.tooltip}>Not Interested</span>
                      </button> */}
                        <button
                          className={styles.updateBtn}
                          style={{ margin: "5px" }}
                          onClick={() => openReasonModal(lead._id)}
                        >
                          <UserX />
                          <span className={styles.tooltip}>Not Interested</span>
                        </button>
                      </>
                    )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {/* ✅ Modal */}

      {/* ✅ Modal Portal Implementation */}
      {showModal &&
        ReactDOM.createPortal(
          <div className={styles.modalOverlay}>
            <div className={styles.modal}>
              <h3>Lead Update</h3>
              <p>Contacted Date: {new Date().toLocaleDateString("en-IN")}</p>

              <select
                value={note}
                onChange={(e) => setNote(e.target.value)}
                className={styles.dropdown}
              >
                <option value="">Select Follow-up Status</option>

                {followUpOptions.map((item, idx) => (
                  <option key={idx} value={item}>
                    {item}
                  </option>
                ))}
              </select>

              <div className={styles.modalActions}>
                <button onClick={handleSave} className={styles.saveBtn}>
                  Save
                </button>

                <button onClick={closeModal} className={styles.cancelBtn}>
                  Cancel
                </button>
              </div>
            </div>
          </div>,
          document.getElementById("modal-root") // 🎯 Target the modal root element
        )}
      {/* 🎯 History Modal Portal Implementation */}
      {showHistoryModal &&
        ReactDOM.createPortal(
          <div className={styles.modalOverlay}>
            <div className={styles.modal} style={{ width: "600px" }}>
              {" "}
              {/* Make it wider */}
              <h3>Contact History for Lead #{selectedLeadId?.slice(-6)}</h3>
              {historyData.length === 0 ? (
                <p style={{ textAlign: "center", color: "#ccc" }}>
                  No previous contact history found.
                </p>
              ) : (
                <div className={styles.historyList}>
                  {historyData.map((item) => (
                    <div key={item._id} className={styles.historyItem}>
                      {/* <p className={styles.historyDate}>
                        <FileClock
                          size={16}
                          style={{ marginRight: "8px", color: "inherit" }}
                        />
                        {new Date(item.date).toLocaleString("en-IN", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: true,
                        })}
                      </p> */}
                      <p className={styles.historyDate}>
                        <FileClock
                          size={16}
                          style={{ marginRight: "8px", color: "inherit" }}
                        />
                        {new Date(item.date?.$date || item.date).toLocaleString(
                          "en-IN",
                          {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12: true,
                          }
                        )}
                      </p>

                      <p className={styles.historyNote}>{item.note}</p>
                      {/* You can show the franchise ID here if you populate it in the controller */}
                    </div>
                  ))}
                </div>
              )}
              <div
                className={styles.modalActions}
                style={{ marginTop: "20px" }}
              >
                <button
                  onClick={closeHistoryModal}
                  className={styles.cancelBtn}
                >
                  Close
                </button>
              </div>
            </div>
          </div>,
          document.getElementById("modal-root")
        )}
      {showReasonModal &&
        ReactDOM.createPortal(
          <div className={styles.modalOverlay}>
            {/* <div className={styles.modal}>
              <h3>Enter Reason for Not Interested</h3>
              <textarea
                placeholder="Enter reason (max 200 characters)"
                value={reasonText}
                onChange={(e) => setReasonText(e.target.value)}
                maxLength={200}
                rows={5}
                className={styles.textarea}
                style={{
                  width: "100%",
                  height: "100px",
                  padding: "10px",
                  borderRadius: "6px",
                  border: "1px solid #ccc",
                  background: "#111",
                  color: "white",
                }}
              ></textarea>
              <div className={styles.modalActions}>
                <button
                  onClick={submitNotInterestedReason}
                  className={styles.saveBtn}
                >
                  Submit
                </button>
                <button onClick={closeReasonModal} className={styles.cancelBtn}>
                  Cancel
                </button>
              </div>
            </div> */}
            <div className={styles.reasonModal}>
              <h3>Enter Reason for Not Interested</h3>

              <textarea
                placeholder="Enter reason (max 200 characters)"
                value={reasonText}
                onChange={(e) => setReasonText(e.target.value)}
                maxLength={200}
                rows={5}
                className={styles.reasonTextarea}
              ></textarea>

              <div className={styles.modalActions}>
                <button
                  onClick={submitNotInterestedReason}
                  className={styles.saveBtn}
                >
                  Submit
                </button>

                <button onClick={closeReasonModal} className={styles.cancelBtn}>
                  Cancel
                </button>
              </div>
            </div>
          </div>,
          document.getElementById("modal-root")
        )}

      <div className={styles.paginationInfo}>
        Page: {meta.page} / {meta.pageCount} | Total: {meta.total}{" "}
      </div>
    </div>
  );
};
export default FranchiseEnrollmentTable;
