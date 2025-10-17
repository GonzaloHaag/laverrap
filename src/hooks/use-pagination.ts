import { useState } from "react";

export const usePagination = () => {
  const [page, setPage] = useState(0);

  const goToPage = (pageNumber: number) => {
    setPage(pageNumber);
  };
  const goToNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const goToPreviousPage = () => {
    setPage((prevPage) => Math.max(prevPage - 1, 0));
  };

  return {
    page,
    goToPage,
    goToNextPage,
    goToPreviousPage,
  };
};
