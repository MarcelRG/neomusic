"use client";
import Image from "next/image";
import GenreGrid from "./GenreGrid";
import PaginationControls from "./PaginationControls";
import GenreSkeleton from "./GenreSkeleton";
import type { RouterOutputs } from "~/trpc/shared";

interface PathObject {
  pathname?: string;
  query?: Record<string, string | number>;
}

interface SearchResultsProps {
  isLoading: boolean;
  data: RouterOutputs["post"]["genre"] | undefined;
  page: number;
  searchCount: number | undefined;
  prevPath: PathObject;
  nextPath: PathObject;
}

export const SearchResults = ({
  isLoading,
  data,
  page,
  searchCount,
  prevPath,
  nextPath,
}: SearchResultsProps) => {
  if (isLoading) {
    return <GenreSkeleton />;
  }

  if ((data?.length ?? 0) > 0) {
    return (
      <div className="space-y-6">
        <GenreGrid search={data} page={page} />
        <PaginationControls
          prevPath={prevPath}
          nextPath={nextPath}
          searchCount={searchCount ? searchCount : 6282}
          currentPage={page}
        />
        <div className="py-20"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center space-y-4 py-12">
      <Image
        src="/images/blackhole.jpg"
        alt="No results found"
        width={300}
        height={300}
        className="rounded-full opacity-60"
      />
      <div className="space-y-2 text-center">
        <h2 className="text-2xl font-bold">No Results Found</h2>
        <p className="max-w-md text-muted-foreground">
          Try adjusting your search terms to find what you&apos;re looking for.
        </p>
      </div>
    </div>
  );
};
