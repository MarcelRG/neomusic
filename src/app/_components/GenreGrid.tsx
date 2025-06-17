import { useState, useEffect } from "react";
import GenrePlayer from "./GenrePlayer";

import type { RouterOutputs } from "~/trpc/shared";

interface Props {
  search?: RouterOutputs["post"]["genre"];
  page: number;
}

export default function GenreGrid({ search, page }: Props) {
  const [currentGenre, setCurrentGenre] = useState(search?.[0]);
  useEffect(() => {
    if (search && search.length > 0) {
      setCurrentGenre(search[0]);
    }
  }, [search]);

  if (!search) {
    return null;
  }

  return (
    <div className="space-y-8">
      {/* Genre Grid */}
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7">
          {search?.map((g, index) => {
            const isSelected = currentGenre?.id === g.id;
            const genreNumber = index + 1 + 100 * (page - 1);

            return (
              <button
                className={`
                  group relative overflow-hidden rounded-2xl p-4 transition-all duration-300 ease-out
                  ${
                    isSelected
                      ? "bg-gradient-to-br from-violet-500 to-purple-600 text-white shadow-lg shadow-violet-500/25 ring-2 ring-violet-400 ring-offset-2 dark:ring-offset-gray-900"
                      : "bg-gradient-to-br from-slate-100 to-slate-200 text-slate-700 hover:from-slate-200 hover:to-slate-300 hover:shadow-md dark:from-gray-800 dark:to-gray-900 dark:text-gray-200 dark:hover:from-gray-700 dark:hover:to-gray-800"
                  }
                  flex min-h-[5rem] transform
                  flex-col items-center justify-center hover:-translate-y-1 hover:scale-105
                  hover:shadow-xl active:scale-95
                `}
                key={g.id}
                onClick={() => setCurrentGenre(g)}
              >
                {/* Number Badge */}
                <div
                  className={`
                  absolute -left-2 -top-2 flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold shadow-lg
                  ${
                    isSelected
                      ? "bg-white text-violet-600"
                      : "bg-violet-500 text-white dark:bg-violet-600"
                  }
                `}
                >
                  {genreNumber}
                </div>

                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-5">
                  <div className="h-full w-full bg-gradient-to-br from-transparent via-white to-transparent"></div>
                </div>

                {/* Genre Name */}
                <span
                  className={`
                  relative z-10 text-center font-medium leading-tight
                  ${
                    isSelected
                      ? "text-white"
                      : "text-slate-700 dark:text-gray-200"
                  }
                  text-sm md:text-base
                `}
                >
                  {g.name}
                </span>

                {/* Shine Effect */}
                <div className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <div className="absolute inset-0 -translate-x-full -skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full"></div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Player Section */}
      {currentGenre && <GenrePlayer currentGenre={currentGenre} />}
    </div>
  );
}
