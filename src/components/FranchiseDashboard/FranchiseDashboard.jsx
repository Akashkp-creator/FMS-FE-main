// import { useLoaderData } from "react-router-dom";

// const FranchiseDashboard = () => {
//   return (
//     <div>
//       <h1>Franchise Dashboard</h1>
//       {/* Render your analytics data here */}
//     </div>
//   );
// };
// export default FranchiseDashboard;
import styles from "./FranchiseDashboard.module.css";
const StatsCard = ({ title, value, icon, color }) => {
  const getColorClass = (color) => {
    switch (color) {
      case "blue":
        return styles.blueCard;
      case "green":
        return styles.greenCard;
      case "orange":
        return styles.orangeCard;
      case "purple":
        return styles.purpleCard;
      default:
        return styles.blueCard;
    }
  };

  return (
    <div className={`${styles.statsCard} ${getColorClass(color)}`}>
      <div className={styles.cardHeader}>
        <span className={styles.cardIcon}>{icon}</span>
        <h3 className={styles.cardTitle}>{title}</h3>
      </div>
      <div className={styles.cardContent}>
        <h2 className={styles.cardValue}>{value}</h2>
        {/* <span
          className={`${styles.cardChange} ${
            change.includes("+") ? styles.positive : styles.negative
          }`}
        >
          {change}
        </span> */}
      </div>
    </div>
  );
};

const LeadStatusChart = ({ data }) => {
  const total = data.reduce((sum, item) => sum + item.count, 0);

  return (
    <div className={styles.chartCard}>
      <h3 className={styles.chartTitle}>Lead Status</h3>
      <div className={styles.chartContainer}>
        <div className={styles.pieChart}>
          <div className={styles.pieChartInner}>
            {data.map((item, index) => {
              const percentage = total > 0 ? (item.count / total) * 100 : 0;
              return (
                <div
                  key={item.status}
                  className={styles.pieSegment}
                  style={{
                    "--percentage": `${percentage}%`,
                    "--color": item.color,
                    "--start":
                      index === 0
                        ? "0%"
                        : `${data
                            .slice(0, index)
                            .reduce(
                              (sum, d) => sum + (d.count / total) * 100,
                              0
                            )}%`,
                  }}
                ></div>
              );
            })}
          </div>
        </div>
        <div className={styles.legend}>
          {data.map((item) => (
            <div key={item.status} className={styles.legendItem}>
              <span
                className={styles.legendColor}
                style={{ backgroundColor: item.color }}
              ></span>
              <span className={styles.legendLabel}>{item.status}</span>
              <span className={styles.legendCount}>{item.count}</span>
              <span className={styles.legendPercentage}>
                ({total > 0 ? Math.round((item.count / total) * 100) : 0}%)
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const RevenueChart = ({ data }) => {
  const maxRevenue = Math.max(...data.map((d) => d.revenue));

  return (
    <div className={styles.chartCard}>
      <h3 className={styles.chartTitle}>Revenue Trend</h3>
      <div className={styles.revenueChart}>
        <div className={styles.chartBars}>
          {data.map((item, index) => {
            const height =
              maxRevenue > 0 ? (item.revenue / maxRevenue) * 100 : 0;
            return (
              <div key={index} className={styles.barContainer}>
                <div
                  className={styles.bar}
                  style={{ height: `${height}%` }}
                ></div>
                <span className={styles.barLabel}>{item.month}</span>
                <span className={styles.barValue}>₹{item.revenue}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const ActivityItem = ({ title, description, icon, timestamp }) => {
  return (
    <div className={styles.activityItem}>
      <div className={styles.activityIcon}>{icon}</div>
      <div className={styles.activityContent}>
        <h4 className={styles.activityTitle}>{title}</h4>
        <p className={styles.activityDescription}>{description}</p>
        <span className={styles.activityTime}>
          {new Date(timestamp).toLocaleDateString("en-IN", {
            day: "numeric",
            month: "short",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </span>
      </div>
    </div>
  );
};

const InstallmentRow = ({
  studentName,
  installmentNo,
  dueDate,
  amount,
  isOverdue,
}) => {
  return (
    <tr className={styles.tableRow}>
      <td className={styles.tableCell}>
        <span className={styles.studentName}>{studentName}</span>
      </td>
      <td className={styles.tableCell}>
        <span className={styles.installmentNumber}>#{installmentNo}</span>
      </td>
      <td className={styles.tableCell}>
        <span className={styles.dueDate}>
          {new Date(dueDate).toLocaleDateString("en-IN")}
        </span>
      </td>
      <td className={styles.tableCell}>
        <span className={styles.amount}>₹{amount}</span>
      </td>
      <td className={styles.tableCell}>
        <span
          className={`${styles.statusBadge} ${
            isOverdue ? styles.overdue : styles.pending
          }`}
        >
          {isOverdue ? "Overdue" : "Pending"}
        </span>
      </td>
    </tr>
  );
};

const StudentCard = ({ name, course, progress, totalPaid, finalFee }) => {
  return (
    <div className={styles.studentCard}>
      <div className={styles.studentHeader}>
        <h4 className={styles.studentName}>{name}</h4>
        <span className={styles.studentCourse}>{course}</span>
      </div>
      <div className={styles.progressSection}>
        <div className={styles.progressInfo}>
          <span className={styles.progressLabel}>Progress</span>
          <span className={styles.progressPercentage}>{progress}%</span>
        </div>
        <div className={styles.progressBar}>
          <div
            className={styles.progressFill}
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
      <div className={styles.paymentInfo}>
        <div className={styles.paymentItem}>
          <span className={styles.paymentLabel}>Paid</span>
          <span className={styles.paymentAmount}>₹{totalPaid}</span>
        </div>
        <div className={styles.paymentItem}>
          <span className={styles.paymentLabel}>Total</span>
          <span className={styles.paymentAmount}>₹{finalFee}</span>
        </div>
      </div>
    </div>
  );
};

const FranchiseDashboard = ({ dashboardData }) => {
  if (!dashboardData)
    return <div className={styles.loading}>Loading dashboard...</div>;

  const {
    quickStats,
    leadManagement,
    studentManagement,
    financials,
    installments,
    recentActivity,
    analytics,
  } = dashboardData;

  return (
    <div className={styles.dashboardContainer}>
      {/* Header */}
      <header className={styles.dashboardHeader}>
        <h1 className={styles.dashboardTitle}>Franchise Dashboard</h1>
        <div className={styles.headerInfo}>
          <span className={styles.lastUpdated}>
            Last updated:{" "}
            {new Date(dashboardData.generatedAt).toLocaleTimeString()}
          </span>
          <span className={styles.timeRange}>
            {/* {dashboardData.timeRange.currentMonth} */}
          </span>
        </div>
      </header>

      {/* Quick Stats Grid */}
      <section className={styles.statsGrid}>
        {quickStats.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </section>

      {/* Main Content Grid */}
      <div className={styles.mainContent}>
        {/* Left Column */}
        <div className={styles.leftColumn}>
          {/* Leads & Revenue Charts */}
          <div className={styles.chartsSection}>
            <LeadStatusChart data={leadManagement.leadsByStatus} />
            <RevenueChart data={financials.monthlyTrend} />
          </div>

          {/* Recent Activity */}
          <section className={styles.recentActivitySection}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>Recent Activity</h2>
              <span className={styles.activityCount}>
                {recentActivity.length} activities
              </span>
            </div>
            <div className={styles.activityList}>
              {recentActivity.map((activity, index) => (
                <ActivityItem key={index} {...activity} />
              ))}
            </div>
          </section>
        </div>

        {/* Right Column */}
        <div className={styles.rightColumn}>
          {/* Upcoming Installments */}
          <section className={styles.installmentsSection}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>Upcoming Installments</h2>
              <div className={styles.installmentStats}>
                <span className={`${styles.statBadge} ${styles.overdue}`}>
                  {installments.overdue} Overdue
                </span>
                <span className={styles.statBadge}>
                  {installments.upcoming} Upcoming
                </span>
              </div>
            </div>
            <div className={styles.tableContainer}>
              <table className={styles.installmentTable}>
                <thead>
                  <tr>
                    <th>Student</th>
                    <th>Installment</th>
                    <th>Due Date</th>
                    <th>Amount</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {installments.upcomingInstallments.map(
                    (installment, index) => (
                      <InstallmentRow key={index} {...installment} />
                    )
                  )}
                </tbody>
              </table>
            </div>
          </section>

          {/* Recent Students */}
          <section className={styles.studentsSection}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>Recent Students</h2>
              <span className={styles.studentCount}>
                {studentManagement.totalStudents} Total
              </span>
            </div>
            <div className={styles.studentsGrid}>
              {studentManagement.recentStudents.map((student, index) => (
                <StudentCard key={index} {...student} />
              ))}
            </div>
          </section>

          {/* Performance Metrics */}
          {/* <section className={styles.metricsSection}>
            <h2 className={styles.sectionTitle}>Performance Metrics</h2>
            <div className={styles.metricsGrid}>
              <div className={styles.metricCard}>
                <span className={styles.metricLabel}>Conversion Rate</span>
                <span className={styles.metricValue}>
                  {analytics.performanceMetrics.leadConversionRate}%
                </span>
              </div>
              <div className={styles.metricCard}>
                <span className={styles.metricLabel}>Retention Rate</span>
                <span className={styles.metricValue}>
                  {analytics.performanceMetrics.studentRetentionRate}%
                </span>
              </div>
              <div className={styles.metricCard}>
                <span className={styles.metricLabel}>
                  Avg Payment Completion
                </span>
                <span className={styles.metricValue}>
                  {analytics.performanceMetrics.averagePaymentCompletion}%
                </span>
              </div>
              <div className={styles.metricCard}>
                <span className={styles.metricLabel}>Revenue per Student</span>
                <span className={styles.metricValue}>
                  ₹{analytics.performanceMetrics.revenuePerStudent}
                </span>
              </div>
            </div>
          </section> */}
        </div>
      </div>

      {/* Footer Stats */}
      <footer className={styles.dashboardFooter}>
        {/* Performance Metrics */}
        <section className={styles.metricsSection}>
          <h2 className={styles.sectionTitle}>Performance Metrics</h2>
          <div className={styles.metricsGrid}>
            <div className={styles.metricCard}>
              <span className={styles.metricLabel}>Conversion Rate</span>
              <span className={styles.metricValue}>
                {analytics.performanceMetrics.leadConversionRate}%
              </span>
            </div>
            <div className={styles.metricCard}>
              <span className={styles.metricLabel}>Retention Rate</span>
              <span className={styles.metricValue}>
                {analytics.performanceMetrics.studentRetentionRate}%
              </span>
            </div>
            <div className={styles.metricCard}>
              <span className={styles.metricLabel}>Avg Payment Completion</span>
              <span className={styles.metricValue}>
                {analytics.performanceMetrics.averagePaymentCompletion}%
              </span>
            </div>
            <div className={styles.metricCard}>
              <span className={styles.metricLabel}>Revenue per Student</span>
              <span className={styles.metricValue}>
                ₹{analytics.performanceMetrics.revenuePerStudent}
              </span>
            </div>
          </div>
        </section>
        <div className={styles.footerStats}>
          <div className={styles.footerStat}>
            <span className={styles.footerLabel}>Total Revenue</span>
            <span className={styles.footerValue}>
              ₹{financials.totalRevenue.toLocaleString("en-IN")}
            </span>
          </div>
          <div className={styles.footerStat}>
            <span className={styles.footerLabel}>Pending Payments</span>
            <span className={styles.footerValue}>
              ₹{financials.totalPending.toLocaleString("en-IN")}
            </span>
          </div>
          <div className={styles.footerStat}>
            <span className={styles.footerLabel}>Monthly Revenue</span>
            <span className={styles.footerValue}>
              ₹{financials.monthlyRevenue.toLocaleString("en-IN")}
            </span>
          </div>
          {/* <div className={styles.footerStat}>
            <span className={styles.footerLabel}>Revenue Trend</span>
            <span
              className={`${styles.footerValue} ${
                financials.revenueTrend > 0 ? styles.positive : styles.negative
              }`}
            >
              {financials.revenueTrend > 0 ? "+" : ""}
              {financials.revenueTrend}%
            </span>
          </div> */}
        </div>
      </footer>
    </div>
  );
};

export default FranchiseDashboard;
