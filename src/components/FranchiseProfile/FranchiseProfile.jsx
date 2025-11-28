import React from "react";
import { useSelector } from "react-redux";
import styles from "./FranchiseProfile.module.css";
import DownloadCertificateButton from "../DownloadCertificateButton/DownloadCertificateButton";
// import { useActionData } from "react-router-dom";

const FranchiseProfile = () => {
  const { name, address, phone, id } = useSelector(
    (state) => state.auth.user.franchise
  );
  // If user data not loaded return loader
  //   if (!name || address || phone || id) return <p>Loading...</p>;
  //   console.log(id);
  //   const user = useActionData();
  //   console.log(user + "  the user data ");

  return (
    // <div className={styles.card}>
    //   <h2 className={styles.title}>Profile Details</h2>

    //   <div className={styles.section}>
    //     <p className={styles.label}>Name</p>
    //     <p className={styles.value}>{name}</p>
    //   </div>

    //   <div className={styles.section}>
    //     <p className={styles.label}>Address</p>
    //     <p className={styles.value}>{address}</p>
    //   </div>

    //   <div className={styles.section}>
    //     <p className={styles.label}>Phone</p>
    //     <p className={styles.value}>{phone}</p>
    //   </div>
    //   <DownloadCertificateButton franchiseId={id} />
    // </div>
    <div className={styles.card}>
      <h2 className={styles.title}>Profile Details</h2>

      <div className={styles.section}>
        <p className={styles.label}>Name</p>
        <p className={styles.value}>{name}</p>
      </div>

      <div className={styles.section}>
        <p className={styles.label}>Address</p>
        <p className={styles.value}>{address}</p>
      </div>

      <div className={styles.section}>
        <p className={styles.label}>Phone</p>
        <p className={styles.value}>{phone}</p>
      </div>

      <div className={styles.downloadContainer}>
        <DownloadCertificateButton franchiseId={id} />
      </div>
    </div>
  );
};

export default FranchiseProfile;
