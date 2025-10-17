import {
  Pagination as PaginationContainer,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./ui/pagination";

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  goToPage: (pageNumber: number) => void;
  goToNextPage: () => void;
  goToPreviousPage: () => void;
}
export const Pagination = ({
  totalPages,
  currentPage,
  goToPage,
  goToNextPage,
  goToPreviousPage,
}: PaginationProps) => {
  return (
    <PaginationContainer>
      <PaginationContent>
        <PaginationItem onClick={goToPreviousPage} className={`${currentPage === 0 ? 'pointer-events-none opacity-50' : ''}`}>
          <PaginationPrevious href="#" />
        </PaginationItem>
        {Array.from({ length: totalPages }, (_, index) => (
          <PaginationItem key={index}>
            <PaginationLink
              href="#"
              onClick={() => goToPage(index)}
              isActive={index === currentPage}
            >
              {index + 1}
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem onClick={goToNextPage} className={`${totalPages === currentPage + 1 ? 'pointer-events-none opacity-50' : ''}`}>
          <PaginationNext href="#" title="Siguiente" />
        </PaginationItem>
      </PaginationContent>
    </PaginationContainer>
  );
};
