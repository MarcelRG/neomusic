import { Skeleton } from "~/@/components/ui/skeleton";

export default function GenreSkeleton() {
  const widthClasses = [
    "w-12",
    "w-14",
    "w-16",
    "w-20",
    "w-24",
    "w-28",
    "w-32",
    "w-36",
    "w-40",
    "w-44",
    "w-48",
    "w-52",
    "w-56",
    "w-60",
    "w-64",
    "w-72",
  ];

  return (
    <div className="container flex flex-wrap justify-center gap-2.5">
      {Array.from({ length: 20 }).map((items, index) => {
        const randomWidthClass =
          widthClasses[Math.floor(Math.random() * widthClasses.length)];
        return (
          <Skeleton
            className={`${randomWidthClass} flex h-14 grow rounded-2xl`}
            key={index}
          />
        );
      })}
    </div>
  );
}
