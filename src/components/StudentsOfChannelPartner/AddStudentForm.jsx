// AddStudentForm.jsx
import React, { useState } from "react";

import { useLocation } from "react-router-dom";
import styles from "./AddStudentForm.module.css";
import api from "../../utils/axiosConfig";

const AddStudentForm = () => {
  const { search } = useLocation();

  const params = new URLSearchParams(search);

  const channelPartnerId = params.get("channelPartnerId");
  const name = params.get("name");
  const email = params.get("email");
  const phone = params.get("phone");
  //   const { channelPartnerId } = useParams();
  const [loading, setLoading] = useState(false);
  const [showFirstPayment, setShowFirstPayment] = useState(false);
  const [formData, setFormData] = useState({
    studentName: "",
    phone: "",
    course: "",
    courseFee: "",
    channelPartnerId: "",
    firstPayment: {
      amount: "",
      mode: "Cash",
      receivedBy: "",
    },
  });

  const paymentModes = ["Cash", "UPI", "Bank Transfer", "Card"];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePaymentChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      firstPayment: {
        ...prev.firstPayment,
        [name]: value,
      },
    }));
  };

  const toggleFirstPayment = () => {
    setShowFirstPayment(!showFirstPayment);
    if (!showFirstPayment) {
      setFormData((prev) => ({
        ...prev,
        firstPayment: {
          amount: "",
          mode: "Cash",
          receivedBy: "",
        },
      }));
    }
  };

  const calculateCommission = () => {
    if (!formData.firstPayment.amount || isNaN(formData.firstPayment.amount))
      return 0;
    // This would come from your API/context
    const commissionPercent = 15; // Default or fetch from partner
    const commission =
      (parseFloat(formData.firstPayment.amount) * commissionPercent) / 100;
    return commission.toFixed(2);
  };

  const validateForm = () => {
    if (!formData.studentName.trim()) {
      alert("Student name is required");
      return false;
    }
    if (!formData.phone.match(/^\d{10}$/)) {
      alert("Please enter a valid 10-digit phone number");
      return false;
    }
    if (!formData.course.trim()) {
      alert("Course selection is required");
      return false;
    }
    if (showFirstPayment && formData.firstPayment.amount) {
      if (parseFloat(formData.firstPayment.amount) <= 0) {
        alert("Payment amount must be greater than 0");
        return false;
      }
      if (!formData.firstPayment.mode) {
        alert("Please select a payment mode");
        return false;
      }
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      setLoading(true);

      const payload = {
        channelPartnerId: channelPartnerId.trim(),
        studentName: formData.studentName,
        phone: formData.phone,
        course: formData.course,
        courseFee: parseFloat(formData.courseFee) || 0,
        ...(showFirstPayment &&
          formData.firstPayment.amount && {
            firstPayment: {
              amount: parseFloat(formData.firstPayment.amount),
              mode: formData.firstPayment.mode,
              //   receivedBy: formData.firstPayment.receivedBy || "Manager",
            },
          }),
      };
      console.log(payload);

      const response = await api.post(
        `/channel-partner/channel-partner/students`,
        payload
      );

      if (response.data.success) {
        alert("Student added successfully!");

        // Reset form
        setFormData({
          studentName: "",
          phone: "",
          course: "",
          courseFee: "",
          firstPayment: {
            amount: "",
            mode: "Cash",
            // receivedBy: "",
          },
        });
        setShowFirstPayment(false);
        console.log(`the response is ${response.data.data}`);

        // Callback for parent component
        // if (onSuccess) onSuccess(response.data.data);
      }
    } catch (error) {
      console.error("Error adding student:", error);
      alert(
        error.response?.data?.message ||
          "Failed to add student. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.formContainer}>
      <div className={styles.formHeader}>
        <h2>Add New Student</h2>
        <p>
          {`Fill in the details below to add a new student for this channel
          partner "${name}"  Phone number is "${phone}" Email Id is "${email}"`}
        </p>
      </div>

      <form onSubmit={handleSubmit} className={styles.form}>
        {/* Student Information */}
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>
            <span className={styles.sectionIcon}>👤</span>
            Student Information
          </h3>

          <div className={styles.formGrid}>
            <div className={styles.formGroup}>
              <label htmlFor="studentName" className={styles.label}>
                Student Full Name *
              </label>
              <input
                type="text"
                id="studentName"
                name="studentName"
                value={formData.studentName}
                onChange={handleInputChange}
                className={styles.input}
                placeholder="Enter student's full name"
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="phone" className={styles.label}>
                Phone Number *
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className={styles.input}
                placeholder="10-digit mobile number"
                pattern="[0-9]{10}"
                maxLength="10"
                required
              />
            </div>
          </div>

          <div className={styles.formGrid}>
            <div className={styles.formGroup}>
              <label htmlFor="course" className={styles.label}>
                Course *
              </label>
              {/* <select
                id="course"
                name="course"
                value={formData.course}
                onChange={handleInputChange}
                className={styles.select}
                required
              >
                <option value="">Select a course</option>
                {courses.map((course, index) => (
                  <option key={index} value={course}>
                    {course}
                  </option>
                ))}
              </select> */}
              <input
                type="text"
                id="course"
                name="course"
                value={formData.course}
                onChange={handleInputChange}
                className={styles.input}
                placeholder="Course Name"
                // pattern="[0-9]{10}"
                maxLength="50"
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="courseFee" className={styles.label}>
                Total Course Fee (₹)
              </label>
              <input
                type="number"
                id="courseFee"
                name="courseFee"
                value={formData.courseFee}
                onChange={handleInputChange}
                className={styles.input}
                placeholder="0.00"
                min="0"
                step="0.01"
              />
            </div>
          </div>
        </div>

        {/* First Payment Section */}
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <h3 className={styles.sectionTitle}>
              <span className={styles.sectionIcon}>💰</span>
              Initial Payment (Optional)
            </h3>
            <button
              type="button"
              className={`${styles.toggleBtn} ${
                showFirstPayment ? styles.active : ""
              }`}
              onClick={toggleFirstPayment}
            >
              {showFirstPayment ? "✕ Remove Payment" : "＋ Add Payment"}
            </button>
          </div>

          {showFirstPayment && (
            <div className={styles.paymentSection}>
              <div className={styles.formGrid}>
                <div className={styles.formGroup}>
                  <label htmlFor="amount" className={styles.label}>
                    Payment Amount (₹) *
                  </label>
                  <input
                    type="number"
                    id="amount"
                    name="amount"
                    value={formData.firstPayment.amount}
                    onChange={handlePaymentChange}
                    className={styles.input}
                    placeholder="0.00"
                    min="1"
                    step="0.01"
                    required={showFirstPayment}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="mode" className={styles.label}>
                    Payment Mode *
                  </label>
                  <select
                    id="mode"
                    name="mode"
                    value={formData.firstPayment.mode}
                    onChange={handlePaymentChange}
                    className={styles.select}
                    required={showFirstPayment}
                  >
                    {paymentModes.map((mode, index) => (
                      <option key={index} value={mode}>
                        {mode}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* <div className={styles.formGroup}>
                <label htmlFor="receivedBy" className={styles.label}>
                  Received By
                </label>
                <input
                  type="text"
                  id="receivedBy"
                  name="receivedBy"
                  value={formData.firstPayment.receivedBy}
                  onChange={handlePaymentChange}
                  className={styles.input}
                  placeholder="Name of person who received payment"
                />
              </div> */}

              {/* Commission Preview */}
              {formData.firstPayment.amount &&
                parseFloat(formData.firstPayment.amount) > 0 && (
                  <div className={styles.commissionPreview}>
                    <div className={styles.commissionCard}>
                      <span className={styles.commissionLabel}>
                        Commission Earned:
                      </span>
                      <span className={styles.commissionAmount}>
                        ₹{calculateCommission()}
                      </span>
                    </div>
                  </div>
                )}
            </div>
          )}
        </div>

        {/* Summary */}
        <div className={styles.summarySection}>
          <h3 className={styles.sectionTitle}>
            <span className={styles.sectionIcon}>📋</span>
            Summary
          </h3>
          <div className={styles.summaryGrid}>
            <div className={styles.summaryItem}>
              <span>Student:</span>
              <strong>{formData.studentName || "—"}</strong>
            </div>
            <div className={styles.summaryItem}>
              <span>Course:</span>
              <strong>{formData.course || "—"}</strong>
            </div>
            <div className={styles.summaryItem}>
              <span>Total Fee:</span>
              <strong>
                ₹{parseFloat(formData.courseFee || 0).toLocaleString("en-IN")}
              </strong>
            </div>
            <div className={styles.summaryItem}>
              <span>Initial Payment:</span>
              <strong className={styles.paymentAmount}>
                {showFirstPayment && formData.firstPayment.amount
                  ? `₹${parseFloat(formData.firstPayment.amount).toLocaleString(
                      "en-IN"
                    )}`
                  : "None"}
              </strong>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className={styles.actionButtons}>
          <button
            type="button"
            className={styles.cancelBtn}
            onClick={() => {
              if (
                window.confirm(
                  "Are you sure? All unsaved changes will be lost."
                )
              ) {
                setFormData({
                  studentName: "",
                  phone: "",
                  course: "",
                  courseFee: "",
                  firstPayment: { amount: "", mode: "Cash", receivedBy: "" },
                });
                setShowFirstPayment(false);
              }
            }}
            disabled={loading}
          >
            Clear Form
          </button>

          <button type="submit" className={styles.submitBtn} disabled={loading}>
            {loading ? (
              <>
                <span className={styles.spinner}></span>
                Adding Student...
              </>
            ) : (
              <>
                <span className={styles.submitIcon}>✓</span>
                Add Student
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddStudentForm;
