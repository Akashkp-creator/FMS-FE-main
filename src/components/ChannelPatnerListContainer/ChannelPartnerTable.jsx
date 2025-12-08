import { Link, useLoaderData } from "react-router-dom";
import styles from "./ChannelPartnerTable.module.css";
const ChannelPartnerTable = () => {
  const { data } = useLoaderData();
  console.log(data);
  return (
    <div className={styles.tableContainer}>
      <div className={styles.tableHeader}>
        <h2>Channel Partners ({data.length})</h2>
      </div>

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Partner Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Address</th>
              <th>Commission (%)</th>
              <th>Earned</th>
              <th>Paid</th>
              <th>Pending</th>
              <th>Created</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((partner) => (
              <tr key={partner._id}>
                {/* <td className={styles.partnerName}>
                  <div>
                    <strong>{partner.partnerName}</strong>
                    <div className={styles.partnerId}>
                      #{partner._id.slice(-6)}
                    </div>
                  </div>
                </td> */}
                <td className={styles.partnerName}>
                  <div>
                    <Link
                      to={`/manager/channel-partner/students?channelPartnerId=${
                        partner._id
                      }
                        &name=${encodeURIComponent(partner.partnerName)}
                        &email=${encodeURIComponent(partner.email || "")}
                        &phone=${encodeURIComponent(partner.phone || "")}`}
                      className={styles.partnerLink}
                    >
                      <strong>{partner.partnerName}</strong>
                    </Link>

                    <div className={styles.partnerId}>
                      #{partner._id.slice(-6)}
                    </div>
                  </div>
                </td>

                <td>{partner.email || "—"}</td>
                <td>{partner.phone}</td>
                <td className={styles.address}>{partner.address || "—"}</td>
                <td>
                  <span className={styles.commissionBadge}>
                    {partner.commissionPercent}%
                  </span>
                </td>
                <td className={styles.amount}>
                  ₹{partner.totalCommissionEarned.toLocaleString()}
                </td>
                <td className={styles.amount}>
                  ₹{partner.totalCommissionPaid.toLocaleString()}
                </td>
                <td className={styles.pending}>
                  <strong>₹{partner.pendingCommission.toLocaleString()}</strong>
                </td>
                <td>
                  {new Date(partner.createdAt).toLocaleDateString("en-IN")}
                </td>
                <td className={styles.actions}>
                  <button className={styles.editBtn}>Edit</button>
                  <button className={styles.payBtn}>Pay</button>
                  <button className={styles.deleteBtn}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {data.length === 0 && (
          <div className={styles.emptyState}>
            <div>No channel partners found</div>
            <p>Add your first channel partner to get started</p>
          </div>
        )}
      </div>
    </div>
  );
};
export default ChannelPartnerTable;
