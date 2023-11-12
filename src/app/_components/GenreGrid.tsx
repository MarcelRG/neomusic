"use client";
import { useState, useEffect } from "react";
import GenrePlayer from "./GenrePlayer";

import type { RouterOutputs } from "~/trpc/shared";

interface Props {
  search?: RouterOutputs["post"]["genre"];
}

export default function GenreGrid({ search }: Props) {
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
      <div className="flex flex-row flex-wrap justify-center gap-2.5 md:container">
        {search?.map((g, index) => {
          return (
            <button
              className={
                currentGenre?.id === g.id
                  ? "selected zoomAnimate"
                  : "zoomAnimate"
              }
              key={g.id}
              onClick={() => {
                setCurrentGenre(g);
              }}
            >
              <p className="badge">{1 + index}</p>
              <div className="genreBtn">
                <p>{g.name}</p>
              </div>
            </button>
          );
        })}
      </div>
      {currentGenre && <GenrePlayer currentGenre={currentGenre} />}
    </>
  );
}
