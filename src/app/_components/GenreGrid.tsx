"use client";
import { api } from "~/trpc/react";
import { useState, useEffect } from "react";
import GenrePlayer from "./GenrePlayer";

export default function GenreGrid() {
  const genre = api.post.genre.useQuery().data;
  const [currentGenre, setCurrentGenre] = useState(genre?.[0]);
  useEffect(() => {
    if (genre && genre.length > 0) {
      setCurrentGenre(genre[0]);
    }
  }, [genre]);

  if (!genre) {
    return null;
  }

  return (
    <>
      <div className="container flex flex-row flex-wrap justify-center gap-2.5">
        {genre?.map((g, index) => {
          return (
            <button
              className={currentGenre?.id === g.id ? "selected" : "zoomAnimate"}
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
