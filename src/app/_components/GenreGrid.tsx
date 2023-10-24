import { api } from "~/trpc/server";

export default async function GenreGrid() {
  const genre = await api.post.genre.query();
  return (
    <div className="container flex flex-row flex-wrap justify-center gap-2">
      {genre.map((g, index) => {
        return (
          <a href={g.playlist} className="zoomAnimate" key={g.id}>
            <p className="badge">{1 + index}</p>
            <div className="genreBtn">
              <p>{g.name}</p>
            </div>
          </a>
        );
      })}
    </div>
  );
}
