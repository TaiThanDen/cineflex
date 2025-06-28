import React from "react";
import GenreDisplay from "../../../examples/GenreDisplay";

interface Props {
  movie: any;
  onClick: () => void;
}

const MovieBox: React.FC<Props> = ({ movie, onClick }) => {
  const totalEpisodes =
    movie.seasons?.reduce(
      (sum: number, s: any) => sum + (s.episodes?.length || 0),
      0
    ) || 0;

  // Helper function để lấy ảnh từ cả API data (thumbnail) và mock data (poster)
  const getMovieImage = () => {
    return movie.thumbnail;
  };

  return (
    <div
      className="bg-white rounded-xl shadow p-4 flex flex-col items-center hover:ring-2 hover:ring-indigo-400 cursor-pointer"
      onClick={onClick}
    >
      <img
        src={getMovieImage()}
        alt={movie.thumbnail || "Movie poster"}
        className="w-auto h-44 object-cover rounded-lg mb-3"
        onError={(e) => {
          // Fallback nếu ảnh không load được
          (e.target as HTMLImageElement).src = "/placeholder-movie.jpg";
        }}
      />{" "}
      <h2 className="font-semibold text-lg text-center">{movie.title}</h2>
      {/* Hiển thị genres/tags */}
      <GenreDisplay
        genres={movie.genres}
        tags={movie.tags}
        maxDisplay={3}
        className="mt-2"
      />
      <div className="flex gap-3 mt-2">
        <span className="bg-indigo-100 text-indigo-600 px-2 py-1 rounded text-xs">
          {movie.seasons?.length || 0} Mùa
        </span>
        <span className="bg-green-100 text-green-600 px-2 py-1 rounded text-xs">
          {totalEpisodes} Tập
        </span>
      </div>
    </div>
  );
};

export default MovieBox;
