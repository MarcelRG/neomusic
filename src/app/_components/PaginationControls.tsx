import { useSearchParams } from "next/navigation";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "~/@/components/ui/pagination";

interface PathObject {
  pathname?: string;
  query?: Record<string, string | number>;
}

type PaginationControlProps = {
  prevPath: PathObject;
  nextPath: PathObject;
  searchCount: number;
  currentPage: number;
};

const PaginationControls = ({
  prevPath,
  nextPath,
  searchCount,
  currentPage,
}: PaginationControlProps) => {
  const searchParams = useSearchParams();
  const search = searchParams.get("search") ?? "";
  const sort = searchParams.get("sort") ?? "popularity";
  const order = searchParams.get("order") ?? "asc";

  const totalPages = Math.ceil((searchCount ?? 0) / 50);
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  if (totalPages <= 1) {
    return null;
  }
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          {prevPath && Object.keys(prevPath).length !== 0 ? (
            <PaginationPrevious href={prevPath} />
          ) : (
            <PaginationPrevious
              href="#"
              className="pointer-events-none opacity-0"
              aria-disabled="true"
            />
          )}
        </PaginationItem>
        {pages.map((page) => {
          if (Math.abs(currentPage - page) <= 2) {
            return (
              <PaginationItem key={page}>
                <PaginationLink
                  href={{
                    pathname: "/",
                    query: {
                      ...(search && { search }),
                      ...(sort !== "popularity" && { sort }),
                      ...(order !== "asc" && { order }),
                      page: page,
                    },
                  }}
                  isActive={currentPage === page}
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            );
          } else {
            return null;
          }
        })}

        <PaginationItem>
          {nextPath && Object.keys(nextPath).length !== 0 ? (
            <PaginationNext href={nextPath} />
          ) : (
            <PaginationNext
              href="#"
              className="pointer-events-none opacity-0"
              aria-disabled="true"
            />
          )}
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default PaginationControls;
