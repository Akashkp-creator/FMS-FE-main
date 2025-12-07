import React, { useState } from "react";
import ReactDOM from "react-dom";
import { useLoaderData, useNavigate } from "react-router-dom";
import styles from "./StudentsList.module.css";
import { FileClock, NotebookPen, UserX } from "lucide-react";
import { studentFollowUpOptions } from "../../utils/studentFollowUpOptions";
import { toast } from "react-toastify";
import api from "../../utils/axiosConfig";

const StudentsList = () => {
  const { data, meta } = useLoaderData(); // from your loader
  // console.log(data);
  const [showHistoryModal, setShowHistoryModal] = useState(false); // 🎯 NEW
  const [historyData, setHistoryData] = useState([]); // 🎯 NEW
  const [showReasonModal, setShowReasonModal] = useState(false);
  const [reasonText, setReasonText] = useState("");
  const [selectedLeadForReason, setSelectedLeadForReason] = useState(null);
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [note, setNote] = useState("");
  const [selectedLeadId, setSelectedLeadId] = useState(null);
  const closeHistoryModal = () => {
    // 🎯 NEW function
    setShowHistoryModal(false);
    setHistoryData([]);
    setSelectedLeadId(null);
  };

  const openModal = (leadId) => {
    // console.log(leadId);
    setSelectedLeadId(leadId);
    setNote("");
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedLeadId(null);
    setNote("");
  };
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

  // const handleEnroll = (lead) => {
  //   navigate(
  //     `/Franchise-add/my-StudentLead/${lead._id}?name=${encodeURIComponent(
  //       lead.name
  //     )}&phone=${lead.contact.phone}&email=${encodeURIComponent(
  //       lead.contact.email
  //     )}`
  //   );
  // };
  const handleEnroll = (lead) => {
    navigate(
      `/Franchise-add/my-StudentLead/${lead._id}?name=${encodeURIComponent(
        lead.name
      )}&phone=${lead.contact.phone}&email=${encodeURIComponent(
        lead.contact.email
      )}&qualification=${encodeURIComponent(lead.qualification)}`
    );
  };
  const handleSave = async () => {
    if (!note.trim()) {
      toast.warning("Please select a note");
      return;
    }
    //:id/
    try {
      const res = await api.put(
        ///LeadStudentData/lead/:selectedLeadId/followup
        `/LeadStudentData/lead/${selectedLeadId}/followup`,
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

  const handleViewHistory = async (leadId) => {
    setSelectedLeadId(leadId);

    try {
      ///LeadStudentData/lead/:selectedLeadId/followup
      const res = await api.get(`/LeadStudentData/lead/${leadId}/followup`);
      console.log(res.data);

      setHistoryData(res.data.notes); // <- GET ONLY NOTES ARRAY
      setShowHistoryModal(true);
    } catch (err) {
      toast.error(err.response?.data?.message || "Error fetching history.");
      console.error("History Fetch Error:", err);
    }
  };

  const submitNotInterestedReason = async () => {
    if (!reasonText.trim()) {
      toast.warning("Please enter a reason");
      return;
    }
    //     /LeadStudentData/lead/:id/reject
    try {
      const res = await api.put(
        `/LeadStudentData/lead/${selectedLeadForReason}/reject`,
        { reason: reasonText } // pass reason here
      );

      if (res.status === 200) {
        toast.success("Lead status updated to 'Not Interested'");
        // Update Redux or local state if needed
        // dispatch(
        //   setLeads(
        //     leads.map((lead) =>
        //       lead._id === selectedLeadForReason
        //         ? { ...lead, status: "Not Interested", reason: reasonText }
        //         : lead
        //     )
        //   )
        // );
        closeReasonModal();
        navigate(0); // refresh the same route
      } else {
        throw new Error(res.data?.message || "Failed to update status");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Error updating lead status");
      console.error("Update Not Interested Error:", err);
    }
  };

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>My Leads ({meta.total})</h2>

      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>SL No.</th>
              <th>Name</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Course</th>
              {/* <th>Source</th> */}
              <th>Status</th>
              {/* <th>DM Payment</th> */}
              <th>Date</th>
              <th>Action</th>
              <th>Others</th>
            </tr>
          </thead>

          <tbody>
            {data.length === 0 ? (
              <tr>
                <td colSpan="9" className={styles.noData}>
                  No leads found
                </td>
              </tr>
            ) : (
              data.map((item, index) => (
                <tr key={item._id}>
                  <td>{index + 1 + (meta.page - 1) * meta.pageSize}</td>

                  <td>{item.name}</td>

                  <td>{item.contact?.phone}</td>

                  <td>{item.contact?.email}</td>

                  <td>{item.course}</td>

                  {/* <td>
                    {item.source}
                    {item.otherSource && (
                      <span className={styles.badgeSecondary}>
                        {item.otherSource}
                      </span>
                    )}
                  </td> */}

                  <td>
                    <span
                      className={`${styles.badge} ${
                        item.status === "New"
                          ? styles.new
                          : item.status === "Converted"
                          ? styles.converted
                          : styles.rejected
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>

                  {/* <td>
                    {item.digitalMarketingPayment ? (
                      <div className={styles.dmBox}>
                        ₹{item.digitalMarketingPayment.amount} <br />
                        <small>{item.digitalMarketingPayment.paidTo}</small>
                      </div>
                    ) : (
                      "-"
                    )}
                  </td> */}

                  <td>
                    {new Date(item.createdAt).toLocaleDateString("en-IN")}
                  </td>
                  <td>
                    {item.status === "Converted" ? (
                      <span className={styles.enrolled}>Enrolled</span>
                    ) : item.status === "Rejected" ? (
                      <span className={styles.notInterested}>Rejected</span>
                    ) : (
                      <button
                        className={styles.enrollBtn}
                        onClick={() => handleEnroll(item)}
                      >
                        Enroll
                      </button>
                    )}
                  </td>
                  {/* ✅ New Lead Update column */}
                  <td
                  // style={{
                  //   display: "flex",
                  //   alignItems: "center",
                  //   gap: "8px",
                  // }}
                  >
                    {item.status !== "Converted" &&
                      item.status != "Rejected" && (
                        <div className={styles.otherbuttons}>
                          <button
                            className={styles.updateBtn}
                            onClick={() => openModal(item._id)}
                          >
                            <NotebookPen />
                            <span className={styles.tooltip}>
                              Add Follow-ups
                            </span>
                          </button>
                          <button
                            className={styles.updateBtn}
                            // style={{ margin: "5px" }}
                            onClick={() => handleViewHistory(item._id)} // 🎯 Attach new handler
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
                            // style={{ margin: "5px" }}
                            onClick={() => openReasonModal(item._id)}
                          >
                            <UserX />
                            <span className={styles.tooltip}>
                              Not Interested
                            </span>
                          </button>
                        </div>
                      )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
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

                {studentFollowUpOptions.map((item, idx) => (
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

      {/* Pagination Info */}
      <div className={styles.paginationFooter}>
        <span>
          Page {meta.page} of {meta.pageCount}
        </span>
      </div>
    </div>
  );
};

export default StudentsList;
