// const AddFranchiseLead = () => {
//   return <div>AddFranchiseLead</div>;
// };
// export default AddFranchiseLead;
import { Form, useNavigation } from "react-router-dom";
//=> /api/manager/franchise/create
const AddFranchiseLead = () => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 rounded-xl shadow-lg bg-white">
      <h2 className="text-2xl font-semibold mb-6 text-center">
        Add Franchise Lead
      </h2>

      <Form method="POST" className="space-y-4">
        {/* Owner Name */}
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

        {/* Email */}
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

        {/* Phone */}
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

        {/* Full Address */}
        <div>
          <label className="block font-medium">Full Address</label>
          <textarea
            name="fullAddress"
            required
            className="w-full px-3 py-2 border rounded-lg"
            rows="3"
            placeholder="Enter full address"
          ></textarea>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
        >
          {isSubmitting ? "Saving..." : "Add Lead"}
        </button>
      </Form>
    </div>
  );
};

export default AddFranchiseLead;
