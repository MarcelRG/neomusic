import { useSearchParams } from "next/navigation";
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
  searchCount: number;
  currentPage: number;
};

const PaginationControls = ({
  prevPath,
  nextPath,
  searchCount,
  currentPage,
}: PaginationControlProps) => {
  const pages = Array.from(
    { length: (searchCount ?? 0) / 100 + 1 },
    (_, i) => i + 1,
  );
  const searchParams = useSearchParams();
  const search = searchParams.get("search") ?? "";
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          {prevPath && Object.keys(prevPath).length !== 0 ? (
            <PaginationPrevious href={prevPath} />
          ) : null}
        </PaginationItem>
        {pages.map((page) => {
          if (Math.abs(currentPage - page) <= 3) {
            return (
              <>
                <PaginationItem
                  key={page}
                  className={
                    currentPage === page
                      ? "inline-flex h-10 w-10 items-center justify-center rounded-md bg-accent text-sm font-medium ring-offset-background transition-colors hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                      : ""
                  }
                >
                  <PaginationLink
                    href={{
                      pathname: "/",
                      query: {
                        ...(search && { search }),
                        page: page,
                      },
                    }}
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              </>
            );
          } else {
            return null;
          }
        })}

        <PaginationItem>
          {nextPath && Object.keys(nextPath).length !== 0 ? (
            <PaginationNext href={nextPath} />
          ) : null}
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default PaginationControls;
