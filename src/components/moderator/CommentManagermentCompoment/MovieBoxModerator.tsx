import React from "react";

interface Props {
  movie: any;
  onClick: () => void;
}

const MovieBoxModerator: React.FC<Props> = ({ movie, onClick }) => {
  const totalEpisodes = movie.seasons.reduce(
      (sum: number, s: any) => sum + s.episodes.length,
      0
  );

  return (
      <div
          className="bg-white rounded-xl shadow p-4 flex flex-col items-center hover:ring-2 hover:ring-indigo-400 cursor-pointer"
          onClick={onClick}
      >
        <img
            src={movie.poster}
            alt="Poster"
            className="w-auto h-44 object-cover rounded-lg mb-3"
        />
        <h2 className="font-semibold text-lg text-center">{movie.title}</h2>
        <div className="flex gap-3 mt-2">
        <span className="bg-indigo-100 text-indigo-600 px-2 py-1 rounded text-xs">
          {movie.seasons.length} Mùa
        </span>
          <span className="bg-green-100 text-green-600 px-2 py-1 rounded text-xs">
          {totalEpisodes} Tập
        </span>
        </div>
      </div>
  );
};

export default MovieBoxModerator;
