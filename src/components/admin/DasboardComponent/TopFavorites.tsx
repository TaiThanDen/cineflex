import React, { useEffect, useState } from "react";
import { getTopFavorites, getFavoriteCount, getGenresByShow } from "@/lib/api";
import type { Show } from "@/lib/types/Show";
import { Heart } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

// Wrap each card in a small component so each can use its own query
const FavoriteCard: React.FC<{ movie: Show }> = ({ movie }) => {
  const navigate = useNavigate();

  const favoriteCountResult = useQuery({
    queryKey: ["show-favorite-count", movie.id],
    queryFn: () => getFavoriteCount(movie.id),
  });

  const genres = useQuery({
    queryKey: ["genres_of_show", movie.id],
    queryFn: () => getGenresByShow(movie.id),
  });

  return (
    <div
      onClick={() => navigate(`/admin/movies/${movie.id}`)}
      className="bg-white rounded-xl shadow hover:shadow-lg transition p-2 cursor-pointer"
    >
      <img
        src={movie.thumbnail}
        alt={movie.title}
        className="rounded-md w-full h-48 object-cover"
      />
      <div className="mt-2 text-center">
        <p className="font-semibold text-gray-800 truncate">{movie.title}</p>
        <div className="flex items-center justify-center gap-1 text-sm text-gray-600 mt-1">
          <Heart className="aspect-square w-5 h-5" color="#ab8fd2" />
          <div className="text-[#ab8fd2] font-semibold text-base">
            {favoriteCountResult.data ?? 0}
          </div>
        </div>
        <p className="text-gray-400 text-xs truncate">
          {genres.isLoading || genres.isError
            ? "Đang tải thể loại"
            : genres.data!.map((genre) => genre.name).join(", ")}
        </p>
      </div>
    </div>
  );
};

const TopFavorites: React.FC<{ top: number }> = ({ top }) => {
  const [movies, setMovies] = useState<Show[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const rsp = await getTopFavorites(0, top); // ✅ use prop
        setMovies(rsp.data);
      } catch (e) {
        console.error("Error fetching top favorites:", e);
      }
    };
    fetchData();
  }, [top]); // ✅ refetch whenever "top" changes

  return (
    <div className="my-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-700">
        Thống kê phim hot nhất
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {movies.map((movie) => (
          <FavoriteCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default TopFavorites;
