import { useNavigate } from "react-router-dom";
import ChannelPartnerListFilter from "./ChannelPartnerListFilter";
import ChannelPartnerpagination from "./ChannelPartnerpagination";
import ChannelPartnerTable from "./ChannelPartnerTable";
import styles from "./ChannelPatnerListContainer.module.css";
// const ChannelPatnerListContainer = () => {
//   const navigate = useNavigate();
//   return (
//     <div className={styles.wrapper}>
//       {/* Back Button */}
//       <div className={styles.btnwrapper}>
//         <button
//           className={styles.backBtn}
//           onClick={() => navigate("/manager/addChannel-partner")}
//         >
//           ← Back to Add Partner
//         </button>
//       </div>

//       <ChannelPartnerListFilter />
//       <ChannelPartnerTable />
//       <ChannelPartnerpagination />
//     </div>
//   );
// };
// export default ChannelPatnerListContainer;

import { useState } from "react";
import { useRevalidator } from "react-router-dom";
import PayCommissionModal from "./PayCommissionModal";

const ChannelPatnerListContainer = () => {
  const navigate = useNavigate();
  const revalidator = useRevalidator();

  const [showPayModal, setShowPayModal] = useState(false);
  const [selectedPartner, setSelectedPartner] = useState(null);

  // Open modal from table
  const openPayModal = (partner) => {
    setSelectedPartner(partner);
    setShowPayModal(true);
  };

  const closePayModal = () => {
    setShowPayModal(false);
    setSelectedPartner(null);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.btnwrapper}>
        <button
          className={styles.backBtn}
          onClick={() => navigate("/manager/addChannel-partner")}
        >
          ← Back to Add Partner
        </button>
      </div>

      <ChannelPartnerListFilter />

      <ChannelPartnerTable openPayModal={openPayModal} />

      <ChannelPartnerpagination />

      {/* Modal */}
      {showPayModal && (
        <PayCommissionModal
          partner={selectedPartner}
          close={closePayModal}
          refreshData={() => revalidator.revalidate()}
        />
      )}
    </div>
  );
};

export default ChannelPatnerListContainer;
