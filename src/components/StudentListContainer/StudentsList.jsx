import React from "react";
import { useLoaderData } from "react-router-dom";
import styles from "./StudentsList.module.css";

const StudentsList = () => {
  const { data, meta } = useLoaderData(); // from your loader

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
                    {new Date(item.createdAt).toLocaleDateString("en-IN")}
                  </td>
                  <td>
                    {new Date(item.createdAt).toLocaleDateString("en-IN")}
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
