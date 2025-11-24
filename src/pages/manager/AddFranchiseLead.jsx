// const AddFranchiseLead = () => {
//   return <div>AddFranchiseLead</div>;
// };
// export default AddFranchiseLead;
import { Form, useNavigation } from "react-router-dom";
import styles from "./AddFranchiseLead.module.css";
//=> /api/manager/franchise/create
const AddFranchiseLead = () => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <>
      {/* <div className="max-w-xl mx-auto mt-10 p-6 rounded-xl shadow-lg bg-white">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Add Franchise Lead
        </h2>

        <Form method="POST" className="space-y-4">
        
          <div>
            <label className="block font-medium">Owner Name</label>
            <input
              name="ownerName"
              type="text"
              required
              className="w-full px-3 py-2 border rounded-lg"
              placeholder="Enter owner name"
            />
          </div>

         
          <div>
            <label className="block font-medium">Email</label>
            <input
              name="ownerEmail"
              type="email"
              required
              className="w-full px-3 py-2 border rounded-lg"
              placeholder="Enter email"
            />
          </div>

        
          <div>
            <label className="block font-medium">Phone</label>
            <input
              name="ownerPhone"
              type="text"
              required
              className="w-full px-3 py-2 border rounded-lg"
              placeholder="Enter phone number"
            />
          </div>


          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
            <div>
              <label className="block font-medium">House / Building</label>
              <input
                name="house"
                type="text"
                required
                className="w-full px-3 py-2 border rounded-lg"
                placeholder="House No. / Building Name"
              />
            </div>

          
            <div>
              <label className="block font-medium">Street</label>
              <input
                name="street"
                type="text"
                required
                className="w-full px-3 py-2 border rounded-lg"
                placeholder="Street / Road"
              />
            </div>

           
            <div>
              <label className="block font-medium">Locality / Area</label>
              <input
                name="locality"
                type="text"
                required
                className="w-full px-3 py-2 border rounded-lg"
                placeholder="Locality / Area"
              />
            </div>

           
            <div>
              <label className="block font-medium">City</label>
              <input
                name="city"
                type="text"
                required
                className="w-full px-3 py-2 border rounded-lg"
                placeholder="City"
              />
            </div>

          
            <div>
              <label className="block font-medium">District</label>
              <input
                name="district"
                type="text"
                required
                className="w-full px-3 py-2 border rounded-lg"
                placeholder="District"
              />
            </div>

        
            <div>
              <label className="block font-medium">State</label>
              <input
                name="state"
                type="text"
                required
                className="w-full px-3 py-2 border rounded-lg"
                placeholder="State"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block font-medium">Pincode</label>
              <input
                name="pincode"
                type="text"
                required
                className="w-full px-3 py-2 border rounded-lg"
                placeholder="Pincode"
              />
            </div>
          </div>

       
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
          >
            {isSubmitting ? "Saving..." : "Add Lead"}
          </button>
        </Form>
      </div> */}

      <div className={styles.container}>
        <h2 className={styles.heading}>Add Franchise Lead</h2>

        <Form method="POST" className={styles.form}>
          {/* Owner Name */}
          <div className={styles.formGroup}>
            <label className={styles.label}>Owner Name</label>
            <input
              name="ownerName"
              type="text"
              required
              className={styles.input}
              placeholder="Enter owner name"
            />
          </div>

          {/* Email */}
          <div className={styles.formGroup}>
            <label className={styles.label}>Email</label>
            <input
              name="ownerEmail"
              type="email"
              required
              className={styles.input}
              placeholder="Enter email"
            />
          </div>

          {/* Phone */}
          <div className={styles.formGroup}>
            <label className={styles.label}>Phone</label>
            <input
              name="ownerPhone"
              type="text"
              required
              className={styles.input}
              placeholder="Enter phone number"
            />
          </div>

          {/* Full Address */}
          <div className={styles.grid}>
            {/* House / Building */}
            <div className={styles.formGroup}>
              <label className={styles.label}>House / Building</label>
              <input
                name="house"
                type="text"
                required
                className={styles.input}
                placeholder="House No. / Building Name"
              />
            </div>

            {/* Street */}
            <div className={styles.formGroup}>
              <label className={styles.label}>Street</label>
              <input
                name="street"
                type="text"
                required
                className={styles.input}
                placeholder="Street / Road"
              />
            </div>

            {/* Locality / Area */}
            <div className={styles.formGroup}>
              <label className={styles.label}>Locality / Area</label>
              <input
                name="locality"
                type="text"
                required
                className={styles.input}
                placeholder="Locality / Area"
              />
            </div>

            {/* City */}
            <div className={styles.formGroup}>
              <label className={styles.label}>City</label>
              <input
                name="city"
                type="text"
                required
                className={styles.input}
                placeholder="City"
              />
            </div>

            {/* District */}
            <div className={styles.formGroup}>
              <label className={styles.label}>District</label>
              <input
                name="district"
                type="text"
                required
                className={styles.input}
                placeholder="District"
              />
            </div>

            {/* State */}
            <div className={styles.formGroup}>
              <label className={styles.label}>State</label>
              <input
                name="state"
                type="text"
                required
                className={styles.input}
                placeholder="State"
              />
            </div>

            {/* Pincode (full width on mobile) */}
            <div className={`${styles.formGroup} ${styles.fullWidth}`}>
              <label className={styles.label}>Pincode</label>
              <input
                name="pincode"
                type="text"
                required
                className={styles.input}
                placeholder="Pincode"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className={styles.submitButton}
          >
            {isSubmitting ? "Saving..." : "Add Lead"}
          </button>
        </Form>
      </div>
    </>
  );
};

export default AddFranchiseLead;
