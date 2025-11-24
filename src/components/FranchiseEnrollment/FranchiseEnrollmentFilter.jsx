// const FranchiseEnrollmentFilter = () => {
//   return <div>FranchiseEnrollmentFilter</div>;
// };
// export default FranchiseEnrollmentFilter;
import { Form, Link, useLoaderData } from "react-router-dom";
import { Search, Filter as FilterIcon, RefreshCw } from "lucide-react";
import styles from "./FranchiseEnrollmentFilter.module.css";

const FranchiseEnrollmentFilter = () => {
  const { params } = useLoaderData();
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
            Refine your search to find specific leads
          </p>
        </div>

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
              defaultValue={params.name}
            />
          </div>

          {/* Status Select Field */}
          <div className={styles.inputGroup}>
            <label htmlFor="status" className={styles.label}>
              <span>Status</span>
            </label>
            <select
              name="status"
              id="status"
              className={styles.select}
              defaultValue={params.status}
            >
              <option value="">All Statuses</option>
              <option value="New">New</option>
              {/* <option value="Contacted">Contacted</option>
              <option value="Interested">Interested</option> */}
              <option value="Enrolled">Enrolled</option>
              <option value="Not Interested">Not Interested</option>
            </select>
          </div>

          {/* Course Input Field */}
          <div className={styles.inputGroup}>
            <label htmlFor="course" className={styles.label}>
              <span>Phone Number</span>
            </label>
            <input
              type="number"
              name="phone"
              id="phone"
              placeholder="10 digits phone number"
              className={styles.input}
              defaultValue={params.phone}
            />
          </div>

          {/* Source Select Field */}
          {/* <div className={styles.inputGroup}>
            <label htmlFor="source" className={styles.label}>
              <span>Source</span>
            </label>
            <select
              name="source"
              id="source"
              className={styles.select}
              defaultValue=""
            >
              <option value="">All Sources</option>
              <option value="Channel Partner">Channel Partner</option>
              <option value="Franchise Enquiry">Franchise Enquiry</option>
              <option value="Direct">Direct</option>
              <option value="Other">Other</option>
            </select>
          </div> */}

          {/* Date Range */}
          {/* <div className={styles.inputGroup}>
            <label htmlFor="dateFrom" className={styles.label}>
              <span>From Date</span>
            </label>
            <input
              type="date"
              name="dateFrom"
              id="dateFrom"
              className={styles.input}
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="dateTo" className={styles.label}>
              <span>To Date</span>
            </label>
            <input
              type="date"
              name="dateTo"
              id="dateTo"
              className={styles.input}
            />
          </div> */}
        </div>

        {/* Action Buttons */}
        <div className={styles.buttonGroup}>
          <button type="submit" className={styles.searchButton}>
            <Search size={18} />
            <span>Search Leads</span>
          </button>
          <Link
            to="/manager/enroll-lead/franchise"
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

export default FranchiseEnrollmentFilter;
