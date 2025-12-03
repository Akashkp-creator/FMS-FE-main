// const PaymentTable = () => {
//   return <div>PaymentTable</div>;
// };

// import { Link, useLoaderData } from "react-router-dom";

// export default PaymentTable;
// const PaymentTable = () => {
//   // const { data } = useLoaderData(); // ← Coming from your loader

//   // // ---- GROUP BY STUDENT ----
//   // const grouped = {};

//   // data.forEach((item) => {
//   //   if (!grouped[item.studentId]) {
//   //     grouped[item.studentId] = {
//   //       studentId: item.studentId,
//   //       studentName: item.studentName,
//   //       phone: item.phone,
//   //       pendingCount: 0,
//   //       totalPendingAmount: 0,
//   //       dueDates: [],
//   //     };
//   //   }

//   //   // Count pending installments
//   //   if (item.status === "pending") {
//   //     grouped[item.studentId].pendingCount += 1;
//   //     grouped[item.studentId].totalPendingAmount += item.amount;
//   //   }

//   //   // Always store due dates for UI
//   //   grouped[item.studentId].dueDates.push({
//   //     dueDate: item.dueDate,
//   //     status: item.status,
//   //   });
//   // });
//   const rawData = useLoaderData(); // array of installments

//   // Group by studentId
//   const grouped = rawData.reduce((acc, item) => {
//     if (!acc[item.studentId]) {
//       acc[item.studentId] = {
//         studentId: item.studentId,
//         studentName: item.studentName,
//         phone: item.phone,
//         installments: [],
//       };
//     }
//     acc[item.studentId].installments.push(item);
//     return acc;
//   }, {});
//   const rows = Object.values(grouped);
//   const pending = row.installments.filter((i) => i.status === "pending");
//   const pendingCount = pending.length;
//   const totalPendingAmount = pending.reduce((sum, i) => sum + i.amount, 0);

//   const finalList = Object.values(grouped);
//   {
//     rows.map((row) => {
//       const pending = row.installments.filter((i) => i.status === "pending");
//       const pendingCount = pending.length;
//       const totalPendingAmount = pending.reduce((sum, i) => sum + i.amount, 0);

//       return (
//         <Link to={`/student/installments/${row.studentId}`} key={row.studentId}>
//           <tr>
//             <td>{row.studentName}</td>

//             <td>
//               {pendingCount} Pending (₹{totalPendingAmount})
//             </td>

//             <td>{row.phone}</td>

//             <td className="tooltip">
//               {pending.length > 0
//                 ? new Date(pending[0].dueDate).toLocaleDateString()
//                 : "-"}

//               <span className="tooltiptext">
//                 {pending.map((i) => (
//                   <div
//                     key={i.installmentNo}
//                     style={{ color: i.status === "paid" ? "green" : "red" }}
//                   >
//                     {new Date(i.dueDate).toLocaleDateString()}
//                   </div>
//                 ))}
//               </span>
//             </td>
//           </tr>
//         </Link>
//       );
//     });
//   }
// };
// const PaymentTable = () => {
//   const loaderData = useLoaderData();
//   const rawData = loaderData.data || []; // ✅ Always array

//   // Group by student
//   const grouped = rawData.reduce((acc, item) => {
//     const id = item.studentId;

//     if (!acc[id]) {
//       acc[id] = {
//         studentId: id,
//         studentName: item.studentName,
//         phone: item.phone,
//         installments: [],
//       };
//     }

//     acc[id].installments.push(item);
//     return acc;
//   }, {});

//   const finalRows = Object.values(grouped);

//   return (
//     <table>
//       <thead>
//         <tr>
//           <th>Student</th>
//           <th>Pending Count</th>
//           <th>Total Pending Amount</th>
//           <th>Phone</th>
//           <th>Due Dates</th>
//         </tr>
//       </thead>

//       <tbody>
//         {finalRows.map((row) => {
//           const pending = row.installments.filter(
//             (i) => i.status === "pending"
//           );

//           const totalAmount = pending.reduce(
//             (sum, inst) => sum + inst.amount,
//             0
//           );

//           return (
//             <tr key={row.studentId}>
//               <td>{row.studentName}</td>
//               <td>{pending.length}</td>
//               <td>{totalAmount}</td>
//               <td>{row.phone}</td>

//               {/* Hover to show all dates */}
//               <td>
//                 <div className="tooltip">
//                   {pending.length > 0
//                     ? pending[0].dueDate.slice(0, 10)
//                     : "No pending"}
//                   <span className="tooltiptext">
//                     {pending.map((p) => (
//                       <div
//                         key={p.installmentNo}
//                         style={{
//                           color: p.status === "paid" ? "green" : "red",
//                         }}
//                       >
//                         {p.dueDate.slice(0, 10)}
//                       </div>
//                     ))}
//                   </span>
//                 </div>
//               </td>
//             </tr>
//           );
//         })}
//       </tbody>
//     </table>
//   );
// };
// export default PaymentTable;
// return (
//     <table>
//       <thead>
//         <tr>
//           <th>Student</th>
//           <th>Pending Installments</th>
//           <th>Phone</th>
//           <th>Due Dates</th>
//         </tr>
//       </thead>

//       <tbody>
//         {finalList.map((student) => (
//           <tr key={student.studentId} style={{ cursor: "pointer" }}>
//             <td>
//               <Link to={`/student/installments/${student.studentId}`}>
//                 {student.studentName}
//               </Link>
//             </td>

//             <td>
//               {student.pendingCount} pending
//               <br />₹{student.totalPendingAmount.toFixed(2)}
//             </td>

//             <td>{student.phone}</td>

//             <td>
//               {student.dueDates.map((d, i) => (
//                 <span
//                   key={i}
//                   style={{
//                     color: d.status === "pending" ? "red" : "green",
//                     marginRight: "8px",
//                   }}
//                 >
//                   {new Date(d.dueDate).toLocaleDateString()}
//                 </span>
//               ))}
//             </td>
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   );
// import styles from "./PaymentTable.module.css";
// import { useLoaderData } from "react-router-dom";

// const PaymentTable = () => {
//   const loaderData = useLoaderData();
//   const rawData = loaderData.data || [];

//   const grouped = rawData.reduce((acc, item) => {
//     const id = item.studentId;

//     if (!acc[id]) {
//       acc[id] = {
//         studentId: id,
//         studentName: item.studentName,
//         phone: item.phone,
//         installments: [],
//       };
//     }

//     acc[id].installments.push(item);
//     return acc;
//   }, {});

//   const finalRows = Object.values(grouped);

//   return (
//     <table className={styles.table}>
//       <thead>
//         <tr>
//           <th>Student</th>
//           <th>Pending Count</th>
//           <th>Total Pending Amount</th>
//           <th>Phone</th>
//           <th>Due Dates</th>
//         </tr>
//       </thead>

//       <tbody>
//         {finalRows.map((row) => {
//           const pending = row.installments.filter(
//             (i) => i.status === "pending"
//           );

//           const totalAmount = pending.reduce(
//             (sum, inst) => sum + inst.amount,
//             0
//           );

//           return (
//             <tr key={row.studentId}>
//               <td>{row.studentName}</td>
//               <td>{pending.length}</td>
//               <td>{totalAmount}</td>
//               <td>{row.phone}</td>

//               <td>
//                 <div className={styles.tooltip}>
//                   {pending.length > 0
//                     ? pending[0].dueDate.slice(0, 10)
//                     : "No pending"}

//                   <span className={styles.tooltiptext}>
//                     {pending.map((p) => (
//                       <div
//                         key={p.installmentNo}
//                         className={
//                           p.status === "paid" ? styles.paid : styles.pending
//                         }
//                       >
//                         {p.dueDate.slice(0, 10)}
//                       </div>
//                     ))}
//                   </span>
//                 </div>
//               </td>
//             </tr>
//           );
//         })}
//       </tbody>
//     </table>
//   );
// };
// React component example
// ==========================================imp===========================
// import { Link, useLoaderData } from "react-router-dom";

// const PaymentTable = () => {
//   const data = useLoaderData(); // Your data from loader
//   const { data: students, meta } = data;

//   return (
//     <div className="container mx-auto p-4">
//       {/* Table */}
//       <div className="overflow-x-auto bg-white rounded-lg shadow">
//         <table className="min-w-full divide-y divide-gray-200">
//           <thead className="bg-gray-50">
//             <tr>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Name
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Phone
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Course
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Due Date
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Status
//               </th>
//             </tr>
//           </thead>
//           <tbody className="bg-white divide-y divide-gray-200">
//             {students.map((student) => (
//               <tr key={student.studentId} className="hover:bg-gray-50">
//                 {/* Name Cell */}
//                 <td className="px-6 py-4 whitespace-nowrap">
//                   <Link
//                     to={`/student/payment-tabs/${student.studentId}`}
//                     className="text-blue-600 hover:text-blue-900 font-medium hover:underline"
//                   >
//                     {student.name}
//                   </Link>
//                 </td>

//                 {/* Phone Cell */}
//                 <td className="px-6 py-4 whitespace-nowrap">
//                   <Link
//                     to={`/student/payment-tabs/${student.studentId}`}
//                     className="text-gray-900 hover:text-blue-900"
//                   >
//                     {student.phone}
//                   </Link>
//                 </td>

//                 {/* Course Cell */}
//                 <td className="px-6 py-4 whitespace-nowrap">
//                   <Link
//                     to={`/student/payment-tabs/${student.studentId}`}
//                     className="text-gray-900 hover:text-blue-900"
//                   >
//                     {student.courseName}
//                   </Link>
//                 </td>

//                 {/* Due Date Cell with Tooltip */}
//                 <td className="px-6 py-4 whitespace-nowrap">
//                   <Link
//                     to={`/student/payment-tabs/${student.studentId}`}
//                     className="group relative inline-block"
//                   >
//                     <span
//                       className={`font-medium ${
//                         student.display.statusColor === "red"
//                           ? "text-red-600"
//                           : student.display.statusColor === "orange"
//                           ? "text-orange-600"
//                           : "text-green-600"
//                       }`}
//                     >
//                       {student.display.formattedDate}
//                     </span>

//                     {/* Tooltip for multiple due dates */}
//                     {student.display.totalInstallments > 1 && (
//                       <div className="absolute z-10 invisible group-hover:visible bg-gray-900 text-white text-xs rounded py-1 px-2 bottom-full left-1/2 transform -translate-x-1/2 mb-2 whitespace-nowrap">
//                         <div className="font-semibold mb-1 border-b pb-1">
//                           All Due Dates ({student.display.totalInstallments})
//                         </div>
//                         {student.display.allInstallments.map((inst, idx) => (
//                           <div key={idx} className="flex justify-between gap-4">
//                             <span>
//                               {inst.installmentNo}. {inst.formattedDate}
//                             </span>
//                             <span
//                               className={
//                                 inst.status === "paid"
//                                   ? "text-green-400"
//                                   : inst.isOverdue
//                                   ? "text-red-400"
//                                   : "text-yellow-400"
//                               }
//                             >
//                               {inst.status}
//                             </span>
//                           </div>
//                         ))}
//                         <div className="mt-1 pt-1 border-t text-gray-300">
//                           Pending: {student.display.pendingCount} | Paid:{" "}
//                           {student.display.paidCount}
//                         </div>
//                       </div>
//                     )}
//                   </Link>
//                 </td>

//                 {/* Status Cell */}
//                 <td className="px-6 py-4 whitespace-nowrap">
//                   <Link
//                     to={`/student/payment-tabs/${student.studentId}`}
//                     className="inline-block"
//                   >
//                     <span
//                       className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
//                         student.display.status === "paid"
//                           ? "bg-green-100 text-green-800"
//                           : student.display.hasOverdue
//                           ? "bg-red-100 text-red-800"
//                           : "bg-yellow-100 text-yellow-800"
//                       }`}
//                     >
//                       {student.display.status}
//                       {student.display.pendingCount > 0 && (
//                         <span className="ml-1">
//                           ({student.display.pendingCount})
//                         </span>
//                       )}
//                     </span>
//                   </Link>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Pagination */}
//       {meta.pagination && meta.pagination.pageCount > 1 && (
//         <div className="flex items-center justify-between mt-4 px-4 py-3 bg-white border-t border-gray-200 sm:px-6">
//           <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
//             <div>
//               <p className="text-sm text-gray-700">
//                 Showing{" "}
//                 <span className="font-medium">
//                   {Math.min(
//                     (meta.pagination.page - 1) * meta.pagination.pageSize + 1,
//                     meta.pagination.total
//                   )}
//                 </span>{" "}
//                 to{" "}
//                 <span className="font-medium">
//                   {Math.min(
//                     meta.pagination.page * meta.pagination.pageSize,
//                     meta.pagination.total
//                   )}
//                 </span>{" "}
//                 of <span className="font-medium">{meta.pagination.total}</span>{" "}
//                 results
//               </p>
//             </div>
//             <div>
//               <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
//                 {/* Previous button */}
//                 <a
//                   href={`?page=${meta.pagination.page - 1}`}
//                   className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium ${
//                     meta.pagination.page === 1
//                       ? "text-gray-300 cursor-not-allowed"
//                       : "text-gray-500 hover:bg-gray-50"
//                   }`}
//                 >
//                   Previous
//                 </a>

//                 {/* Page numbers */}
//                 {Array.from(
//                   { length: meta.pagination.pageCount },
//                   (_, i) => i + 1
//                 ).map((pageNum) => (
//                   <a
//                     key={pageNum}
//                     href={`?page=${pageNum}`}
//                     className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
//                       meta.pagination.page === pageNum
//                         ? "z-10 bg-blue-50 border-blue-500 text-blue-600"
//                         : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50"
//                     }`}
//                   >
//                     {pageNum}
//                   </a>
//                 ))}

//                 {/* Next button */}
//                 <a
//                   href={`?page=${meta.pagination.page + 1}`}
//                   className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium ${
//                     meta.pagination.page === meta.pagination.pageCount
//                       ? "text-gray-300 cursor-not-allowed"
//                       : "text-gray-500 hover:bg-gray-50"
//                   }`}
//                 >
//                   Next
//                 </a>
//               </nav>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default PaymentTable;
// ==========================imp===============

// InstallmentTable.jsx
import React from "react";
import { Link, useLoaderData } from "react-router-dom";
import styles from "./PaymentTable.module.css";

const PaymentTable = () => {
  const data = useLoaderData();
  const { data: students, meta } = data;

  // Format page numbers for pagination
  // const getPageNumbers = () => {
  //   const pages = [];
  //   for (let i = 1; i <= meta.pagination.pageCount; i++) {
  //     pages.push(i);
  //   }
  //   return pages;
  // };

  if (!students || students.length === 0) {
    return (
      <div className={styles.container}>
        <div className={styles.backgroundEffects}>
          <div className={styles.glowCircle1}></div>
          <div className={styles.glowCircle2}></div>
        </div>

        <div className={styles.tableContainer}>
          <div className={styles.emptyState}>
            <div className={styles.emptyStateIcon}>📊</div>
            <p className={styles.emptyStateText}>
              No installment payments found
            </p>
            <p className={styles.emptyStateSubtext}>
              Try adjusting your filters or check back later
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {/* Background Effects */}
      <div className={styles.backgroundEffects}>
        <div className={styles.glowCircle1}></div>
        <div className={styles.glowCircle2}></div>
      </div>

      {/* Table */}
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead className={styles.tableHeader}>
            <tr>
              <th>Name</th>
              <th>Phone</th>
              <th>Course</th>
              <th>Due Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody className={styles.tableBody}>
            {students.map((student) => (
              <tr key={student.studentId}>
                {/* Name Cell */}
                <td>
                  <Link
                    to={`/student/payment-tabs/${student.studentId}`}
                    className={`${styles.link} ${styles.nameLink}`}
                  >
                    {student.name}
                  </Link>
                </td>

                {/* Phone Cell */}
                <td>
                  <Link
                    to={`/student/payment-tabs/${student.studentId}`}
                    className={`${styles.link} ${styles.dataLink}`}
                  >
                    {student.phone}
                  </Link>
                </td>

                {/* Course Cell */}
                <td>
                  <Link
                    to={`/student/payment-tabs/${student.studentId}`}
                    className={`${styles.link} ${styles.dataLink}`}
                  >
                    {student.courseName}
                  </Link>
                </td>

                {/* Due Date Cell with Tooltip */}
                <td>
                  <Link
                    to={`/student/payment-tabs/${student.studentId}`}
                    className={`${styles.link} ${styles.dueDateCell}`}
                  >
                    <span
                      className={`${styles.dateText} ${
                        student.display.statusColor === "red"
                          ? styles.dateRed
                          : student.display.statusColor === "orange"
                          ? styles.dateOrange
                          : styles.dateGreen
                      }`}
                    >
                      {student.display.formattedDate}
                    </span>

                    {/* Multiple installments badge */}
                    {student.display.totalInstallments > 1 && (
                      <span className={styles.multipleBadge}>
                        +{student.display.totalInstallments - 1}
                      </span>
                    )}

                    {/* Tooltip for multiple due dates */}
                    {student.display.totalInstallments > 1 && (
                      <div className={styles.tooltipContainer}>
                        <div className={styles.tooltipHeader}>
                          All Due Dates ({student.display.totalInstallments})
                        </div>
                        {student.display.allInstallments.map((inst, idx) => (
                          <div key={idx} className={styles.tooltipRow}>
                            <span>
                              {inst.installmentNo}. {inst.formattedDate}
                            </span>
                            <span
                              className={`${styles.tooltipStatus} ${
                                inst.status === "paid"
                                  ? styles.tooltipPaid
                                  : inst.isOverdue
                                  ? styles.tooltipOverdue
                                  : styles.tooltipPending
                              }`}
                            >
                              {inst.status}
                            </span>
                          </div>
                        ))}
                        <div className={styles.tooltipFooter}>
                          Pending: {student.display.pendingCount} | Paid:{" "}
                          {student.display.paidCount}
                        </div>
                      </div>
                    )}
                  </Link>
                </td>

                {/* Status Cell */}
                <td>
                  <Link
                    to={`/student/payment-tabs/${student.studentId}`}
                    className={styles.link}
                  >
                    <span
                      className={`${styles.statusBadge} ${
                        student.display.status === "paid"
                          ? styles.statusPaid
                          : student.display.hasOverdue
                          ? styles.statusOverdue
                          : styles.statusPending
                      }`}
                    >
                      {student.display.status}
                      {student.display.pendingCount > 0 && (
                        <span> ({student.display.pendingCount})</span>
                      )}
                    </span>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {meta.pagination && meta.pagination.pageCount > 1 && (
        <div className={styles.pagination}>
          <div className={styles.paginationInfo}>
            Showing{" "}
            <span>
              {Math.min(
                (meta.pagination.page - 1) * meta.pagination.pageSize + 1,
                meta.pagination.total
              )}
            </span>{" "}
            to{" "}
            <span>
              {Math.min(
                meta.pagination.page * meta.pagination.pageSize,
                meta.pagination.total
              )}
            </span>{" "}
            of <span>{meta.pagination.total}</span> results
          </div>

          {/* <div className={styles.paginationNav}>
            Previous button
            <a
              href={`?page=${meta.pagination.page - 1}`}
              className={`${styles.paginationButton} ${
                meta.pagination.page === 1 ? styles.disabled : ""
              }`}
              disabled={meta.pagination.page === 1}
            >
              Previous
            </a>

            Page numbers
            {getPageNumbers().map((pageNum) => (
              <a
                key={pageNum}
                href={`?page=${pageNum}`}
                className={`${styles.paginationButton} ${
                  meta.pagination.page === pageNum
                    ? styles.paginationButtonActive
                    : ""
                }`}
              >
                {pageNum}
              </a>
            ))}

            Next button
            <a
              href={`?page=${meta.pagination.page + 1}`}
              className={`${styles.paginationButton} ${
                meta.pagination.page === meta.pagination.pageCount
                  ? styles.disabled
                  : ""
              }`}
              disabled={meta.pagination.page === meta.pagination.pageCount}
            >
              Next
            </a>
          </div> */}
        </div>
      )}
    </div>
  );
};

export default PaymentTable;
