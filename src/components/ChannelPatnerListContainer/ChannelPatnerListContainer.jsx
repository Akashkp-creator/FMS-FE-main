import { useNavigate } from "react-router-dom";
import ChannelPartnerListFilter from "./ChannelPartnerListFilter";
import ChannelPartnerpagination from "./ChannelPartnerpagination";
import ChannelPartnerTable from "./ChannelPartnerTable";
import styles from "./ChannelPatnerListContainer.module.css";
const ChannelPatnerListContainer = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.wrapper}>
      {/* Back Button */}
      <div className={styles.btnwrapper}>
        <button
          className={styles.backBtn}
          onClick={() => navigate("/manager/addChannel-partner")}
        >
          ← Back to Add Partner
        </button>
      </div>

      <ChannelPartnerListFilter />
      <ChannelPartnerTable />
      <ChannelPartnerpagination />
    </div>
  );
};
export default ChannelPatnerListContainer;
