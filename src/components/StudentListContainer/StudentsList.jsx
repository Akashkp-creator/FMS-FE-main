import React from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import styles from "./StudentsList.module.css";
import { FileClock, NotebookPen, UserX } from "lucide-react";

const StudentsList = () => {
  const { data, meta } = useLoaderData(); // from your loader
  console.log(data);
  const navigate = useNavigate();

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
                      <span className={styles.notInterested}>
                        Not Interested
                      </span>
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
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    {item.status !== "Converted" &&
                      item.status != "Rejected" && (
                        <>
                          <button
                            className={styles.updateBtn}
                            // onClick={() => openModal(item._id)}
                          >
                            <NotebookPen />
                            <span className={styles.tooltip}>
                              Add Follow-ups
                            </span>
                          </button>
                          <button
                            className={styles.updateBtn}
                            style={{ margin: "5px" }}
                            // onClick={() => handleViewHistory(item._id)} // 🎯 Attach new handler
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
                            // onClick={() => openReasonModal(item._id)}
                          >
                            <UserX />
                            <span className={styles.tooltip}>
                              Not Interested
                            </span>
                          </button>
                        </>
                      )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

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
