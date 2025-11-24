import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLoaderData } from "react-router-dom";
import {
  setLeads,
  setMeta,
  setParams,
} from "../../features/franchiseLeadSlice/franchiseLeadSlice";
import styles from "./FranchiseEnrollmentTable.module.css";

const FranchiseEnrollmentTable = () => {
  // 1️⃣ Loader data from route loader
  const loaderData = useLoaderData();
  const { data, meta, params } = loaderData; // coming from loader

  // 2️⃣ Redux data
  const dispatch = useDispatch();
  const { leads, loading, error } = useSelector(
    (state) => state.franchiseLeads
  );

  // 3️⃣ Sync loader → redux once
  useEffect(() => {
    if (data) dispatch(setLeads(data));
    if (meta) dispatch(setMeta(meta));
    if (params) dispatch(setParams(params));
  }, [data, meta, params, dispatch]);

  // 4️⃣ Loading & error UI
  if (loading) return <p>Loading…</p>;
  if (error) return <p style={{ color: "red" }}>❌ {error}</p>;

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Franchise Leads</h2>

      {leads.length === 0 ? (
        <p>No leads found</p>
      ) : (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Contact</th>
              <th>Status</th>

              {/* ✅ Newly Added */}
              <th>Action</th>
              <th>Others</th>
            </tr>
          </thead>

          <tbody>
            {leads.map((lead) => (
              <tr key={lead._id}>
                <td>{lead.ownerName}</td>
                <td>{lead.ownerPhone || "—"}</td>

                {/* ✅ Correct way to show colored Status */}
                <td>
                  <span
                    className={`${styles.statusBadge} ${
                      styles[lead.status.replace(/\s+/g, "")]
                    }`}
                  >
                    {lead.status}
                  </span>
                </td>

                {/* ✅ Action Column */}
                <td>
                  <button className={styles.enrollBtn}>View</button>
                </td>

                {/* ✅ Others Column */}
                <td>
                  <button className={styles.updateBtn}>More</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <div className={styles.paginationInfo}>
        Page: {meta.page} / {meta.pageCount} | Total: {meta.total}
      </div>
    </div>
  );
};

export default FranchiseEnrollmentTable;
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
//               {/* <th>Course</th> */}
//               <th>Status</th>
//               {/* <th>Source</th> */}
//             </tr>
//           </thead>

//           <tbody>
//             {leads.map((lead) => (
//               <tr key={lead._id}>
//                 <td>{lead.ownerName}</td>
//                 <td>{lead.ownerPhone || "—"}</td>
//                 {/* <td>{lead.course || "—"}</td> */}
//                 <span
//                   className={`${styles.statusBadge} ${
//                     styles[lead.status.replace(/\s+/g, "")]
//                   }`}
//                 >
//                   <td>{lead.status}</td>
//                 </span>

//                 {/* <td>{lead.source}</td> */}
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}

//       {/* Pagination info */}
//       <div className={styles.paginationInfo}>
//         Page: {meta.page} / {meta.pageCount} | Total: {meta.total}
//       </div>
//     </div>
//   );
