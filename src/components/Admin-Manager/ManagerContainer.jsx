// import AddManager from "./AddManager";
// import ManagerFilter from "./ManagerFilter";
// import ManagerList from "./ManagerList";
// import ManagerPagination from "./ManagerPagination";

// const ManagerContainer = () => {
//   return (
//     <>
//       <ManagerFilter />
//       <ManagerList />
//       <ManagerPagination />
//       <AddManager />
//     </>
//   );
// };
// export default ManagerContainer;

import { useState } from "react";
import ManagerFilter from "./ManagerFilter";
import ManagerList from "./ManagerList";
import ManagerPagination from "./ManagerPagination";
import AddManager from "./AddManager";
import styles from "./ManagerContainer.module.css";

const ManagerContainer = () => {
  const [activeTab, setActiveTab] = useState("list");

  return (
    <div className={styles.container}>
      {/* Tabs */}
      <div className={styles.tabs}>
        <button
          className={activeTab === "list" ? styles.activeTab : ""}
          onClick={() => setActiveTab("list")}
        >
          Manager List
        </button>

        <button
          className={activeTab === "add" ? styles.activeTab : ""}
          onClick={() => setActiveTab("add")}
        >
          Add Manager
        </button>
      </div>

      {/* Tab Content */}
      <div className={styles.tabContent}>
        {activeTab === "list" && (
          <>
            <ManagerFilter />
            <ManagerList />
            <ManagerPagination />
          </>
        )}

        {activeTab === "add" && <AddManager />}
      </div>
    </div>
  );
};

export default ManagerContainer;
