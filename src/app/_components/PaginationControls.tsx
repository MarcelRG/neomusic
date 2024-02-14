import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "~/@/components/ui/pagination";

type PaginationControlProps = {
  prevPath: object;
  nextPath: object;
  page: number;
};

const PaginationControls = ({
  prevPath,
  nextPath,
  page,
}: PaginationControlProps) => {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          {page > 1 ? <PaginationPrevious href={prevPath} /> : null}
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="?page=1">1</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="?page=2">2</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="?page=3">3</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">100</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href={nextPath} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default PaginationControls;
