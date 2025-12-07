// // const AddChannelPartner = () => {
// //   return <div>AddChannelPartner</div>;
// // };
// // export default AddChannelPartner;

// // AddChannelPartner.jsx
import React, { useState } from "react";
import styles from "./ChannelPartner.module.css";
import { FaPlusCircle } from "react-icons/fa";
import api from "../../utils/axiosConfig";
import { toast } from "react-toastify";

// const AddChannelPartner = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     address: "",
//   });

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Handle form submission
//     console.log("Form submitted:", formData);
//   };

//   return (
//     <div className={styles.formContainer}>
//       <form onSubmit={handleSubmit}>
//         <div className={styles.formGroup}>
//           <label htmlFor="name">Full Name</label>
//           <input
//             type="text"
//             id="name"
//             value={formData.name}
//             onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//             placeholder="Enter full name"
//             required
//           />
//         </div>

//         <div className={styles.formGroup}>
//           <label htmlFor="email">Email Address</label>
//           <input
//             type="email"
//             id="email"
//             value={formData.email}
//             onChange={(e) =>
//               setFormData({ ...formData, email: e.target.value })
//             }
//             placeholder="Enter email address"
//             required
//           />
//         </div>

//         <div className={styles.formGroup}>
//           <label htmlFor="phone">Phone Number</label>
//           <input
//             type="tel"
//             id="phone"
//             value={formData.phone}
//             onChange={(e) =>
//               setFormData({ ...formData, phone: e.target.value })
//             }
//             placeholder="Enter phone number"
//             required
//           />
//         </div>

//         <div className={styles.formGroup}>
//           <label htmlFor="status">Status</label>
//           <select
//             id="status"
//             value={formData.status}
//             onChange={(e) =>
//               setFormData({ ...formData, status: e.target.value })
//             }
//           >
//             <option value="active">Active</option>
//             <option value="inactive">Inactive</option>
//           </select>
//         </div>

//         <button type="submit" className={styles.submitBtn}>
//           <FaPlusCircle /> Add Channel Partner
//         </button>
//       </form>
//     </div>
//   );
// };

// export default AddChannelPartner;

const AddChannelPartner = () => {
  const [formData, setFormData] = useState({
    partnerName: "",
    email: "",
    phone: "",
    address: "",
    commissionPercent: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    // For commissionPercent ensure it's between 0–100
    if (name === "commissionPercent") {
      let v = Number(value);
      if (Number.isNaN(v)) v = "";
      if (v !== "") {
        v = Math.max(0, Math.min(100, v));
      }
      setFormData((prev) => ({ ...prev, [name]: v }));
      return;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   // Here you will call your API with formData
  //   console.log("Form submitted:", formData);
  // };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post(
        "/channel-partner/create/channel-partner",
        formData
      );

      // success handling
      toast.success(
        res.data?.message || "Channel partner created successfully"
      );
      // optional: reset form
      setFormData({
        partnerName: "",
        email: "",
        phone: "",
        address: "",
        commissionPercent: "",
        password: "",
      });
    } catch (error) {
      const msg =
        error?.response?.data?.message ||
        "Failed to create channel partner. Please try again.";
      toast.error(msg);
      console.error("Create Channel Partner Error:", error);
    }
  };

  return (
    <div className={styles.formContainer}>
      <form onSubmit={handleSubmit}>
        {/* Partner Name */}
        <div className={styles.formGroup}>
          <label htmlFor="partnerName">Full Name</label>
          <input
            type="text"
            id="partnerName"
            name="partnerName"
            value={formData.partnerName}
            onChange={handleChange}
            placeholder="Enter full name"
            required
          />
        </div>

        {/* Email */}
        <div className={styles.formGroup}>
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter email address"
            required
          />
        </div>

        {/* Phone */}
        <div className={styles.formGroup}>
          <label htmlFor="phone">Phone Number</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Enter 10-digit phone number"
            pattern="\d{10}"
            maxLength={10}
            required
          />
        </div>

        {/* Address */}
        <div className={styles.formGroup}>
          <label htmlFor="address">Address</label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Enter address"
          />
        </div>

        {/* Commission Percent */}
        <div className={styles.formGroup}>
          <label htmlFor="commissionPercent">Commission (%)</label>
          <input
            type="number"
            id="commissionPercent"
            name="commissionPercent"
            value={formData.commissionPercent}
            onChange={handleChange}
            placeholder="Enter commission percentage"
            min="0"
            max="100"
            required
          />
        </div>

        {/* Password */}
        <div className={styles.formGroup}>
          <label htmlFor="password">Password</label>
          <input
            type="text"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Set a password for partner login"
            required
          />
        </div>

        <button type="submit" className={styles.submitBtn}>
          <FaPlusCircle /> Add Channel Partner
        </button>
      </form>
    </div>
  );
};

export default AddChannelPartner;
