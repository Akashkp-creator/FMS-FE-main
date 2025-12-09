import { useLoaderData } from "react-router-dom";
import { Form, Link } from "react-router-dom";
import styles from "./StudentFilter.module.css";
import { FilterIcon, RefreshCw, Search } from "lucide-react";
const StudentFilter = () => {
  const data = useLoaderData();
  console.log(data);
  return (
    <Form className={styles.filterContainer}>
      {/* Background Effects */}
      <div className={styles.backgroundEffects}>
        <div className={styles.glowCircle1}></div>
        <div className={styles.glowCircle2}></div>
      </div>

      <div className={styles.filterContent}>
        {/* Header */}
        <div className={styles.header}>
          <FilterIcon className={styles.headerIcon} />
          <h2 className={styles.title}>Filter Leads</h2>
          <p className={styles.subtitle}>
            Refine your search to find specific Student
          </p>
        </div>
        {/* Back Button */}

        {/* Filter Grid */}
        <div className={styles.filterGrid}>
          {/* Name Input Field */}
          <div className={styles.inputGroup}>
            <label htmlFor="name" className={styles.label}>
              <span>Name</span>
            </label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="e.g., Raju"
              className={styles.input}
              //   defaultValue={params.name}
            />
          </div>

          {/* Course Input Field */}
          <div className={styles.inputGroup}>
            <label htmlFor="course" className={styles.label}>
              <span>Phone</span>
            </label>
            <input
              type="number"
              name="phone"
              id="phone"
              placeholder="1234567890"
              className={styles.input}
              //   defaultValue={params.phone}
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className={styles.buttonGroup}>
          <button type="submit" className={styles.searchButton}>
            <Search size={18} />
            <span>Search Leads</span>
          </button>
          <Link
            to="/manager/channel-partner/list/students"
            className={styles.resetButton}
          >
            <RefreshCw size={18} />
            <span>Reset Filters</span>
          </Link>
        </div>
      </div>
    </Form>
  );
};
export default StudentFilter;
