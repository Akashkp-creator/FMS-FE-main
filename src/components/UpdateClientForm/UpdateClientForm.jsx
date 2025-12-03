import React, { useEffect, useMemo, useState } from "react";
// import api from "../api"; // your axios instance
import { toast } from "react-toastify";
import styles from "./UpdateClientForm.module.css";
import api from "../../utils/axiosConfig";
import { useSelector } from "react-redux";

// const UpdateClientForm = ({ clientData }) => {
const UpdateClientForm = () => {
  const { user } = useSelector((state) => state.auth);
  // console.log(user);

  const clientData = useMemo(() => {
    return {
      institutionName: user?.client?.institutionName || "",
      institutionAddress: user?.client?.institutionAddress || "",
      institutionPhone: user?.client?.institutionPhone || "",
      logoUrl: user?.client?.logoUrl || "",
      gst: user?.client?.gst || "",
      courses: user?.client?.courses || [],
      franchiseFinance: (user?.client?.franchiseFinance || []).map(
        (t, idx) => ({
          cityTier: t.cityTier || `Tier-${idx + 1} City`,
          franchiseFee: t.franchiseFee || "",
          depositAmount: t.depositAmount || "",
          extraCharges: t.extraCharges || "",
          yearlyRenewalFee: t.yearlyRenewalFee || "",
        })
      ),
    };
  }, [user]);

  const [form, setForm] = useState(clientData);

  // ✅ FIX: update form ONLY when user.client changes —
  // but without violating ESLint rule
  useEffect(() => {
    // only update when client data changes
    setForm(clientData);
  }, [clientData]);

  // ------------------ Handlers ------------------
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFranchiseChange = (index, field, value) => {
    const updated = [...form.franchiseFinance];
    updated[index][field] = value;
    setForm({ ...form, franchiseFinance: updated });
  };
  const handleAddFranchiseTier = () => {
    const nextTier = form.franchiseFinance.length + 1;

    setForm({
      ...form,
      franchiseFinance: [
        ...form.franchiseFinance,
        {
          cityTier: `Tier-${nextTier} City`,
          franchiseFee: "",
          depositAmount: "",
          extraCharges: "",
          yearlyRenewalFee: "",
        },
      ],
    });
  };

  const handleRemoveFranchiseTier = (index) => {
    const updated = [...form.franchiseFinance];
    updated.splice(index, 1);
    setForm({ ...form, franchiseFinance: updated });
  };

  // const handleCourseChange = (index, field, value) => {
  //   const updated = [...form.courses];
  //   updated[index][field] = value;
  //   setForm({ ...form, courses: updated });
  // };
  const handleCourseChange = (index, field, value) => {
    setForm((prev) => ({
      ...prev,
      courses: prev.courses.map((course, i) =>
        i === index ? { ...course, [field]: value } : course
      ),
    }));
  };

  const handleAddCourse = () => {
    setForm({
      ...form,
      courses: [...form.courses, { courseName: "", subCourses: [] }],
    });
  };

  const handleRemoveCourse = (index) => {
    const updated = [...form.courses];
    updated.splice(index, 1);
    setForm({ ...form, courses: updated });
  };

  // const handleSubCourseChange = (courseIndex, subIndex, field, value) => {
  //   const updated = [...form.courses];
  //   updated[courseIndex].subCourses[subIndex][field] = value;
  //   setForm({ ...form, courses: updated });
  // };
  const handleSubCourseChange = (courseIndex, subIndex, field, value) => {
    setForm((prev) => {
      const updatedCourses = prev.courses.map((course, i) => {
        if (i !== courseIndex) return course;

        return {
          ...course,
          subCourses: course.subCourses.map((sub, j) => {
            if (j !== subIndex) return sub;

            return {
              ...sub, // <-- create new subCourse object
              [field]: value, // <-- update field safely
            };
          }),
        };
      });

      return {
        ...prev,
        courses: updatedCourses,
      };
    });
  };

  // const handleAddSubCourse = (courseIndex) => {
  //   const updated = [...form.courses];
  //   updated[courseIndex].subCourses.push({ subCourseName: "", fee: 0 });
  //   setForm({ ...form, courses: updated });
  // };
  const handleAddSubCourse = (courseIndex) => {
    setForm((prev) => {
      const updatedCourses = prev.courses.map((course, i) => {
        if (i !== courseIndex) return course;

        return {
          ...course,
          subCourses: [
            ...course.subCourses,
            { name: "", fee: 0 }, // <-- your sub-course structure
          ],
        };
      });

      return { ...prev, courses: updatedCourses };
    });
  };

  // const handleRemoveSubCourse = (courseIndex, subIndex) => {
  //   const updated = [...form.courses];
  //   updated[courseIndex].subCourses.splice(subIndex, 1);
  //   setForm({ ...form, courses: updated });
  // };
  const handleRemoveSubCourse = (courseIndex, subIndex) => {
    setForm((prev) => {
      const updatedCourses = prev.courses.map((course, i) => {
        if (i !== courseIndex) return course;

        return {
          ...course,
          subCourses: course.subCourses.filter((_, j) => j !== subIndex),
        };
      });

      return { ...prev, courses: updatedCourses };
    });
  };

  // ------------------ Submit ------------------
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // console.log(form);
      const res = await api.put("admin/client/update", form); // your API endpoint
      toast.success("Client updated successfully");
      console.log(res.data);
    } catch (error) {
      console.error(error);
      toast.error(
        `${error?.response?.data?.error}` ||
          `${error?.response?.data?.message}` ||
          `${error?.response?.data}` ||
          "Error updating client"
      );
    }
  };

  // ------------------ Render ------------------
  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h2>Update the Fee Structure</h2>

      <input
        type="text"
        name="institutionName"
        value={form.institutionName}
        onChange={handleChange}
        placeholder="Institution Name"
        disabled={true}
        className={styles.disabledInput}
      />

      <input
        type="text"
        name="institutionAddress"
        value={form.institutionAddress}
        onChange={handleChange}
        placeholder="Institution Address"
        disabled={true}
        className={styles.disabledInput}
      />

      <input
        type="text"
        name="institutionPhone"
        value={form.institutionPhone}
        onChange={handleChange}
        placeholder="Institution Phone"
        disabled={true}
        className={styles.disabledInput}
      />

      <input
        type="text"
        name="logoUrl"
        value={form.logoUrl}
        onChange={handleChange}
        placeholder="Logo URL"
        disabled={true}
        className={styles.disabledInput}
      />
      <input
        type="text"
        name="gst"
        value={form.gst}
        onChange={handleChange}
        placeholder="GST No."
        // disabled={true}
        className={styles.input}
      />

      {/* Franchise Finance */}
      <h3>Franchise Tiers</h3>
      {form.franchiseFinance.map((tier, i) => (
        <div key={i} className={styles.tierRow}>
          <input
            type="text"
            value={`Tier-${i + 1} City`}
            readOnly
            className={styles.readOnlyInput}
          />

          <input
            type="number"
            placeholder="Franchise Fee"
            value={tier.franchiseFee}
            onChange={(e) =>
              handleFranchiseChange(i, "franchiseFee", Number(e.target.value))
            }
          />
          <input
            type="number"
            placeholder="Deposit Amount"
            value={tier.depositAmount}
            onChange={(e) =>
              handleFranchiseChange(i, "depositAmount", Number(e.target.value))
            }
          />
          <input
            type="number"
            placeholder="Extra Charges"
            value={tier.extraCharges}
            onChange={(e) =>
              handleFranchiseChange(i, "extraCharges", Number(e.target.value))
            }
          />
          <input
            type="number"
            placeholder="Yearly Renewal Fee"
            value={tier.yearlyRenewalFee}
            onChange={(e) =>
              handleFranchiseChange(
                i,
                "yearlyRenewalFee",
                Number(e.target.value)
              )
            }
          />
          <button type="button" onClick={() => handleRemoveFranchiseTier(i)}>
            Remove
          </button>
        </div>
      ))}
      <button type="button" onClick={handleAddFranchiseTier}>
        Add Tier
      </button>

      {/* Courses */}
      <h3>Courses</h3>
      {form.courses.map((course, ci) => (
        <div key={ci} className={styles.courseBlock}>
          <input
            type="text"
            placeholder="Course Name"
            value={course.courseName}
            onChange={(e) =>
              handleCourseChange(ci, "courseName", e.target.value)
            }
          />
          <button type="button" onClick={() => handleRemoveCourse(ci)}>
            Remove Course
          </button>

          <h4>Sub Courses</h4>
          {course.subCourses.map((sub, si) => (
            <div key={si} className={styles.subCourseRow}>
              <input
                type="text"
                placeholder="Sub Course Name"
                value={sub.subCourseName}
                onChange={(e) =>
                  handleSubCourseChange(ci, si, "subCourseName", e.target.value)
                }
              />
              <input
                type="number"
                placeholder="Fee"
                value={sub.fee}
                onChange={(e) =>
                  handleSubCourseChange(ci, si, "fee", Number(e.target.value))
                }
              />
              <button
                type="button"
                onClick={() => handleRemoveSubCourse(ci, si)}
              >
                Remove
              </button>
            </div>
          ))}
          <button type="button" onClick={() => handleAddSubCourse(ci)}>
            Add Sub Course
          </button>
        </div>
      ))}
      <button type="button" onClick={handleAddCourse}>
        Add Course
      </button>

      <button type="submit" className={styles.submitBtn}>
        Update fee structure
      </button>
    </form>
  );
};

export default UpdateClientForm;
