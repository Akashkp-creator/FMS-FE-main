// import { useState } from "react";
// import styles from "./ChannelPartnerContainer.module.css";

// import { FaPlusCircle, FaListAlt } from "react-icons/fa";
// import AddChannelPartner from "../../components/Channel Partner/AddChannelPartner";
// import ChannelPatnerListContainer from "../../components/ChannelPatnerListContainer/ChannelPatnerListContainer";
// import { useNavigate } from "react-router-dom";

// const ChannelPartnerContainer = () => {
//   const [activeTab, setActiveTab] = useState("add");
//   const navigate = useNavigate();

//   return (
//     <div className={styles.container}>
//       {/* Tabs */}
//       <div className={styles.tabHeader}>
//         <button
//           className={`${styles.tabBtn} ${
//             activeTab === "add" ? styles.activeTab : ""
//           }`}
//           onClick={() => setActiveTab("add")}
//         >
//           <FaPlusCircle className={styles.icon} />
//           Add Channel Partner
//         </button>

//         <button
//           className={styles.tabBtn}
//           onClick={() => navigate("/manager/channel-partner/list")}
//         >
//           <FaListAlt className={styles.icon} />
//           Channel Partner List
//         </button>
//       </div>

//       {/* Content Section */}
//       <div className={styles.content}>
//         {activeTab === "add" && (
//           <div className={styles.tabContent}>
//             <h3>Add Channel Partner</h3>
//             {/* Add form here */}
//             <AddChannelPartner />
//           </div>
//         )}

//         {activeTab === "list" && (
//           <div className={styles.tabContent}>
//             <h3>Channel Partner List</h3>
//             {/* Add list/table here */}
//             <ChannelPatnerListContainer />
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ChannelPartnerContainer;

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./ChannelPartnerContainer.module.css";

import { FaPlusCircle, FaListAlt } from "react-icons/fa";
import AddChannelPartner from "../../components/Channel Partner/AddChannelPartner";

const ChannelPartnerContainer = () => {
  const [activeTab, setActiveTab] = useState("add");
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      {/* Tabs */}
      <div className={styles.tabHeader}>
        <button
          className={`${styles.tabBtn} ${
            activeTab === "add" ? styles.activeTab : ""
          }`}
          onClick={() => setActiveTab("add")}
        >
          <FaPlusCircle className={styles.icon} />
          Add Channel Partner
        </button>

        {/* NEW BUTTON → navigates to new route */}
        <button
          className={styles.tabBtn}
          onClick={() => navigate("/manager/channel-partner/list")}
        >
          <FaPlusCircle className={styles.icon} />
          Add Student
        </button>

        {/* NEW BUTTON → navigates to new route */}
        <button
          className={styles.tabBtn}
          onClick={() => navigate("/manager/channel-partner/list/students")}
        >
          <FaPlusCircle className={styles.icon} />
          Add Payments for a existing students
        </button>
      </div>

      {/* Tab Content */}
      <div className={styles.content}>
        {activeTab === "add" && (
          <div className={styles.tabContent}>
            <h3>Add Channel Partner</h3>
            <AddChannelPartner />
          </div>
        )}
      </div>
    </div>
  );
};

export default ChannelPartnerContainer;
