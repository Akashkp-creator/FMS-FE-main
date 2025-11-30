import { useState } from "react";
import {
  User,
  Phone,
  Mail,
  GraduationCap,
  BookOpen,
  FileText,
  //   Source,
  Gem,
  TrendingUp,
  DollarSign,
  Calendar,
  Plus,
  Save,
  IndianRupeeIcon,
  BadgeIndianRupee,
  IndianRupee,
} from "lucide-react";
import api from "../../utils/axiosConfig";
import { toast } from "react-toastify";
import styles from "./AddStudentLead.module.css";
import { useLoaderData, useNavigate } from "react-router-dom";

const AddStudentLead = () => {
  const [loading, setLoading] = useState(false);
  const [showDigitalMarketing, setShowDigitalMarketing] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedSubCourse, setSelectedSubCourse] = useState("");
  const [fee, setFee] = useState(0);
  const navigate = useNavigate();

  const data = useLoaderData();

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    qualification: "",
    specification: "",
    course: "",
    notes: "",
    source: "",
    otherSource: "",
    digitalMarketingPayment: {
      amount: "",
      paidTo: "",
      date: "",
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith("digitalMarketingPayment.")) {
      const field = name.split(".")[1];
      setForm((prev) => ({
        ...prev,
        digitalMarketingPayment: {
          ...prev.digitalMarketingPayment,
          [field]: value,
        },
      }));
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        name: form.name,
        qualification: form.qualification,
        specification: form.specification,
        course: form.course,
        notes: form.notes,
        source: form.source,
        otherSource:
          form.source === "Other" ? form.otherSource.trim() : undefined,
        // status: form.status,
        contact: {
          phone: form.phone,
          email: form.email,
        },
      };

      if (showDigitalMarketing && form.digitalMarketingPayment.amount) {
        payload.digitalMarketingPayment = {
          amount: Number(form.digitalMarketingPayment.amount),
          paidTo: form.digitalMarketingPayment.paidTo,
          date:
            form.digitalMarketingPayment.date ||
            new Date().toISOString().split("T")[0],
        };
      }

      // console.log(payload);
      const res = await api.post(
        "/LeadStudentData/create-studentLead",
        payload
      );
      console.log(res?.data?.message);
      toast.success("🎉 Lead created successfully!");
      navigate("/");
      // console.log("Lead Created:", res.data);

      // Reset form
      setForm({
        name: "",
        phone: "",
        email: "",
        qualification: "",
        specification: "",
        course: "",
        notes: "",
        source: "",
        otherSource: "",
        // status: "New",
        digitalMarketingPayment: { amount: "", paidTo: "", date: "" },
      });
      setSelectedCourse("");
      setSelectedSubCourse("");
      setFee(0);
      setShowDigitalMarketing(false);
    } catch (error) {
      console.error("❌ Error creating lead:", error);
      toast.error(error.response?.data?.message || "Error creating lead");
      // Reset form
      setForm({
        name: "",
        phone: "",
        email: "",
        qualification: "",
        specification: "",
        course: "",
        notes: "",
        source: "",
        otherSource: "",
        // status: "New",
        digitalMarketingPayment: { amount: "", paidTo: "", date: "" },
      });
      setSelectedCourse("");
      setSelectedSubCourse("");
      setFee(0);
      setShowDigitalMarketing(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <Plus className={styles.headerIcon} />
        <div>
          <h1 className={styles.title}>Add New Lead</h1>
          <p className={styles.subtitle}>
            Capture potential student information and track marketing efforts
          </p>
        </div>
      </div>

      <form className={styles.form} onSubmit={handleSubmit}>
        {/* Personal Information Section */}
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>
            <User size={20} />
            Personal Information
          </h3>
          <div className={styles.inputGrid}>
            <div className={styles.inputGroup}>
              <label className={styles.label}>
                <User size={16} />
                <span>Full Name *</span>
              </label>
              <input
                type="text"
                name="name"
                placeholder="Enter lead's full name"
                value={form.name}
                onChange={handleChange}
                className={styles.input}
                required
              />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.label}>
                <Phone size={16} />
                <span>Phone Number *</span>
              </label>
              <input
                type="text"
                name="phone"
                placeholder="Enter phone number"
                value={form.phone}
                onChange={handleChange}
                className={styles.input}
                required
              />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.label}>
                <Mail size={16} />
                <span>Email Address *</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="Enter email address"
                value={form.email}
                onChange={handleChange}
                className={styles.input}
                required
              />
            </div>
          </div>
        </div>

        {/* Education & Course Section */}
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>
            <GraduationCap size={20} />
            Education & Course Details
          </h3>
          <div className={styles.inputGrid}>
            <div className={styles.inputGroup}>
              <label className={styles.label}>
                <GraduationCap size={16} />
                <span>Qualification *</span>
              </label>
              <input
                type="text"
                name="qualification"
                placeholder="e.g., BSc, BCom, MSc"
                maxLength="8"
                value={form.qualification}
                onChange={handleChange}
                className={styles.input}
                required
              />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.label}>
                {/* <BookOpen size={16} /> */}
                <span>Specification *</span>
              </label>
              <input
                type="text"
                name="specification"
                placeholder="Enter course of interest"
                value={form.specification}
                onChange={handleChange}
                className={styles.input}
                required
              />
            </div>
          </div>
          {/* <div className={styles.section}> */}
          <h3 className={styles.sectionTitle}>
            <BookOpen size={20} />
            Course Selection
          </h3>

          <div className={styles.inputGrid}>
            {/* LEFT COLUMN — COURSE */}
            <div className={styles.inputGroup}>
              <label className={styles.label}>
                <BookOpen size={16} />
                <span>Course *</span>
              </label>

              <select
                name="course"
                value={selectedCourse}
                onChange={(e) => {
                  const courseName = e.target.value;
                  setSelectedCourse(courseName);
                  setSelectedSubCourse("");
                  setFee(0);
                  setForm((prev) => ({ ...prev, course: courseName }));
                }}
                className={styles.select}
                required
              >
                <option value="">Select Course</option>
                {data?.courses?.map((course) => (
                  <option key={course.courseName} value={course.courseName}>
                    {course.courseName}
                  </option>
                ))}
              </select>
            </div>

            {/* RIGHT COLUMN — SUB COURSE */}
            <div className={styles.inputGroup}>
              <label className={styles.label}>
                <span>Sub Course *</span>
              </label>

              <select
                name="subCourse"
                value={selectedSubCourse}
                onChange={(e) => {
                  const subCourseName = e.target.value;
                  setSelectedSubCourse(subCourseName);

                  const course = data.courses.find(
                    (c) => c.courseName === selectedCourse
                  );

                  const sub = course.subCourses.find(
                    (s) => s.subCourseName === subCourseName
                  );

                  setFee(sub.fee);

                  setForm((prev) => ({
                    ...prev,
                    course: `${selectedCourse} - ${subCourseName}`,
                  }));
                }}
                className={styles.select}
                required
                disabled={!selectedCourse}
              >
                <option value="">Select SubCourse</option>
                {selectedCourse &&
                  data.courses
                    .find((c) => c.courseName === selectedCourse)
                    ?.subCourses.map((sub) => (
                      <option key={sub.subCourseName} value={sub.subCourseName}>
                        {sub.subCourseName}
                      </option>
                    ))}
              </select>
            </div>
          </div>

          {/* FEE — FULL WIDTH BELOW */}
          {selectedSubCourse && (
            <div className={styles.inputGroup} style={{ marginTop: "1rem" }}>
              <label className={styles.label}>
                <IndianRupee size={16} />
                <span>Fee</span>
              </label>
              <input
                type="number"
                // className={styles.input}
                className={`${styles.input} ${styles.readOnlyInput}`}
                value={fee}
                readOnly
              />
            </div>
          )}
          {/* </div> */}

          <div className={styles.inputGroup}>
            <label className={styles.label}>
              <FileText size={16} />
              <span>Additional Notes</span>
            </label>
            <textarea
              name="notes"
              placeholder="Any additional information about the lead..."
              value={form.notes}
              onChange={handleChange}
              className={styles.textarea}
              rows="3"
              maxLength={250}
            ></textarea>
          </div>
        </div>

        {/* Lead Source Section */}
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>
            <Gem size={20} />
            Lead Source
          </h3>
          <div className={styles.inputGrid}>
            <div className={styles.inputGroup}>
              <label className={styles.label}>
                <Gem size={16} />
                <span>Source *</span>
              </label>
              <select
                name="source"
                value={form.source}
                onChange={handleChange}
                className={styles.select}
                required
              >
                <option value="">Select Source</option>
                <option value="Franchise Enquiry">Franchise Enquiry</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {form.source === "Other" && (
              <div className={styles.inputGroup}>
                <label className={styles.label}>
                  <span>Specify Source *</span>
                </label>
                <input
                  type="text"
                  name="otherSource"
                  placeholder="Please specify the source"
                  value={form.otherSource}
                  onChange={handleChange}
                  className={styles.input}
                  required
                />
              </div>
            )}
          </div>
        </div>

        {/* Digital Marketing Section */}
        <div className={styles.section}>
          <div className={styles.checkboxGroup}>
            <input
              type="checkbox"
              id="digitalMarketingCheck"
              checked={showDigitalMarketing}
              onChange={(e) => setShowDigitalMarketing(e.target.checked)}
              className={styles.checkbox}
            />
            <label
              htmlFor="digitalMarketingCheck"
              className={styles.checkboxLabel}
            >
              <TrendingUp size={18} />
              <span>Add Digital Marketing Payment Details</span>
            </label>
          </div>

          {showDigitalMarketing && (
            <div className={styles.paymentSection}>
              <h4 className={styles.paymentTitle}>
                <IndianRupeeIcon size={18} />
                Digital Marketing Payment
              </h4>
              <div className={styles.inputGrid}>
                <div className={styles.inputGroup}>
                  <label className={styles.label}>
                    <IndianRupeeIcon size={16} />
                    <span>Amount *</span>
                  </label>
                  <div className={styles.amountWrapper}>
                    <input
                      type="number"
                      name="digitalMarketingPayment.amount"
                      placeholder="0.00"
                      value={form.digitalMarketingPayment.amount}
                      onChange={handleChange}
                      className={styles.input}
                      required
                      min="0"
                      step="0.01"
                    />
                    <span className={styles.currencySymbol}>₹</span>
                  </div>
                </div>

                <div className={styles.inputGroup}>
                  <label className={styles.label}>
                    <span>Paid To *</span>
                  </label>
                  <input
                    type="text"
                    name="digitalMarketingPayment.paidTo"
                    placeholder="e.g., Instagram Ads, Google Ads"
                    value={form.digitalMarketingPayment.paidTo}
                    onChange={handleChange}
                    className={styles.input}
                    required
                  />
                </div>

                <div className={styles.inputGroup}>
                  <label className={styles.label}>
                    <Calendar size={16} />
                    <span>Payment Date *</span>
                  </label>
                  <input
                    type="date"
                    name="digitalMarketingPayment.date"
                    value={form.digitalMarketingPayment.date}
                    onChange={handleChange}
                    className={styles.input}
                    required
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Submit Button */}
        <div className={styles.submitSection}>
          <button
            type="submit"
            className={styles.submitButton}
            disabled={loading}
          >
            {loading ? (
              <div className={styles.loadingSpinner}></div>
            ) : (
              <>
                <Save size={18} />
                <span>Create Lead</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
export default AddStudentLead;
