"use client";
import { api } from "~/trpc/react";
import { useState } from "react";

export default function GenreGrid() {
  const genre = api.post.genre.useQuery().data;
  const [currentGenre, setCurrentGenre] = useState(genre?.[0]);
  return (
    <>
      <div className="container flex flex-row flex-wrap justify-center gap-2.5">
        {genre?.map((g, index) => {
          return (
            <a
              href="/"
              className={currentGenre?.id === g.id ? "selected" : "zoomAnimate"}
              key={g.id}
              onClick={(event) => {
                event.preventDefault();
                setCurrentGenre(g);
              }}
            >
              <p className="badge">{1 + index}</p>
              <div className="genreBtn">
                <p>{g.name}</p>
              </div>
            </a>
          );
        })}
      </div>
      <div className="fixed bottom-0 flex w-full justify-center p-10">
        <iframe
          className=" h-20 w-full rounded-xl bg-transparent"
          src={currentGenre?.playlist}
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
        ></iframe>
      </div>
    </>
  );
}
