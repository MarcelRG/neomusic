interface GenrePlayerProps {
  currentGenre: {
    id?: string;
    playlist?: string;
  };
}

const GenrePlayer: React.FC<GenrePlayerProps> = ({ currentGenre }) => {
  return (
    <div
      className={
        !currentGenre?.id
          ? "hidden"
          : "fixed bottom-0 left-0 right-0 z-[2] flex justify-center px-5 pb-10 md:px-10 md:pb-10"
      }
    >
      <div className="container mx-auto max-w-7xl">
        <iframe
          className="h-20 w-full rounded-xl"
          src={currentGenre?.playlist}
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
        ></iframe>
      </div>
    </div>
  );
};

export default GenrePlayer;
