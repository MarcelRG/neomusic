import { Skeleton } from "~/@/components/ui/skeleton";

export default function GenreSkeleton() {
  return (
    <div className="space-y-8">
      {/* Genre Grid Skeleton */}
      <div className="container mx-auto max-w-7xl px-4">
        <div className="grid grid-cols-3 gap-3 md:grid-cols-4 lg:grid-cols-5">
          {Array.from({ length: 50 }).map((_, index) => (
            <div key={index} className="relative">
              {/* Genre Card Skeleton */}
              <Skeleton className="min-h-[5rem] w-full rounded-2xl" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
