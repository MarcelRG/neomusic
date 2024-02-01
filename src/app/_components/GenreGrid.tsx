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
    <>
      <div className="container flex flex-wrap justify-center gap-2">
        {search?.map((g, index) => {
          return (
            <button
              className={
                currentGenre?.id === g.id
                  ? "selected zoomAnimate genreBtn flex grow justify-center"
                  : "zoomAnimate genreBtn flex grow justify-center"
              }
              key={g.id}
              onClick={() => {
                setCurrentGenre(g);
              }}
            >
              <p className="badge">{index + 1 + 100 * (page - 1)}</p>
              <p>{g.name}</p>
            </button>
          );
        })}
      </div>
      {currentGenre && <GenrePlayer currentGenre={currentGenre} />}
    </>
  );
}
