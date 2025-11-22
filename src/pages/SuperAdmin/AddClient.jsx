import { Form, Link } from "react-router-dom";
import styles from "./AddClient.module.css";
import { FilterIcon, RefreshCw, Search } from "lucide-react";

const AddClient = () => {
  return (
    // <Form className={styles.filterContainer}>
    //   {/* Background Effects */}
    //   <div className={styles.backgroundEffects}>
    //     <div className={styles.glowCircle1}></div>
    //     <div className={styles.glowCircle2}></div>
    //   </div>

    //   <div className={styles.filterContent}>
    //     {/* Header */}
    //     <div className={styles.header}>
    //       <FilterIcon className={styles.headerIcon} />
    //       <h2 className={styles.title}>Update Admin Details</h2>
    //       <p className={styles.subtitle}>
    //         Fill out the institution and admin information
    //       </p>
    //     </div>

    //     {/* Filter Grid */}
    //     <div className={styles.filterGrid}>
    //       {/* Institution Name */}
    //       <div className={styles.inputGroup}>
    //         <label className={styles.label}>
    //           <span>Institution Name</span>
    //         </label>
    //         <input
    //           type="text"
    //           name="institutionName"
    //           placeholder="e.g. ABC Institute"
    //           className={styles.input}
    //           required
    //         />
    //       </div>

    //       {/* Institution Phone */}
    //       <div className={styles.inputGroup}>
    //         <label className={styles.label}>
    //           <span>Institution Phone</span>
    //         </label>
    //         <input
    //           type="text"
    //           name="institutionPhone"
    //           placeholder="9876543210"
    //           className={styles.input}
    //           required
    //         />
    //       </div>

    //       {/* Logo URL */}
    //       <div className={styles.inputGroup}>
    //         <label className={styles.label}>
    //           <span>Logo URL</span>
    //         </label>
    //         <input
    //           type="text"
    //           name="logoUrl"
    //           placeholder="/uploads/logo.png"
    //           className={styles.input}
    //           required
    //         />
    //       </div>

    //       {/* Admin Name */}
    //       <div className={styles.inputGroup}>
    //         <label className={styles.label}>
    //           <span>Admin Name</span>
    //         </label>
    //         <input
    //           type="text"
    //           name="name"
    //           placeholder="Ravi Kumar"
    //           className={styles.input}
    //           required
    //         />
    //       </div>

    //       {/* Admin Email */}
    //       <div className={styles.inputGroup}>
    //         <label className={styles.label}>
    //           <span>Admin Email</span>
    //         </label>
    //         <input
    //           type="email"
    //           name="email"
    //           placeholder="admin@gmail.com"
    //           className={styles.input}
    //           required
    //         />
    //       </div>

    //       {/* Admin Password */}
    //       <div className={styles.inputGroup}>
    //         <label className={styles.label}>
    //           <span>Password</span>
    //         </label>
    //         <input
    //           type="password"
    //           name="password"
    //           placeholder="Enter a strong password"
    //           className={styles.input}
    //           required
    //         />
    //       </div>

    //       {/* Address: Building Name */}
    //       <div className={styles.inputGroup}>
    //         <label className={styles.label}>
    //           <span>Building Name</span>
    //         </label>
    //         <input
    //           type="text"
    //           name="buildingName"
    //           placeholder="e.g., Sai Complex"
    //           className={styles.input}
    //         />
    //       </div>

    //       {/* House Number */}
    //       <div className={styles.inputGroup}>
    //         <label className={styles.label}>
    //           <span>House No.</span>
    //         </label>
    //         <input
    //           type="text"
    //           name="houseNumber"
    //           placeholder="e.g., #24"
    //           className={styles.input}
    //         />
    //       </div>

    //       {/* Street */}
    //       <div className={styles.inputGroup}>
    //         <label className={styles.label}>
    //           <span>Street</span>
    //         </label>
    //         <input
    //           type="text"
    //           name="street"
    //           placeholder="e.g., MG Road"
    //           className={styles.input}
    //         />
    //       </div>

    //       {/* Area */}
    //       <div className={styles.inputGroup}>
    //         <label className={styles.label}>
    //           <span>Area</span>
    //         </label>
    //         <input
    //           type="text"
    //           name="area"
    //           placeholder="e.g., Indiranagar"
    //           className={styles.input}
    //         />
    //       </div>

    //       {/* City */}
    //       <div className={styles.inputGroup}>
    //         <label className={styles.label}>
    //           <span>City</span>
    //         </label>
    //         <input
    //           type="text"
    //           name="city"
    //           placeholder="e.g., Bengaluru"
    //           className={styles.input}
    //         />
    //       </div>

    //       {/* District */}
    //       <div className={styles.inputGroup}>
    //         <label className={styles.label}>
    //           <span>District</span>
    //         </label>
    //         <input
    //           type="text"
    //           name="district"
    //           placeholder="e.g., Bengaluru Urban"
    //           className={styles.input}
    //         />
    //       </div>

    //       {/* State */}
    //       <div className={styles.inputGroup}>
    //         <label className={styles.label}>
    //           <span>State</span>
    //         </label>
    //         <input
    //           type="text"
    //           name="state"
    //           placeholder="e.g., Karnataka"
    //           className={styles.input}
    //         />
    //       </div>

    //       {/* Country */}
    //       <div className={styles.inputGroup}>
    //         <label className={styles.label}>
    //           <span>Country</span>
    //         </label>
    //         <input
    //           type="text"
    //           name="country"
    //           placeholder="e.g., India"
    //           className={styles.input}
    //         />
    //       </div>

    //       {/* Postal Code */}
    //       <div className={styles.inputGroup}>
    //         <label className={styles.label}>
    //           <span>Postal Code</span>
    //         </label>
    //         <input
    //           type="text"
    //           name="postalCode"
    //           placeholder="560001"
    //           className={styles.input}
    //         />
    //       </div>

    //       {/* Landmark */}
    //       <div className={styles.inputGroup}>
    //         <label className={styles.label}>
    //           <span>Landmark</span>
    //         </label>
    //         <input
    //           type="text"
    //           name="landmark"
    //           placeholder="Near Metro Station"
    //           className={styles.input}
    //         />
    //       </div>

    //       {/* TQ */}
    //       <div className={styles.inputGroup}>
    //         <label className={styles.label}>
    //           <span>TQ (Taluka)</span>
    //         </label>
    //         <input
    //           type="text"
    //           name="tq"
    //           placeholder="e.g., Bangalore North"
    //           className={styles.input}
    //         />
    //       </div>
    //     </div>

    //     {/* Action Buttons */}
    //     <div className={styles.buttonGroup}>
    //       <button type="submit" className={styles.searchButton}>
    //         <Search size={18} />
    //         <span>Update Admin</span>
    //       </button>

    //       <Link to="/admin/settings" className={styles.resetButton}>
    //         <RefreshCw size={18} />
    //         <span>Reset</span>
    //       </Link>
    //     </div>
    //   </div>
    // </Form>
    <div className={styles.formWrapper}>
      <Form method="post" replace className={styles.formContainer}>
        <h2 className={styles.formTitle}>Create Admin</h2>

        <div className={styles.grid}>
          {/* Institution Fields */}
          <div className={styles.inputGroup}>
            <label className={styles.label}>Institution Name</label>
            <input name="institutionName" className={styles.input} required />
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label}>Address Line 1</label>
            <input name="addressLine1" className={styles.input} required />
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label}>Address Line 2</label>
            <input name="addressLine2" className={styles.input} />
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label}>City</label>
            <input name="city" className={styles.input} required />
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label}>State</label>
            <input name="state" className={styles.input} required />
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label}>Pincode</label>
            <input name="pincode" className={styles.input} required />
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label}>Institution Phone</label>
            <input name="institutionPhone" className={styles.input} required />
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label}>Logo URL</label>
            <input name="logoUrl" className={styles.input} required />
          </div>

          {/* Admin User */}
          <div className={styles.inputGroup}>
            <label className={styles.label}>Admin Name</label>
            <input name="name" className={styles.input} required />
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label}>Admin Email</label>
            <input
              name="email"
              type="email"
              className={styles.input}
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label}>Password</label>
            <input
              name="password"
              type="password"
              className={styles.input}
              required
            />
          </div>
        </div>

        <button className={styles.submitBtn} type="submit">
          Create Admin
        </button>
      </Form>
    </div>
  );
};
export default AddClient;
