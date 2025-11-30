import Pagination from "../../components/StudentListContainer/Pagination";
import StudentFilter from "../../components/StudentListContainer/StudentFilter";
import StudentsList from "../../components/StudentListContainer/StudentsList";

const LeadStudentList = () => {
  return (
    <>
      <StudentFilter />
      <StudentsList />
      <Pagination />
    </>
  );
};
export default LeadStudentList;
