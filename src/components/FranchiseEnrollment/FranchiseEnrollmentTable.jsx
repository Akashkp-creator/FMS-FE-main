// import { useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { useLoaderData } from "react-router-dom";
// import {
//   setLeads,
//   setMeta,
//   setParams,
// } from "../../features/franchiseLeadSlice/franchiseLeadSlice";
// import styles from "./FranchiseEnrollmentTable.module.css";

// const FranchiseEnrollmentTable = () => {
//   // 1️⃣ Loader data from route loader
//   const loaderData = useLoaderData();
//   const { data, meta, params } = loaderData; // coming from loader

//   // 2️⃣ Redux data
//   const dispatch = useDispatch();
//   const { leads, loading, error } = useSelector(
//     (state) => state.franchiseLeads
//   );

//   // 3️⃣ Sync loader → redux once
//   useEffect(() => {
//     if (data) dispatch(setLeads(data));
//     if (meta) dispatch(setMeta(meta));
//     if (params) dispatch(setParams(params));
//   }, [data, meta, params, dispatch]);

//   // 4️⃣ Loading & error UI
//   if (loading) return <p>Loading…</p>;
//   if (error) return <p style={{ color: "red" }}>❌ {error}</p>;

//   return (
//     <div className={styles.container}>
//       <h2 className={styles.heading}>Franchise Leads</h2>

//       {leads.length === 0 ? (
//         <p>No leads found</p>
//       ) : (
//         <table className={styles.table}>
//           <thead>
//             <tr>
//               <th>Name</th>
//               <th>Contact</th>
//               <th>Status</th>

//               {/* ✅ Newly Added */}
//               <th>Action</th>
//               <th>Others</th>
//             </tr>
//           </thead>

//           <tbody>
//             {leads.map((lead) => (
//               <tr key={lead._id}>
//                 <td>{lead.ownerName}</td>
//                 <td>{lead.ownerPhone || "—"}</td>

//                 {/* ✅ Correct way to show colored Status */}
//                 <td>
//                   <span
//                     className={`${styles.statusBadge} ${
//                       styles[lead.status.replace(/\s+/g, "")]
//                     }`}
//                   >
//                     {lead.status}
//                   </span>
//                 </td>

//                 {/* ✅ Action Column */}
//                 <td>
//                   <button className={styles.enrollBtn}>View</button>
//                 </td>

//                 {/* ✅ Others Column */}
//                 <td>
//                   <button className={styles.updateBtn}>More</button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}

//       <div className={styles.paginationInfo}>
//         Page: {meta.page} / {meta.pageCount} | Total: {meta.total}
//       </div>
//     </div>
//   );
// };

// export default FranchiseEnrollmentTable;
// ADD this import at the top
// ADD this import at the top
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

const FranchiseEnrollmentTable = () => {
  const loaderLeads = useLoaderData();
  console.log(loaderLeads);
  const { meta } = loaderLeads;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleEnroll = (leadId) => {
    navigate(`/franchise/my-lead-list/${leadId}`);
  };
  const [showModal, setShowModal] = useState(false);
  const [showHistoryModal, setShowHistoryModal] = useState(false); // 🎯 NEW
  const [historyData, setHistoryData] = useState([]); // 🎯 NEW
  const [selectedLeadId, setSelectedLeadId] = useState(null);
  const [note, setNote] = useState("");
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
  const handleViewHistory = async (leadId) => {
    // 🎯 NEW
    setSelectedLeadId(leadId);
    try {
      const res = await api.get(`/contacted-leads/${leadId}/contact-updates`);
      setHistoryData(res.data);
      setShowHistoryModal(true);
    } catch (err) {
      alert(err.response?.data?.message || "Error fetching history.");
      console.error("History Fetch Error:", err);
    }
  };
  const handleSave = async () => {
    if (!note.trim()) return alert("Please enter a note");
    if (note.length > 50) return alert("Note cannot exceed 50 characters.");

    try {
      const res = await api.post(
        `/contacted-leads/${selectedLeadId}`,
        {
          note,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // 🎯 FIX: Axios automatically throws for 4xx/5xx status codes.
      // We only check for success here.
      if (res.status === 201 || res.status === 200) {
        alert("Lead update saved successfully!");
        closeModal();
      } else {
        // This branch should ideally not be reached if Axios is configured correctly
        throw new Error(res.data?.message || "Error saving lead update");
      }
    } catch (err) {
      // 🎯 Catch block handles API errors (4xx/5xx)
      alert(err.response?.data?.message || "Error saving lead update");
      console.error("API Error:", err);
    }
  };
  const data = useSelector((state) => state.franchiseLeads);
  console.log(data);
  const { leads, loading, error } = useSelector(
    (state) => state.franchiseLeads
  );
  // ... existing functions (handleSave, handleViewHistory, etc.)

  const handleNotInterested = async (leadId) => {
    // 🎯 NEW FUNCTION
    if (
      !window.confirm(
        "Are you sure you want to mark this lead as 'Not Interested'?"
      )
    ) {
      return;
    }

    try {
      const res = await api.put(
        `/leads/${leadId}/status`, // 👈 Assumes this new API route exists
        { status: "Not Interested" },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (res.status === 200) {
        alert("Lead status successfully updated to 'Not Interested'.");

        // OPTIONAL: Update Redux state immediately to reflect change in UI
        // Find the updated lead and replace it in the leads array
        dispatch(
          setLeads(
            leads.map((lead) =>
              lead._id === leadId ? { ...lead, status: "Not Interested" } : lead
            )
          )
        );
      } else {
        throw new Error(res.data?.message || "Failed to update status.");
      }
    } catch (err) {
      alert(err.response?.data?.message || "Error updating lead status.");
      console.error("Not Interested Error:", err);
    }
  };

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
                <td>
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
                </td>
                {/* ✅ New Lead Update column */}
                <td>
                  {lead.status !== "Enrolled" && (
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
                      <button
                        className={styles.updateBtn}
                        style={{ margin: "5px" }}
                        // onClick={() => handleViewHistory(lead._id)} // 🎯 Attach new handler
                        onClick={() => handleNotInterested(lead._id)} // 🎯 ADDED onClick
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

              <textarea
                placeholder=" Ex : Needs to check with parents, Status: Interested in Full Stack,  Lead is demanding a discount (maximum 50 characters)"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                maxLength={50}
                className={styles.textarea}
              ></textarea>

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
                        <FileClock size={16} style={{ marginRight: "8px" }} />
                        **
                        {new Date(item.createdAt).toLocaleDateString("en-IN", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                        **
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
      <div className={styles.paginationInfo}>
        Page: {meta.page} / {meta.pageCount} | Total: {meta.total}{" "}
      </div>
    </div>
  );
};
export default FranchiseEnrollmentTable;
