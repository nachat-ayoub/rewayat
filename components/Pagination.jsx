import { Pagination } from "flowbite-react";
import React from "react";

const PaginationBar = ({
  currentPage,
  onPageChange,
  showIcons,
  totalPages,
}) => {
  return (
    <div dir="ltr" className="flex items-center justify-center text-center">
      <Pagination
        dir="ltr"
        layout="pagination"
        currentPage={currentPage}
        onPageChange={onPageChange}
        showIcons={showIcons}
        totalPages={totalPages}
        previousLabel={`السابق`}
        nextLabel={`التالي`}
      />
    </div>
  );
};

export default PaginationBar;
