import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getFavoriteCount } from "@/lib/api";
import { Heart } from "lucide-react";
import type { Show } from "@/lib/types/Show";
import { Link } from "react-router";

interface Props {
  movie: Show;
  onClick: () => void;
}

const MovieBox: React.FC<Props> = ({ movie, onClick }) => {
  // Query để lấy favorite count
  const favoriteCountResult = useQuery({
    queryKey: ["show-favorite-count", movie.id],
    queryFn: () => getFavoriteCount(movie.id),
  });

  // Helper function để lấy ảnh từ cả API data (thumbnail) và mock data (poster)
  const getMovieImage = () => {
    return movie.thumbnail;
  };

  return (
    <Link to={`/admin/movies/${movie.id}`}>
      <div
        className="bg-white rounded-xl shadow p-4 flex flex-col items-center hover:ring-2 hover:ring-indigo-400 cursor-pointer"
        onClick={onClick}
      >
        <img
          src={getMovieImage()}
          alt={movie.thumbnail || "Movie poster"}
          className="w-auto h-44 object-cover rounded-lg mb-3"
        />
        <h2 className="font-semibold text-lg text-center">{movie.title}</h2>

        {/* Hiển thị view và like counts */}
        <div className="flex gap-3 mt-2">
          <div className="flex items-center gap-1 text-red-600 px-2 py-1 rounded text-xs">
            <Heart size={12} />
            <span>
              {favoriteCountResult.isLoading
                ? "..."
                : favoriteCountResult.isError
                  ? "0"
                  : favoriteCountResult.data}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default MovieBox;
