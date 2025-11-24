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
              <th>Course</th>
              <th>Status</th>
              <th>Source</th>
            </tr>
          </thead>

          <tbody>
            {leads.map((lead) => (
              <tr key={lead._id}>
                <td>{lead.name}</td>
                <td>{lead.contact?.phone || "—"}</td>
                <td>{lead.course || "—"}</td>
                <td>{lead.status}</td>
                <td>{lead.source}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Pagination info */}
      <div className={styles.paginationInfo}>
        Page: {meta.page} / {meta.pageCount} | Total: {meta.total}
      </div>
    </div>
  );
};

export default FranchiseEnrollmentTable;
