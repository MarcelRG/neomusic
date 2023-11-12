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
          : "fixed bottom-0 flex w-full justify-center px-5 pb-10 md:px-10 md:pb-10"
      }
    >
      <iframe
        className="h-20 w-full rounded-xl"
        src={currentGenre?.playlist}
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
      ></iframe>
    </div>
  );
};

export default GenrePlayer;
