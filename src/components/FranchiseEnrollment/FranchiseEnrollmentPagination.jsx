// import { useLoaderData } from "react-router-dom";

// const FranchiseEnrollmentPagination = () => {
//   const data = useLoaderData();
//   console.log(data);
//   return <div>FranchiseEnrollmentPagination</div>;
// };
// export default FranchiseEnrollmentPagination;
// import { useLoaderData, useLocation, useNavigate } from "react-router-dom";

// const Pagination = () => {
//   const { data } = useLoaderData();
//   const { pageCount, page } = data.meta;

//   const { search, pathname } = useLocation();
//   const navigate = useNavigate();
//   const handlePageChange = (pageNumber) => {
//     const searchParams = new URLSearchParams(search);
//     searchParams.set("page", pageNumber);
//     navigate(`${pathname}?${searchParams.toString()}`);
//   };

//   const addPageButton = ({ pageNumber, activeClass }) => {
//     return (
//       <button
//         key={pageNumber}
//         onClick={() => handlePageChange(pageNumber)}
//         className={`btn btn-xs sm:btn-md border-none join-item ${
//           activeClass ? "bg-base-300 border-base-300 " : ""
//         }`}
//       >
//         {pageNumber}
//       </button>
//     );
//   };

//   const renderPageButtons = () => {
//     const pageButtons = [];
//     // first button
//     pageButtons.push(addPageButton({ pageNumber: 1, activeClass: page === 1 }));

//     // dots
//     if (page > 2) {
//       pageButtons.push(
//         <button className="join-item btn btn-xs sm:btn-md" key="dots-1">
//           ...
//         </button>
//       );
//     }

//     // active/current page
//     if (page !== 1 && page !== pageCount) {
//       pageButtons.push(addPageButton({ pageNumber: page, activeClass: true }));
//     }
//     // dots
//     if (page < pageCount - 1) {
//       pageButtons.push(
//         <button className="join-item btn btn-xs sm:btn-md" key="dots-2">
//           ...
//         </button>
//       );
//     }

//     // last button
//     pageButtons.push(
//       addPageButton({ pageNumber: pageCount, activeClass: page === pageCount })
//     );
//     return pageButtons;
//   };

//   if (pageCount < 2) return null;

//   return (
//     <div className="mt-16 flex justify-end">
//       <div className="join">
//         <button
//           className="btn btn-xs sm:btn-md join-item"
//           onClick={() => {
//             let prevPage = page - 1;
//             if (prevPage < 1) prevPage = pageCount;
//             handlePageChange(prevPage);
//           }}
//         >
//           Prev
//         </button>
//         {renderPageButtons()}
//         <button
//           className="btn btn-xs sm:btn-md join-item"
//           onClick={() => {
//             let nextPage = page + 1;
//             if (nextPage > pageCount) nextPage = 1;
//             handlePageChange(nextPage);
//           }}
//         >
//           Next
//         </button>
//       </div>
//     </div>
//   );
// };
// export default Pagination;
import { useLoaderData, useLocation, useNavigate } from "react-router-dom";
import styles from "./FranchiseEnrollmentPagination.module.css";

const FranchiseEnrollmentPagination = () => {
  const { meta } = useLoaderData();
  const { pageCount, page } = meta;

  const { search, pathname } = useLocation();
  const navigate = useNavigate();

  const handlePageChange = (pageNumber) => {
    const searchParams = new URLSearchParams(search);
    searchParams.set("page", pageNumber);
    navigate(`${pathname}?${searchParams.toString()}`);
  };

  const addPageButton = ({ pageNumber, activeClass }) => {
    return (
      <button
        key={pageNumber}
        onClick={() => handlePageChange(pageNumber)}
        className={`${styles.button} ${activeClass ? styles.activeButton : ""}`}
      >
        {pageNumber}
      </button>
    );
  };

  const renderPageButtons = () => {
    const pageButtons = [];
    // first button
    pageButtons.push(addPageButton({ pageNumber: 1, activeClass: page === 1 }));

    // dots
    if (page > 2) {
      pageButtons.push(
        <button className={styles.dots} key="dots-1">
          ...
        </button>
      );
    }

    // active/current page
    if (page !== 1 && page !== pageCount) {
      pageButtons.push(addPageButton({ pageNumber: page, activeClass: true }));
    }

    // dots
    if (page < pageCount - 1) {
      pageButtons.push(
        <button className={styles.dots} key="dots-2">
          ...
        </button>
      );
    }

    // last button
    pageButtons.push(
      addPageButton({ pageNumber: pageCount, activeClass: page === pageCount })
    );
    return pageButtons;
  };

  if (pageCount < 2) return null;

  return (
    <div className={styles.container}>
      <div className={styles.pagination}>
        <button
          className={styles.button}
          onClick={() => {
            let prevPage = page - 1;
            if (prevPage < 1) prevPage = pageCount;
            handlePageChange(prevPage);
          }}
        >
          Prev
        </button>
        {renderPageButtons()}
        <button
          className={styles.button}
          onClick={() => {
            let nextPage = page + 1;
            if (nextPage > pageCount) nextPage = 1;
            handlePageChange(nextPage);
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default FranchiseEnrollmentPagination;
// 98
