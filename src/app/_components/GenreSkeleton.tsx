import { Skeleton } from "~/@/components/ui/skeleton";

export default function GenreSkeleton() {
  return (
    <div className="space-y-8">
      {/* Genre Grid Skeleton */}
      <div className="container mx-auto max-w-7xl px-4">
        <div className="grid grid-cols-5 gap-3">
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
