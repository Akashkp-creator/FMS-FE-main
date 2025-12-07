import {
  Form,
  useNavigation,
  useActionData,
  useNavigate,
  useLoaderData,
} from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

import styles from "./StudentEnrollmentForm.module.css";

const StudentEnrollmentForm = () => {
  const navigation = useNavigation();
  const actionData = useActionData();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  //   const { studentLeadId } = useParams();
  const { courses } = useLoaderData(); // Now we have the course data
  const isSubmitting = navigation.state === "submitting";
  const prefillName = searchParams.get("name") || "";
  const prefillPhone = searchParams.get("phone") || "";
  const prefillEmail = searchParams.get("email") || "";
  const prefillqualification = searchParams.get("qualification") || "";

  // Initialize form state
  const [formData, setFormData] = useState({
    name: `${prefillName}`,
    phone: `${prefillPhone}`,
    email: `${prefillEmail}`,
    qualification: `${prefillqualification}`,
    yearOfPassout: "",
    address: {
      street: "",
      area: "",
      landmark: "",
      city: "",
      state: "",
      zip: "",
      //   country: "India",
    },
    selectedCourse: "",
    selectedSubCourse: "",
    courseFee: 0,
    discount: 0,
    gst: 18, // Default GST percentage
    payment: {
      totalFee: 0,
      discount: 0,
      gstAmount: 0,
      finalFee: 0,
      installments: [],
      paidHistory: [],
    },
  });

  // Available subcourses based on selected course
  const [availableSubCourses, setAvailableSubCourses] = useState([]);
  const [installmentCount, setInstallmentCount] = useState(1);
  const [installments, setInstallments] = useState([]);

  // Calculate payment details
  const calculatePayment = () => {
    const totalFee = formData.courseFee;
    const discountAmount = formData.discount;
    const gstAmount = (totalFee - discountAmount) * (formData.gst / 100);
    const finalAmount = totalFee - discountAmount + gstAmount;

    // Calculate installment amounts
    const installmentAmount = finalAmount / installmentCount;
    const today = new Date();
    const newInstallments = [];

    for (let i = 1; i <= installmentCount; i++) {
      const dueDate = new Date(today);
      dueDate.setMonth(today.getMonth() + i - 1);

      newInstallments.push({
        installmentNo: i,
        dueDate: dueDate.toISOString().split("T")[0],
        originalAmount: installmentAmount,
        franchiseDiscount: 0,
        finalAmount: installmentAmount,
        gstAmount: 0,
        totalPayable: installmentAmount,
        status: "pending",
        paidDate: null,
        paidAmount: 0,
        paymentMode: null,
      });
    }

    setInstallments(newInstallments);

    setFormData((prev) => ({
      ...prev,
      payment: {
        ...prev.payment,
        totalFee,
        discount: discountAmount,
        gstAmount,
        finalFee: finalAmount,
        installments: newInstallments,
      },
    }));
  };

  // Handle course selection
  const handleCourseChange = (e) => {
    const courseName = e.target.value;
    setFormData((prev) => ({
      ...prev,
      selectedCourse: courseName,
      selectedSubCourse: "",
      courseFee: 0,
    }));

    // Find selected course and its subcourses
    const selectedCourse = courses.find((c) => c.courseName === courseName);
    if (selectedCourse) {
      setAvailableSubCourses(selectedCourse.subCourses || []);
    } else {
      setAvailableSubCourses([]);
    }
  };

  // Handle subcourse selection
  const handleSubCourseChange = (e) => {
    const subCourseId = e.target.value;
    const selectedSubCourse = availableSubCourses.find(
      (s) => s._id === subCourseId
    );

    if (selectedSubCourse) {
      setFormData((prev) => ({
        ...prev,
        selectedSubCourse: subCourseId,
        courseFee: selectedSubCourse.fee,
      }));
    }
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type } = e.target;

    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: type === "number" ? parseFloat(value) || 0 : value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: type === "number" ? parseFloat(value) || 0 : value,
      }));
    }
  };

  // Handle discount change with auto-calculation
  const handleDiscountChange = (e) => {
    const discount = parseFloat(e.target.value) || 0;
    setFormData((prev) => ({ ...prev, discount }));
  };

  // Handle installment count change
  const handleInstallmentCountChange = (e) => {
    const count = parseInt(e.target.value) || 1;
    setInstallmentCount(Math.max(1, Math.min(12, count))); // Limit 1-12 installments
  };

  // Recalculate when dependencies change
  useEffect(() => {
    if (formData.courseFee > 0) {
      calculatePayment();
    }
  }, [formData.courseFee, formData.discount, formData.gst, installmentCount]);

  // Handle form submission success/error
  useEffect(() => {
    if (actionData?.success) {
      toast.success(actionData.message);
      navigate("/student/installment-payments");
    } else if (actionData?.errors) {
      toast.error(actionData.message);
    }
  }, [actionData, navigate]);

  // Prepare final course object for submission
  const getCourseObject = () => {
    const selectedCourse = courses.find(
      (c) => c.courseName === formData.selectedCourse
    );
    const selectedSubCourse = availableSubCourses.find(
      (s) => s._id === formData.selectedSubCourse
    );

    if (!selectedCourse || !selectedSubCourse) return [];

    return [
      {
        id: selectedSubCourse._id,
        name: `${selectedCourse.courseName} - ${selectedSubCourse.subCourseName}`,
        // duration: "6 months", // You can make this dynamic too
        // batch: "Batch A", // You can make this dynamic too
      },
    ];
  };

  return (
    <div className={styles.container}>
      <h2>Create Student Enrollment</h2>

      <Form method="POST" className={styles.form}>
        {/* Student Basic Info */}
        <div className={styles.section}>
          <h3>Student Information</h3>

          <div className={styles.fieldGroup}>
            <input
              type="text"
              name="name"
              placeholder="Full Name *"
              value={formData.name}
              onChange={handleChange}
              required
              className={styles.input}
            />

            <input
              type="tel"
              name="phone"
              placeholder="Phone (10 digits) *"
              value={formData.phone}
              onChange={handleChange}
              maxLength={10}
              required
              className={styles.input}
            />

            <input
              type="email"
              name="email"
              placeholder="Email *"
              value={formData.email}
              onChange={handleChange}
              required
              className={styles.input}
            />
          </div>

          <div className={styles.fieldGroup}>
            <input
              type="text"
              name="qualification"
              placeholder="Qualification *"
              value={formData.qualification}
              onChange={handleChange}
              required
              className={styles.input}
            />

            <input
              type="number"
              name="yearOfPassout"
              placeholder="Year of Passout *"
              value={formData.yearOfPassout}
              onChange={handleChange}
              min="2000"
              max={new Date().getFullYear() + 5}
              required
              className={styles.input}
              onWheel={(e) => e.target.blur()}
            />
          </div>
        </div>

        {/* Address */}
        <div className={styles.section}>
          <h3>Address</h3>
          <div className={styles.fieldGroup}>
            <input
              type="text"
              name="address.street"
              placeholder="Street/Flat No"
              value={formData.address.street}
              onChange={handleChange}
              className={styles.input}
            />
            <input
              type="text"
              name="address.area"
              placeholder="Area/Locality"
              value={formData.address.area}
              onChange={handleChange}
              className={styles.input}
            />
          </div>
          <div className={styles.fieldGroup}>
            <input
              type="text"
              name="address.landmark"
              placeholder="Landmark"
              value={formData.address.landmark}
              onChange={handleChange}
              className={styles.input}
            />
            <input
              type="text"
              name="address.city"
              placeholder="City *"
              value={formData.address.city}
              onChange={handleChange}
              required
              className={styles.input}
            />
          </div>
          <div className={styles.fieldGroup}>
            <input
              type="text"
              name="address.state"
              placeholder="State *"
              value={formData.address.state}
              onChange={handleChange}
              required
              className={styles.input}
            />
            <input
              type="text"
              name="address.zip"
              placeholder="ZIP Code (6 digits) *"
              value={formData.address.zip}
              onChange={handleChange}
              maxLength={6}
              required
              className={styles.input}
            />
          </div>
        </div>

        {/* Course Selection */}
        <div className={styles.section}>
          <h3>Course Selection</h3>

          <div className={styles.fieldGroup}>
            <select
              name="selectedCourse"
              value={formData.selectedCourse}
              onChange={handleCourseChange}
              required
              className={styles.select}
            >
              <option value="">Select Course *</option>
              {courses.map((course) => (
                <option key={course._id} value={course.courseName}>
                  {course.courseName}
                </option>
              ))}
            </select>

            <select
              name="selectedSubCourse"
              value={formData.selectedSubCourse}
              onChange={handleSubCourseChange}
              required
              disabled={!formData.selectedCourse}
              className={styles.select}
            >
              <option value="">Select Sub-Course *</option>
              {availableSubCourses.map((subCourse) => (
                <option key={subCourse._id} value={subCourse._id}>
                  {subCourse.subCourseName} - ₹{subCourse.fee.toLocaleString()}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Payment Configuration */}
        <div className={`${styles.section} ${styles.paymentColor}`}>
          <h3>Payment Configuration</h3>

          <div className={styles.fieldGroup}>
            <div className={styles.inputGroup}>
              <label>Course Fee:</label>
              <input
                type="text"
                value={`₹${formData.courseFee.toLocaleString()}`}
                readOnly
                className={styles.readonlyInput}
              />
            </div>

            <div className={styles.inputGroup}>
              <label>Discount (₹):</label>
              <input
                type="number"
                name="discount"
                value={formData.discount}
                onChange={handleDiscountChange}
                min="0"
                max={formData.courseFee}
                className={styles.input}
                placeholder="Enter discount"
                onWheel={(e) => e.target.blur()}
              />
            </div>

            <div className={styles.inputGroup}>
              <label>GST (%):</label>
              <input
                type="number"
                name="gst"
                value={formData.gst}
                onChange={handleChange}
                min="0"
                max="30"
                step="0.1"
                className={styles.input}
                onWheel={(e) => e.target.blur()}
              />
            </div>
          </div>

          <div className={styles.fieldGroup}>
            <div className={styles.inputGroup}>
              <label>Number of Installments:</label>
              <select
                value={installmentCount}
                onChange={handleInstallmentCountChange}
                className={styles.select}
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((num) => (
                  <option key={num} value={num}>
                    {num} Installment{num > 1 ? "s" : ""}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Installment Schedule Preview */}
          {installments.length > 0 && (
            <div className={styles.installmentPreview}>
              <h4>Installment Schedule</h4>
              <div className={styles.installmentList}>
                {installments.map((installment, index) => (
                  <div key={index} className={styles.installmentItem}>
                    <span>Installment {installment.installmentNo}:</span>
                    <span>₹{installment.totalPayable.toLocaleString()}</span>
                    <span>Due: {installment.dueDate}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Payment Summary */}
        <div className={`${styles.section} ${styles.paymentColor}`}>
          <h3>Payment Summary</h3>
          <div className={styles.summary}>
            <div className={styles.summaryRow}>
              <span>Total Course Fee:</span>
              <span>₹{formData.payment.totalFee?.toLocaleString()}</span>
            </div>
            <div className={styles.summaryRow}>
              <span>Discount:</span>
              <span>- ₹{formData.payment.discount?.toLocaleString()}</span>
            </div>
            <div className={styles.summaryRow}>
              <span>GST ({formData.gst}%):</span>
              <span>
                ₹
                {formData.payment.gstAmount?.toLocaleString("en-IN", {
                  minimumFractionDigits: 2,
                })}
              </span>
            </div>
            <div className={styles.summaryRow}>
              <strong>Final Amount Payable:</strong>
              <strong>
                ₹
                {formData.payment.finalFee?.toLocaleString("en-IN", {
                  minimumFractionDigits: 2,
                })}
              </strong>
            </div>
          </div>
        </div>

        {/* Hidden fields for form submission */}
        <input
          type="hidden"
          name="courses"
          value={JSON.stringify(getCourseObject())}
        />
        <input
          type="hidden"
          name="payment"
          value={JSON.stringify(formData.payment)}
        />

        {/* Submit Buttons */}
        <div className={styles.actions}>
          <button
            type="submit"
            disabled={isSubmitting || !formData.selectedSubCourse}
            className={`${styles.submitBtn} ${
              isSubmitting ? styles.loading : ""
            }`}
          >
            {isSubmitting ? "Creating Student..." : "Create Student Enrollment"}
          </button>
          <button
            type="button"
            onClick={() => navigate(-1)}
            className={styles.cancelBtn}
            disabled={isSubmitting}
          >
            Cancel
          </button>
        </div>
      </Form>
    </div>
  );
};

export default StudentEnrollmentForm;
